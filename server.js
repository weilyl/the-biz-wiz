require("dotenv").config();
const log = require("./middleware/log");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3030;

//middleware
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
