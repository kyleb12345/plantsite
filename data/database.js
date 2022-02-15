
const mongodb = require('mongodb');
const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

const MongoClient = mongodb.MongoClient;




let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  database = client.db('myFirstDatabase');
}

function getDb() {
  if (!database) {
    throw new Error('You must connect first!');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
};