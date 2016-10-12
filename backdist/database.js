'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDonation = exports.addToTotal = exports.retrieveTotal = exports.connectToMongo = undefined;

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;
var MONGO_URL = 'mongodb://heroku_q3mrb19f:k1gop251fvk69ukmo15t2jal7k@ds055956-a0.mlab.com:55956,ds055956-a1.mlab.com:55956/heroku_q3mrb19f?replicaSet=rs-ds055956';

// by default, db will be undefined. But if we've already got a perfectly good db connection,
// why waste it.
var connectToMongo = exports.connectToMongo = function connectToMongo() {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(MONGO_URL, function (err, db) {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
};

var retrieveTotal = exports.retrieveTotal = function retrieveTotal() {
  return new Promise(function (resolve, reject) {
    connectToMongo().then(function (db) {
      resolve(db.collection('testTotal').findOne({}, { sort: { $natural: -1 } })); // most recent first
      db.close();
    }).catch(function (err) {
      console.log(err);
      reject(err);
      db.close();
    });
  });
};

var addToTotal = exports.addToTotal = function addToTotal(_ref) {
  var amount = _ref.amount;
  var currency = _ref.currency;
  return new Promise(function (resolve, reject) {
    retrieveTotal().then(function (previous) {
      var total = _lodash2.default.pick(previous, ["usd", "isk"]);
      total[currency] += amount;
      return Promise.all([total, connectToMongo()]);
    }).then(function (v) {
      return { total: v[0], db: v[1] };
    }).then(function (_ref2) {
      var total = _ref2.total;
      var db = _ref2.db;

      var totals = db.collection('testTotal');
      totals.insert(total, function (err, result) {
        if (err) {
          reject(err);
          db.close();
        } else {
          resolve({ amount: amount, currency: currency, result: result });
          db.close();
        }
      });
    });
  });
};

var addDonation = exports.addDonation = function addDonation(donationData, db, keepAlive) {
  return new Promise(function (resolve, reject) {
    connectToMongo(db).then(function (db) {
      var donations = db.collection('testDonations');
      donations.insert(donationData, function (err, record) {
        if (err) {
          reject(err);
          db.close();
        } else {
          return addToTotal({ db: db, amount: donationData.amount, currency: donationData.currency }).then(function (total) {
            resolve({ record: record, total: total });
            db.close();
          });
        }
      });
    }).catch(function (err) {
      return console.log(err);
    });
  });
};