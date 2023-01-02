// @ts-nocheck
// Rock-paper-scissors game
export default input => {
  const simple = input.split('\n')
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
  return scores[1] // only care about our score
}

/* Explanation:

Ok, the input is an 'encrypted strategy guide'. The first column:

* A - Rock
* B - Paper
* C - Scissors

The second column is 'X', 'Y', or 'Z', BUT YOU DON'T KNOW which they
are.  OR DO YOU?!?!?   It makes it sound like you have to figure out
what X, Y, and Z are so that:

1) You win
2) You don't win every time (that would be suspicious)

But MAYBE #2 isn't a part of it...  I don't know.  I'm going to start
assuming X is always ROCK, Y is always PAPER, and Z is always SCISSORS

Pointing works like this:

1. You get points based on what you choose, Rock = 1, Paper = 2 , Scissors = 3
  * This is kinda dumb, but that makes it slightly more likely that people play scissors

2. Points depending on result of round:
  * Lose: 0
  * Tie: 3
  * Win: 6
  

*/
