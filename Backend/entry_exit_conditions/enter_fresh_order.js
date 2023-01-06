const fs = require("fs");
const shoonay_api = require("../middleware/shoonya_api");
const currentDate = require("../helperFunction/entryDate");
const db_updateDocument = require("../helperFunction/db_udateDocument");

function entry_fresh_order(tysm, fileName, fileData, roundOffNifty, model) {
  // console.log(tysm, fileName, fileData);
  // console.log(fileName, fileName.split("0_")[1]);
  // const order_option_type = fileName.split("0_")[1];
  // db_updateDocument(order_option_type);
  // return false;
  const quantity = 50;
  const call_entry = fileData;

  let orderparams = {
    buy_or_sell: "S",
    product_type: "M",
    exchange: "NFO",
    tradingsymbol: tysm,
    quantity: quantity,
    discloseqty: 0,
    price_type: "MKT",
    retention: "DAY",
    price: 0,
    remarks: fileName.split("/")[1],
  };
  shoonay_api
    .place_order(orderparams)
    .then((reply) => {
      const { norenordno } = reply;
      shoonay_api
        .get_single_order_history(norenordno)
        .then((data) => {
          const { status, avgprc, token, qty, trantype, tsym, exch_tm } =
            data[0];

          if (status == "COMPLETE") {
            const off_20 = avgprc * 2.1;
            const trigger_price = (Math.round(off_20 / 0.05) * 0.05).toFixed(2);
            const off_22 = avgprc * 2.11;
            const price = (Math.round(off_22 / 0.05) * 0.05).toFixed(2);
            // Place stoploss to order
            let stopLossOrderParams = {
              buy_or_sell: "B",
              product_type: "M",
              exchange: "NFO",
              tradingsymbol: tysm,
              quantity: quantity,
              discloseqty: 0,
              price_type: "SL-LMT",
              price: price,
              trigger_price: trigger_price,
              retention: "DAY",
              remarks: fileName.split("/")[1],
            };
            shoonay_api
              .place_order(stopLossOrderParams)
              .then((reply) => {
                call_entry["order_id"] = norenordno;
                call_entry["order_strike"] = roundOffNifty;
                call_entry["order_strike_token"] = token;
                call_entry["order_tysm"] = tysm;
                call_entry["order_price"] = avgprc;
                call_entry["sl_order_id"] = reply.norenordno;
                call_entry["sl_order_price"] = trigger_price;
                call_entry["number_of_trade"] += 1;
                call_entry["is_stopLoss_hit"] = false;
                const updated_call_string = JSON.stringify(call_entry);
                fs.writeFileSync(`${fileName}.txt`, updated_call_string);
                try {
                  const call = {
                    order_time: exch_tm,
                    buy_sell_type: trantype,
                    order_no: norenordno,
                    option_name: tsym,
                    qty: qty,
                    avg_price: avgprc,
                  };
                  const query = { entry_date: currentDate() };
                  const order_option_type = fileName.split("0_")[1];
                  db_updateDocument(
                    "enter_fresh_order.js",
                    query,
                    model,
                    order_option_type,
                    call
                  );
                  // res.send("Successfully insert");
                } catch (e) {
                  console.log("catch error", e);
                  // res.send("catch error");
                }
              })
              .catch((e) => {
                console.log({ e: e + `${fileName}:StopLoss error` });
              });
          }
        })
        .catch((e) => {
          console.log({ e: e + `${fileName}:get_single_order_history error` });
        });
    })
    .catch((e) => {
      console.log({ e: e + `${fileName}:Place order error` });
    });
}

module.exports = entry_fresh_order;
