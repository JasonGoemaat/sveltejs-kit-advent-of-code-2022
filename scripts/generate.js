import { writeFileSync } from 'fs'
import { resolve, join } from 'path'

let dataPath = resolve('src', 'routes', 'advent', '2022', 'data');
let solverPath = resolve('src', 'routes', 'advent', '2022', 'solvers');

let dataLines = []
let importLines = []
let jsonLines = []

const templateString = `// @ts-nocheck
export default input => {
  const lines = input.split('\\n').map(x => x.replace('\\r', ''))
}

/* Explanation: Day X

*/
`

for (let i = 9; i <= 25; i++) {
  writeFileSync(join(dataPath, `day${i}.sample.txt`), '// sample', { encoding: 'utf8' })
  writeFileSync(join(dataPath, `day${i}.input.txt`), '// input', { encoding: 'utf8' })
  writeFileSync(join(solverPath, `day${i}_1.js`), templateString, { encoding: 'utf8' })
  writeFileSync(join(solverPath, `day${i}_2.js`), templateString, { encoding: 'utf8' })
  dataLines.push(`import day${i}Sample from './data/day${i}.sample.txt?raw'`)
  dataLines.push(`import day${i}Input from './data/day${i}.input.txt?raw'`)
  importLines.push(`import solve${i}_1 from './solvers/day${i}_1'`)
  importLines.push(`import solve${i}_2 from './solvers/day${i}_2'`)
  jsonLines.push(`    {
    description: '2022 Day ${i}',
    pageUrl: 'https://adventofcode.com/2022/day/${i}',
    inputUrl: 'https://adventofcode.com/2022/day/${i}/input',
    inputs: [
      { description: 'sample', data: day${i}Sample },
      { description: 'input', data: day${i}Input },
    ],
    solvers: [
      { description: 'Part 1', solver: solve${i}_1 },
      { description: 'Part 2', solver: solve${i}_2 },
    ]
  },`)
}

console.log('json:')
console.log(jsonLines.join('\n'))
console.log()

console.log('data:')
console.log(dataLines.join('\n'))
console.log()

console.log('imports:')
console.log(importLines.join('\n'))
console.log()
