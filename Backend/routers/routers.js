const express = require("express");
const router = express.Router();
const fs = require("fs");
const shoonay_api = require("../middleware/shoonya_api");
let { authparams } = require("../cred");

router.post("/login", (req, res) => {
  const twoFA = 787671;
  authparams["twoFA"] = twoFA.toString();
  shoonay_api
    .login(authparams)
    .then((responce) => {
      sessionTime = responce.susertoken;
      fs.writeFileSync("token.txt", responce.susertoken);
      res.send({ responce });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/token", (req, res) => {
  try {
    const token = fs.readFileSync("token.txt", "utf-8");
    res.send({ token });
  } catch (e) {
    res.send({ e });
  }
});

router.get("/bn", (req, res) => {
  const exch = req.query.exch || "nfo";
  const query = req.query.ticker;
  console.log(req.query.ticker, exch);
  try {
    shoonay_api
      .searchscrip((exchange = exch.toUpperCase()), (searchtext = query))
      .then((reply) => {
        console.log(reply, reply);
        res.send({ reply });
      })
      .catch((error) => {
        console.log("error", error);
        res.send({ e: "Session Expired" });
      });
  } catch (e) {
    res.send({ e });
  }
});

router.get("/n", (req, res) => {
  try {
    shoonay_api
      .get_quotes("NSE", "26000")
      .then(({ responce }) => {
        console.log(responce);
        res.send(responce);
      })
      .catch((error) => {
        console.log("error", error);
        res.send({ error });
      });
  } catch (e) {
    res.send({ e });
  }
});

router.get("/ws", (req, res) => {
  res.send({ He: "Hello" });
});

// router.get("/logout", (req, res) => {
//   const exch = "NFO";
//   const query = "BANKNIFTY";
//   shoonay_api.logout().then((reply) => {
//     res.send({ reply });
//   });
// });

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/place-sl-order", (req, res) => {
  console.log(req.body);

  // place order
  let orderparams = {
    buy_or_sell: "B",
    product_type: "C",
    exchange: "NSE",
    tradingsymbol: req.body.strike, //"BANKNIFTY08SEP22P28000",
    quantity: 1,
    discloseqty: 0,
    price_type: "SL-LMT",
    retention: "DAY",
    trigger_price: req.body.triggerPrice,
    price: req.body.price,
    remarks: "my_order_002",
  };

  shoonay_api
    .place_order(orderparams)
    .then((reply) => {
      console.log("Order responce", reply);
    })
    .catch((e) => {
      console.log(e.data);
    });

  res.send({ order: "New order Placed" });
});

module.exports = router;
