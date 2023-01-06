const shoonay_api = require("../middleware/shoonya_api");
const sl_update = require("../sl_update/sl_update");
const weekly_expiry_date_selection = require("./weekly_expiry_date_selection");
const node_cron = require("node-cron");
let isNiftySubscribed = false;
let niftyPrice = "";

function operation() {
  node_cron.schedule(
    "* * 9-15 4-5 * *",
    () => {
      // console.log("rahul2");
      try {
        let time = new Date();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        // console.log(time);
        if (!isNiftySubscribed) {
          try {
            function receiveQuote(data) {
              niftyPrice = data.lp;
            }

            function receiveOrders(data) {
              if (data.status == "COMPLETE") {
                console.log("Order ::", data);
                sl_update(data);
              }
            }

            function open(data) {
              if (data.s == "OK") {
                isNiftySubscribed = true;
                let instruments = "NSE|26000";
                shoonay_api.subscribe(instruments);
                console.log("subsribing to :: ", instruments);
              }
            }

            const params = {
              socket_open: open,
              quote: receiveQuote,
              order: receiveOrders,
            };

            shoonay_api.start_websocket(params);
          } catch (e) {
            console.log(e);
          }
        }
        if (!niftyPrice) {
          return false;
        }
        if (hour == 15 && minute == 59) {
          isNiftySubscribed = false;
        }
        // console.log(isNiftySubscribed);
        setTimeout(() => {
          weekly_expiry_date_selection(4, niftyPrice);
        }, 3000);
      } catch (e) {
        console.log(e);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
}

// let update_shoonya_token = false;

// node_cron.schedule("* * * * *", () => {

// });

module.exports = operation;
