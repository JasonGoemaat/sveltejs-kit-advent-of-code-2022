// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const exists = lines.reduce((p, c) => Object.assign(p, {[c]: true}), {})
  const check = (x, y, z) => exists[`${x},${y},${z}`] ? 0 : 1
  const surfaceCount = lines.reduce((p, line) => {
    let [x,y,z] = line.split(',').map(x => parseInt(x))
    return p  + check(x,y,z-1) + check(x,y,z+1)
    + check(x,y-1,z) + check(x,y+1,z)
    + check(x+1,y,z) + check(x-1,y,z)
  }, 0)
  return surfaceCount
}

/* Explanation: Day 18 Part 1

We are given a scan which is a set of 3d coordinates (x,y,z) where
droplets exist.   A droplet might be part of a larger chunk.  So
what we want to do is calculate surface area of the 3d structure.
To do this we total the sides of each 1x1 cube that are not
touching another 1x1 cube.

Should be pretty easy.  We can store the cubes in a dictionary
and for each cube just check if a cube exists on each of the
six possible sides (x,y,+/-z), (x,+/-y,z), and (+/-x,y,z)

*/
