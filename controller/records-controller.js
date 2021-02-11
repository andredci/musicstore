// Recordsmodell importieren
const Record = require('../models/recordmodel');

exports.alleRecords = (req, res, next) => {
	Record.find().then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch( (fehler) => {
		res.status(500).send("Fehler bei Record.find(): "+fehler);
	});
}

exports.erstelleRecord = (req, res, next) => {
	//res.send("Eine neue Aufnahme im Bestand speichern.")
	const aufnahme = req.body;

	Record.create(aufnahme).then(
		(ergebnis) => {
			res.status(201).send(ergebnis);
		}
	).catch( (fehler) => {
		res.status(500).send("Fehler bei Record.create(): "+fehler);
	});
}

exports.einRecord = (req, res, next) => {
	// das Segment nach /records/ ist meine ID zum ändern
	// z.b: localhost:3001/records/1235 => req.params.id = 1235
	const { id } = req.params;

	Record.find({_id: id}).then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch( (fehler) => {
		res.status(500).send(`Fehler bei Record.find(_id: ${id}): `+fehler);
	});
}

exports.aktualisiereRecord = (req, res, next) => {
	// das Segment nach /records/ ist meine ID zum ändern
	// z.b: localhost:3001/records/1235 => req.params.id = 1235
	const { id } = req.params;
	const geänderteWerte = req.body;

	Record.findOneAndUpdate({_id: id}, geänderteWerte).then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch( (fehler) => {
		res.status(500).send(`Fehler bei Record.findOneAndUpdate(_id: ${id}`+fehler);
	});
}

exports.löscheRecord = (req, res, next) => {

	const { id } = req.params;
	Record.deleteOne({_id : id}).then( (ergebnis) => {
		res.status(200).send(ergebnis);
	}).catch( (fehler) => {
		res.status(500).send(`Fehler bei Record.deleteOne(_id: ${id}`+fehler);
	})
}
