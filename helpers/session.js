require("./env.js");

const sessionSecret = process.env.AUTH_STRING;
const mongoConnectString = process.env.MONGO_URL;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

if (!sessionSecret || !mongoConnectString) {
  console.log("Please set up all of your environment variables");
  console.log("Process exited with code: 1");
  process.exit(1);
}

module.exports = session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: "/",
    secure: false,
    httpOnly: false,
    store: new MongoStore({ url: mongoConnectString }),
  },
});
