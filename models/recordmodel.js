const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecordSchema = new Schema({
  titel: {
    type: String,
    required: true
  },
  band: {
    type: String,
    required: true
  },
  jahr: {
    type: Number,
    required: true
  },
  bild: {
    type: String,
    required: true
  },
  preis: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Record", RecordSchema);