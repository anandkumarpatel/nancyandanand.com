"use strict";
const nodemailer = require("nodemailer");
const Sheets = require("../server/sheets.js")

const TABLE_NAME = "admin"
const FULL_RANGE = "A2:K"
const ROW_MAP = {
  rawId: 0,
  names: 1,
  phone: 2,
  sent: 3,
  rsvp: 4,
  followup: 5,
  email: 6,
  idBase64: 7,
}

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  const sheet = new Sheets()
  await sheet.init()
  // START AUTO BLOCK

  await getNeedToSend(sheet)
    .then((items) => {
      return items.reduce((promiseChain, person) => {
        const rawId = person.rawId
        const id = new Buffer(rawId).toString('base64')
        const target = person.email
        return promiseChain.then(() => {
          return sendMailInvite(id, person.rawId, target).then(() => {
            return console.log("SENT", id, rawId, target)
          })
        });
      }, Promise.resolve())
        .then(() => { return console.log("DONE sending invites\n") })
    })
    .then(() => {
      return getNeedToUpdate(sheet).then((items) => {
        return items.reduce((promiseChain, person) => {
          const rawId = person.rawId
          const id = new Buffer(rawId).toString('base64')
          const target = person.email
          return promiseChain.then(() => {
            return sendMailFollowup(id, person.rawId, target).then(() => {
              console.log("SENT", id, rawId, target)
            })
          });
        }, Promise.resolve())
          .then(() => { console.log("DONE sending followups") })
      })
    })

  /// END AUTO BLOCK
  ///////
  ///////
  ///////

  // id in base64
  // const idBase64 = 'XXX'
  // const email = 'XXX'
  // const decodedId = Buffer.from(idBase64, 'base64').toString('ascii')
  // return sendMail(idBase64, decodedId, email)
}

function getNeedToSend(sheet) {
  return getSheet(sheet).then((i) => {
    return i.filter((val) => {
      if (!val.sent && val.email) {
        return true
      }
      return false
    })
  })
}

function getNeedToUpdate(sheet) {
  return getSheet(sheet).then((i) => {
    return i.filter((val) => {
      if (val.sent && val.email && val.followup && !val.rsvp) {
        return true
      }
      return false
    })
  })
}

function getSheet(sheet) {
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
          followup: row[ROW_MAP.followup] == "yes",
          rsvp: row[ROW_MAP.rsvp] == "TRUE",
        }
      })
    })
}
async function sendMailInvite(id, decId, target) {
  return sendMail(target, `<div><div style="text-align:center"><a href="https://invite.nancyandanand.com/${id}" target="_blank"><img src="https://ci3.googleusercontent.com/proxy/4Swp2AYT2iMmyrbXf7pqnpTmsDuOtJ0adl_Rg0GjnPmi59YPiB-Z-vPLItbPUVrJ5TUgeaGP=s0-d-e1-ft#http://nancyandanand.com/invite.png" width="600" height="400"></a><br></div><span style="font-size:10pt;font-family:Arial"><div style="text-align:center"><span style="font-size:10pt">Invite Code: ${id}<br>Nancy<br>&amp;<br>Anand</span><br></div><div style="text-align:center"><img src="https://www.google-analytics.com/collect?v=1&tid=UA-141691249-1&t=event&ec=email&ea=open&dp=email-invite&uid=${id}&el=${decId}" width="1" height="1"></div></span></div>`)
}

async function sendMailFollowup(id, decId, target) {
  return sendMail(target,
    `<div>
  <span style="font-size:10pt;font-family:Arial">
    <span style="font-size:10pt">
      Hey!
      <br>
      <br>
      We hope you're as excited for our wedding as much as we are! Please let us know if you can attend on our website
      by October 7th, 2019.
      <br>
      All you have to do is click "yes" or "no" and fill out the address information so we can send you an official
      invitation.
      <br>
      We understand if you're unable to make it as we know you will be celebrating from afar. But please let us know
      by clicking "no" so we can plan accordingly.
      <br>
      If you are unsure but hoping to attend, just click "yes" - you will be able to change or update the rsvp later.
      <br>
      If you have any questions, please contact us!
      <br>
      <br>
      <a href="https://invite.nancyandanand.com/${id}" target="_blank">
        Click Here to RSVP
      </a>
      <br>
      Invite Code: ${id}
      <br>
      <br>
      The adventure awaits...
      <br>
      ❤️ Nancy and Anand.
      <br>
    </span>
    <br>
    <div style="text-align:center">
      <img
        src="https://www.google-analytics.com/collect?v=1&tid=UA-141691249-1&t=event&ec=email&ea=open&dp=email-followup&uid=${id}&el=${decId}"
        width="1" height="1">
    </div>
  </span>
</div>`)
}

async function sendMail(target, msg) {
  if (process.env.RUN !== "yes") {
    return console.log("DRY-RUN", target)
  }
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
    html: msg
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
