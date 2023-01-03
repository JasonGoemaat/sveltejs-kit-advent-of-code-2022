// @ts-nocheck
import { OutputFileType } from "typescript"

// @ts-nocheck
export default input => {
  // RKPJBPLA
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  let value = 1
  let values = []
  let outputLines = []

  const output = () => {
    if (values.length < 40) return
    let lineValues = values.splice(0, 40)
    outputLines.push(lineValues.map((x, i) => Math.abs(x - i) < 2 ? '#' : '.'))
  }

  lines.forEach(x => {
    values.push(value)
    output()
    const [command, arg] = x.split(' ')
    if (command === 'noop') return
    if (command === 'addx') {
      values.push(value) // two cycles
      value += parseInt(arg)
    }
    output()
  })
  
  return outputLines.map(x => x.join('')).join('\n')
}

/* Explanation: Day 10, Part 1

Much different than the first.  Here we still keep track of the values after each cycle, but
they are the 'X' position of the middle of a sprite 3 pixels wide.  The scan line goes from
left to right, so row 1 has cycles 1-40 (row index 0 cycles index 0-39).  If one of the
sprite pixels is over the pixel being drawn, it is a '#', otherwise a '.'.

*/
