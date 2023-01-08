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
import day6Sample from './data/day6.sample.txt?raw'
import day6Input from './data/day6.input.txt?raw'
import day7Sample from './data/day7.sample.txt?raw'
import day7Input from './data/day7.input.txt?raw'
import day8Sample from './data/day8.sample.txt?raw'
import day8Input from './data/day8.input.txt?raw'
import day9Sample from './data/day9.sample.txt?raw'
import day9Sample2 from './data/day9.sample2.txt?raw'
import day9Input from './data/day9.input.txt?raw'
import day10Sample from './data/day10.sample.txt?raw'
import day10Input from './data/day10.input.txt?raw'
import day11Sample from './data/day11.sample.txt?raw'
import day11Input from './data/day11.input.txt?raw'
import day12Sample from './data/day12.sample.txt?raw'
import day12Input from './data/day12.input.txt?raw'
import day13Sample from './data/day13.sample.txt?raw'
import day13Input from './data/day13.input.txt?raw'
import day14Sample from './data/day14.sample.txt?raw'
import day14Input from './data/day14.input.txt?raw'
import day15Sample from './data/day15.sample.txt?raw'
import day15Input from './data/day15.input.txt?raw'
import day16Sample from './data/day16.sample.txt?raw'
import day16Sample2 from './data/day16.sample.2.txt?raw'
import day16Input from './data/day16.input.txt?raw'
import day17Sample from './data/day17.sample.txt?raw'
import day17Input from './data/day17.input.txt?raw'
import day18Sample from './data/day18.sample.txt?raw'
import day18Input from './data/day18.input.txt?raw'
import day19Sample from './data/day19.sample.txt?raw'
import day19Input from './data/day19.input.txt?raw'
import day20Sample from './data/day20.sample.txt?raw'
import day20Input from './data/day20.input.txt?raw'
import day21Sample from './data/day21.sample.txt?raw'
import day21Input from './data/day21.input.txt?raw'
import day22Sample from './data/day22.sample.txt?raw'
import day22Input from './data/day22.input.txt?raw'
import day23Sample from './data/day23.sample.txt?raw'
import day23Input from './data/day23.input.txt?raw'
import day24Sample from './data/day24.sample.txt?raw'
import day24Input from './data/day24.input.txt?raw'
import day25Sample from './data/day25.sample.txt?raw'
import day25Input from './data/day25.input.txt?raw'
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
import solve6_1 from './solvers/day6_1'
import solve6_2 from './solvers/day6_2'
import solve7_1 from './solvers/day7_1'
import solve7_2 from './solvers/day7_2'
import solve8_1 from './solvers/day8_1'
import solve8_2 from './solvers/day8_2'
import solve9_1 from './solvers/day9_1'
import solve9_2 from './solvers/day9_2'
import solve10_1 from './solvers/day10_1'
import solve10_2 from './solvers/day10_2'
import solve11_1 from './solvers/day11_1'
import solve11_2 from './solvers/day11_2'
import solve11_2b from './solvers/day11_2b'
import solve12_1 from './solvers/day12_1'
import solve12_2 from './solvers/day12_2'
import solve13_1 from './solvers/day13_1'
import solve13_2 from './solvers/day13_2'
import solve14_1 from './solvers/day14_1'
import solve14_2 from './solvers/day14_2'
import solve15_1 from './solvers/day15_1'
import solve15_1_sample from './solvers/day15_1_sample'
import solve15_2 from './solvers/day15_2'
import solve16_1 from './solvers/day16_1'
import solve16_2 from './solvers/day16_2'
import solve17_1 from './solvers/day17_1'
import solve17_2 from './solvers/day17_2'
import solve17_2b from './solvers/day17_2b'
import solve18_1 from './solvers/day18_1'
import solve18_2 from './solvers/day18_2'
import solve19_1 from './solvers/day19_1'
import solve19_2 from './solvers/day19_2'
import solve20_1 from './solvers/day20_1'
import solve20_2 from './solvers/day20_2'
import solve21_1 from './solvers/day21_1'
import solve21_2 from './solvers/day21_2'
import solve22_1 from './solvers/day22_1'
import solve22_2 from './solvers/day22_2'
import solve23_1 from './solvers/day23_1'
import solve23_2 from './solvers/day23_2'
import solve24_1 from './solvers/day24_1'
import solve24_2 from './solvers/day24_2'
import solve25_1 from './solvers/day25_1'
import solve25_2 from './solvers/day25_2'

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
    {
      description: '2022 Day 6',
      pageUrl: 'https://adventofcode.com/2022/day/6',
      inputUrl: 'https://adventofcode.com/2022/day/6/input',
      inputs: [
        { description: 'sample', data: day6Sample },
        { description: 'input', data: day6Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve6_1 },
        { description: 'Part 2', solver: solve6_2 },
      ]
    },
    {
      description: '2022 Day 7',
      pageUrl: 'https://adventofcode.com/2022/day/7',
      inputUrl: 'https://adventofcode.com/2022/day/7/input',
      inputs: [
        { description: 'sample', data: day7Sample },
        { description: 'input', data: day7Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve7_1 },
        { description: 'Part 2', solver: solve7_2 },
      ]
    },
    {
      description: '2022 Day 8',
      pageUrl: 'https://adventofcode.com/2022/day/8',
      inputUrl: 'https://adventofcode.com/2022/day/8/input',
      inputs: [
        { description: 'sample', data: day8Sample },
        { description: 'input', data: day8Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve8_1 },
        { description: 'Part 2', solver: solve8_2 },
      ]
    },
    {
      description: '2022 Day 9',
      pageUrl: 'https://adventofcode.com/2022/day/9',
      inputUrl: 'https://adventofcode.com/2022/day/9/input',
      inputs: [
        { description: 'sample', data: day9Sample },
        { description: 'sample2', data: day9Sample2 },
        { description: 'input', data: day9Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve9_1 },
        { description: 'Part 2', solver: solve9_2 },
      ]
    },
      {
      description: '2022 Day 10',
      pageUrl: 'https://adventofcode.com/2022/day/10',
      inputUrl: 'https://adventofcode.com/2022/day/10/input',
      inputs: [
        { description: 'sample', data: day10Sample },
        { description: 'input', data: day10Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve10_1 },
        { description: 'Part 2', solver: solve10_2 },
      ]
    },
      {
      description: '2022 Day 11',
      pageUrl: 'https://adventofcode.com/2022/day/11',
      inputUrl: 'https://adventofcode.com/2022/day/11/input',
      inputs: [
        { description: 'sample', data: day11Sample },
        { description: 'input', data: day11Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve11_1 },
        { description: 'Part 2', solver: solve11_2 },
        { description: 'Part 2b', solver: solve11_2b },
      ]
    },
      {
      description: '2022 Day 12',
      pageUrl: 'https://adventofcode.com/2022/day/12',
      inputUrl: 'https://adventofcode.com/2022/day/12/input',
      inputs: [
        { description: 'sample', data: day12Sample },
        { description: 'input', data: day12Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve12_1 },
        { description: 'Part 2', solver: solve12_2 },
      ]
    },
      {
      description: '2022 Day 13',
      pageUrl: 'https://adventofcode.com/2022/day/13',
      inputUrl: 'https://adventofcode.com/2022/day/13/input',
      inputs: [
        { description: 'sample', data: day13Sample },
        { description: 'input', data: day13Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve13_1 },
        { description: 'Part 2', solver: solve13_2 },
      ]
    },
      {
      description: '2022 Day 14',
      pageUrl: 'https://adventofcode.com/2022/day/14',
      inputUrl: 'https://adventofcode.com/2022/day/14/input',
      inputs: [
        { description: 'sample', data: day14Sample },
        { description: 'input', data: day14Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve14_1 },
        { description: 'Part 2', solver: solve14_2 },
      ]
    },
      {
      description: '2022 Day 15',
      pageUrl: 'https://adventofcode.com/2022/day/15',
      inputUrl: 'https://adventofcode.com/2022/day/15/input',
      inputs: [
        { description: 'sample', data: day15Sample },
        { description: 'input', data: day15Input },
      ],
      solvers: [
        { description: 'Part 1 Sample', solver: solve15_1_sample },
        { description: 'Part 1', solver: solve15_1 },
        { description: 'Part 2', solver: solve15_2 },
      ]
    },
      {
      description: '2022 Day 16',
      pageUrl: 'https://adventofcode.com/2022/day/16',
      inputUrl: 'https://adventofcode.com/2022/day/16/input',
      inputs: [
        { description: 'sample', data: day16Sample },
        { description: 'simple sample', data: day16Sample2 },
        { description: 'input', data: day16Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve16_1 },
        { description: 'Part 2', solver: solve16_2 },
      ]
    },
      {
      description: '2022 Day 17',
      pageUrl: 'https://adventofcode.com/2022/day/17',
      inputUrl: 'https://adventofcode.com/2022/day/17/input',
      inputs: [
        { description: 'sample', data: day17Sample },
        { description: 'input', data: day17Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve17_1 },
        { description: 'Part 2', solver: solve17_2 },
        { description: 'Part 2b', solver: solve17_2b },
      ]
    },
      {
      description: '2022 Day 18',
      pageUrl: 'https://adventofcode.com/2022/day/18',
      inputUrl: 'https://adventofcode.com/2022/day/18/input',
      inputs: [
        { description: 'sample', data: day18Sample },
        { description: 'input', data: day18Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve18_1 },
        { description: 'Part 2', solver: solve18_2 },
      ]
    },
      {
      description: '2022 Day 19',
      pageUrl: 'https://adventofcode.com/2022/day/19',
      inputUrl: 'https://adventofcode.com/2022/day/19/input',
      inputs: [
        { description: 'sample', data: day19Sample },
        { description: 'input', data: day19Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve19_1 },
        { description: 'Part 2', solver: solve19_2 },
      ]
    },
      {
      description: '2022 Day 20',
      pageUrl: 'https://adventofcode.com/2022/day/20',
      inputUrl: 'https://adventofcode.com/2022/day/20/input',
      inputs: [
        { description: 'sample', data: day20Sample },
        { description: 'input', data: day20Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve20_1 },
        { description: 'Part 2', solver: solve20_2 },
      ]
    },
      {
      description: '2022 Day 21',
      pageUrl: 'https://adventofcode.com/2022/day/21',
      inputUrl: 'https://adventofcode.com/2022/day/21/input',
      inputs: [
        { description: 'sample', data: day21Sample },
        { description: 'input', data: day21Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve21_1 },
        { description: 'Part 2', solver: solve21_2 },
      ]
    },
      {
      description: '2022 Day 22',
      pageUrl: 'https://adventofcode.com/2022/day/22',
      inputUrl: 'https://adventofcode.com/2022/day/22/input',
      inputs: [
        { description: 'sample', data: day22Sample },
        { description: 'input', data: day22Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve22_1 },
        { description: 'Part 2', solver: solve22_2 },
      ]
    },
      {
      description: '2022 Day 23',
      pageUrl: 'https://adventofcode.com/2022/day/23',
      inputUrl: 'https://adventofcode.com/2022/day/23/input',
      inputs: [
        { description: 'sample', data: day23Sample },
        { description: 'input', data: day23Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve23_1 },
        { description: 'Part 2', solver: solve23_2 },
      ]
    },
      {
      description: '2022 Day 24',
      pageUrl: 'https://adventofcode.com/2022/day/24',
      inputUrl: 'https://adventofcode.com/2022/day/24/input',
      inputs: [
        { description: 'sample', data: day24Sample },
        { description: 'input', data: day24Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve24_1 },
        { description: 'Part 2', solver: solve24_2 },
      ]
    },
      {
      description: '2022 Day 25',
      pageUrl: 'https://adventofcode.com/2022/day/25',
      inputUrl: 'https://adventofcode.com/2022/day/25/input',
      inputs: [
        { description: 'sample', data: day25Sample },
        { description: 'input', data: day25Input },
      ],
      solvers: [
        { description: 'Part 1', solver: solve25_1 },
        { description: 'Part 2', solver: solve25_2 },
      ]
    },
  ]
})