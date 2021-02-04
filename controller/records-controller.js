// Vereinheitlicht Datenbank
const db = require('../db');

exports.recordsGetAllController = (req, res, next) => {
	//res.send('ich zeige alle Produkte des Ladens als Array');
	const aufnahmen = db
		.get('records')
		.value()
	res.status(200).send(aufnahmen);
}

exports.recordsPostController = (req, res, next) => {
	//res.send("Eine neue Aufnahme im Bestand speichern.")
	const aufnahme = req.body;
	db
		.get('records')
		.push(aufnahme)
		.last()
		// Ich mach aus dem aktuellen Datum eine eindeutige ID für den Eintrag
		.assign({ id: Date.now().toString() })
		.write()
	res.status(200).send(aufnahme);
}

exports.recordsGetOneController = (req, res, next) => {
	// das Segment nach /records/ ist meine ID zum ändern
	// z.b: localhost:3001/records/1235 => req.params.id = 1235
	const { id } = req.params;
	const record = db
		.get('records')
		.find({ id });
	res
		.status(200)
		.send(record);

	//res.send('gebe nur das eine Album zurück mit ID:' + id);
}

exports.recordsPutController = (req, res, next) => {
	// das Segment nach /records/ ist meine ID zum ändern
	// z.b: localhost:3001/records/1235 => req.params.id = 1235
	const { id } = req.params;

	const geänderteWerte = req.body;
	const Aufnahme = db
		.get('records')
		.find({ id })
		.assign(geänderteWerte)
		.write();
	res.status(200).send(Aufnahme);

	//res.send('ich ändere das Album mit ID:' + id);

}

exports.recordsDeleteController = (req, res, next) => {

	const { id } = req.params;
	const record = db
		.get('records')
		.remove({ id })
		.write();
	res.status(200).send(record);
	//res.send('ich lösche die Aufnahme mit ID:' + id);
}
