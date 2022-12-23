const entry_930 = require("./entry_930");
const entry_1030 = require("./entry_1030");
const entry_1130 = require("./entry_1130");
const entry_1230 = require("./entry_1230");

function time_based_entry(data) {
  const { roundOffNifty, localHour, localMinute } = data;
  //   return false;
  if (localHour == 9 && localMinute >= 30) {
    entry_930(data);
  }
  if (localHour == 10 && localMinute >= 30) {
    entry_1030(data);
  }
  if (localHour == 11 && localMinute >= 30) {
    entry_1130(data);
  }
  if (localHour >= 12 && localMinute >= 0 && roundOffNifty) {
    entry_1230(data);
  }
}
module.exports = time_based_entry;
