const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');





function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  let dbUrl = process.env.MONGODB_URL;


  const store = new MongoDBStore({
    url: dbUrl,
    collection: 'sessions',
    touchAfter: 24 * 60 * 60
  });

  return store;
}


function createSessionConfig() {
  return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 2 * 24 * 60 * 60 * 1000
    }
  };
}

module.exports = createSessionConfig;