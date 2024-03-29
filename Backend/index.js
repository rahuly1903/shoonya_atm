const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");

// mongo database connect
require("./database/dbConnection");

const router = require("./routers/routers");
const cron_atm = require("./corn_operation/operation");
const port = process.env.PORT || 4100;

app.use(cors());
app.use("/finvasia", express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// operation.js -- run the code to sell ATM option based on time on weekly expiry day
cron_atm();

app.use("/", router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// return false;
