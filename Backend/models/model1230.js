const mongoose = require("mongoose");

// console.log(mongoose);

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    order_note: {
      type: String,
      required: true,
    },
    ordernote: {
      type: String,
      required: true,
    },
    orders_history: [
      {
        order_no: {
          type: Number,
          required: true,
        },
        order_time: {
          type: String,
          required: true,
        },
        option_name: {
          type: String,
          required: true,
        },
        buy_sell_type: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        avg_price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("Admin", adminSchema);

// console.log(userSchema);

module.exports = userModel;
