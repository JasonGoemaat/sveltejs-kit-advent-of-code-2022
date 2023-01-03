// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const width = lines[0].length
  const start = { x: 0, y: 0 }
  const end = { x: 0, y: 0}
  const min = []
  const rows = lines.map((line, rowIndex) => {
    var chars = Array.from(line)
    const Spos = chars.findIndex(x => x === 'S')
    if (Spos >= 0) {
      start.x = Spos;
      start.y = rowIndex
      console.log('start: ', JSON.stringify(start))
      chars[Spos] = 'a'
    }
    const Epos = chars.findIndex(x => x === 'E')
    if (Epos >= 0) {
      end.x = Epos;
      end.y = rowIndex
      console.log('end: ', JSON.stringify(end))
      chars[Epos] = 'z'
    }
    min.push(chars.map(() => Number.MAX_SAFE_INTEGER))
    return chars.map(x => x.charCodeAt(0) - 'a'.charCodeAt(0))
  })
  min[start.y][start.x] = 0

  min.forEach(x => console.log(x.join(',')))
  
  var queue = []
  let done = false
  queue.push(start)

  const attempt = (x, y, height, v) => {
    if (v >= min[y][x]) return
    if (rows[y][x] - height > 1) return
    min[y][x] = v
    queue.push({ x, y })
    done = done || (x === end.x && y === end.y)
  }

  const travel = pos => {
    const {x, y} = pos
    let v = min[y][x]
    let height = rows[y][x]
    if (x > 0) attempt (x-1, y, height, v+1)
    if (x+1 < width) attempt (x+1, y, height, v+1)
    if (y > 0) attempt (x, y-1, height, v+1)
    if (y+1 < lines.length) attempt (x, y+1, height, v+1)
  }

  while (queue.length > 0) {
    travel(queue.shift())
    if (done) break
  }

  return min[end.y][end.x]
}

/* Explanation: Day 12, Part 1

You are given a heightmap:

Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi

S is the start and treated as 'a'.  E is the end and treated as 'z'.

You can drop as many as you wish, but only go up one level (i.e. a->b or m->n)

Find the minimum number of moves to reach the destination

*/
