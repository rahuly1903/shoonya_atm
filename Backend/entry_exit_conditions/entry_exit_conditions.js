const entry_fresh_order = require("./enter_fresh_order");
const shoonay_api = require("../middleware/shoonya_api");
const fs = require("fs");
function entry_exit_condition({
  nifty_weekly_expriy_strick,
  roundOffNifty,
  callFileName,
  putFileName,
  model_930,
}) {
  const callFileData = fs.readFileSync(`${callFileName}.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const putFileData = fs.readFileSync(`${putFileName}.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const call_entry = JSON.parse(callFileData);
  const put_entry = JSON.parse(putFileData);
  const strangle_difference = 0;

  // console.log(call_entry, put_entry, "rahul");
  // return false;
  if (call_entry["number_of_trade"] < 3 && call_entry["is_stopLoss_hit"]) {
    const tysm =
      nifty_weekly_expriy_strick +
      call_entry["product_type"] +
      (roundOffNifty + strangle_difference);
    // console.log(tysm);
    // return false;
    if (call_entry["number_of_trade"] == 0) {
      entry_fresh_order(
        tysm,
        callFileName,
        call_entry,
        roundOffNifty,
        model_930
      );
    } else {
      const order_strike_token = call_entry["order_strike_token"];
      const order_price = call_entry["order_price"];
      shoonay_api
        .get_quotes("NFO", order_strike_token)
        .then(({ lp }) => {
          if (lp > order_price) {
            return false;
          }
          entry_fresh_order(
            tysm,
            callFileName,
            call_entry,
            roundOffNifty,
            model_930
          );
        })
        .catch((error) => {
          console.log({ e: e + "Quote price fetching error" });
        });
    }
  }

  if (put_entry["number_of_trade"] < 3 && put_entry["is_stopLoss_hit"]) {
    const tysm =
      nifty_weekly_expriy_strick +
      put_entry["product_type"] +
      (roundOffNifty - strangle_difference);
    // console.log(tysm);
    // return false;
    if (put_entry["number_of_trade"] == 0) {
      entry_fresh_order(tysm, putFileName, put_entry, roundOffNifty, model_930);
    } else {
      const order_strike_token = put_entry["order_strike_token"];
      const order_price = put_entry["order_price"];
      shoonay_api
        .get_quotes("NFO", order_strike_token)
        .then(({ lp }) => {
          if (lp > order_price) {
            return false;
          }
          entry_fresh_order(
            tysm,
            putFileName,
            put_entry,
            roundOffNifty,
            model_930
          );
        })
        .catch((error) => {
          console.log({ e: e + "Quote price fetching error" });
        });
    }
  }
  // console.log("rahul", nifty_weekly_expriy_strick, roundOffNifty, call, put);
  // console.log("entry_exit_condition.js", callFileName);
}

module.exports = entry_exit_condition;
