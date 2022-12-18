function operation(api) {
  console.log("hello");
  function get_price() {}
  try {
    api
      .get_quotes("NSE", "26000")
      .then((responce) => {
        console.log(responce);
      })
      .catch((error) => {
        console.log("error", error);
      });
  } catch (e) {
    console.log(e);
  }
  get_price();
}

module.exports = operation;
