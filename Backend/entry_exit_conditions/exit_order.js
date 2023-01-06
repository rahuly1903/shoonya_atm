const shoonay_api = require("../middleware/shoonya_api");
require("dotenv").config();

function exit_order(order_data) {
  const qty = process.env.QTY;
  const { order_tysm, sl_order_id } = order_data;
  const modify_order_params = {
    exchange: "NFO",
    tradingsymbol: order_tysm,
    orderno: sl_order_id,
    newquantity: qty,
    newprice_type: "MKT",
    newprice: "0",
  };
  console.log(modify_order_params);
  shoonay_api
    .modify_order(modify_order_params)
    .then((data) => {})
    .catch((e) => {
      console.log(e);
    });
}

module.exports = exit_order;
