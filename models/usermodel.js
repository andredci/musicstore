const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    vorName: {
      type: String,
      required: true
    },
    nachName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    passwort: {
      type: String,
      required: true
    }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

// Das Feld existiert nicht im Mongo-Dokument, kann aber aus dessen Daten berechnet werden
UserSchema.virtual("vollerName").get(function() {
  return `${this.vorName} ${this.nachName}`;
});

// Andere Beispiele wären, das Alter aus dem Geburtsdatum und ähnliches.

module.exports = mongoose.model("User", UserSchema);