// @ts-nocheck
export default input => {
  const heights = input.split('\n').map(x => x.replace('\r', '')).map(x => Array.from(x).map(x => parseInt(x)))
  const width = heights[0].length

  let scores = heights.map(line => line.map(x => 1))

  for (let y = 0; y < heights.length; y++) {
    for (let x = 0; x < width; x++) {
      let height = heights[y][x]

      let left = 0
      for (let i = x - 1; i >= 0; i--) {
        left++
        if (heights[y][i] >= height) break
      }

      let right = 0
      for (let i = x + 1; i < width; i++) {
        right++
        if (heights[y][i] >= height) break
      }

      let up = 0
      for (let i = y - 1; i >= 0; i--) {
        up++
        if (heights[i][x] >= height) break
      }

      let down = 0
      for (let i = y + 1; i < heights.length; i++) {
        down++
        if (heights[i][x] >= height) break
      }

      const score = left * right * up * down
      scores[x][y] = score
      // console.log(`at ${x},${y} values are ${left},${right},${up},${down} and score is ${score}`)
    }
  }

  const scoresByLine = scores.map(line => line.reduce((p, c) => Math.max(p, c), 0))
  return scoresByLine.reduce((p, c) => Math.max(p, c), 0)

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

/* Explanation: Day 8 Part 2

This time you need to find how many trees in the cardinal directions are visible
from each tree, and perform a calculation multiplying the values from each direction.
So for example you will never get a tree on the edge because the viewing distance in
at least one direction will be 0.  Return the calculation from the tree with the
highest calculation

30373
25512
65332
33549
35390

In this example, the top-left '3' can see two trees to the right and two trees
down, but no trees left or up.  This results in a calculation of 2 * 2 * 0 * 0
which is 0.

The 5 in the second row and column can see 1 tree in each direction, so it's
'viewing score' calculation will be 1*1*1*1 = 4.

I *almost know* there is some method for calculating this in one pass in each
direction...   Ah, I was thinking about something else.   We're really calculating
'viewing distance' here.  So if we have 13575380 and look at the 8 to the right,
it has a left viewing distance of 6 and a right viewing-distance of 1.  I was
thinking the '7' would block the smaller trees to the left, but that isn't 
the case because the 8 can see OVER all the trees, even if they can see the smaller
ones past the 7.



*/
