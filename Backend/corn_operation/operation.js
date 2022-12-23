const shoonay_api = require("../middleware/shoonya_api");
const weekly_expiry_date_selection = require("./weekly_expiry_date_selection");
const node_cron = require("node-cron");
let niftyPrice = "";

function operation() {
  function receiveQuote(data) {
    // console.log(data.lp);
    niftyPrice = data.lp;
  }

  function receiveOrders(data) {
    console.log("Order ::", data);
  }

  function open(data) {
    let instruments = "NSE|26000";
    shoonay_api.subscribe(instruments);
    console.log("subsribing to :: ", instruments);
  }

  params = {
    socket_open: open,
    quote: receiveQuote,
    order: receiveOrders,
  };

  shoonay_api.start_websocket(params);
}

node_cron.schedule("* * * * *", () => {
  weekly_expiry_date_selection(4, niftyPrice);
});

module.exports = operation;
