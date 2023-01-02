// @ts-nocheck
// Rock-paper-scissors game
export default input => {
  
  const scores = {}
  
  for (let i = 0; i < 26; i++) {
    scores[String.fromCharCode('a'.charCodeAt(0) + i)] = i + 1
    scores[String.fromCharCode('A'.charCodeAt(0) + i)] = i + 27
  }
  
  const rucksacks = input.split('\n')
  
  const findDupe = s => {
    const a = Array.from(s)
    const b = a.splice(a.length / 2)
    const contains = a.reduce((p, c) => Object.assign(p, { [c]: true }), {})
    for (let i = 0; i < b.length; i++) if (contains[b[i]]) return b[i];
  }
  
  const scoreDupe = s => scores[s]

  return rucksacks.map(findDupe).map(scoreDupe).reduce((p, c) => p + c)
}

/* Explanation:

Rucksacks

1. Each line of input is a 'rucksack' with items(characters) in two parts (first 1/2 of string and second 1/2 of string)
2. Exactly 1 item (character) in each rucksack will appear in both parts
3. Find the item (character) that appears in both parts and assign a value, return the total:
  * a-z are 1-26, A-Z are 27-52

*/
