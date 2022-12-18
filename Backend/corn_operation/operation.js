const shoonay_api = require("../middleware/shoonya_api");

function operation() {
  function receiveQuote(data) {
    console.log("Quote ::", data);
  }

  function receiveOrders(data) {
    console.log("Order ::", data);
  }

  function open(data) {
    let instruments = "NSE|22#BSE|500400";
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
module.exports = operation;
