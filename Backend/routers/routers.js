const fs = require("fs");

const Router = function (api) {
  this.login = (req, res) => {
    const twoFA = 787671;
    authparams["twoFA"] = twoFA.toString();
    api
      .login(authparams)
      .then((responce) => {
        sessionTime = responce.susertoken;
        fs.writeFileSync("token.txt", responce.susertoken);
        res.send({ responce });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  this.token = (req, res) => {
    try {
      const token = fs.readFileSync("token.txt", "utf-8");
      res.send({ token });
    } catch (e) {
      res.send({ e });
    }
  };

  this.bn = (req, res) => {
    const exch = req.query.exch || "nfo";
    const query = req.query.ticker;
    console.log(req.query.ticker, exch);
    try {
      api
        .searchscrip((exchange = exch.toUpperCase()), (searchtext = query))
        .then((reply) => {
          res.send({ reply });
        })
        .catch((error) => {
          console.log("error", error);
          res.send({ e: "Session Expired" });
        });
    } catch (e) {
      res.send({ e });
    }
  };

  this.n = (req, res) => {
    try {
      api
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
  };

  this.ws = (req, res) => {
    res.send({ He: "Hello" });
  };

  this.logout = (req, res) => {
    const exch = "NFO";
    const query = "BANKNIFTY";
    api.logout().then((reply) => {
      res.send({ reply });
    });
  };

  this.place_order = (req, res) => {
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

    api
      .place_order(orderparams)
      .then((reply) => {
        console.log("Order responce", reply);
      })
      .catch((e) => {
        console.log(e.data);
      });

    res.send({ order: "New order Placed" });
  };
};
module.exports = Router;
