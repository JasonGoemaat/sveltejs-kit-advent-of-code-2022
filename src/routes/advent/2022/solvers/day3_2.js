// @ts-nocheck
// Rock-paper-scissors game
export default input => {
    
  const scores = {}
  
  for (let i = 0; i < 26; i++) {
    scores[String.fromCharCode('a'.charCodeAt(0) + i)] = i + 1
    scores[String.fromCharCode('A'.charCodeAt(0) + i)] = i + 27
  }

  for (let i = 0; i < 26; i++) {
    scores[String.fromCharCode('a'.charCodeAt(0) + i)] = i + 1
    scores[String.fromCharCode('A'.charCodeAt(0) + i)] = i + 27
  }
  
  const rucksacks = input.split('\n')

  const keyed = rucksacks.map(r => Array.from(r).reduce((p, c) => Object.assign(p, { [c]: true }), {}))

  const grouped = keyed.reduce((p, c, i) => {
    if ((i % 3) === 0) p.push([])
    p[p.length - 1].push(c)
    return p
  }, [])

  // returns an array containing the common characters for each group
  const common = grouped.map(group => {
    var keys = {}
    group.forEach(x => Object.keys(x).forEach(key => keys[key] = (keys[key] || 0) + 1))
    return Object.keys(keys).find(key => keys[key] === 3)
  })

  const scoreDupe = s => scores[s]

  return common.reduce((p, c) => p + scoreDupe(c), 0)
}

/* Explanation:

Rucksacks

Here we divide the input into groups of 3 and return the score for the item
that appears in all three.

*/
