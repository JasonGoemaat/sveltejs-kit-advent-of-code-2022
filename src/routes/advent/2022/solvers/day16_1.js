// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const rx = /Valve ([A-Z][A-Z]) has flow rate=([\d]+); tunnels? leads? to valves? (.*)/
  const distanceMaps = {}
  const initialValves = lines.map(line => {
    window.rx = rx
    window.line = line
    const arr = Array.from(line.match(rx)).slice(1)
    const valve = {
      id: arr[0],
      flowRate: parseInt(arr[1]),
      connected: arr[2].split(', '),
      distance: {},
    }
    
    return valve
  })

  const allValves = initialValves.reduce((p, c) => Object.assign(p, { [c.id]: c }), {})
  initialValues.forEach(valve => {
    const queue = [{ valve, distance: 0 }]
    const visited = { [valve.id]: true}
    while (queue.length > 0) {
      const current = queue.shift()
      if (current.flowRate) {
        valve.distance[current.valve.id] = current.distance + 1
      }
        current.connected.forEach(id => {
          if (!visited[id]) {
            queue.push({ valve: initialValves[id], distance: current.distance + 1 })
          }
        })
      }
    }
  })
  return allValves
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
