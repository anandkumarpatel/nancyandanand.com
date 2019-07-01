const { google } = require('googleapis');

const TABLE_NAME = 'list'
const FIRST_DATA = 'G'
const LAST_DATA = 'L'
const FULL_RANGE = `A2:${LAST_DATA}`

const NOT_FOUND = 'Invite Not Found'

const SHEET_ID = process.env.SHEET_ID || "1Ab3fNGhNv1UIR6KQcxYi0OKK2kVYG5v0ecn7cyVux_Q"
const ROW_MAP = {
  lastName: 0,
  invitedList: 1,
  hotelType: 2,
  rate: 3,
  flags: 4,
  events: 5,
  email: 6,
  attendingList: 7,
  declineList: 8,
  didRSVP: 9,
  address: 10,
  attendingEvents: 11,
}

const logger = (...args) => {
  console.log(new Date(), ...args)
}

class Sheet {
  async init() {
    // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
    // environment variables.
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    const auth = await google.auth.getClient({
      credentials,
      // Scopes can be specified either as an array or as a single, space-delimited string.
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  /**
   * @param {sheets_v4.Sheets} sheets
   * @param {string} id
   */
  getRowById(id) {
    return this.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${TABLE_NAME}!${FULL_RANGE}`
    })
      .catch((err) => {
        logger('GET google Sheet API error: ' + err);
        throw err
      })
      .then((gRes) => {
        const rows = gRes.data.values;
        const iRow = rows.find((row) => {
          return row[ROW_MAP.lastName] === id
        })

        if (!iRow) {
          throw new Error(NOT_FOUND);
        }

        return iRow
      })
  }

  saveRow(updateRow) {
    const row = updateRow[ROW_MAP.lastName].split('|')[0]
    if (!row) {
      throw new Error(`row not found ${updateRow}`)
    }
    const values = [updateRow.slice(ROW_MAP.email)]
    const range = `${TABLE_NAME}!${FIRST_DATA}${row}:${LAST_DATA}${row}`
    logger('updating row', updateRow)
    return this.sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        range,
        values
      }
    })
      .catch((err) => {
        logger('SAVE google sheets API error: ' + err);
        throw err
      })
  }

  updateRow(row, update) {
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
    row[ROW_MAP.email] = update.email
    row[ROW_MAP.attendingEvents] = Object.keys(events).filter((key) => {
      return events[key] === 'Yes'
    }).join("|")
  }

  parseRow(data) {
    const invitedList = data[ROW_MAP.invitedList]
    const attendingList = data[ROW_MAP.attendingList] || ""
    const declineList = data[ROW_MAP.declineList] || ""
    const didRSVP = data[ROW_MAP.didRSVP] || false
    const email = data[ROW_MAP.email] || ""
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
      email,
    }
  }
}

module.exports = Sheet
module.exports.NOT_FOUND = NOT_FOUND
