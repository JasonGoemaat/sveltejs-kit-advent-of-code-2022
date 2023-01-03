// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', '').split(' '))

  const visited = { '0,0': true }
  const positions = []
  for (let i = 0; i < 10; i++) positions.push({ x: 0, y: 0 })

  const changes = {
    'R': [1, 0],
    'L': [-1, 0],
    'U': [0, -1],
    'D': [0, 1],
  }

  const follow = (head, tail) => {
    let deltas = [head.x - tail.x, head.y - tail.y]
    let signs = [Math.sign(deltas[0]), Math.sign(deltas[1])]
    let dist = [Math.abs(deltas[0]), Math.abs(deltas[1])]
    if (dist[0] > 1 || dist[1] > 1) {
      tail.x += signs[0]
      tail.y += signs[1]
    }
  }
  
  const move = (dir) => {
    let change = changes[dir]
    positions[0].x += change[0]
    positions[0].y += change[1]
    for (let i = 1; i < positions.length; i++) {
      follow(positions[i - 1], positions[i])
    }
    visited[`${positions[positions.length - 1].x},${positions[positions.length - 1].y}`] = true
  }
  
  lines.forEach(([d, n]) => {
    for (let i = 0; i < n; i++) {
      move(d)
    }
  })

  return Object.keys(visited).length
}

/* Explanation: Day 9 Part 2

Ok, part 1, but we now have 9 tailers, each one tailing the one
before it.  Shouldn't be too hard with what we did.  Just change headPos
and tailPos to be an array of 10 spots.  Move the first manually, then
adjuste 1-9 like we did with tail and head

*/
