const { google } = require('googleapis');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

const SHEET_ID = process.env.SHEET_ID || "1Ab3fNGhNv1UIR6KQcxYi0OKK2kVYG5v0ecn7cyVux_Q"
const PORT = process.env.PORT || 8080
const TEST_ID = process.env.TEST_ID || "2|test"
const ROW_MAP = {
  lastName: 0,
  invitedList: 1,
  hotelType: 2,
  rate: 3,
  flags: 4,
  events: 5,
  attendingList: 6,
  declineList: 7,
  didRSVP: 8,
  address: 9,
  attendingEvents: 10,
}

const TABLE_NAME = 'list'
const FIRST_DATA = 'G'
const LAST_DATA = 'K'
const FULL_RANGE = `A2:${LAST_DATA}`

const logger = (...args) => {
  console.log(new Date(), ...args)
}

app.use((req, res, next) => {
  if (process.env.DEV === "yes") {
    res.header("Access-Control-Allow-Origin", "*")
  } else {
    res.header("Access-Control-Allow-Origin", "https://nancyandanand.com")
    res.header("Vary", "Origin")
  }
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

  getRowById(sheets, TEST_ID)
    .then(parseRow)
    .then(logger)

  app.get('/invite/:id', (req, res) => {
    const id = Buffer.from(req.params.id, 'base64').toString('ascii');
    logger("XX GET invite id", id)
    getRowById(sheets, id)
      .then(parseRow)
      .then((data) => {
        logger("XX sending data", data)
        res.json(data)
      })
      .catch((err) => {
        logger("XX sending err", err)
        res.status(500).json({
          err: err.message
        })
      })
  })

  app.post('/invite/:id', jsonParser, (req, res) => {
    const id = Buffer.from(req.params.id, 'base64').toString('ascii');
    let { people, address, events } = req.body
    logger("XX POST id", id, "and people", people, "address", address, "events", events)

    getRowById(sheets, id)
      .then((row) => {
        logger("XX got row", row)
        updateRow(row, {
          people,
          address,
          events,
        })
        return saveRow(sheets, row)
      })
      .then(() => {
        logger("XX sending OK")
        res.status(200).send('OK')
      })
      .catch((err) => {
        logger("XX sending err", err)
        res.status(500).json({
          err: err.message
        })
      })
  });

  app.get('/:id', (req, res) => {
    logger("invite hit", req.params.id)
    let host = 'nancyandanand.com'
    if (process.env.DEV === "yes") {
      host = 'localhost:3000'
    } else if (!req.headers.host || !req.headers.host.includes('nancy')) {
      return res.send('OK')
    }

    res.cookie('id', req.params.id, {
      httpOnly: false,
      domain: host,
      path: '/',
    })

    if (process.env.DEV === "yes") {
      res.redirect('http://localhost:3000')
    } else {
      res.redirect('https://nancyandanand.com')
    }
  })

  app.listen(PORT);
  logger(`listening http://localhost:${PORT}`);
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
      logger('XX GET google Sheet API error: ' + err);
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
  const range = `${TABLE_NAME}!${FIRST_DATA}${row}:${LAST_DATA}${row}`
  logger('XX updating row', updateRow)
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
      logger('XX SAVE google sheets API error: ' + err);
      throw err
    })
}

const updateRow = (row, update) => {
  const { people, address, events } = update
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
  row[ROW_MAP.address] = !!address.street ? `${address.street} | ${address.city} | ${address.state} | ${address.zip} | ${address.country}` : ""

  row[ROW_MAP.attendingEvents] = Object.keys(events).filter((key) => {
    return events[key] === 'Yes'
  }).join("|")
}

const parseRow = (data) => {
  const invitedList = data[ROW_MAP.invitedList]
  const attendingList = data[ROW_MAP.attendingList] || ""
  const declineList = data[ROW_MAP.declineList] || ""
  const didRSVP = data[ROW_MAP.didRSVP] || false
  const flagList = data[ROW_MAP.flags] || ""
  const flags = flagList.split('|').reduce((prev, cur) => {
    if (!cur) {
      return prev
    }
    const split = cur.split("=")
    const key = split[0]
    if (!key) {
      return prev
    }
    const val = split[1] || "Yes"
    prev[key] = val
    return prev
  }, {})

  const rawEvents = data[ROW_MAP.events] || ""
  const attendingEvents = data[ROW_MAP.attendingEvents] || ""
  const events = rawEvents.split("|").reduce((prev, cur) => {
    if (!cur) {
      return prev
    }
    let no = "?"
    if (didRSVP) {
      no = "No"
    }
    prev[cur] = attendingEvents.includes(cur) ? "Yes" : no
    return prev
  }, {})

  const rawAddr = data[ROW_MAP.address] || ""
  const addr = rawAddr.split("|")
  const address = addr[4] ? {
    street: addr[0].trim(),
    city: addr[1].trim(),
    state: addr[2].trim(),
    zip: addr[3].trim(),
    country: addr[4].trim(),
  } : {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    }

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
    address,
    flags,
    events,
  }
}

main().catch(console.error);



