const mongoose = require("mongoose");
require("./env.js");

const mongoConnectString = process.env.MONGO_URL;
if (!mongoConnectString) {
  console.log("Please set up all of your environment variables");
  console.log("Please exited with code: 1");
  process.exit(1);
}

function connect() {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);
  mongoose.connect(mongoConnectString);
  const mongoDB = mongoose.connection;

  mongoDB.on("error", (err) => {
    console.error(`MongoDB error: \n${err}`);
    throw err;
  });
  if (mongoDB.readyState === 2) {
    mongoDB.once("connected", () => {
      console.log("Connected to MongoDB!");
      return true;
    });
  } else {
    throw new Error("Not connected  to MongoDB");
  }
}

module.exports = {
  connect,
};
