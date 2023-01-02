// The point is to return the elf with the MOST
export default input => {
  return input.split('\n').reduce((p, c) => {
    if (c.length === 0) return [...p, 0]
    p[p.length - 1] += parseInt(c)
    return p
  }, [0]).sort((a, b) => b - a).slice(0, 3).reduce((p, c) => p + c, 0)
}

/* Explanation:

The same basic code as part 1 with a different ending.  Once I have the list
of totals for each elf, I sort descending (b - a), take the first 3 (with the
highest totals), and reduce again to produce a sum

*/
