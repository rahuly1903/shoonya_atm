function db_updateDocument(fileName, query, model, order_option_type, call) {
  if (order_option_type == "C") {
    model.findOneAndUpdate(
      query,
      { $push: { call: call } },
      function (err, data) {
        if (err) {
          console.log(fileName, e);
        }
        // console.log(err, data);
      }
    );
  } else {
    model.findOneAndUpdate(
      query,
      { $push: { put: call } },
      function (err, data) {
        if (err) {
          console.log(fileName, e);
        }
        // console.log(err, data);
      }
    );
  }
}

module.exports = db_updateDocument;
