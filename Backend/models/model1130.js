const mongoose = require("mongoose");

// console.log(mongoose);

const Schema = mongoose.Schema;

const entrySchema = new Schema(
  {
    entry_date: {
      type: String,
      required: true,
    },
    order_note: {
      type: String,
      required: true,
    },
    call: {},
    put: {},
  },
  {
    timestamps: true,
  }
);

const entryModel = mongoose.model("entry_1130", entrySchema);

// console.log(userSchema);

module.exports = entryModel;
