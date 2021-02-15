const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  anzahl: Number,
  album: Number
});

module.exports = mongoose.model("Order", OrderSchema);