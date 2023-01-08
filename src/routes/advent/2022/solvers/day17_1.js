// @ts-nocheck
export default input => {
  console.clear()

  const winds = input;

  let windIndex = 0;

  let EMPTY = 0b100000001
  
  let pieces = [
    [
      0b000111100,
    ],
    [
      0b000010000,
      0b000111000,
      0b000010000,
    ],
    [
      0b000111000,
      0b000001000,
      0b000001000,
    ],
    [
      0b000100000,
      0b000100000,
      0b000100000,
      0b000100000,
    ],
    [
      0b000110000,
      0b000110000,
    ],
  ]

  // there will always be 7 empty lines, three blow the drop pice and 4 for the drop piece
  const chamber = [
    0b111111111,
  ]

  const fillChamber = () => {
    let i = chamber.length - 1
    for (; i > 0 && chamber[i] === EMPTY; i--);
    // console.log('fillChamber() i is ', i)
    while (chamber.length < i + 8) chamber.push(EMPTY)
  }

  fillChamber()

  const output = value => {
    var parts = []
    while (value > 0) {
      let test = 0b100000000
      while (test > 0) {
        parts.push((test & value) ? ((value === 0b100000000 || value === 0b000000001) ? '|' : '@') : '.')
        test = test >> 1
      }
      return parts.join('')
    }
  }

  const show = lines => {
    for (let i = lines.length - 1; i >= 0; i--) console.log(output(lines[i]))
  }

  const showAt = (index, piece) => {
    const n = [...chamber]
    piece.forEach((value, i) => {
      n[index + i] |= value
    })
    show(n)
  }

  // console.log('Chamber:')
  // show(chamber)

  // for (let i = 0; i < pieces.length; i++) {
  //   console.log('')
  //   console.log('Piece', i)
  //   show(pieces[i])
  // }

  const PIECE_COUNT = 2022 // part 1
  //const PIECE_COUNT = 10000000000 // part 2

  const conflictAt = (index, piece) => {
    return piece.reduce((p, c, i) => {
      return p || ((c & chamber[index + i]) > 0)
    }, false)
  }

  let slideLeft = value => value << 1
  let slideRight = value => value >> 1
  for (let pieceCount = 0; pieceCount < PIECE_COUNT; pieceCount++) {
    let piece = pieces[pieceCount % pieces.length]
    let dropIndex = chamber.length - 4

    // console.log('================================================================================')
    // console.log('')
    // console.log(`Rock ${pieceCount + 1} begins falling`)
    // showAt(dropIndex, piece)

    while (dropIndex >= 0) {
      let wind = winds[windIndex]
      windIndex = (windIndex + 1) % winds.length
      let slid = piece.map(wind === '<' ? slideLeft : slideRight)
      if (!conflictAt(dropIndex, slid)) {
        piece = slid
        // console.log('')
        // console.log(`Wind ${wind} moved:`)
        // showAt(dropIndex, piece)
      } else {
        // console.log('')
        // console.log(`Wind ${wind} did nothing:`)
        // showAt(dropIndex, piece)
      }

      if (conflictAt(dropIndex-1, piece)) {
        // console.log('')
        // console.log(`Dropping impossible:`)
        // showAt(dropIndex, piece)
        break
      } else {
        // console.log('')
        // console.log(`Rock falls 1 unit:`)
        // showAt(dropIndex - 1, piece)
        dropIndex--
      }
    }
    
    piece.forEach((value, i) => {
      chamber[dropIndex + i] |= value
    })
    fillChamber()
  }

  return chamber.length - 8
}

/* Explanation: Day 17 Part 1

Tetris!  We have an infinitely tall tetris space that is 7 blocks wide.
Pieces begin falling in this repeating order:

####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##

We also have a 

> The tall, vertical chamber is exactly seven units wide.
> Each rock appears so that its left edge is two units away 
> from the left wall and its bottom edge is three units
> above the highest rock in the room (or the floor, if
> there isn't one).

After it appears, each turn this happens:

1. block is pushed in direction by the wind if possible
2. the block drops if possible, if not then solidify position and exit

Stop once we've frozen 2022 blocks in position


This seems perfect for bitwise comparisons.  With a max of 4 lines and 9
bits (7 spaces and 2 walls), we can signify an entire 4 lines in 36 bits.

  // pieces are bottom first, 9 bits per row
const pieces = [
  0b111100,
  (0b01000 << 18) | (0b11100 << 9) | 0b01000,
  (0b00100 << 18) | (0b00100 << 9) | 0b11100,
  (0b100 << 27) | (0b100 << 18) | (0b100 << 9) | 0b100,
  (0b1100) << 9 | 0b1100
]

> The tall, vertical chamber is exactly seven units wide.  Each rock appears
> so that its left edge is two units away from the left wall and its bottom
> edge is three units above the highest rock in the room (or the floor, if
> there isn't one).

The chamber will always have 7 blank rows at the end.  Enough so that
we can have the three spaces between the last dropped block and a full
block of height 4. We keep track of the index with the block with the
last row.  We start our block


chamberTop = 0;

const chamber = [
  0b111111111,
  0b100000001,
  0b100000001,
  0b100000001,
  0b100000001,
  0b100000001,
  0b100000001,
  0b100000001,
]



test:


let LINE_AMOUNT = 1 << 9
let EMPTY = 0b100000001
let SIDES = EMPTY | (EMPTY << 9) | (EMPTY << 18) | (EMPTY << 27)

let pieces = [
  0b111100,
  [0b010000, 0b111000, 0b010000].reduce((p, c) => p * LINE_AMOUNT + c),
  [0b001000, 0b001000, 0b111000].reduce((p, c) => p * LINE_AMOUNT + c),
  [0b100000, 0b100000, 0b100000, 0b100000].reduce((p, c) => p * LINE_AMOUNT + c),
  [0b110000, 0b110000].reduce((p, c) => p * LINE_AMOUNT + c),
]

let output = value => {
  value = value | (0b100000001 + (0b100000001 * (LINE_AMOUNT * 1)) + (0b100000001 * (LINE_AMOUNT * 2)) + (0b100000001 * (LINE_AMOUNT * 3)))
  while (value > 0) {
    let test = 0b100000000
    var parts = []
    while (test > 0) {
      parts.push((test & value) ? ((test === 0b100000000 || test === 0b000000001) ? '|' : '@') : '.')
      test = Math.trunc(test / 2)
    }
    console.log(parts.join(''))
    value = value >> 9
  }
}

console.log('EMPTY:')
output(EMPTY)
console.log('SIDES:')
output(SIDES)

pieces.forEach((p, i) => {
  console.log(i)
  output(p)
})


*/
