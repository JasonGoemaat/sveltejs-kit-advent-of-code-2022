// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))

  const solveLine = line => {
    for (let i = 13; i < line.length; i++) {
      const keyed = {}
      for (let j = 0; j < 14; j++) {
        keyed[line[i - j]] = (keyed[line[i - j]] || 0) + 1
      }
      console.log('line:', line)
      console.log('  keyed:', keyed)
      if (Object.keys(keyed).reduce((p, c) => Math.max(p, keyed[c]), 0) === 1) return i + 1
    }
  }

  return lines.map(solveLine)
}

/* Explanation: Day 6

Part 2 is like part 1, but 14 characters instead of 4

*/
