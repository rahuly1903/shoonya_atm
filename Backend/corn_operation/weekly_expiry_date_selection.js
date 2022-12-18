//takes dayIndex from sunday(0) to saturday(6)
weekly_expiry_date_selection = (dayIndex, params) => {
  var today = new Date();
  today.setDate(
    today.getDate() + ((dayIndex - 1 - today.getDay() + 7) % 7) + 1
  );
  const expiray_month = today
    .toLocaleString("default", {
      month: "short",
    })
    .toUpperCase();
  const expiray_day = today.getDate();
  const expiray_year = String(today.getFullYear()).slice(2);
  const roundOffNifty = nifty_price_roundOf(params);
  const arr_data = `NIFTY${expiray_day}${expiray_month}${expiray_year}`;
  return [arr_data, roundOffNifty];
};

module.exports = weekly_expiry_date_selection;
