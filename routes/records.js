/* Router für meine Musikaufnahmen. */

const express = require('express');
const router = express.Router();

/* Ich will mit LowDB in ne lokale Datei schreiben */
const low = require('lowdb');
// Als Adapter verwende ich Syncrones (also blockierendes Schreiben in Dateien)
const FileSync = require("lowdb/adapters/FileSync");
// Hier wähle ich die Datei
const adapter = new FileSync('records.json');
// und hier mach ich mir meine Mock-Datenbank 
const mockDB = low(adapter);

mockDB.defaults({ records:[] }).write();


// GET zum auflisten
router.get('/', function(req, res, next) {
  //res.send('ich zeige alle Produkte des Ladens als Array');
  const aufnahmen = mockDB.get('records').value()
  res.status(200).send(aufnahmen);
});

// POST zum neu anlegen.
router.post("/", (req, res, next) => {
    //res.send("Eine neue Aufnahme im Bestand speichern.")
    const aufnahme = req.body;
    console.log("Body: " , req.body);
    mockDB.get('records').push(aufnahme)
        .last()
        // Ich mach aus dem aktuellen Datum eine eindeutige ID für den Eintrag
        .assign({ id: Date.now().toString() })
        .write()

    res.status(200).send(aufnahme);
})

module.exports = router;
