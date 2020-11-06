const express = require("express");
const bodyParser = require("body-parser");
const { dbConnect, session } = require("./helpers");

const app = express();

dbConnect.connect();

app.use(bodyParser.json());
app.use(session);
app.use(require("./routes/functional.js"));
app.use("/item", require("./routes/item.js"));
app.use("/user", require("./routes/user.js"));

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.use((req, res) => {
  res.status(404);

  if (req.accepts("json")) {
    res.json("Page not found");
    return;
  }

  res.type("txt").send("Page not found");
});

app.listen(3000, () => {
  console.log("Server is live!");
});
