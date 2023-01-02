// The point is to return the elf with the MOST
export default input => {
  return input.split('\n').reduce((p, c) => {
    if (c.length === 0) return [...p, 0]
    p[p.length - 1] += parseInt(c)
    return p
  }, [0]).reduce((p, c) => Math.max(p, c), 0)
}

/* Explanation:

We split the input by linefeed, so we have an array of strings that
are either numbers (calories for an elf) or an empty string (denoting
that we are starting a new elf with the next number).

I used to have a hard time doing this elegantly, because adding a new
elf at the end with the previous total was a pain.  But by starting 
with an array containing one elf (as long as the data contains data
for at least one elf) and just adding to the last element in the list
until the end works fine.  So we start with:

[0]

Say the next three lines are '1500', '', and '2000'.   The 1500 will
be added to the existing 0 for the first elf.  The blank line will
add a new 0 to the end for another elf, and the 2000 will be added
to that new elf that is now at the end of the array.

Once I have that list of elves with their totals, I do another reduce
to find the max value in the list.

*/
