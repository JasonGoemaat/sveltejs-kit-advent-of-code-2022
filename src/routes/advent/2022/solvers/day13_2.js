// @ts-nocheck
export default input => {
  console.clear()
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const added = lines.filter(x => x.length > 0).concat(['[[2]]', '[[6]]'])
  const values = added.map(x => JSON.parse(x))

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

  let sorted = [...values]
  sorted.sort(compare)
  // sorted.forEach(x => console.log(JSON.stringify(x)))
  let p1 = sorted.findIndex(x => JSON.stringify(x) === '[[2]]') + 1
  let p2 = sorted.findIndex(x => JSON.stringify(x) === '[[6]]') + 1
  //console.log({ p1, p2})
  return p1 * p2
}

/* Explanation: Day 13, Part 2

Now we add two divider packets, '[[2]]' and '[[6]]'.  We can use our compareer to sort
the entire list.  Then find the 1-based index of the divider packets (using JSON?)
and multiply those indices to get the result.

*/
