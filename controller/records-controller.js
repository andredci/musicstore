/* Ich will mit LowDB in ne lokale Datei schreiben */
const low = require('lowdb');
// Als Adapter verwende ich Syncrones (also blockierendes Schreiben in Dateien)
const FileSync = require("lowdb/adapters/FileSync");
// Hier wähle ich die Datei
const adapter = new FileSync('records.json');
// und hier mach ich mir meine Mock-Datenbank 
const mockDB = low(adapter);

mockDB.defaults({ records:[] }).write();


const recordsGetController = (req, res, next) => {
    //res.send('ich zeige alle Produkte des Ladens als Array');
    const aufnahmen = mockDB.get('records').value()
    res.status(200).send(aufnahmen);
  }

const recordsPostController = (req, res, next) => {
    //res.send("Eine neue Aufnahme im Bestand speichern.")
    const aufnahme = req.body;
    console.log("Body: " , req.body);
    mockDB.get('records').push(aufnahme)
        .last()
        // Ich mach aus dem aktuellen Datum eine eindeutige ID für den Eintrag
        .assign({ id: Date.now().toString() })
        .write()

/* Alternative Schreibweise
        mockDB.get('records')
        mockDB.push(aufnahme)
        mockDB.last()
        // Ich mach aus dem aktuellen Datum eine eindeutige ID für den Eintrag
        mockDB.assign({ id: Date.now().toString() })
        mockDB.write()
*/

    res.status(200).send(aufnahme);
}

const recordsPutController = (req, res, next) => {
    // das Segment nach /records/ ist meine ID zum ändern
    // z.b: Localhost:3001/records/1235 => req.params.id = 1235
    const zuÄnderndeID = req.params.id;
    res.send('ich ändere das Album mit ID:'+ zuÄnderndeID);
   
  }


  const recordsDeleteController = (req, res, next) => {
    const zuLöschendesAlbum = req.params.id;
    res.send('ich lösche das Album mit ID:'+ zuLöschendesAlbum);
  }


module.exports = {recordsGetController, recordsPostController, recordsPutController, recordsDeleteController};