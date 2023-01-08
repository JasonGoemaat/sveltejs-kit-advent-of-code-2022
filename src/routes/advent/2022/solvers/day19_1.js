// @ts-nocheck
export default input => {
  let rx = /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./g
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const blueprints = lines.map(line => {
    let values = Array.from(line.match(rx)).slice(1).map(x => parseInt(x))
    console.log(JSON.stringify(values))
  })
}

/* Explanation: Day 19, Part 1

Very complicated puzzle.

1. You have 4 resources: ore, clay, obsidian, geode
2. Each resources has a number of robots that collect one of the resource per turn
3. You start with 1 ore robot and no resources
4. You are given a list of blueprints that have a cost for each robot type
5. You are to find the maximum number of 'geode' after minute 24 for each blueprint
6. Multiply the maximum number of geodes for each blueprint by the blueprint number
7. Total the results from #6 for a final answer

Basically for each blueprint you want to find the best way to produce robots so that
you get the most geodes in the end.

> My guess is that Part 1 will be pretty easy to simulate and Part 2 will make the
> number of minutes a ridiculously high number, forcing you to find a cycle.

NOTE: Puzzle input looks like the types of ore for each robot are consistent
for every blueprint:

* Ore robots cost ore
* Clay robots cost ore
* Obsidian robots cost ore and clay
* Geode robots cost ore and obsidian

*/
