"use strict";
// ******************
// REQUIREMENTS
// ******************

const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
let stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeKey);
const app = express();
const server = http.Server(app);

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

app.use('/', express.static('./'));
app.use('/dist', express.static('dist'));
app.use('/about', express.static('./'));
app.use('/constitution', express.static('./'));
app.use('/learn', express.static('./'));
app.use('/donate', express.static('./'));
app.use('/thankyou', express.static('./'));
app.use('/img', express.static('./src/frontend/img'));

app.get('/api/test', (req, res) => {
  console.log(req.body);
  res.send("body" + JSON.stringify(req.body) + "answer: Foo");
});

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
      res.send("SUCCESS_CHARGE");
    }
  });
});
