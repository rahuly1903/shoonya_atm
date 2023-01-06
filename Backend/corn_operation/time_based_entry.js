// const entry_time = require("./entry_time");
const entry_exit_condition = require("../entry_exit_conditions/entry_exit_conditions");
const exit_condition = require("../entry_exit_conditions/exit_conditions");
const model_930 = require("../models/model930");
const model_1030 = require("../models/model1030");
const model_1130 = require("../models/model1130");
const model_1230 = require("../models/model1230");

function time_based_entry(data) {
  const { roundOffNifty, localHour, localMinute } = data;
  const entryTime = parseInt("" + localHour + localMinute);
  // if (entryTime >= 1215 && roundOffNifty) {
  //   entry_exit_condition({
  //     ...data,
  //     callFileName: "entryText/entry_text_930_C",
  //     putFileName: "entryText/entry_text_930_P",
  //     model_930,
  //   });
  // }
  // if (localHour >= 1230 && roundOffNifty) {
  //   entry_exit_condition({
  //     ...data,
  //     callFileName: "entryText/entry_text_1030_C",
  //     putFileName: "entryText/entry_text_1030_P",
  //   });
  // }
  // if (localHour >= 1245 && roundOffNifty) {
  //   entry_exit_condition({
  //     ...data,
  //     callFileName: "entryText/entry_text_1130_C",
  //     putFileName: "entryText/entry_text_1130_P",
  //   });
  // }
  // if (localHour >= 1300 && roundOffNifty) {
  //   entry_exit_condition({
  //     ...data,
  //     callFileName: "entryText/entry_text_1230_C",
  //     putFileName: "entryText/entry_text_1230_P",
  //   });
  // }
  if (entryTime == 1510 && roundOffNifty) {
    exit_condition();
  }
}
module.exports = time_based_entry;
