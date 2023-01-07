// @ts-nocheck
export default input => {
  console.clear()

  const USE_ELEPHANT = true
  const MINUTES = USE_ELEPHANT ? 26 : 30

  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const rx = /Valve ([A-Z][A-Z]) has flow rate=([\d]+); tunnels? leads? to valves? (.*)/
  const distanceMaps = {}
  const valves = lines.map(line => {
    const arr = Array.from(line.match(rx)).slice(1)
    const valve = {
      id: arr[0],
      flowRate: parseInt(arr[1]),
      connected: arr[2].split(', '),
      distance: {},
    }
    
    return valve
  })

  const valvesById = valves.reduce((p, c) => Object.assign(p, { [c.id]: c }), {})

  // map cost (minutes) to get from any one position to another
  valves.forEach(valve => {
    const queue = []
    const paths = {}
    queue.push( { valve, cost: 0 })
    while (queue.length > 0) {
      const current = queue.shift()
      current.valve.connected.forEach(valveId => {
        if (valveId != valve.id && !paths[valveId]) {
          paths[valveId] = { valveId, cost: current.cost + 1 }
          queue.push({ valve: valvesById[valveId], cost: current.cost + 1 })
        }
      })
    }
    valve.paths = paths
  })

  const initialState = {
    closed: valves.filter(valve => valve.flowRate > 0).map(valve => valve.id),
    position: 'AA',
    positionElephant: 'AA',
    minute: 1,
    minuteElephant: 1,
    production: 0,
    parentState: null,
    action: 'Initial state'
  }
  let bestState = initialState
  const stateQueue = [initialState]

  const getStateString = state => `${state.position} at ${state.minute}: production ${state.production}, closed: ${JSON.stringify(state.closed)}`

  const enqueueState = state => {
    stateQueue.push(state)
  }

  while (stateQueue.length > 0) {
    const state = stateQueue.shift()

    if (state.production > bestState.production) bestState = state

    if (state.minute <= (MINUTES - 2)) {
      // attempt to move ME
      state.closed.forEach(closedValveId => {
        // for each closed valve, we move to it and open it and push that new state
        // most possible states should be 6! * 6 for simple, or 4320
        const movementCost = valvesById[state.position].paths[closedValveId]?.cost || 0
        const newMinute = state.minute + movementCost + 1
        if (newMinute > MINUTES) return
        const addedProduction = valvesById[closedValveId].flowRate * Math.max(0, MINUTES - newMinute + 1)
        const newState = {
          ...state,
          position: closedValveId, // moved to different valve that is closed
          closed: state.closed.filter(id => id !== closedValveId), // opening valve, so omit it
          minute: newMinute, // takes us x minutes to move to new valve and 1 to open
          production: state.production + addedProduction, // production adding production from opening valve
          parentState: state, // where we came from, for tracking
          action: `Minute ${state.minute}: move ME from ${state.position} to ${closedValveId} in ${movementCost} minute${movementCost !== 1 ? 's' : ''} adding ${addedProduction} to get ${state.production + addedProduction}`,
        }
        enqueueState(newState)
      })
    }

    if (USE_ELEPHANT && state.minuteElephant <= (MINUTES - 2)) {
      // attempt to move ELEPHANT
      state.closed.forEach(closedValveId => {
        // for each closed valve, we move to it and open it and push that new state
        const movementCost = valvesById[state.positionElephant].paths[closedValveId]?.cost || 0
        const newMinute = state.minuteElephant + movementCost + 1
        if (newMinute > 30) return
        const addedProduction = valvesById[closedValveId].flowRate * Math.max(0, MINUTES - newMinute + 1)
        const newState = {
          ...state,
          positionElephant: closedValveId, // moved to different valve that is closed
          closed: state.closed.filter(id => id !== closedValveId), // opening valve, so omit it
          minuteElephant: newMinute, // takes us x minutes to move to new valve and 1 to open
          production: state.production + addedProduction, // production adding production from opening valve
          parentState: state, // where we came from, for tracking
          action: `Minute ${state.minute}: move ELEPHANT from ${state.position} to ${closedValveId} in ${movementCost} minute${movementCost !== 1 ? 's' : ''} adding ${addedProduction} to get ${state.production + addedProduction}`,
        }
        enqueueState(newState)
      })
    }
  }

  const actions = []
  let st = bestState
  while (st) {
    actions.unshift(st.action || 'UNKNOWN')
    st = st.parentState
  }
  actions.forEach(a => console.log(a))
  return bestState.production;
}

/* Explanation: Day 16 Part 2

Now we have only 26 minutes because we spend 4 minutes training an elephant
to follow the path we choose for it and open the valves we tell it to.  This
adds quite a bit of complication to the way I'm doing it since I only look
at closed valves.  I would have to do two opens at the same time, but they
would be at different minutes.   I guess I could store the position and
time when each of us got to where we were, and process the next one available.

So {turnMe = 0, turnElephant = 0, positionMe = 'AA', positionElephant = 'AA'}

For each one I would have to start with whose turn was lower, and try each option

*/
