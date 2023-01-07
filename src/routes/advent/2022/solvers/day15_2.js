// @ts-nocheck
export default input => {
  const ROW = 2000000

  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const sensors = lines.map(line => {
    const matches = Array.from(line.match(/Sensor at x=([-\d]+), y=([-\d]+): closest beacon is at x=([-\d]+), y=([-\d]+)/)).slice(1).map(x => parseInt(x))
    const x = matches[0]
    const y = matches[1]
    const bx = matches[2]
    const by = matches[3]
    const extent = Math.abs(bx - x) + Math.abs(by - y)
    const la = findLine(x, y - extent)
    return { x, y, bx, by }
  })

  const getSensorOutsideLineSegments = sensor => {
    let dist = Math.abs(sensor.bx - sensor.x) + Math.abs(sensor.by - sensor.y)
    var corners = [
      [sensor.x, sensor.y - dist - 1],
      [sensor.x + dist + 1, sensor.y],
      [sensor.x, sensor.y + dist + 1],
      [sensor.x - dist - 1, sensor.y],
    ]
    return [
      { x1: corners[0][0], y1: corners[0][1], x2: corners[1][0], y2: corners[1][1] },
      { x1: corners[1][0], y1: corners[1][1], x2: corners[2][0], y2: corners[2][1] },
      { x1: corners[2][0], y1: corners[2][1], x2: corners[3][0], y2: corners[3][1] },
      { x1: corners[3][0], y1: corners[3][1], x2: corners[0][0], y2: corners[0][1] },
    ]
  }

  const outsideLineSegments = sensors.reduce((p, c) => [...p, ...getSensorOutsideLineSegments(c)], [])

  const getSensorRangesAtRow = (sensor, row) => {
    const distY = Math.abs(row - sensor.y)
    const sensorDistance = Math.abs(sensor.y - sensor.by) + Math.abs(sensor.x - sensor.bx)
    if (sensorDistance < distY) return null
    const extra = sensorDistance - distY
    let minX = sensor.x - extra
    let maxX = sensor.x + extra

    // remove beacon, which would always be at an end
    if (sensor.bx === minX) minX++
    if (sensor.bx === maxX) maxX++
    return { minX, maxX }
  }

  // create ranges for each sensor and sort by minX
  let ranges = sensors.map(x => getSensorRangesAtRow(x, ROW)).filter(x => x !== null)
  ranges.sort((a, b) => a.minX - b.minX ? a.minX - b.minX : a.maxX - b.maxX)

  // join ranges that overlap
  ranges = ranges.reduce((p, c) => {
    if (p === null) return [c]
    if (p[p.length - 1].maxX >= c.minX) {
      p[p.length -1].maxX = Math.max(p[p.length - 1].maxX, c.maxX)
    } else {
      p.push(c)
    }
    return p
  }, null)

  // split ranges that have a beacon to exclude it
  sensors.filter(sensor => sensor.by === ROW).forEach(sensor => {
    let rIndex = ranges.findIndex(range => range.minX <= sensor.bx && range.maxX >= sensor.bx)
    if (rIndex < 0) return
    let original = ranges[rIndex]
    // first, check for ends and just adjust range
    if (original.minX === sensor.bx) {
      original.minX++
    } else if (original.maxX === sensor.bx) {
      original.maxX--
    } else {
      let left = { minX: original.minX, maxX: sensor.bx - 1 }
      let right = { minX: sensor.bx + 1, maxX: original.maxX }
      ranges = ranges.slice(0, rIndex).concat([left, right].concat(ranges.slice(rIndex + 1)))
    }
  })
  
  // return ranges // debug
  return ranges.reduce((p, c) => p + (c.maxX - c.minX + 1), 0)
}


/* Explanation: Day 15, Part 2

Here we can't look at a single row and use ranges:

> the distress beacon must have x and y coordinates each no lower than 0 
> and no larger than 4000000

I think we need to find a single open space (should only be one?)
in that range.  Then multiple the x and y of the found location and
return the value.

The range contains over 4 million rows and columns, so ranges would be
very slow.

Since there should only be one spot, maybe we can look at the outsides
of covered areas.  The single open spot should be where
lines intersect.  So maybe we can create lines for the areas outside
each of the sensor areas.  The open spots should be at the intersection
of two of these lines.   We could then check each of these to see if they
are inside any other sensor areas and remove them if they are.

*/
