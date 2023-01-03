// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', '').split(' '))

  const visited = { '0,0': true }
  const headPos = { x: 0, y: 0 }
  const tailPos = { x: 0, y: 0 }

  const changes = {
    'R': [1, 0],
    'L': [-1, 0],
    'U': [0, -1],
    'D': [0, 1],
  }
  
  const move = (dir) => {
    let change = changes[dir]
    headPos.x += change[0]
    headPos.y += change[1]
    let deltas = [headPos.x - tailPos.x, headPos.y - tailPos.y]
    let signs = [Math.sign(deltas[0]), Math.sign(deltas[1])]
    let dist = [Math.abs(deltas[0]), Math.abs(deltas[1])]
    if (dist[0] > 1 || dist[1] > 1) {
      tailPos.x += signs[0]
      tailPos.y += signs[1]
      visited[`${tailPos.x},${tailPos.y}`] = true
    }
  }
  
  lines.forEach(([d, n]) => {
    for (let i = 0; i < n; i++) {
      move(d)
    }
  })

  return Object.keys(visited).length
}

/* Explanation: Day 9 Part 1

Here we have a short rope connecting a 'H'ead and 'T'ail.  They both initially
start in the same position.  You are given a series of moves and must
count how many unique locations the 'T' gets to.  If the head ends up next
to (horizontally, vertically, or diagonally) or on top of the tail, the tail
doesn't move.  Otherwise the tail moves diagonally closer to the head.

*/
