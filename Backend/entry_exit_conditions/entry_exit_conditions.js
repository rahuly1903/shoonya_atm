const shoonay_api = require("../middleware/shoonya_api");
const fs = require("fs");
function entry_exit_condition({
  nifty_weekly_expriy_strick,
  roundOffNifty,
  call,
  put,
  fileName,
}) {
  // console.log(call, put, fileName);
  if (call["number_of_trade"] == 0 && call["is_stopLoss_hit"]) {
    const call_strike =
      nifty_weekly_expriy_strick + call["product_type"] + roundOffNifty;
    call["order_strike"] = call_strike;
    call["number_of_trade"] += 1;
    call["is_stopLoss_hit"] = false;
    const callString = JSON.stringify(call);
    fs.writeFileSync(`${fileName}_C.txt`, callString);
  }

  if (put["number_of_trade"] == 0 && put["is_stopLoss_hit"]) {
    const put_strike =
      nifty_weekly_expriy_strick + put["product_type"] + roundOffNifty;
    put["order_strike"] = put_strike;
    put["number_of_trade"] += 1;
    put["is_stopLoss_hit"] = false;
    const putString = JSON.stringify(put);
    fs.writeFileSync(`${fileName}_P.txt`, putString);
  }

  if (
    call["number_of_trade"] > 0 &&
    call["number_of_trade"] > 3 &&
    call["is_stopLoss_hit"]
  ) {
    const call_strike =
      nifty_weekly_expriy_strick + call["product_type"] + roundOffNifty;
    call["order_strike"] = call_strike;
    call["number_of_trade"] += 1;
    call["is_stopLoss_hit"] = false;
    const callString = JSON.stringify(call);
    fs.writeFileSync(`${fileName}_C.txt`, callString);
  }

  if (
    call["number_of_trade"] > 0 &&
    call["number_of_trade"] > 3 &&
    call["is_stopLoss_hit"]
  ) {
    const call_strike =
      nifty_weekly_expriy_strick + call["product_type"] + roundOffNifty;
    call["order_strike"] = call_strike;
    call["number_of_trade"] += 1;
    call["is_stopLoss_hit"] = false;
    const putString = JSON.stringify(put);
    fs.writeFileSync(`${fileName}_P.txt`, putString);
  }
  console.log("rahul", nifty_weekly_expriy_strick, roundOffNifty, call, put);
}

module.exports = entry_exit_condition;
