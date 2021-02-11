// Vereinheitlicht Datenbank
const User = require("../models/usermodel");

// für GET /user 
exports.alleNutzer = (req, res, next) => {

	User.find().then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch( (fehler) => {
		res.status(500).send("Fehler bei find() "+fehler);
	});
}

// für POST /user
exports.erstelleNutzer = (req, res, next) => {
	const nutzer = req.body;

	User.create(nutzer).then(
		(ergebnis) => {
			res.status(201).send(ergebnis);
		}
	).catch((fehler) => {
		res.status(500).send("Fehler bei create() "+fehler);
	});

}

// für GET /user/:nutzerID
exports.einNutzer = (req, res, next) => {
	const { nutzerID } = req.params;
	User.find( { _id:  nutzerID}).then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch( (fehler) => {
		res.status(500).send(`Fehler bei find(_id:${nutzerID}) `+fehler);
	});

}

// für PUT /user/:nutzerID
exports.aktualisiereNutzer = (req, res, next) => {
	const { nutzerID } = req.params;
	const nutzerDaten = req.body;

	User.findOneAndUpdate({_id: nutzerID}, nutzerDaten).then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch( (fehler) => {
		res.status(500).send(`Fehler bei findOneAndUpdate(_id: ${nutzerID}`+fehler);
	});

}

// für DELETE /user/:nutzerID
exports.löscheNutzer = (req, res, next) => {
	const { nutzerID } = req.params;

	User.deleteOne({_id : nutzerID}).then( (ergebnis) => {
		res.status(200).send(ergebnis);
	}).catch( (fehler) => {
		res.status(500).send(`Fehler bei User.deleteOne(_id: ${nutzerID}`+fehler);
	})

}
