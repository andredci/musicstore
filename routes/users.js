const express = require('express');
const router = express.Router();

const {
  alleNutzer, erstelleNutzer, einNutzer, aktualisiereNutzer, löscheNutzer 
} = require('../controller/users-controller');

router
    .route('/')
        .get(alleNutzer)
        .post(erstelleNutzer)
        .put((res, req,next) => {
          res.status(422).send("PUT braucht eine ID im URL-Segment")
        })
        .delete((res, req, next) => {
          res.status(422).send("DELETE braucht eine ID im URL-Segment")
        })

router
    .route('/:nutzerID')
        .get(einNutzer)
        .put(aktualisiereNutzer)
        .delete(löscheNutzer);

module.exports = router;
