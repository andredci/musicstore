/* Router für meine Musikaufnahmen. Basis Pfad /records/ (aus App.js) */
const express = require('express');
const router = express.Router();

const { recordsGetController, recordsPostController, recordsPutController, recordsDeleteController } = require('../controller/records-controller');

// Verkürzte Schreibweise, um mehrere Methoden (GET/POST) für einen Routenendpunkt zu definieren.
router
    .route('/')
        .get(recordsGetController)
        .post(recordsPostController);


    
router
    // Hier definieren wir ein Stück Route mit Parameter.
    // das nächste URL Segment nach /router/ wird in einen Parameter namens id eingelesen
    .route('/:id')
        .put(recordsPutController)
        .delete(recordsDeleteController);


module.exports = router;
