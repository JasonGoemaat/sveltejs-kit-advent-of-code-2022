// @ts-nocheck
export default input => {
  console.clear()
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const rx = /Valve ([A-Z][A-Z]) has flow rate=([\d]+); tunnels? leads? to valves? (.*)/
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
  let updatedStates = {}

  // keep track of 'best' states.  The key is current valve + closed valves, the
  // value is production.   If we see a position that already exists we only
  // add the new position if the production is higher
  const bestStates = {}
  const enqueueState = state => {
    let key = `${state.position}${state.closed.join('')}`
    if ((!bestStates[key]) || state.production > bestStates[key].production) {
      state.key = key
      bestStates[key] = state
      updatedStates[key] = state
    }
  }

  enqueueState(initialState)

  while (true) {
    let statesToProcess = Object.values(updatedStates)
    if (statesToProcess.length === 0) break;
    updatedStates = {}
    statesToProcess.forEach(state => {
      // DEBUG: Check for proper path and log if we're on it
      if (state.position === 'JJ' && state.minute === 10 && state.production === 1326) {
        console.log('Processing State: ' + getStateString(state))
      }

      // update 'best' production state if we're better
      if (state.production > bestState.production) bestState = state
  
      state.closed.forEach(closedValveId => {
        if (closedValveId === state.position) {
          // push new state from opening valve
          const { flowRate } = valvesById[state.position]
          const minutes = Math.max(0, 30 - state.minute)
          const newProduction = flowRate * minutes
          const newState = {
            position: state.position, // not moving
            closed: state.closed.filter(x => x !== state.position), // valve is now open
            minute: state.minute + 1, // took us a minute to open the valve
            production: state.production + newProduction, // add production from opening valve
            parentState: state, // where we came from, for tracking
            action: `Minute ${state.minute}: open valve ${state.position} releasing ${flowRate} over ${minutes} for production ${newProduction} total ${state.production + newProduction}`,
          }
          enqueueState(newState)
        } else {
          // push new state from moving to the closed valve
          const movementCost = valvesById[state.position].paths[closedValveId].cost
          const newState = {
            position: closedValveId, // moved to different valve that is closed
            closed: [...state.closed], // not changing what valves are closed
            minute: state.minute + movementCost, // takes us x minutes to move to new valve
            production: state.production, // production not changed by moving
            parentState: state, // where we came from, for tracking
            action: `Minute ${state.minute}: move from ${state.position} to ${closedValveId} in ${movementCost} minute${movementCost !== 1 ? 's' : ''}`,
          }
          enqueueState(newState)
        }
      })
    })
  }

  const actions = []
  let st = bestState
  while (st) {
    actions.unshift(st.action || 'UNKNOWN')
    st = st.parentState
  }
  actions.forEach(a => console.log(a))
  return bestState;
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

## next thoughts

Wow, this doesn't work well...  Since we do a breadth-first processing,
it adds a bunch to the queue that we will never use.  I tried to memoize, but
the number on the queue still explodes, I think because we don't remove ones
from the queue if we find a better one and still try to process.

So I'm thinking we do away with the queue idea and just use `bestStates`.
We keep track of new or updated states (starting with initialState the first
round), and only process those, creating a new list of updated states.
We stop processing when we don't update any states.

Calculating the easy sample, we have 6 valves with flow rates, plus the start 'AA'
(the hard input has 16 valves with flow rates plus the start 'AA').  The total
number of options is therefore 1 for the initial state, plus 6^2 (64) possible
combinations for closed valves times 6 for the possible positions, so 6 * 64 or 384

Well, shoot.   This works and gets 1651 for the sample input, but my number 1838
is too low fot he actual test input:

Minute 1: move from AA to EB in 2 minutes
Minute 3: open valve EB releasing 7 over 27 for production 189 total 189
Minute 4: move from EB to JF in 2 minutes
Minute 6: open valve JF releasing 19 over 24 for production 456 total 645
Minute 7: move from JF to IU in 2 minutes
Minute 9: open valve IU releasing 25 over 21 for production 525 total 1170
Minute 10: move from IU to JG in 5 minutes
Minute 15: open valve JG releasing 10 over 15 for production 150 total 1320
Minute 16: move from JG to QH in 3 minutes
Minute 19: open valve QH releasing 20 over 11 for production 220 total 1540
Minute 20: move from QH to SZ in 2 minutes
Minute 22: open valve SZ releasing 24 over 8 for production 192 total 1732
Minute 23: move from SZ to BF in 2 minutes
Minute 25: open valve BF releasing 18 over 5 for production 90 total 1822
Minute 26: move from BF to ZB in 2 minutes
Minute 28: open valve ZB releasing 8 over 2 for production 16 total 1838
*/
