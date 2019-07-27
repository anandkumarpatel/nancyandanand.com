"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {

  const id = 'XXX'
  const target = 'XXX'
  const decId = Buffer.from(id, 'base64').toString('ascii')
  return sendMail(id, decId, target)
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
