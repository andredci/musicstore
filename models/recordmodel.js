const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecordSchema = new Schema({
  titel: String,
  band: String,
  jahr: Number,
  bild: String,
  preis: Number
});

// Exportieren als Modell, mit Angabe eines Sammlungsnamens (Collection)
module.exports = mongoose.model("Record", RecordSchema);