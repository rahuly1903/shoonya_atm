const mongoose = require("mongoose");

require("dotenv").config();

const mongoConnect = mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection is succesfull");
  })
  .catch((err) => {
    console.error("Database connection fail", err);
  });

module.exports = mongoConnect;
