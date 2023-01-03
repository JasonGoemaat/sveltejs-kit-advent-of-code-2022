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
  
  min[end.y][end.x] = 0

  min.forEach(x => console.log(x.join(',')))
  
  var queue = []
  let done = false
  queue.push(end)

  const attempt = (x, y, height, v) => {
    if (v >= min[y][x]) return

    // part 1, moving we can go down any number but only up 1
    //     if (rows[y][x] - height > 1) return

    // part 2, backtracking we can only go down 1, but can go up any number
    if (height - rows[y][x] > 1) return
    min[y][x] = v
    queue.push({ x, y })
    if (rows[y][x] === 0) {
      done = true
      start.x = x
      start.y = y
    }
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

  return min[start.y][start.x]
}

/* Explanation: Day 12, Part 2

Playing the reverse card, you are looking for a starting position on any letter
'a' (or 'S') that will let you get to the end the fastest.

Here we go from 'E' and only to the same or one lower elevation

*/
