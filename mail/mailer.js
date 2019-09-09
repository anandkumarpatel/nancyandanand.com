"use strict";
const nodemailer = require("nodemailer");
const Sheets = require("../server/sheets.js")

const TABLE_NAME = "admin"
const FULL_RANGE = "A2:E"
const ROW_MAP = {
  rawId: 0,
  names: 1,
  phone: 2,
  sent: 3,
  email: 4,
}

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  const sheet = new Sheets()
  await sheet.init()
  // START AUTO BLOCK

  await getNeedToSend(sheet)
    .then((items) => {
      let requests = items.reduce((promiseChain, person) => {
        const rawId = person.rawId
        const id = new Buffer(rawId).toString('base64')
        const target = person.email
        return promiseChain.then(() => {
          return sendMail(id, person.rawId, target).then(() => {
            console.log("SENT", id, rawId, target)
          })
        });
      }, Promise.resolve())

      return requests.then(() => { console.log("DONE") })
    })

  /// END AUTO BLOCK
  ///////
  ///////
  ///////

  // id in base64
  // const idBase64 = 'XXX'
  // const email = 'XXX'
  // const decodedId = Buffer.from(idBase64, 'base64').toString('ascii')

  return sendMail(idBase64, decodedId, email)
}

function getNeedToSend(sheet) {
  return sheet.sheets.spreadsheets.values.get({
    spreadsheetId: "1Ab3fNGhNv1UIR6KQcxYi0OKK2kVYG5v0ecn7cyVux_Q",
    range: `${TABLE_NAME}!${FULL_RANGE}`
  })
    .catch((err) => {
      console.log('GET google Sheet API error: ' + err);
      throw err
    })
    .then((gRes) => {
      const rows = gRes.data.values;
      return rows.map((row) => {
        return {
          rawId: row[ROW_MAP.rawId],
          names: row[ROW_MAP.names],
          phone: row[ROW_MAP.phone],
          sent: row[ROW_MAP.sent] == "sent",
          email: row[ROW_MAP.email],
        }
      }).filter((val) => {
        if (!val.sent && val.email) {
          return true
        }
        return false
      })
    })
}

async function sendMail(id, decId, target) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "anandkumarpatel", // generated ethereal user
      pass: process.env.GOOGLE_API_KEY // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Anand Patel" <anandkumarpatel@gmail.com>', // sender address
    to: target.split(','), // list of receivers
    subject: "Nancy and Anand are getting married!", // Subject line
    html: `<div><div style="text-align:center"><a href="https://invite.nancyandanand.com/${id}" target="_blank"><img src="https://ci3.googleusercontent.com/proxy/4Swp2AYT2iMmyrbXf7pqnpTmsDuOtJ0adl_Rg0GjnPmi59YPiB-Z-vPLItbPUVrJ5TUgeaGP=s0-d-e1-ft#http://nancyandanand.com/invite.png" width="600" height="400"></a><br></div><span style="font-size:10pt;font-family:Arial"><div style="text-align:center"><span style="font-size:10pt">Invite Code: ${id}<br>Nancy<br>&amp;<br>Anand</span><br></div><div style="text-align:center"><img src="https://www.google-analytics.com/collect?v=1&tid=UA-141691249-1&t=event&ec=email&ea=open&dp=email-invite&uid=${id}&el=${decId}" width="1" height="1"></div></span></div>`
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
