const shoonay_api = require("../middleware/shoonya_api");
const WSS_feed = (wss) => {
  wss.on("connection", (ws) => {
    let instrument = "";
    function receiveQuote(data) {
      console.log(data);
      ws.send(JSON.stringify(data));
    }

    function open(data) {
      let instruments = instrument;
      shoonay_api.subscribe(instruments);
      console.log("subsribing to :: ", instruments);
    }
    params = {
      socket_open: open,
      quote: receiveQuote,
    };
    ws.on("message", (message) => {
      instrument = message;
      shoonay_api.start_websocket(params);
      console.log("received: %s", message);
    });
  });
};

module.exports = WSS_feed;
