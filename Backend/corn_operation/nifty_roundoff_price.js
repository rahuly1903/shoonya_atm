//Price round off
nifty_roundOff_price = (params) => {
  let mod = parseInt(params) % 50;
  let atm_Strike, atm_trading_symbol;
  if (mod < 25) {
    atm_Strike = parseInt(Math.floor(params / 50)) * 50;
  } else {
    atm_Strike = parseInt(Math.ceil(params / 50)) * 50;
  }
  console.log("nifty_roundoff_price.js", params, atm_Strike);
  return atm_Strike;
};

module.exports = nifty_roundOff_price;
