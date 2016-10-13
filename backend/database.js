import mongodb from 'mongodb';
import _ from 'lodash';
const MongoClient = mongodb.MongoClient;
const MONGO_URL = 'mongodb://heroku_q3mrb19f:k1gop251fvk69ukmo15t2jal7k@ds055956-a0.mlab.com:55956,ds055956-a1.mlab.com:55956/heroku_q3mrb19f?replicaSet=rs-ds055956';


// by default, db will be undefined. But if we've already got a perfectly good db connection,
// why waste it.
export const connectToMongo = () => new Promise((resolve, reject) => {
  MongoClient.connect(MONGO_URL, (err, db) => {
    if(err){
      reject(err);
    } else {
      resolve(db);
    }
  });
});


export const retrieveTotal = () => new Promise((resolve, reject) => {
  connectToMongo().then((db) => {
    resolve(db.collection('testTotal').findOne({}, {sort:{$natural:-1}})); // most recent first
    db.close();
  })
  .catch((err) => {
    console.log(err);
    reject(err);
    db.close();
  });
});

export const addToTotal = ({amount, currency}) => new Promise((resolve, reject) => {
  retrieveTotal().then((previous) => {
    let total = _.pick(previous, ["usd", "isk"]);
    total[currency] += amount;
    return Promise.all([
      total,
      connectToMongo(),
    ]);
  })
  .then((v) => ({total: v[0], db: v[1]}))
  .then(({total, db}) => {
    let totals = db.collection('liveTotal');
    totals.insert(total, (err, result) => {
      if(err) {
        reject(err);
        db.close();
      } else {
        resolve({amount, currency, result});
        db.close();
      }
    });
  });
});

export const addDonation = (donationData, db, keepAlive) => new Promise((resolve, reject) => {
  connectToMongo(db)
    .then((db) => {
      let donations = db.collection('liveDonations');
      donations.insert(donationData, (err, record) => {
        if (err) {
          reject(err);
          db.close();
        } else {
          return addToTotal({db, amount: donationData.amount, currency: donationData.currency})
            .then((total) => {
              resolve({record, total});
              db.close();
            });
        }
      });
    }).catch((err) => console.log(err));
});
