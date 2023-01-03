// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))
}

/* Explanation: Day 15, Part 1

We are given sensor locations and the closest beacon to that sensor.
Each sensor finds the closest beacon using taxi distance (or manhattan
distance) which is the sum of the absolute value deltas for x and y.
This forms a diamond pattern.  For instance we can go up 10, or
up 9 and left or right 1, or up 8 and left or right 2, etc.

The goal is given a list of sensors and the closest beacon to each to
eliminate areas on a certain row where there cannot be a beacon and
return the total number of squares covered by sensors that have found
another beacon.

Coverages can overlap, so I think the best way would be to calculate a
range for each beacon and combine those ranges.

*/
