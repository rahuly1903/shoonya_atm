const { call, put } = require("../entry_tracking_object/entry_time_obj_1230");
const entry_exit_condition = require("../entry_exit_conditions/entry_exit_conditions");

function entry_1230({ nifty_weekly_expriy_strick, roundOffNifty }) {
  const fileName = "entryText/entry_text_1230";
  entry_exit_condition({
    nifty_weekly_expriy_strick,
    roundOffNifty,
    call,
    put,
    fileName,
  });
}

module.exports = entry_1230;
