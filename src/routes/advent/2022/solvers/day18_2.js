// @ts-nocheck
export default input => {
  console.clear()

  // NOTE: on normal input my answer of 1501 is too low
  // NOTE: after fixing airCount my answer of 3242 is too high
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  const lava = lines.reduce((p, c) => Object.assign(p, {[c]: true}), {})
  const addAir = (air,x,y,z) => {
    let key = `${x},${y},${z}`
    if (lava[key]) return
    air[key] = true
  }
  const air = lines.reduce((p, line) => {
    let [x,y,z] = line.split(',').map(x => parseInt(x))
    addAir(p,x,y,z-1)
    addAir(p,x,y,z+1)
    addAir(p,x,y-1,z)
    addAir(p,x,y+1,z)
    addAir(p,x-1,y,z)
    addAir(p,x+1,y,z)
    return p
  }, {})
  const checkLava = (x,y,z) => lava[`${x},${y},${z}`]
  const checkAir = (x,y,z) => air[`${x},${y},${z}`]
  const countAdjacent = (x,y,z,fn) => {
    return (fn(x,y,z-1) ? 1 : 0) +
      (fn(x,y,z+1) ? 1 : 0) +
      (fn(x,y-1,z) ? 1 : 0) +
      (fn(x,y+1,z) ? 1 : 0) +
      (fn(x-1,y,z) ? 1 : 0) +
      (fn(x+1,y,z) ? 1 : 0)
  }
  
  // remove airs that have at least one open side until we can't anymore,
  // counting the lava surfaces attached to them when we remove
  let exposedLavaSurfaces = 0
  while (true) {
    let removedCount = 0
    Object.keys(air).forEach(airCube => {
      let [x,y,z] = airCube.split(',').map(x => parseInt(x))
      let lavaCount = countAdjacent(x,y,z,checkLava)
      let airCount = countAdjacent(x,y,z,checkAir)
      if (lavaCount + airCount < 6) {
        console.log(`Removing air at ${airCube} adding ${lavaCount} exposed lava surfaces`)
        exposedLavaSurfaces += lavaCount
        removedCount++
        delete air[airCube]
      }
    })
    if (removedCount === 0) break
  }

  return exposedLavaSurfaces
}

/* Explanation: Day 18 Part 2

Part 1 was too easy.   For part 2 we need to take into account air pockets
that might be trapped inside.  In the sample there is exactly 1 trapped
air pocket of size 1, which lowers the surface count by 6 since there are six
surfaces facing the air pocket.

A problem is that if the air pocket is larger than 1 cube in size, that
surface count could be less.  For example if exactly two air pockets are
touching, then there are only 10 surfaces that we counted that can be
excluded.  That's 12 minus 2 because 1 surface from each air cube
is touching the other air cube.

Thinking about it, I think I found how to make a solution, maybe even elegantly.

What if I create air cubes for each face of a cube that is dropped.  If
the air cube already exists (i.e. '1-2' where 2 is the second cube placed
and 1 is the first cube), link it.  So each lava cube surface will be
attached to a cube or to air.   Each air cube will start having a surface
attached to the lava that created it.  It may also have surfaces
attached to other air cubes, or other lava tubes.

Once we have those lists, we can look at the air cubes.  If any air cube
has a surface with NO attachment (neither air nor lava), we can remove it
and count the lava surfaces it was touching as exposed.  At the end we are
left with the lava cubes and the air cubes that are not linked to any
open areas.

*/
