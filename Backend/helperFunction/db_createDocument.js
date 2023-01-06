function db_creteDocument(model, modelInstance, entry_date) {
  try {
    return model
      .find({ entry_date })
      .then((data) => {
        if (data.length) {
          return "Record is exists";
        } else {
          modelInstance.save();
          return "Data is saved";
        }
      })
      .catch((e) => {
        throw "data fetching error";
      });
  } catch (e) {
    console.log(e);
    throw "catch error";
  }
}

module.exports = db_creteDocument;
