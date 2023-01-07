// @ts-nocheck
export default input => {
  console.clear()
  const MINUTES = 30
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

  // Now we map how to get to each valve from each other valve.  The
  // results is that a valve has the cost to get to it from each other
  // valve along with the valve that leads to it.
  // For example AA <-> DD <-> EE
  //    AA: { 'EE': { valveId: 'DD', cost: 2 }, 'DD': { valveId: 'DD', cost: 1 }},
  //    DD: { 'AA': { valveId: 'AA', cost: 1 }, 'EE': { valveId: 'EE', cost: 1 }},
  //    EE: { 'AA': { valveId: 'DD', cost: 2 }, 'DD': { valveId: 'DD', cost: 1 }},
  // So to get from EE to AA we look at EE and see AA is { valveId: 'DD', cost: 2 },
  // which meansto get from EE you first go to DD and the trip will end up costing 2 minutes.
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

  /*
  Now we start with an initial state where we start at 'AA' and there are no
  open valves so the flow rate is 0.   From there we push new states onto our
  queue and process them the same way.  When we process a state:

  1. For each closed valve, push a new state where we either move to that valve,
      or open the valve if it is the current position

  */

  const getStateString = state => `${state.position} at ${state.minute}: production ${state.production}, closed: ${JSON.stringify(state.closed)}`
  const initialState = {
    position: 'AA',
    closed: valves.filter(valve => valve.flowRate > 0).map(valve => valve.id),
    minute: 1,
    production: 0,
    parentState: null,
    action: 'Initial state'
  }
  let bestState = initialState
  const stateQueue = [initialState]
  let statesProcessed = 0

  const enqueueState = state => {
    stateQueue.push(state)
  }

  while (stateQueue.length > 0) {
    const state = stateQueue.shift()
    // if (state.position === 'JJ' && state.minute === 10 && state.production === 1326) {
    //   console.log('Processing State: ' + getStateString(state))
    // }

    if (state.production > bestState.production) bestState = state
    if (state.minute > (MINUTES - 2)) continue // best case at 28 we move 1 to 29 and open to 30 for 1 turn
    state.closed.forEach(closedValveId => {
      // for each closed valve, we move to it and open it and push that new state
      // most possible states should be 6! * 6 for simple, or 4320
      const movementCost = valvesById[state.position].paths[closedValveId]?.cost || 0
      const newMinute = state.minute + movementCost + 1
      if (newMinute > MINUTES) return
      const addedProduction = valvesById[closedValveId].flowRate * Math.max(0, 30 - newMinute + 1)
      const newState = {
        position: closedValveId, // moved to different valve that is closed
        closed: state.closed.filter(id => id !== closedValveId), // opening valve, so omit it
        minute: newMinute, // takes us x minutes to move to new valve and 1 to open
        production: state.production + addedProduction, // production adding production from opening valve
        parentState: state, // where we came from, for tracking
        action: `Minute ${state.minute}: move from ${state.position} to ${closedValveId} in ${movementCost} minute${movementCost !== 1 ? 's' : ''} adding ${addedProduction} to get ${state.production + addedProduction}`,
      }
      enqueueState(newState)
    })

    statesProcessed++
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

/* Explanation: Day 16 Part 1

Seems like a solution for a graph.  You have valves that are linked by tunnels.
Valves can have a flow rate or 0.  Traveling to a connected valve or opening
a valve costs 1 minute.  An open valve starts releasing FlowRate pressure
the minute after it was opened and continues to release FlowRate pressure
each minute until the end (30 minutes)

So what you do on minute 30 makes no difference because an open valve will
not releast pressure until the next minute.

There are a couple of things I notice:

1. The 0 flow rate valves don't really matter, other than they increase the time to move between valves with flow rates
2. Once a valve is opened, it no longer matters if we add the total released steam when we open it.

So I'm thinking we start with an initial graph and just define the costs to get from each closed valve or the start to 
each other closed valve.  When we open a valve, we can remove it as a destination in the lists.  So every closed valve
will have a cost to get to it from **every** other valve, and a flow rate.

Ok, maybe better, use A* or some other algorithm from each closed valve to get the cost to get to each other closed
valve OR THE STARTING VALVE.

Our first step then would be to 1) open the valve we start on or 2) move to a closed valve

I could do this using a queue and a loop.  State would contain:

1. List of open valves
2. List of closed valves (options to move to)
3. Current minutes
4. Current production (amount produced by opening already open valves, based on rate and when they were opened)

To start:

const initialState = {
  position: 'AA',
  open: [],
  closed: ['BB', 'CC', 'DD', 'EE', 'HH', 'JJ'],
  minute: 0,
  production: 0
}

let bestState = initialState

Add that to a queue and loop.   Dequeue the state and handle it:

1. If production is higher than bestState, set bestState = state
2. If flow rate at our position is >0 and valve is closed, create new state for opening valve and add it to the end of the queue
    var newState = [
      parent: state,
      ...state,
      open: state.open.concat('AA'),
      closed: state.closed.filter(x => x !== 'AA'),
      minute: state.minute + 1, // cost to open valve
      production: VALVE.flowRate * (30 - state.minute - 2), // production 
    ]
3. For each valve that is still closed (except current valve), push new state for travelling to that valve
    var newState = [
      ...state,
    ]
*/
