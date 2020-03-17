'use strict'
const nodemailer = require('nodemailer')
const Sheets = require('../server/sheets.js')

const TABLE_NAME = 'admin'
const FULL_RANGE = 'A2:O'
const ROW_MAP = {
  rawId: 0,
  names: 1,
  phone: 2,
  sent: 3,
  rsvp: 4,
  attending: 5,
  email: 6,
  idBase64: 7,
  sentCorona: 12
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  const sheet = new Sheets()
  await sheet.init()
  // START AUTO BLOCK

  if (false) {
    const idBase64 = '8508663105'
    const email = 'anandkumarpatel@gmail.com'
    return sendCancel(idBase64, email)
  } else {
    await getAllEmails(sheet).then((items) => {
      let count = items.length
      return items
        .reduce((promiseChain, person) => {
          const rawId = person.rawId
          const id = new Buffer(rawId).toString('base64')
          const target = person.email
          return promiseChain.then(() => {
            return sendCancel(id, target)
              .then(() => {
                console.log('SENT', id, rawId, target)
              })
              .then(() => {
                count++
                if (count % 10 === 9) return delay(5000)
              })
          })
        }, Promise.resolve())
        .catch((err) => {
          console.log('ERROR', err)
          throw err
        })
        .then(() => {
          console.log('DONE sending followups')
        })
    })
  }

  /// END AUTO BLOCK
  ///////
  ///////
  ///////

  // id in base64
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

function getCoronaList(sheet) {
  return getSheet(sheet).then((i) => {
    return i.filter((val) => {
      if (val.email && val.isAttending && !val.sentCorona) {
        return true
      }
      return false
    })
  })
}

function getAllEmails(sheet) {
  return getSheet(sheet).then((i) => {
    return i.filter((val) => {
      if (val.email && !val.sentCorona) {
        return true
      }
      return false
    })
  })
}

function getSheet(sheet) {
  return sheet.sheets.spreadsheets.values
    .get({
      spreadsheetId: '1Ab3fNGhNv1UIR6KQcxYi0OKK2kVYG5v0ecn7cyVux_Q',
      range: `${TABLE_NAME}!${FULL_RANGE}`
    })
    .catch((err) => {
      console.log('GET google Sheet API error: ' + err)
      throw err
    })
    .then((gRes) => {
      const rows = gRes.data.values
      return rows.map((row) => {
        return {
          rawId: row[ROW_MAP.rawId],
          names: row[ROW_MAP.names],
          phone: row[ROW_MAP.phone],
          isAttending: row[ROW_MAP.attending] == 'yes',
          sent: row[ROW_MAP.sent] == 'sent',
          email: row[ROW_MAP.email],
          rsvp: row[ROW_MAP.rsvp] == 'TRUE',
          sentCorona: row[ROW_MAP.sentCorona] == 'yes'
        }
      })
    })
}
async function sendMailInvite(id, decId, target) {
  return sendMail(
    target,
    `<div><div style="text-align:center"><a href="https://invite.nancyandanand.com/${id}" target="_blank"><img src="https://ci3.googleusercontent.com/proxy/4Swp2AYT2iMmyrbXf7pqnpTmsDuOtJ0adl_Rg0GjnPmi59YPiB-Z-vPLItbPUVrJ5TUgeaGP=s0-d-e1-ft#http://nancyandanand.com/invite.png" width="600" height="400"></a><br></div><span style="font-size:10pt;font-family:Arial"><div style="text-align:center"><span style="font-size:10pt">Invite Code: ${id}<br>Nancy<br>&amp;<br>Anand</span><br></div><div style="text-align:center"><img src="https://www.google-analytics.com/collect?v=1&tid=UA-141691249-1&t=event&ec=email&ea=open&dp=email-invite&uid=${id}&el=${decId}" width="1" height="1"></div></span></div>`
  )
}

async function sendMailFollowup(id, decId, target) {
  return sendMail(
    target,
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
</div>`
  )
}

async function sendCorona1(id, target) {
  return sendMail(
    target,
    `
<div>
    <span style="font-size:10pt;font-family:Arial">
    <span style="font-size:10pt">
    Dear Friends and Family,
    <br>
    <br>

    Nancy and I wanted to reach out to all of you given the outbreak of COVID-19 and our concern for the health, safety, and well-being of our friends and family.<br/>
    Although the situation is evolving daily, we are listening to the recommendations of experts, including guidance from the World Health Organization (WHO), CDC, and our local and federal governments.<br/>
    This is a time of great uncertainty and our government is implementing restrictions to prevent a potentially catastrophic event.<br/>
    We wanted to let you know that we are monitoring the situation and are in contact with our vendors about options for minimizing risk and/or postponing the wedding.<br/>

    <br/>

    <h4><b><u>Wedding Update</u></b></h4>
    <b>Our wedding is still on for now.</b><br/>
    Our wedding is just outside the two week self-imposed quarantine period set by the Governor of the State of Georgia, and we hope to see a more positive trend over the next few days.<br/>
    Although our wedding is still on, for now, we are prepared to postpone the wedding once we get more information.<br/>
    However, we understand if you decide to change your plans to attend our wedding.<br/>
    We only ask that you please let us know by <a href="https://invite.nancyandanand.com/${id}" target="_blank">updating your RSVP here</a>, or by reaching out to us by phone or e-mail.<br/>

    <br/>

    <h4><b><u>Travel Plans</u></b></h4>
    We understand that many of our family and friends booked flights and hotels to attend our wedding.<br/>
    We encourage you to wait until we provide you an update on our wedding plans before making any cancellations.<br/>
    Most airlines and hotels are offering easy cancellations and rescheduling throughout the next few weeks.<br/>

    <br/>

    <h4><b><u>Understanding the Virus</u></b></h4>
    We urge everyone to do their part by staying informed and participating in safe practices.<br/>
    The danger of the disease is how quickly it spreads even when the infected individual is not showing symptoms.<br/>
    Most people will not suffer major health consequences, but they can easily spread it to someone elderly or with chronic heart and lung problems who can get very sick which can then overwhelm the health care systems and cause shortages in resources.<br/>
    By limiting public events and social interactions and practicing self - isolation for the next two weeks, those people who may have the virus will have a chance to recover and develop immunity instead of unknowingly spreading it.<br/>
    The result would be slowing the spread of the virus so that our hospital systems can keep up and provide quality care.<br/>

    <br/>

    We hope to provide you an update in the next few days as we get more information and guidance from the WHO, CDC, and our local government.<br/>
    Our main concern is for the health, safety, and well-being of our friends and family.<br/>
    If you have any questions, please do not hesitate to contact us.<br/>

    <br/>
    <br/>

    Love,<br/>
    Nancy & Anand
  </span>
  </span>
</div>

    `
  )
}

async function sendCancel(id, target) {
  return sendMail(
    target,
    `
<div>
    <span style="font-size:10pt;font-family:Arial">
    <span style="font-size:10pt">
    Dear loved ones,
    <br>
    <br>

    We have decided to <b><u>postpone our wedding</u></b> — the lack of toilet paper should tell you why.<br/>
    Your health means a lot to us. We want to see your sick dance moves, not to see you sick!<br/>
    We know it took effort asking for timing off and booking travel to come to celebrate with us. We truly appreciate that.<br/>

    <h4><b><u>What Happens Now ?</u></b></h4>

    We are looking for a date after August for our new wedding date.<br/>
    We will be providing more details to you once we figure them out.<br/>

    <h4><b><u>Travel</u></b></h4>

    Most airlines are offering refunds or credits for your flights.<br/>
    Hotels should also be offering free cancellation.<br/>
    We recommend using the airline or hotel websites to cancel your reservations because wait times for phone calls is very high.<br/>
    <br/>
    If you have any questions, feel free to reach out to us!
    <br/><br/>
    Stay healthy,<br/>
    ❤️ Nancy & Anand
  </span>
  </span>
</div>

    `
  )
}

async function sendMail(target, msg) {
  if (process.env.RUN !== 'yes') {
    return console.log('DRY-RUN', target)
  }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'anandkumarpatel', // generated ethereal user
      pass: process.env.GOOGLE_API_KEY // generated ethereal password
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Anand Patel" <anandkumarpatel@gmail.com>', // sender address
    to: target.split(','), // list of receivers
    subject: "Nancy and Anand's wedding update.", // Subject line
    html: msg
  })

  console.log('Message sent: %s', info.messageId)
}

main().catch(console.error)
