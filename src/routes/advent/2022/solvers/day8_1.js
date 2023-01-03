// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  
  // process lines horizontally to create our initial array, which
  // will have '1' if the tree is visible from the left or right and
  // a space ' ' if not.
  let horizontal = lines.map(line => {
    let maxHeight = ' '
    let visible = []
    for (let i = 0; i < line.length; i++) {
      let ch = line.charAt(i)
      if (ch > maxHeight) {
        maxHeight = ch;
        visible.push(1)
      } else {
        visible.push(0)
      }
    }
    maxHeight = ' '
    for (let i = line.length - 1; i >= 0; i--) {
      let ch = line.charAt(i)
      if (ch > maxHeight) {
        maxHeight = ch;
        visible[i] |= 1
      }
    }
    return visible;
  })

  console.log(JSON.stringify(horizontal))

  for (let i = 0; i < lines[0].length; i++) {
    let maxHeight = ' '
    for (let j = 0; j < lines.length; j++) {
      let ch = lines[j].charAt(i)
      if (ch > maxHeight) {
        horizontal[j][i] |= 1
        maxHeight = ch;
      }
    }
    maxHeight = ' '
    for (let j = lines.length - 1; j >= 0; j--) {
      let ch = lines[j].charAt(i)
      if (ch > maxHeight) {
        horizontal[j][i] |= 1
        maxHeight = ch;
      }
    }
  }

  // testing: show our results
  //return horizontal.map(x => x.join(''))

  return horizontal.reduce((p, c) => p + c.reduce((a, b) => a + b, 0), 0)
}

/* Explanation: Day 8 Part 1

You are given a grid of tree heights, and need to determine how many
trees are 'visible from the outside' (i.e. not blocked in all directions
by some tree that is as tall or taller).  The example is this:

30373
25512
65332
33549
35390

All trees on the outside are visible by definition, since no trees are blocking them
in some direction.

*/
