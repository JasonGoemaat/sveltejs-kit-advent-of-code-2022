// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))
  console.log(`running with ${lines.length} lines`)

  const createDirectory = (parent, name) => {
    const newdir = {
      parent,
      name,
      children: {},
      files: {}
    }
    if (parent) parent.children[name] = newdir
    return newdir
  }

  const root = createDirectory(null, '/')

  let cd = root;

  const handleCommand = line => {
    const [prompt, command, ...args] = line.split(' ');
    if (command === 'cd') {
      let arg = args.join(' ')
      if (arg === '/') return cd = root
      if (arg === '..') return cd = cd.parent
      cd = cd.children[arg] || createDirectory(cd, arg)
      return
    }

    if (command === 'ls') {
      cd.children = {}
      return
    }

    throw new Error(`Unknown command: '${command}`)
  }

  const handleLsResponse = line => {
    const [a, b] = line.split(' ')
    if (a === 'dir') return createDirectory(cd, b)
    cd.files[b] = parseInt(a)
  }

  // process commands, creating directory tree starting at root
  lines.forEach(line => (line[0] === '$' && line[1] === ' ') ? handleCommand(line) : handleLsResponse(line))

  // calculate sizes for all directories recursively
  const calcualateSize = dir => {
    const fileSizes = Object.values(dir.files).reduce((p, c) => p + c, 0)
    const dirSizes = Object.values(dir.children).reduce((p, c) => p + calcualateSize(c), 0)
    console.log(`dir ${dir.name} has files ${fileSizes} and dirs ${dirSizes}`)
    dir.size = fileSizes + dirSizes
    return dir.size
  }
  calcualateSize(root)

  let dirList = []
  const flatten = dir => {
    dirList.push({ name: dir.name, size: dir.size })
    Object.values(dir.children).forEach(child => flatten(child))
  }

  flatten(root);

  console.log('root:', root)
  console.log('dirList:', dirList)
  return dirList.map(x => x.size).filter(x => x <= 100000).reduce((p, c) => p + c, 0)
}

/* Explanation: Day X

*/
