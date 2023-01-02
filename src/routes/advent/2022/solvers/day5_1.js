// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const blankPos = lines.findIndex(x => x.length === 0)
  const moves = lines.splice(blankPos + 1)
  const stackCount = (lines[0].length + 1) / 4
  const stackLines = lines.slice(0, blankPos - 1)
  let stacks = []
  for (let i = 0; i < stackCount; i++) stacks.push([])
  stackLines.forEach(line => {
    for (let i = 0; i < stackCount; i++) {
      const ch = line.charAt(i * 4 + 1)
      if (ch !== ' ') stacks[i].unshift(ch)
    }
  })
  return stacks
}

/* Explanation: Day 5

*/
