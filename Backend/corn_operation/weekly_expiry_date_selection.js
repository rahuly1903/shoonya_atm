//takes dayIndex from sunday(0) to saturday(6)
const nifty_roundoff_price = require("./nifty_roundoff_price");
const time_based_entry = require("./time_based_entry");

weekly_expiry_date_selection = (dayIndex, params) => {
  // .toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  var expirayThursday = new Date();

  expirayThursday.setDate(
    expirayThursday.getDate() +
      ((dayIndex - 1 - expirayThursday.getDay() + 7) % 7) +
      1
  );

  const expiray_month = expirayThursday
    .toLocaleString("default", {
      month: "short",
    })
    .toUpperCase();

  const expiray_day = expirayThursday.getDate();
  const expiray_year = String(expirayThursday.getFullYear()).slice(2);
  const roundOffNifty = nifty_roundoff_price(params);
  const nifty_weekly_expriy_strick = `NIFTY${expiray_day}${expiray_month}${expiray_year}`;
  // const roundOffNifty = params;
  // const nifty_weekly_expriy_strick = "ITC-EQ";
  const localHour = new Date().getHours();
  const localMinute = new Date().getMinutes();
  time_based_entry({
    nifty_weekly_expriy_strick,
    roundOffNifty,
    localHour,
    localMinute,
  });
};

module.exports = weekly_expiry_date_selection;
