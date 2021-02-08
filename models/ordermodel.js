const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  anzahl: {
    type: Number,
    required: true
  },
  album: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Order", OrderSchema);