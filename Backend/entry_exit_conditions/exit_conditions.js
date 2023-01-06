const fs = require("fs");
const exit_order = require("./exit_order");
function exit_condition() {
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
  const entry_json_obj = {
    entry_text_930_C_JSON: JSON.parse(entry_text_930_C),
    entry_text_930_P_JSON: JSON.parse(entry_text_930_P),
    entry_text_1030_C_JSON: JSON.parse(entry_text_1030_C),
    entry_text_1030_P_JSON: JSON.parse(entry_text_1030_P),
    entry_text_1130_C_JSON: JSON.parse(entry_text_1130_C),
    entry_text_1130_P_JSON: JSON.parse(entry_text_1130_P),
    entry_text_1230_C_JSON: JSON.parse(entry_text_1230_C),
    entry_text_1230_P_JSON: JSON.parse(entry_text_1230_P),
  };
  for (const [key, value] of Object.entries(entry_json_obj)) {
    console.log(`${key}: ${value.is_stopLoss_hit}`);
    if (!value.is_stopLoss_hit) {
      exit_order(value);
    }
  }
  // console.log(entry_json_array);
  // entry_json_array.;

  //   if (!entry_text_930_C_JSON["is_stopLoss_hit"]) {
  //     exit_order();
  //     }
  //     if (!entry_text_930_C_JSON["is_stopLoss_hit"]) {
  //       exit_order();
  //     }
  //     if (!entry_text_930_C_JSON["is_stopLoss_hit"]) {
  //       exit_order();
  //     }
  //     if (!entry_text_930_C_JSON["is_stopLoss_hit"]) {
  //       exit_order();
  //     }
  //     if (!entry_text_930_C_JSON["is_stopLoss_hit"]) {
  //       exit_order();
  //     }
  //     if (!entry_text_930_C_JSON["is_stopLoss_hit"]) {
  //       exit_order();
  //     }
}

module.exports = exit_condition;
