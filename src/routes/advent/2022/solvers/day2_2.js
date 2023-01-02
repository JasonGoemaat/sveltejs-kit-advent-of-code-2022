// @ts-nocheck
// Rock-paper-scissors game
export default input => {
  const mapper = {
    'A X': 'A Z',
    'A Y': 'A X',
    'A Z': 'A Y',
    'B X': 'B X',
    'B Y': 'B Y',
    'B Z': 'B Z',
    'C X': 'C Y',
    'C Y': 'C Z',
    'C Z': 'C X',
  }
  
  const simple = input.split('\n').map(x => mapper[x])

  console.log('mapped:', simple)

  const scoring = {
    'A X': [1+3, 1+3], // each get 1 for Rock and 3 for tie
    'A Y': [1+0, 2+6], // opponent gets 1 for rock, you get 8, 2 for paper and 6 for win
    'A Z': [1+6, 3+0], // opponent gets 1 for rock and 6 for win, you get 3 for scissors
    'B X': [2+6, 1+0],
    'B Y': [2+3, 2+3],
    'B Z': [2+0, 3+6],
    'C X': [3+0, 1+6],
    'C Y': [3+6, 2+0],
    'C Z': [3+3, 3+3],
  }

  var scores = simple.reduce((p, c) => {
    const outcome = scoring[c]
    if (!outcome) {
      console.error("NOT FOUND OUTCOME FOR:", c)
      throw new Error(`COULD NOT FIND OUTCOME FOR '${c}'`)
    }
    return [p[0] + outcome[0], p[1] + outcome[1]]
  }, [0, 0])
  return scores[1]
}

/* Explanation:

Ok, the input is an 'encrypted strategy guide'. The first column:

* A - Rock
* B - Paper
* C - Scissors

The second column is 'X', 'Y', or 'Z', WHICH HAVE DIFFERENT MEANINGS
FROM PART 1:

* X - you need to lose
* Y - you need to draw
* Z - you need to win

So we still need to figure our total score, but now we need to pick
the appropriate thing.  The way I designed the code for day 1, I shoul
be able to just replace the X, Y, or Z with what I used in part one
and use the same logic to calculate the score.

AX - need to lose, A is rock, so pick Z for scissors
AY - need to draw, A is rock, so pick X for rock
AZ - need to win, A is rock, so pick Y for paper
BX - need to lose, so pick X for rock
BY - need to draw, so leave Y for draw
BZ - need to win, so pick Z for scissors
CX - need to lose, so pick Y for scissors
CY - need to raw, so pick Z for scissors
CZ - need to win, so pick X for rock

const mapper = {
  'A X': 'A Z',
  'A Y': 'A X',
  'A Z': 'A Y',
  'B X': 'B X',
  'B Y': 'B Y',
  'B Z': 'B Z',
  'C X': 'C Y',
  'C Y': 'C Z',
  'C Z': 'C X',
}

*/
