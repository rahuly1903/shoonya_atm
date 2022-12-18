const searchscrip = (req, res) => {
  console.log(api);
  const exch = req.query.exch || "nfo";
  const query = req.query.ticker;
  console.log(req.query.ticker, exch);
  try {
    api
      .searchscrip((exchange = exch.toUpperCase()), (searchtext = query))
      .then((reply) => {
        res.send({ reply });
      })
      .catch((error) => {
        console.log("error", error);
        res.send({ e: "Session Expired" });
      });
  } catch (e) {
    res.send({ e });
  }
};

module.exports = searchscrip;
