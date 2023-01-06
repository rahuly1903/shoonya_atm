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
    call: {
      // C: {
      //   order_no: {
      //     type: Number,
      //   },
      //   order_time: {
      //     type: String,
      //   },
      //   option_name: {
      //     type: String,
      //   },
      //   buy_sell_type: {
      //     type: String,
      //   },
      //   qty: {
      //     type: Number,
      //   },
      //   avg_price: {
      //     type: Number,
      //   },
      // },
      // P: {
      //   order_no: {
      //     type: Number,
      //   },
      //   order_time: {
      //     type: String,
      //   },
      //   option_name: {
      //     type: String,
      //   },
      //   buy_sell_type: {
      //     type: String,
      //   },
      //   qty: {
      //     type: Number,
      //   },
      //   avg_price: {
      //     type: Number,
      //   },
      // },
    },
    put: {},
  },
  {
    timestamps: true,
  }
);

const entryModel = mongoose.model("entry_930", entrySchema);

// console.log(userSchema);

module.exports = entryModel;
