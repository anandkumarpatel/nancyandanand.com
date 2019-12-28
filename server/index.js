const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const ua = require('universal-analytics')
const Sheets = require('./sheets.js')

const PORT = process.env.PORT || 8080
const TEST_ID = process.env.TEST_ID || '2|test'

const logger = (...args) => {
  console.log(new Date(), ...args)
}

app.use((req, res, next) => {
  if (process.env.DEV === 'yes') {
    res.header('Access-Control-Allow-Origin', '*')
  } else {
    res.header('Access-Control-Allow-Origin', 'https://nancyandanand.com')
    res.header('Vary', 'Origin')
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET POST')
  next()
})

async function main() {
  const sheets = new Sheets()
  await sheets.init()

  sheets
    .getRowById(TEST_ID)
    .then(sheets.parseRow)
    .then(logger)

  app.get('/invite/:id', (req, res) => {
    const id = Buffer.from(req.params.id, 'base64').toString('ascii')
    logger('GET invite id', id)
    if (process.env.DEV !== 'yes') {
      ua(process.env.GOOGLE_TRACK, { uid: id })
        .event({
          ec: 'invite',
          ea: 'server-get',
          el: id,
          ev: 1,
          dp: '/invite/' + id
        })
        .send()
    }

    sheets
      .getRowById(id)
      .then(sheets.parseRow)
      .then((data) => {
        logger('sending data', data)
        res.json(data)
      })
      .catch((err) => {
        if (err.message === Sheets.NOT_FOUND) {
          logger('invite not found', err)
          return res.status(404).json({
            err: err.message
          })
        }

        logger('sending err', err)
        return res.status(500).json({
          err: err.message
        })
      })
  })

  app.post('/invite/:id', jsonParser, (req, res) => {
    const id = Buffer.from(req.params.id, 'base64').toString('ascii')
    let { people, address, events, email } = req.body
    logger(
      'POST id',
      id,
      'and people',
      people,
      'address',
      address,
      'events',
      events,
      'email',
      email
    )

    if (process.env.DEV !== 'yes') {
      ua(process.env.GOOGLE_TRACK, { uid: id })
        .event({
          ec: 'invite',
          ea: 'server-post',
          el: id,
          ev: 2,
          dp: '/invite/' + id
        })
        .send()
    }

    sheets
      .getRowById(id)
      .then((row) => {
        logger('got row', row)
        sheets.updateRow(row, {
          people,
          address,
          events,
          email
        })
        return sheets.saveRow(row)
      })
      .then(() => {
        logger('sending OK')
        res.status(200).send('OK')
      })
      .catch((err) => {
        logger('sending err', err)
        res.status(500).json({
          err: err.message
        })
      })
  })

  app.get('/:id', (req, res) => {
    const id = req.params.id
    const tId = Buffer.from(req.params.id, 'base64').toString('ascii')
    logger('invite hit', id, tId)
    if (process.env.DEV !== 'yes') {
      ua(process.env.GOOGLE_TRACK, { uid: tId })
        .event({
          ec: 'invite',
          ea: 'server-invite',
          el: tId,
          ev: 3,
          dp: '/' + tId
        })
        .send()
    }
    let host = 'nancyandanand.com'
    if (process.env.DEV === 'yes') {
      host = 'localhost:3000'
    } else if (!req.headers.host || !req.headers.host.includes('nancy')) {
      return res.send('OK')
    }

    res.cookie('id', req.params.id, {
      httpOnly: false,
      domain: host,
      path: '/',
      sameSite: false,
      secure: true,
      maxAge: 315569520000
    })
    if (process.env.DEV === 'yes') {
      res.redirect(`http://${req.headers.host.split(':')[0]}:3000`)
    } else {
      res.redirect('https://nancyandanand.com')
    }
  })

  app.listen(PORT)
  logger(`listening http://localhost:${PORT}`)
}

main().catch(console.error)
