const express = require("express");
require("dotenv").config();
const db = require("./config/db");

// dotenv.config();
const app = express();

app.listen(8800, () => {
  db.connect();
  console.log("connected to backend.");
});
