// @ts-nocheck
export default input => {
  const lines = input.split('\n').map(x => x.replace('\r', ''))

  const solveLine = line => {
    for (let i = 3; i < line.length; i++) {
      if (line[i] === line[i - 1] || line[i] === line[i - 2] || line[i] === line[i - 3]) continue
      if (line[i-1] === line[i-2] || line[i-1] === line[i-3]) continue
      if (line[i-2] === line[i-3]) continue
      return i + 1
    }
  }

  return lines.map(solveLine).join('\n')
}

/* Explanation: Day 6

Given a string of characters, find the first block of 4 characters
with no repeats, then return the length of the prefix string up to
those 4 characters.  For example:

  mjqjpqmgbljsphdztnvjfqwrcgsmlb

mjqj has a repeat, jqjp has a repeat, qjpq has a repeat, but finally
jpqm is four characters without a repeat.  This is a start-of-packet marker.
So the packet data actually starts in position 7 after the first 7
characters, including the 4 character marker defined by not having a repeat

mjqjpqm


*/
