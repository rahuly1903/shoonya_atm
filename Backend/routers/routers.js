const express = require("express");
const router = express.Router();
const fs = require("fs");
const shoonay_api = require("../middleware/shoonya_api");
let { authparams } = require("../cred");
const model_930 = require("../models/model930");
const model_1030 = require("../models/model1030");
const model_1130 = require("../models/model1130");
const model_1230 = require("../models/model1230");
const call_json = require("../entry_tracking_json/entry_time_json_call");
const put_json = require("../entry_tracking_json/entry_time_json_put");
const currentDate = require("../helperFunction/entryDate");
const db_creteDocument = require("../helperFunction/db_createDocument");

const current_entry_date = currentDate();
// console.log("rahul", model_930);

router.get("/", (req, res) => {
  res.send({ homepage: "Homepage" });
});

router.get("/time", (req, res) => {
  res.send({ homepage: new Date() });
});

router.get("/create-table", (req, res) => {
  var startTime = performance.now();
  const call_string = JSON.stringify(call_json["call"]);
  const put_string = JSON.stringify(put_json["put"]);

  fs.writeFileSync("entryText/entry_text_930_C.txt", call_string);
  fs.writeFileSync("entryText/entry_text_930_P.txt", put_string);
  fs.writeFileSync("entryText/entry_text_1030_C.txt", call_string);
  fs.writeFileSync("entryText/entry_text_1030_P.txt", put_string);
  fs.writeFileSync("entryText/entry_text_1130_C.txt", call_string);
  fs.writeFileSync("entryText/entry_text_1130_P.txt", put_string);
  fs.writeFileSync("entryText/entry_text_1230_C.txt", call_string);
  fs.writeFileSync("entryText/entry_text_1230_P.txt", put_string);

  const entryTime_930 = new model_930({
    entry_date: current_entry_date,
    order_note: "model 9:30",
    C: [],
    P: [],
  });
  const entryTime_1030 = new model_1030({
    entry_date: current_entry_date,
    order_note: "model 10:30",
    C: [],
    P: [],
  });
  const entryTime_1130 = new model_1130({
    entry_date: current_entry_date,
    order_note: "model 11:30",
    C: [],
    P: [],
  });
  const entryTime_1230 = new model_1230({
    entry_date: current_entry_date,
    order_note: "model 12:30",
    C: [],
    P: [],
  });

  try {
    const responce_930 = db_creteDocument(
      model_930,
      entryTime_930,
      current_entry_date
    );
    const responce_1030 = db_creteDocument(
      model_1030,
      entryTime_1030,
      current_entry_date
    );
    const responce_1130 = db_creteDocument(
      model_1130,
      entryTime_1130,
      current_entry_date
    );
    const responce_1230 = db_creteDocument(
      model_1230,
      entryTime_1230,
      current_entry_date
    );
    responce_930.then((res) => {
      console.log(res);
    });
    console.log(responce_930, responce_1030, responce_1130, responce_1230);
    res.send({ e: "Documentation created successfully" });
  } catch (e) {
    res.send({ e: e + "Documentation creation issue" });
  }
  var endTime = performance.now();
  console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
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

router.get("/push-data", (req, res) => {
  const call = {
    order_no: Math.floor(Math.random() * 1000000000),
    order_time: new Date(),
    option_name: "Nifty DEC 2022",
    buy_sell_type: "S",
    qty: 1,
    avg_price: 270,
  };
  const put = {
    order_no: Math.floor(Math.random() * 1000000000),
    order_time: new Date(),
    option_name: "Nifty DEC 2022",
    buy_sell_type: "S",
    qty: 1,
    avg_price: 270,
  };
  const query = { entry_date: "31-12-2022" };
  try {
    // const entryDate = new model_1230();
    model_1230.findOneAndUpdate(
      query,
      { $push: { call: call, put: put } },
      function (err, data) {
        console.log(err, data);
      }
    );
    res.send("Successfully insert");
  } catch (e) {
    console.log("catch error", e);
    res.send("catch error");
  }
});

router.get("/enter-data", (req, res) => {
  const entryDate = new model_1230({
    entry_date: "31-12-2022",
    order_note: "model 12:30",
    orders_history: {
      C: [],
      P: [],
    },
  });
  //

  const entry_date = "31-12-2022";
  try {
    model_1230
      .find({ entry_date })
      .then((data) => {
        if (data.length) {
          res.send("Record is exists");
        } else {
          entryDate.save();
          res.send("Data is saved");
        }
      })
      .catch((e) => {
        console.log(e);
        res.send("data fetching error");
      });
  } catch (e) {
    console.log("catch error");
    res.send("catch error");
  }
});

router.get("/token", (req, res) => {
  try {
    const token = fs.readFileSync("token.txt", "utf-8");
    res.send({ token });
  } catch (e) {
    res.send({ e });
  }
});

router.get("/search", (req, res) => {
  const exch = req.query.exch || "nfo";
  const query = req.query.ticker;
  console.log(req.query.ticker, exch);
  try {
    shoonay_api
      .searchscrip((exchange = exch.toUpperCase()), (searchtext = query))
      .then((reply) => {
        // console.log(reply, reply);
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

router.get("/quotes", (req, res) => {
  try {
    shoonay_api
      .get_quotes("NFO", "39969")
      .then(({ lp }) => {
        res.send({ lp });
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

router.get("/modify-order", (req, res) => {
  const order_id = req.query.id;
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

router.get("/get-data", (req, res) => {
  const user = model_1230.find(req.params.id);
});

router.get("/update-data", (req, res) => {
  const user = model_1230.findById(req.params.id);
});

router.get("/order", (req, res) => {
  const orderNumber = req.query.no;
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
            const user = model_1230.findById(req.params.id);
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
