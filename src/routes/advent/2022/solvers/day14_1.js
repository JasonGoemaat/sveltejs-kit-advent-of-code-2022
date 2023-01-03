// @ts-nocheck
export default input => {
  console.clear()
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const moves = []

  let sandDropPosition = { x: 500, y: 0 }

  let range = {
    minX: sandDropPosition.x, // 500 is where sand flows
    maxX: sandDropPosition.x,
    minY: sandDropPosition.y,
    maxY: sandDropPosition.y,
  }

  let walls = []

  lines.forEach(line => {
    let positions = line.split(' -> ').map(p => {
      let parts = p.split(',')
      let x = parseInt(parts[0])
      let y = parseInt(parts[1])
      range.minX = Math.min(range.minX, x)
      range.minY = Math.min(range.minY, y)
      range.maxX = Math.max(range.maxX, x)
      range.maxY = Math.max(range.maxY, y)
      return { x,  y }
    })

    for (let i = 1; i < positions.length; i++) {
      let a = positions[i-1]
      let b = positions[i]
      walls.push({ a: { x: a.x, y: a.y }, b: { x: b.x, y: b.y } })
    }
  })

  console.log('range:', JSON.stringify(range))

  let width = range.maxX - range.minX + 1
  let height = range.maxY - range.minY + 1

  console.log('walls:')
  walls.forEach(wall => console.log(JSON.stringify(wall)))

  walls.forEach(wall => {
    wall.a.x -= range.minX
    wall.a.y -= range.minY
    wall.b.x -= range.minX
    wall.b.y -= range.minY
  })
  sandDropPosition.x -= range.minX
  sandDropPosition.y -= range.minY

  let grid = []
  for (let i = 0; i < height; i++) {
    let row = []
    for (let j = 0; j < width; j++) row.push('.')
    grid.push(row)
  }

  walls.forEach(wall => {
    let delta = { x: Math.sign(wall.b.x - wall.a.x), y: Math.sign(wall.b.y - wall.a.y) }
    let { x, y } = wall.a
    while (true) {
      // console.log(`  Marking ${x},${y}`)
      grid[y][x] = '#'
      if (x === wall.b.x && y === wall.b.y) break
      y += delta.y
      x += delta.x
    }
  })

  const showGrid = () => {
    console.log('--- GRID ---')
    grid.forEach(row => console.log(row.join('')))
  }

  showGrid()

  let placedSand = 0

  const dropSand = () => {
    let {x, y} = sandDropPosition
    while (x >= 0 && y >= 0 && x < width && y < height) {
      if (grid[y][x] !== '.') return false // should not be on top of anything, full of sand?
      if (y >= height - 1 || x >= width || x < 0 || grid[y+1][x] === '.') {
        y++ // fall down
      } else if (x <= 0 || grid[y+1][x-1] === '.') {
        y++ // fall down-left
        x--
      } else if (x >= width-1 || grid[y+1][x+1] === '.') {
        y++ // fall down-right
        x++
      } else {
        // nowhere to fall, place grain of sand
        grid[y][x] = 'O'
        placedSand++
        return true
      }
    }
    return false
  }

  while (dropSand()) {
    //showGrid()
  }

  showGrid()
  return placedSand
}

/* Explanation: Day 14, Part 1

Sand pours into a cave from position 500,0, one grain of sand at a time.
You are given sets of lines (vertical or horizontal) forming walls.

A grain of sand falls down if possible.  If not, it attempts to move down-left
if possible.  If not, it attempts to move down-right.  If it can't move in
any of those three directions, it comes to rest.  Sand stops flowing when the
first grain falls off into the abyss.

Looking at the numbers, we start with y value 0 at the top.   The ranges for x
and the max y can vary, so I think we should look at those and limit
our graph to the valid ranges.  Then when sand falls off the bottom or to the 
sides it is easy to detect.  It is also easy to draw.

*/
