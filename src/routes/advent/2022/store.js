import { readable } from 'svelte/store'
import day1Sample from './data/day1.sample.txt?raw'
import day1Input from './data/day1.input.txt?raw'
import solve1_1 from './solvers/day1_1'
import solve1_2 from './solvers/day1_2'

// Hmm...   Code for inputs seem to be available at a url:
// https://adventofcode.com/2022/day/1/input
// Not sure if the same input is used for both parts, I've only
// completed day 1 so far
export const store = readable({
  days: [
    {
      description: '2022 Day 1',
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
      inputUrl: 'https://adventofcode.com/2022/day/2/input',
      inputs: [
        { description: 'sample', data: day1Sample },
        { description: 'input', data: day1Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve1_1 },
        { description: 'Part 2', solver: solve1_2 },
      ]
    },
  ]
})