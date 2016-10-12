'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.launchRoutes = undefined;

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _database = require('./database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;
// import {sendThankYou} from './mailer';

var stripeKey = process.env.STRIPE_SECRET_KEY;
if (!process.env.STRIPE_SECRET_KEY) {
  stripeKey = require('../secrets.js').STRIPE_SECRET_KEY;
}
var stripe = require("stripe")(stripeKey);
var nodemailer = require('nodemailer');

var launchRoutes = exports.launchRoutes = function launchRoutes(server, app) {
  server.listen(port, function () {
    console.log('Server is listening on port ' + port);
  });
  app.use((0, _cors2.default)());
  app.use(_bodyParser2.default.json({
    limit: '100mb'
  }));
  app.use(_bodyParser2.default.urlencoded({
    limit: '100mb',
    extended: true
  }));

  // to serve the pages.
  app.use('/', _express2.default.static('./'));
  app.use('/dist', _express2.default.static('./dist'));
  app.use('/about', _express2.default.static('./'));
  app.use('/constitution', _express2.default.static('./'));
  app.use('/learn', _express2.default.static('./'));
  app.use('/donate', _express2.default.static('./'));
  app.use('/thankyou', _express2.default.static('./'));
  app.use('/img', _express2.default.static('./src/frontend/img'));

  // just a test endpoint.
  app.get('/api/test', function (req, res) {
    console.log(req.body);
    res.send("body" + JSON.stringify(req.body) + "answer: Foo");
  });

  // to integrate with stripe.
  app.post('/api/donation', function (req, res) {
    var charge = stripe.charges.create({
      currency: 'usd',
      source: req.body.token.id,
      amount: req.body.amount,
      description: "Donation to Can You Hear Us?"
    }, function (err, charge) {
      if (err) {
        console.log("ERR", err);
      } else {
        // TODO: KNOWN BUG - Sending thank you e-mails currently doesn't work as
        // the canyouhearus.is domain is not set up yet.
        // sendThankYou(charge.source.name, charge.amount, charge.currency);
        var dbInfo = Object.assign(_lodash2.default.pick(charge, ['amount', 'currency', 'created']), { country: charge.source.country, email: charge.source.name });
        (0, _database.addDonation)(dbInfo).then(function (result) {
          if (result) {
            console.log(JSON.stringify(result, null, 2));
          }
          res.send(result);
        }).catch(function (err) {
          console.log("ERR! ", err);
          res.send(err);
        });
      }
    });
  });
};

exports.default = {
  launchRoutes: launchRoutes
};