// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))

  const createMonkey = () => ({ inspections: 0 })

  const createGetter = s => s === 'old' ? (x => x) : (x => parseInt(s))

  const monkeys = lines.reduce((p, c) => {
    if (c.length === 0) return [...p, createMonkey()]
    let monkey = p[p.length - 1]
    if (!(typeof(monkey.index) === 'number')) {
      monkey.index = p.length - 1
    } else if (typeof(monkey.items) === 'undefined') {
      monkey.items = c.substring('  Starting items: '.length).split(', ').map(x => parseInt(x))
    } else if (typeof(monkey.operation) === 'undefined') {
      let operationString = c.substring('  Operation: new = '.length)
      let parts = operationString.split(' ')
      monkey.operationString = operationString
      monkey.operation = parts[1]
      monkey.getterA = createGetter(parts[0])
      monkey.getterB = createGetter(parts[2])
    } else if (typeof(monkey.divisible) !== 'number') {
      monkey.divisible = parseInt(c.substring('  Test: divisible by '.length))
    } else if (typeof(monkey.trueMonkey) !== 'number') {
      let arr = c.split(' ')
      monkey.trueMonkey = parseInt(arr[arr.length - 1])
    } else if (typeof(monkey.falseMonkey) !== 'number') {
      let arr = c.split(' ')
      monkey.falseMonkey = parseInt(arr[arr.length - 1])
    } else {
      console.log(p)
      throw new Error(`Invalid line: '${c}'`)
    }
    return p
  }, [createMonkey()])

  const handleItem = (monkey, item) => {
    let worry = item // item is DEFINED by worry level
    if (monkey.operation === '*') worry = monkey.getterA(item) * monkey.getterB(item)
    if (monkey.operation === '+') worry = monkey.getterA(item) + monkey.getterB(item)
    worry = Math.trunc(worry / 3)
    let testResult = (worry % monkey.divisible) === 0
    let receiver = testResult ? monkey.trueMonkey : monkey.falseMonkey
    monkeys[receiver].items.push(worry)
    monkey.inspections++
  }

  const handleMonkey = monkey => {
    monkey.items.forEach(item => handleItem(monkey, item))
    monkey.items = []
  }

  for (let round = 0; round < 20; round++) {
    monkeys.forEach(monkey => handleMonkey(monkey))
  }

  let monkeyBusiness = monkeys.map(x => x.inspections).sort((a, b) => b - a).slice(0, 2).reduce((p, c) => p * c, 1)
  return monkeyBusiness
}

/* Explanation: Day 11 Part 1

Pretty complicated (i.e. stupid) one.   Think there's a typo in the description.  This
doesn't make sense given the description:

> A monkey that starts a round with no items could end up inspecting and 
> throwing many items by the time its turn comes around.

A monkey only inspects and throws items ON IT'S TURN from what I can tell.  I think this
means that the money that starts a row with no items might RECEIVE many items by the time
its turn comes around.  

*/
