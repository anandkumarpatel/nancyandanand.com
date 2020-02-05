const fs = require('fs')

const file = fs.readFileSync("./invites.csv")

var out = ""
file.toString().split("\n").forEach((line) => {
  if (line == "") return
  const split = line.split(":")
  const names = split[0].replace("|", " & ").trim()
  const addr = split[1].split(",")
  const street = addr[0].trim()
  const city = addr[1].trim()
  // const state = addr[2].trim()
  // const zip = addr[3].trim()
  // const cont = addr[4].trim()
  out += `
${names}

${street}
${city}
`

})
console.log(out)
fs.writeFileSync("./out.txt", out)


/** auto print 2
const fs = require('fs')

const file = fs.readFileSync("./invites.csv")

var out = ""
const lines = file.toString().trim().split("\n")
for (let i = 0; i < lines.length; i += 2) {
  const line1 = lines[i];
  const line2 = lines[i + 1];

  if (line1 == "") continue
  const split1 = line1.split(":")
  const names1 = split1[0].replace("|", " & ").trim()
  const addr1 = split1[1].split("|")
  const street1 = addr1[0].trim()
  const city1 = addr1[1].trim()
  const state1 = addr1[2].trim()
  const zip1 = addr1[3].trim()
  const cont1 = addr1[4].trim()

  if (line2 == null || line2 == "") {
    out += `
${names1}

${street1}
${city1}, ${state1} ${zip1}




`
    continue
  }

  const split2 = line2.split(":")
  const names2 = split2[0].replace("|", " & ").trim()
  const addr2 = split2[1].split("|")
  const street2 = addr2[0].trim()
  const city2 = addr2[1].trim()
  const state2 = addr2[2].trim()
  const zip2 = addr2[3].trim()
  const cont2 = addr2[4].trim()
  out += `
${names1}	${names2}

${street1}	${street2}
${city1}, ${state1} ${zip1}	${city2}, ${state2} ${zip2}




`
}

fs.writeFileSync("./out.txt", out)

 */
