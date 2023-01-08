// @ts-nocheck
export default input => {
  console.clear()

  const winds = input; // super simple input this time, just a string

  // let PIECE_COUNT = 2022 // part 1
  let PIECE_COUNT = 1000000000000 // part 2
  // NOTE: first attempt without pre-populating the tower was too high: 1586206896526
  // now I get:                                                         1586206896526

  let windIndex = 0;

  let EMPTY = 0b100000001
  
  // pieces are 'upside-down' - since lower index is lower chamber index,
  // only affects pieces[2]
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
      0b000111000, // upside-down
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

  const chamber = [
    0b111111111,
  ]

  // there will always be 7 empty lines at the top when starting and after a drop,
  // three below the drop piece and 4 for the drop piece.  So `chamber.length - 8`
  // is the tower height
  const fillChamber = () => {
    let i = chamber.length - 1
    for (; i > 0 && chamber[i] === EMPTY; i--); // i will be index of last non-empty row
    while (chamber.length < i + 8) chamber.push(EMPTY)
  }

  const getTowerHeight = () => chamber.length - 8

  fillChamber() // start with 7 empty rows at top

  // helper function to give a string line for a value.  If a second
  // value is passed, it is treated as a dropping piece, using '@' instead of '#',
  // and 'X' for conflicts (dropped piece and wall or frozen piece)
  const output = (value, value2) => {
    value2 = value2 || 0
    var parts = []
    while (value > 0) {
      let test = 0b100000000
      while (test > 0) {
        let ch = value & test ? '#' : '.' // '#' if set, '.' if not
        if (ch === '#' && (value === 0b100000000 || value === 0b000000001)) ch = '|' // wall
        if (value2 & test) ch = (ch === '.') ? '@' : 'X' // dropping piece or conflict 'X'
        parts.push(ch)
        test = test >> 1
      }
      return parts.join('')
    }
  }

  // show an array of lines (piece or chamber) in the console
  const show = lines => {
    for (let i = lines.length - 1; i >= 0; i--) console.log(output(lines[i]))
  }

  // helper functions
  let slideLeft = value => value << 1
  let slideRight = value => value >> 1

  // test for a conflict with a piece (which could be shifted left or
  // right) placed on a line in the chamber
  const conflictAt = (index, piece) => {
    return piece.reduce((p, c, i) => {
      return p || ((c & chamber[index + i]) > 0)
    }, false)
  }

  // drop a piece per puzzle spec, 3 empty lines above the top
  // tower line.  Initial piece is already in correct x position
  // by definition above
  const dropPiece = (piece) => {
    let dropIndex = chamber.length - 4

    while (dropIndex >= 0) {
      let wind = winds[windIndex] // get current wind
      windIndex = (windIndex + 1) % winds.length // move to next wind
      let slid = piece.map(wind === '<' ? slideLeft : slideRight) // calculate piece moved by wind
      if (!conflictAt(dropIndex, slid)) piece = slid // allow wind move if it didn't hit something
      if (conflictAt(dropIndex-1, piece)) break // if dropping would hit something, exit
      dropIndex--
    }

    piece.forEach((value, i) => {
      chamber[dropIndex + i] |= value
    })
    fillChamber()
  }

  // key will be `'${pieceIndex},${windIndex}'`.   When we find
  // a match, we've found a cycle.  Value will be `{ pieceCount, height }`.
  // By taking '(current pieceCount) - (saved pieceCount)' we get how many
  // pieces in the cycle, and by taking '(current height) - (saved height)'
  // we get how much height is added by the cycle.  Then we can add a multiple
  // of each to pieceCount and height to skip a whole lot.  We do this by
  // setting 'addedHeight' and increasing pieceCount
  const heights = {}
  let addedHeight = 0

  for (let pieceCount = 0; pieceCount < PIECE_COUNT; pieceCount++) {
    let pieceIndex = pieceCount % pieces.length
    let piece = pieces[pieceIndex]
    dropPiece(piece)
    if ((addedHeight === 0) && (pieceCount > (winds.length * 2))) {
      let key = `${pieceIndex},${windIndex}`
      let info = { pieceCount, height: getTowerHeight() }
      if (heights[key]) {
        // we found a cycle, hurray!
        let cyclePieces = info.pieceCount - heights[key].pieceCount
        let cycleHeight = info.height - heights[key].height
        console.log(`Found cycle ${key} of ${cyclePieces} pieces giving height ${cycleHeight}`)
        console.log(`  Previous: ${JSON.stringify(heights[key])}`)
        console.log(`  Current : ${JSON.stringify(info)}`)

        let cycles = Math.trunc((PIECE_COUNT - pieceCount) / cyclePieces)
        addedHeight = cycleHeight * cycles
        pieceCount += cyclePieces * cycles
      } else {
        heights[key] = info
      }
    }
  }

  return getTowerHeight() + addedHeight
}

/* Explanation: Day 17 Part 2

Same as Part 1, but a *ridiculous* number of pieces.   The pattern should
start repeating after a certain number of moves.  The number of moves should
be less than (# of pieces) * (# of winds)

*/
