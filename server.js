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
// use the key from the server, or if we're in local dev, from the secrets.js
// file that I have not shared to Github for obvious reasons.
let stripeKey = process.env.STRIPE_SECRET_KEY;
if (!process.env.STRIPE_SECRET_KEY){
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


var transporter = nodemailer.createTransport('smtps://brian.boyko@gmail.com:LiberTango1@smtp.gmail.com');

const makeEmailText = (amount, currency) => "Thank you for your donation / Takk fyrir að styðja nýja stjórnarskrá og lýðræðið í landinu okkar." +
'\n\n' + 'Your Donation / Styðja: ' + (currency === 'usd' ? "$" + (amount / 100) : (amount/100) ) +  " " + currency.toUpperCase() +
'\n\n' + '-- CanYouHearUs.is';

const sendThankYou = (to, amount, currency) => {

  let mailOptions = {
    from: '"Can You Hear Us" <thankyou@canyouhearus.is>', // sender address
    to: to, // list of receivers
    subject: 'Thank you/Takk! (CAN YOU HEAR US? / HEYRIÐI Í OKKUR?)',
    text: makeEmailText(amount, currency), // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      //return console.log(error);
    }
    //console.log('Message sent: ' + info.response);
  });

};


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
    } else {
      // TODO: KNOWN BUG - Sending thank you e-mails currently doesn't work as
      // the canyouhearus.is domain is not set up yet.
      // sendThankYou(charge.source.name, charge.amount, charge.currency);
      res.send("SUCCESS_CHARGE");
    }
  });
});
