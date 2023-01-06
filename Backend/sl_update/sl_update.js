const fs = require("fs");
const model_930 = require("../models/model930");
const model_1030 = require("../models/model1030");
const model_1130 = require("../models/model1130");
const model_1230 = require("../models/model1230");
const currentDate = require("../helperFunction/entryDate");
const db_updateDocument = require("../helperFunction/db_udateDocument");
function sl_update(order_data) {
  const { status, norenordno, fltm, trantype, tsym, qty, avgprc, trgprc } =
    order_data;
  //   console.log("rahul");
  const entry_text_930_C = fs.readFileSync("entryText/entry_text_930_C.txt", {
    encoding: "utf8",
    flag: "r",
  });
  const entry_text_930_P = fs.readFileSync(`entryText/entry_text_930_P.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const entry_text_1030_C = fs.readFileSync(`entryText/entry_text_1030_C.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const entry_text_1030_P = fs.readFileSync(`entryText/entry_text_1030_P.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const entry_text_1130_C = fs.readFileSync(`entryText/entry_text_1130_C.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const entry_text_1130_P = fs.readFileSync(`entryText/entry_text_1130_P.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const entry_text_1230_C = fs.readFileSync(`entryText/entry_text_1230_C.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const entry_text_1230_P = fs.readFileSync(`entryText/entry_text_1230_P.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const entry_text_930_C_JSON = JSON.parse(entry_text_930_C);
  const entry_text_930_P_JSON = JSON.parse(entry_text_930_P);
  const entry_text_1030_C_JSON = JSON.parse(entry_text_1030_C);
  const entry_text_1030_P_JSON = JSON.parse(entry_text_1030_P);
  const entry_text_1130_C_JSON = JSON.parse(entry_text_1130_C);
  const entry_text_1130_P_JSON = JSON.parse(entry_text_1130_P);
  const entry_text_1230_C_JSON = JSON.parse(entry_text_1230_C);
  const entry_text_1230_P_JSON = JSON.parse(entry_text_1230_P);

  if (status == "COMPLETE") {
    const call = {
      order_time: fltm,
      buy_sell_type: trantype,
      order_no: norenordno,
      option_name: tsym,
      qty: qty,
      avg_price: avgprc,
      trg_price: trgprc,
    };
    const query = { entry_date: currentDate() };
    switch (norenordno) {
      case entry_text_930_C_JSON["sl_order_id"]:
        try {
          entry_text_930_C_JSON["is_stopLoss_hit"] = true;
          const entry_text_930_C_TXT = JSON.stringify(entry_text_930_C_JSON);
          fs.writeFileSync(
            "entryText/entry_text_930_C.txt",
            entry_text_930_C_TXT
          );

          db_updateDocument("sl_update.js", query, model_930, "C", call);
        } catch (e) {
          console.log("sl_update.js", e);
        }
        break;
      case entry_text_930_P_JSON["sl_order_id"]:
        try {
          entry_text_930_P_JSON["is_stopLoss_hit"] = true;
          const entry_text_930_P_TXT = JSON.stringify(entry_text_930_P_JSON);
          fs.writeFileSync(
            "entryText/entry_text_930_P.txt",
            entry_text_930_P_TXT
          );

          db_updateDocument("sl_update.js", query, model_930, "P", call);
        } catch (e) {
          console.log("sl_update.js", e);
        }
        break;
      case entry_text_1030_C_JSON["sl_order_id"]:
        entry_text_1030_C_JSON["is_stopLoss_hit"] = true;
        const entry_text_1030_C_TXT = JSON.stringify(entry_text_1030_C_JSON);
        fs.writeFileSync(
          "entryText/entry_text_1030_C.txt",
          entry_text_1030_C_TXT
        );
        try {
          db_updateDocument("sl_update.js", query, model_1030, "C", call);
        } catch (e) {
          console.log(e);
        }
        break;
      case entry_text_1030_P_JSON["sl_order_id"]:
        entry_text_1030_P_JSON["is_stopLoss_hit"] = true;
        const entry_text_1030_P_TXT = JSON.stringify(entry_text_1030_P_JSON);
        fs.writeFileSync(
          "entryText/entry_text_1030_P.txt",
          entry_text_1030_P_TXT
        );
        try {
          db_updateDocument("sl_update.js", query, model_1030, "P", call);
        } catch (e) {
          console.log(e);
        }
        break;
      case entry_text_1130_C_JSON["sl_order_id"]:
        entry_text_1130_C_JSON["is_stopLoss_hit"] = true;
        const entry_text_1130_C_TXT = JSON.stringify(entry_text_1130_C_JSON);
        fs.writeFileSync(
          "entryText/entry_text_1130_C.txt",
          entry_text_1130_C_TXT
        );
        try {
          db_updateDocument("sl_update.js", query, model_1130, "C", call);
        } catch (e) {
          console.log(e);
        }
        break;
      case entry_text_1130_P_JSON["sl_order_id"]:
        entry_text_1130_P_JSON["is_stopLoss_hit"] = true;
        const entry_text_1130_P_TXT = JSON.stringify(entry_text_1130_P_JSON);
        fs.writeFileSync(
          "entryText/entry_text_1130_P.txt",
          entry_text_1130_P_TXT
        );
        try {
          db_updateDocument("sl_update.js", query, model_1130, "P", call);
        } catch (e) {
          console.log(e);
        }
        break;
      case entry_text_1230_C_JSON["sl_order_id"]:
        entry_text_1230_C_JSON["is_stopLoss_hit"] = true;
        const entry_text_1230_C_TXT = JSON.stringify(entry_text_1230_C_JSON);
        fs.writeFileSync(
          "entryText/entry_text_1230_C.txt",
          entry_text_1230_C_TXT
        );
        try {
          db_updateDocument("sl_update.js", query, model_1230, "C", call);
        } catch (e) {
          console.log(e);
        }
        break;
      case entry_text_1230_P_JSON["sl_order_id"]:
        entry_text_1230_P_JSON["is_stopLoss_hit"] = true;
        const entry_text_1230_P_TXT = JSON.stringify(entry_text_1230_P_JSON);
        fs.writeFileSync(
          "entryText/entry_text_1230_P.txt",
          entry_text_1230_P_TXT
        );
        try {
          db_updateDocument("sl_update.js", query, model_1230, "P", call);
        } catch (e) {
          console.log(e);
        }
        break;
      default:
    }
  }
}

module.exports = sl_update;
