// @ts-nocheck
// Rock-paper-scissors game
export default input => {
  
  const ranges = input.split('\n').map(x => x.split(',').map(y => y.split('-').map(z => parseInt(z))))

  const overlaps = (a, b) => (a[0] >= b[0] && a[1] <= b[1])
  
  return ranges.map(x => overlaps(x[0], x[1]) || overlaps(x[1], x[0]) ? 1 : 0).reduce((p, c) => p + c, 0)
}

/* Explanation: Day 4 - Cleaning

Input is two sections separated by commas.  Each section is two numbers
separated by hyphens defining a range.  Output for part 1 is a count
of how many lines have one range fully contained in another.

For example a line might be `1-3,5-7`.   This defines the ranges 1 to 3
and 5 to 7.  One is not contained in the other so this would not be included
in the count.

Another line might be `1-3,3-3`  The range 3-3 is fully included in the
range 1-3, so this would be counted.


*/
