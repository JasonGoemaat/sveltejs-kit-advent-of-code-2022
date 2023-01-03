// @ts-nocheck
export default input => {
  const ROW = 2000000

  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const sensors = lines.map(line => {
    const matches = Array.from(line.match(/Sensor at x=([-\d]+), y=([-\d]+): closest beacon is at x=([-\d]+), y=([-\d]+)/)).slice(1).map(x => parseInt(x))
    return { x: matches[0], y: matches[1], bx: matches[2], by: matches[3] }
  })

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


/* Explanation: Day 15, Part 1

We are given sensor locations and the closest beacon to that sensor.
Each sensor finds the closest beacon using taxi distance (or manhattan
distance) which is the sum of the absolute value deltas for x and y.
This forms a diamond pattern.  For instance we can go up 10, or
up 9 and left or right 1, or up 8 and left or right 2, etc.

The goal is given a list of sensors and the closest beacon to each to
eliminate areas on a certain row where there cannot be a beacon and
return the total number of squares covered by sensors that have found
another beacon.

Coverages can overlap, so I think the best way would be to calculate a
range for each beacon and combine those ranges.

This is different than previous days in that a hidden input is used for
the sample and a different hidden input is used for the actual puzzle
input.   The sample is smaller, so we use row = 10, while the actual input
uses row = 2000000

*/
