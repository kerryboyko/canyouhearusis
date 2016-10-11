"use strict";
// ******************
// REQUIREMENTS
// ******************

const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
let stripeKey;
if (process.env.STRIPE_SECRET_KEY){
  stripeKey = process.env.STRIPE_SECRET_KEY;
} else if (fs.accessSync('./secrets.js')) {
  stripeKey = require('./secrets.js').STRIPE_SECRET_KEY;
}
const stripe = require("stripe")(stripeKey);
const app = express();
const server = http.Server(app);
const nodemailer = require('nodemailer');

server.listen(port, () => {
  console.log('Server is listening on port ' + port);
});

app.use(cors());
app.use(bodyParser.json({
  limit: '100mb'
}));
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
}));

// to serve the pages.
app.use('/', express.static('./'));
app.use('/dist', express.static('dist'));
app.use('/about', express.static('./'));
app.use('/constitution', express.static('./'));
app.use('/learn', express.static('./'));
app.use('/donate', express.static('./'));
app.use('/thankyou', express.static('./'));
app.use('/img', express.static('./src/frontend/img'));

// just a test endpoint.
app.get('/api/test', (req, res) => {
  console.log(req.body);
  res.send("body" + JSON.stringify(req.body) + "answer: Foo");
});

// to integrate with stripe.
app.post('/api/donation', (req, res) => {
  let charge = stripe.charges.create({
    currency: 'usd',
    source: req.body.token.id,
    amount: req.body.amount,
    description: "Donation to Can You Hear Us?",
  }, (err, charge) => {
    if(err){
      console.log("ERR", err);
    } else{
      console.log(charge);
      res.send("SUCCESS_CHARGE");
    }
  });
});
//
// // mailer
// // create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
//
// // setup e-mail data with unicode symbols
// var mailOptions = {
//   from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
//   to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//   subject: 'Hello ✔', // Subject line
//   text: 'Hello world 🐴', // plaintext body
//   html: '<b>Hello world 🐴</b>' // html body
// };
//
// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//   if(error){
//     return console.log(error);
//   }
//   console.log('Message sent: ' + info.response);
// });
