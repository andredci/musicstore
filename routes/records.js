/* Router für meine Musikaufnahmen. Basis Pfad /records/ (aus App.js) */
const express = require('express');
const router = express.Router();

const {
    alleRecords,
	erstelleRecord,
	aktualisiereRecord,
	löscheRecord,
	einRecord
} = require('../controller/records-controller');

// Verkürzte Schreibweise,
// mehrere Methoden (GET/POST) für einen Endpunkt.
router
	.route('/')
	.get(alleRecords)
	.post(erstelleRecord)
	.put((res, req,next) => {
		res.status(422).send("PUT braucht eine ID im URL-Segment")
	})
	.delete((res, req, next) => {
		res.status(422).send("DELETE braucht eine ID im URL-Segment")
	})

router
	// Hier definieren wir ein Stück Route mit Parameter.
	// das nächste URL Segment nach /router/ wird in einen Parameter namens id eingelesen
	.route('/:id')
	.get(einRecord)
	.put(aktualisiereRecord)
	.delete(löscheRecord);

module.exports = router;
