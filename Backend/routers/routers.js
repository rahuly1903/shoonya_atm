const express = require("express");
const router = express.Router();
const fs = require("fs");
const shoonay_api = require("../middleware/shoonya_api");
let { authparams } = require("../cred");

router.get("/", (req, res) => {
  res.send({ homepage: "Homepage" });
});

router.get("/time", (req, res) => {
  res.send({ homepage: new Date() });
});

router.get("/login", (req, res) => {
  const twoFA = req.query.otp;

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

router.get("/place-sl-order", (req, res) => {
  console.log(req.body);

  // place order
  let orderparams = {
    buy_or_sell: "B",
    product_type: "C",
    exchange: "NSE",
    tradingsymbol: "INFY-EQ", //"BANKNIFTY08SEP22P28000",
    quantity: 1,
    discloseqty: 0,
    price_type: "SL-LMT",
    retention: "DAY",
    trigger_price: "341",
    price: "342",
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

router.get("/order", (req, res) => {
  const orderNumber = 22122100149782;
  shoonay_api
    .get_single_order_history(orderNumber)
    .then((data) => {
      res.send({ data });
    })
    .catch((e) => {
      res.send(e);
    });
});

router.get("/place-itc-order", (req, res) => {
  // place order
  let orderparams = {
    buy_or_sell: "B",
    product_type: "C",
    exchange: "NSE",
    tradingsymbol: "ITC-EQ",
    quantity: 1,
    discloseqty: 0,
    price_type: "MKT",
    retention: "DAY",
    price: 0,
    remarks: "my_order_002",
  };

  shoonay_api
    .place_order(orderparams)
    .then((reply) => {
      console.log("Order responce", reply);

      const orderNumber = reply.norenordno;
      shoonay_api
        .get_single_order_history(orderNumber.toString())
        .then((data) => {
          const { status, avgprc } = data[0];
          if (status == "COMPLETE") {
            // Place stoploss to order
            let stopLossOrderParams = {
              buy_or_sell: "S",
              product_type: "C",
              exchange: "NSE",
              tradingsymbol: "ITC-EQ",
              quantity: 1,
              discloseqty: 0,
              price_type: "SL-LMT",
              price: praseFloat(avgprc) - 0.5,
              trigger_price: praseFloat(avgprc) - 0.4,
              retention: "DAY",
              remarks: "my_order_002",
            };
            shoonay_api
              .place_order(stopLossOrderParams)
              .then((reply) => {
                console.log("StopLoss responce", reply);
                res.send({ "StopLoss responce": reply });
              })
              .catch((e) => {
                res.send({ e: "StopLoss error" });
              });
          }
        })
        .catch((e) => {
          res.send({ e: e + "get_single_order_history error" });
        });
    })
    .catch((e) => {
      res.send({ e: e + "Place order error" });
    });
});

router.get("/orders", (req, res) => {
  shoonay_api
    .get_orderbook()
    .then((reply) => {
      // console.log("order history", reply);
      const data = reply.filter((order) => order.trantype == "B");
      res.send({ data });
    })
    .catch((e) => {
      res.send({ e });
    });
});

router.get("/trades", (req, res) => {
  shoonay_api
    .get_tradebook()
    .then((reply) => {
      console.log("order history", reply);
      res.send({ reply });
    })
    .catch((e) => {
      res.send({ e });
    });
});

router.get("/holdings", (req, res) => {
  shoonay_api
    .get_holdings()
    .then((reply) => {
      console.log("holding history", reply);
      res.send({ reply });
    })
    .catch((e) => {
      res.send({ e });
    });
});

router.get("/positions", (req, res) => {
  shoonay_api
    .get_positions()
    .then((reply) => {
      console.log("positions history", reply);
      res.send({ reply });
    })
    .catch((e) => {
      res.send({ e });
    });
});

module.exports = router;
