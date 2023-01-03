// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  let value = 1
  let values = []
  lines.forEach(x => {
    values.push(value)
    const [command, arg] = x.split(' ')
    if (command === 'noop') return
    if (command === 'addx') {
      values.push(value) // two cycles
      value += parseInt(arg)
    }
  })
  
  // measure strength on 20th cycle (index 19) and each 40 cycles thereafter (indexes 59, 99)
  let totalStrength = 0
  for (let i = 20; i <= values.length; i += 40) {
    const strength = values[i - 1] * i
    console.log(`Cycle ${i} has value ${values[i - 1]} and strength ${strength}`)
    totalStrength += strength
  }

  // console.log('values:', values)

  return totalStrength
}

/* Explanation: Day 10, Part 1


Input is two simple instructions, noop and addx.  There is one variable, 'x'
which starts as 1.

* noop - takes one cycle, does not change x
* addx <value> - takes two cycles, AFTER two cycles it increases by <value> (which can be negative)

The very simple example is 'noop', 'addx 3', and 'addx -5'.  So during and at the end of
each cycle, the values will be:

1: 1 - noop
2: 1 - addx 3
3: 1 - "", but increases by 3 AFTER
4: 4 - addx -5
5: 4 - "", but decreases by 5 AFTER
6: -1 - (end of input)

*/
