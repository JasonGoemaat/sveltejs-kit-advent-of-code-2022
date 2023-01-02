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

  moverx = /move (\d+) from (\d+) to (\d+)/
  moves.forEach(moveLine => {
    var move = Array.from(moveLine.match(moverx)).slice(1).map(x => parseInt(x))
    var sa = move[1] - 1
    var sb = move[2] - 1
    stacks[sb] = stacks[sb].concat(stacks[sa].splice(stacks[sa].length - move[0]))
  })

  return stacks.map(x => x[x.length - 1]).join('')
}

/* Explanation: Day 5

*/
