const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const WS = require("ws");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");

const wss = new WS.Server({ server });
const router = require("./routers/routers");
// const wss_feed = require("./ws_feed/ws_feed");
const cron_atm = require("./corn_operation/operation");
const port = process.env.PORT || 4100;

// for wss live feed
// wss_feed(wss);

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
