import mongodb from 'mongodb';
const mongoClient = mongodb.MongoClient;
const MONGO_URL = 'mongodb://heroku_q3mrb19f:k1gop251fvk69ukmo15t2jal7k@ds055956-a0.mlab.com:55956,ds055956-a1.mlab.com:55956/heroku_q3mrb19f?replicaSet=rs-ds055956';



export const connectToMongo = () => new Promise((resolve, reject) => {
  MongoClient.connect(MONGO_URL, (err, db) => {
    if(err){
      reject(err);
    } else {
      resolve(db);
      db.close();
    }
  });
});

export const addDonation = (donationData) => connectToMongo()
  .then((db) => {
    let donations = db.collection('testDonations');
    donations.insert(donationData, (err, result) => {
      if(err){
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
