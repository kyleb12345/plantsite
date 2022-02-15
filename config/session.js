const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');





function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  let dbUrl = process.env.MONGODB_URL;


  const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'sessions'
  });

  return store;
}

const secret = process.env.SECRET || 'super-secret';

function createSessionConfig() {
  return {
    secret,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000
    }
  };
}

module.exports = createSessionConfig;