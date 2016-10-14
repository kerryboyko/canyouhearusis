const port = process.env.PORT || 3000;
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import _ from 'lodash';
// import {sendThankYou} from './mailer';
import {addDonation, retrieveTotal} from './database';
let stripeKey = process.env.STRIPE_SECRET_KEY;
if (!process.env.STRIPE_SECRET_KEY){
  stripeKey = require('../secrets.js').STRIPE_SECRET_KEY;
}
const stripe = require("stripe")(stripeKey);
const nodemailer = require('nodemailer');


export const launchRoutes = (server, app) => {
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
  app.use('/dist', express.static('./dist'));
  app.use('/about', express.static('./'));
  app.use('/constitution', express.static('./'));
  app.use('/learn', express.static('./'));
  app.use('/donate', express.static('./'));
  app.use('/thankyou', express.static('./'));
  app.use('/subscribe', express.static('./'));
  app.use('/parties', express.static('./'));
  app.use('/pdf', express.static('./pdf'));

  app.use('/favicon.ico', express.static('./favicon.ico'))
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
      } else {
        // TODO: KNOWN BUG - Sending thank you e-mails currently doesn't work as
        // the canyouhearus.is domain is not set up yet.
        // sendThankYou(charge.source.name, charge.amount, charge.currency);
        let dbInfo = Object.assign(_.pick(charge, ['amount', 'currency', 'created']), {country: charge.source.country, email: charge.source.name});
        addDonation(dbInfo).then((result) => {
          res.send(result);
        }).catch((err) => {
          console.log("ERR! ", err);
          res.send(err);
        });
      }
    });
  });

};

export default {
  launchRoutes
};
