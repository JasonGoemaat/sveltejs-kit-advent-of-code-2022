// @ts-nocheck
export default input => {
  console.clear()
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const comparisons = lines.reduce((p, c) => {
    if (c.length === 0) return [...p, []]
    p[p.length - 1].push(JSON.parse(c))
    return p
  }, [[]])

  const compare = (a, b) => {
    const log = result => {
      // console.log(`${result} from ${JSON.stringify(a)} vs ${JSON.stringify(b)}`)
      return result
    }
    if (typeof(a) === 'number') {
      // simple numbers comparison
      if (typeof(b) === 'number') return log(a - b)
      a = [a]
    } else if (typeof(b) === 'number') b = [b]

    // Both are arrays, compare each element.
    // 1. If left runs out of items, we're still in the right order
    // 2. if left has items and right does not, we are out of order
    
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (i < a.length && i >= b.length) return log(1) // out of order, right list ran out
      if (i >= a.length && i < b.length) return log(-1) // good order, left list ran out
      let result = compare(a[i], b[i])
      if (result !== 0) return log(result)
    }
    return log(0) // same length and same values
  }

  const calculate = arr => {
    let a = arr[0]
    let b = arr[1]
    return compare(a, b) < 0
  }
  const results = comparisons.map(x => calculate(x))
  console.log(JSON.stringify(results))
  // console.log(comparisons.map(x => `${JSON.stringify(x[0])}\n${JSON.stringify(x[1])}`).join('\n\n'))
  return results.reduce((p, c, i) => p + (c ? i + 1 : 0), 0)
}

/* Explanation: Day X

*/
