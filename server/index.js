const { google } = require('googleapis');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

const SHEET_ID = process.env.SHEET_ID || "1Ab3fNGhNv1UIR6KQcxYi0OKK2kVYG5v0ecn7cyVux_Q"
const PORT = process.env.PORT || 8080

const ROW_MAP = {
  lastName: 0,
  invitedList: 1,
  hotelType: 2,
  rate: 3,
  attendingList: 4,
  declineList: 5,
  didRSVP: 6,
  address: 7,
}

const TABLE_NAME = 'list'
const FULL_RANGE = 'A2:H'
const FIRST_DATA = 'E'
const LAST_DATA = 'H'

const MOCK = {
  "people": {
    "no1": { "isAttending": "No" },
    "yes1": { "isAttending": "Yes" },
    "no2": { "isAttending": "No" },
    "yes2": { "isAttending": "Yes" }
  },
  "hotel": {
    "rate": "0",
    "name": "GT"
  },
  "didRSVP": false,
  sheetLoaded: true,
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET POST")
  next()
})

async function main() {
  // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables.
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  const auth = await google.auth.getClient({
    credentials,
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const sheets = google.sheets({ version: 'v4', auth });

  getRowById(sheets, "2|patel")
    .then(parseRow)
    .then(console.log)
  // .then(() => {
  //   return getRowById(sheets, "5|patel")
  //     .then((row) => {
  //       console.log("XX got row", row)
  //       updateRow(row, MOCK)
  //       return saveRow(sheets, row)
  //     })
  //     .then(() => {
  //       console.log("XX sending OK")
  //     })
  //     .catch((err) => {
  //       console.log("XX sending err", err)
  //     })
  // })

  app.get('/invite/:id', (req, res) => {
    const id = Buffer.from(req.params.id, 'base64').toString('ascii');
    console.log("XX got id", id)
    getRowById(sheets, id)
      .then(parseRow)
      .then((data) => {
        console.log("XX sending data", data)
        res.json(data)
      })
      .catch((err) => {
        console.log("XX sending err", err)
        res.status(500).json({
          err: err.message
        })
      })
  })

  app.post('/invite/:id', jsonParser, (req, res) => {
    const id = Buffer.from(req.params.id, 'base64').toString('ascii');
    let { people, address } = req.body
    console.log("XX got id", id, "and people", people, "address", address)

    getRowById(sheets, id)
      .then((row) => {
        console.log("XX got row", row)
        updateRow(row, {
          people,
          address
        })
        return saveRow(sheets, row)
      })
      .then(() => {
        console.log("XX sending OK")
        res.status(200).send('OK')
      })
      .catch((err) => {
        console.log("XX sending err", err)
        res.status(500).json({
          err: err.message
        })
      })
  });

  app.get('/:id', (req, res) => {
    res.cookie('id', req.params.id, {
      maxAge: 864000000
    })
    // res.redirect('http://localhost:3000')
    res.redirect('https://nancyandanand.com')
  })

  app.listen(PORT);
  console.log(`listening http://localhost:${PORT}`);
}

/**
 * @param {sheets_v4.Sheets} sheets
 * @param {string} id
 */
const getRowById = (sheets, id) => {
  return sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${TABLE_NAME}!${FULL_RANGE}`
  })
    .catch((err) => {
      console.log('XX GET google Sheet API error: ' + err);
      throw err
    })
    .then((gRes) => {
      const rows = gRes.data.values;
      const iRow = rows.find((row) => {
        return row[ROW_MAP.lastName] === id
      })

      if (!iRow) {
        throw new Error('Invite Not Found');
      }

      return iRow
    })
}

const saveRow = (sheets, updateRow) => {
  const row = updateRow[ROW_MAP.lastName].split('|')[0]
  if (!row) {
    throw new Error(`row not found ${updateRow}`)
  }
  const values = [updateRow.slice(ROW_MAP.attendingList)]
  const range = `${TABLE_NAME}!${FIRST_DATA}${row}: ${LAST_DATA}${row}`
  console.log('XX updating row', updateRow)
  return sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      range,
      values
    }
  })
    .catch((err) => {
      console.log('XX SAVE google sheets API error: ' + err);
      throw err
    })
}

const updateRow = (row, update) => {
  const { people, address } = update
  const attendingList = []
  const declineList = []

  Object.keys(people).forEach((person) => {
    if (people[person].isAttending === 'Yes') {
      attendingList.push(person)
    } else if (people[person].isAttending === 'No') {
      declineList.push(person)
    }
  })

  row[ROW_MAP.attendingList] = attendingList.join('|')
  row[ROW_MAP.declineList] = declineList.join('|')
  row[ROW_MAP.didRSVP] = true
  row[ROW_MAP.address] = `${address.street} | ${address.city} | ${address.state} | ${address.zip} | ${address.country}`
}

const parseRow = (data) => {
  const invitedList = data[ROW_MAP.invitedList]
  const attendingList = data[ROW_MAP.attendingList] || ""
  const declineList = data[ROW_MAP.declineList] || ""
  const didRSVP = data[ROW_MAP.didRSVP] || false
  const addr = data[ROW_MAP.address].split("|")
  const address = addr[4] ? {
    street: addr[0].trim(),
    city: addr[1].trim(),
    state: addr[2].trim(),
    zip: addr[3].trim(),
    country: addr[4].trim(),
  } : null

  const rate = data[ROW_MAP.rate]
  const name = data[ROW_MAP.hotelType]

  const hotel = {
    rate,
    name
  }

  const people = {}
  invitedList.split('|').forEach((name) => {
    if (name) {
      people[name] = {
        isAttending: '?'
      }
    }
  })

  attendingList.split('|').forEach((name) => {
    if (name) {
      people[name] = {
        isAttending: 'Yes'
      }
    }
  })

  declineList.split('|').forEach((name) => {
    if (name) {
      people[name] = {
        isAttending: 'No'
      }
    }
  })

  return {
    people,
    hotel,
    didRSVP,
    address
  }
}

main().catch(console.error);



