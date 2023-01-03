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

  // create 'infinite' line at bottom, enough for a pyramid to fill up
  // so the sand drop position has sand
  range.maxY += 2
  range.minX = Math.min(range.minX, sandDropPosition.x - (range.maxY - range.minY) - 1)
  range.maxX = Math.max(range.maxX, sandDropPosition.x + (range.maxY - range.minY) + 1)
  walls.push({ a: { x: range.minX, y: range.maxY }, b: { x: range.maxX, y: range.maxY }})

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
    if (width > 200 || height > 200) {
      console.log('too big!')
      return
    }
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

/* Explanation: Day 14, Part 2

See Part 1 for general information.  The difference for part 2 is that
there is a 'infinite floor' two positions below the last line in the input.

My first thought is that the widest sand we can get is a pyramid.
From 500,0 that means we could theoretically go down to 0,500 or 0,1000.
Maybe we can just add that line manually and see what happens?  The output
for the real example would be pretty nasty though, so we should probably
get rid of showGrid() for large values...

*/
