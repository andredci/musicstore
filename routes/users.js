const express = require('express');
const router = express.Router();

const {
  alleNutzer, erstelleNutzer, einNutzer, aktualisiereNutzer, löscheNutzer 
} = require('../controller/users-controller');

router
    .route('/')
        .get(alleNutzer)
        .post(erstelleNutzer);

router
    .route('/:nutzerID')
        .get(einNutzer)
        .put(aktualisiereNutzer)
        .delete(löscheNutzer);

module.exports = router;
