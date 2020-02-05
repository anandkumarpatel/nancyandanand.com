const fs = require('fs')

const file = fs.readFileSync('./invites.csv')

var out = ''
console.log('street address, address line 2, postal code, city, state, country')

file
  .toString()
  .split('\n')
  .forEach((line) => {
    if (line == '') return
    const split = line.split(':')
    const names = split[0].replace('|', ' & ').trim()
    const addr = split[1].split('|')
    const street = addr[0].trim()
    const city = addr[1].trim()
    const state = addr[2].trim()
    const zip = addr[3].trim()
    const cont = addr[4].trim()
    console.log(`${street},,${zip},${city},${state},${cont}`)
  })

fs.writeFileSync('./clean.csv', out)
