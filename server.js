require("dotenv").config();
const db = require("./db");
const log = require("./middleware/log");
const express = require("express");
const app = express();
const businessRouter = require('./routes/business');

const PORT = process.env.PORT || 3030;

//middleware
app.use(express.urlencoded());

// routers
app.use('/business', businessRouter)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
