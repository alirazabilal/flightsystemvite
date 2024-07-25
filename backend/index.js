const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const connectToMongo = require("./db");
connectToMongo();

var cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/flights", require("./routes/flights"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
