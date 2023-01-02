import { readable } from 'svelte/store'
import day1Sample from './data/day1.sample.txt?raw'
import day1Input from './data/day1.input.txt?raw'
import day2Sample from './data/day2.sample.txt?raw'
import day2Input from './data/day2.input.txt?raw'
import day3Sample from './data/day3.sample.txt?raw'
import day3Input from './data/day3.input.txt?raw'
import day4Sample from './data/day4.sample.txt?raw'
import day4Input from './data/day4.input.txt?raw'
import day5Sample from './data/day5.sample.txt?raw'
import day5Input from './data/day5.input.txt?raw'
import solve1_1 from './solvers/day1_1'
import solve1_2 from './solvers/day1_2'
import solve2_1 from './solvers/day2_1'
import solve2_2 from './solvers/day2_2'
import solve3_1 from './solvers/day3_1'
import solve3_2 from './solvers/day3_2'
import solve4_1 from './solvers/day4_1'
import solve4_2 from './solvers/day4_2'
import solve5_1 from './solvers/day5_1'
import solve5_2 from './solvers/day5_2'

// Hmm...   Code for inputs seem to be available at a url:
// https://adventofcode.com/2022/day/1/input
// Not sure if the same input is used for both parts, I've only
// completed day 1 so far
export const store = readable({
  days: [
    {
      description: '2022 Day 1',
      pageUrl: 'https://adventofcode.com/2022/day/1',
      inputUrl: 'https://adventofcode.com/2022/day/1/input',
      inputs: [
        { description: 'sample', data: day1Sample },
        { description: 'input', data: day1Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve1_1 },
        { description: 'Part 2', solver: solve1_2 },
      ]
    },
    {
      description: '2022 Day 2',
      pageUrl: 'https://adventofcode.com/2022/day/2',
      inputUrl: 'https://adventofcode.com/2022/day/2/input',
      inputs: [
        { description: 'sample', data: day2Sample },
        { description: 'input', data: day2Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve2_1 },
        { description: 'Part 2', solver: solve2_2 },
      ]
    },
    {
      description: '2022 Day 3',
      pageUrl: 'https://adventofcode.com/2022/day/3',
      inputUrl: 'https://adventofcode.com/2022/day/3/input',
      inputs: [
        { description: 'sample', data: day3Sample },
        { description: 'input', data: day3Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve3_1 },
        { description: 'Part 2', solver: solve3_2 },
      ]
    },
    {
      description: '2022 Day 4',
      pageUrl: 'https://adventofcode.com/2022/day/4',
      inputUrl: 'https://adventofcode.com/2022/day/4/input',
      inputs: [
        { description: 'sample', data: day4Sample },
        { description: 'input', data: day4Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve4_1 },
        { description: 'Part 2', solver: solve4_2 },
      ]
    },
    {
      description: '2022 Day 5',
      pageUrl: 'https://adventofcode.com/2022/day/5',
      inputUrl: 'https://adventofcode.com/2022/day/5/input',
      inputs: [
        { description: 'sample', data: day5Sample },
        { description: 'input', data: day5Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve5_1 },
        { description: 'Part 2', solver: solve5_2 },
      ]
    },
  ]
})