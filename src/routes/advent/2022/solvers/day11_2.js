// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))

  const createMonkey = () => ({ inspections: 0 })

  const createGetter = s => s === 'old' ? (x => x) : (x => BigInt(parseInt(s)))

  const monkeys = lines.reduce((p, c) => {
    if (c.length === 0) return [...p, createMonkey()]
    let monkey = p[p.length - 1]
    if (!(typeof(monkey.index) === 'number')) {
      monkey.index = p.length - 1
    } else if (typeof(monkey.items) === 'undefined') {
      monkey.items = c.substring('  Starting items: '.length).split(', ').map(x => BigInt(parseInt(x)))
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
    // worry = Math.trunc(worry / 3) // not for part 2
    let testResult = (worry % (BigInt(monkey.divisible))) === 0n
    let receiver = testResult ? monkey.trueMonkey : monkey.falseMonkey
    monkeys[receiver].items.push(worry)
    monkey.inspections++
  }

  const handleMonkey = monkey => {
    monkey.items.forEach(item => handleItem(monkey, item))
    monkey.items = []
  }

  function replacer(key, value) {
    if (typeof(value) === 'bigint') {
      const s = `${value}`
      if (s.length <= 20) return s
      return `${s.substring(0, 1)}.${s.substring(1,10)}e${s.length-1}`
    }
    return this[key]
  }

  for (let round = 0; round < 20; round++) {
    monkeys.forEach(monkey => handleMonkey(monkey))
  }

  let monkeyBusiness = monkeys.map(x => x.inspections).sort((a, b) => b - a).slice(0, 2).reduce((p, c) => p * c, 1)
  console.log(JSON.stringify(monkeys, replacer, 2))
  return monkeyBusiness
}

/* Explanation: Day 11 Part 2

Same calculations as part 1, but for 2 changes:

1. We no longer divide by 3 after an inspection
2. We go to 10,000 rounds

Because we don't divide by 3 and because we go 10,000 rounds, we need bigger numbers somehow.
Time to use BigNumber

*/
