// Vereinheitlicht Datenbank
const db = require('../db');

// für GET /user 
exports.alleNutzer = (req, res, next) => {
	const users = db
		.get('users')
		.value()
	res.status(200).send(users);
}

// für POST /user
exports.erstelleNutzer = (req, res, next) => {
	const nutzer = req.body;
	db
		.get('users')
		.push(nutzer)
		.last()
		.assign({ nutzerID: Date.now().toString() })
		.write()
	res.status(200).send(nutzer);
}

// für GET /user/:nutzerID
exports.einNutzer = (req, res, next) => {
	const { nutzerID } = req.params;
	const nutzer = db
		.get('users')
		.find({ nutzerID });
	res.status(200).send(nutzer);
}

// für PUT /user/:nutzerID
exports.aktualisiereNutzer = (req, res, next) => {
	const { nutzerID } = req.params;
	const nutzerDaten = req.body;
	const nutzer = db
		.get('users')
		.find({ nutzerID })
		.assign(nutzerDaten)
		.write();
	res.status(200).send(nutzer);
}

// für DELETE /user/:nutzerID
exports.löscheNutzer = (req, res, next) => {
	const { nutzerID } = req.params;
	const nutzer = db
		.get('users')
		.remove({ nutzerID })
		.write();
	res.status(200).send(nutzer);
}
