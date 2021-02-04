/** Externe Abhängigkeiten */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// für die Fehlerbehandlung mit http-errors
const createError = require('http-errors')


/** Import für die Datenbank vereinheitlicht */
const db = require('./db.js');

/** Routen */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const orderRouter = require('./routes/orders');

/** Initialisierung */
const app = express();

/** Protokollierung aus NPM-Paket morgan */
app.use(logger('dev'));

/** Standard-Anfrage (Request) Parser von Express */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Bevor ich die Routen-Middlewares hinzufüge,
// packe ich die CORS Header via Middleware in jede Antwort (response).
const corsHeader = require("./middleware/cors");

app.use(corsHeader);

/** Statisch ausgelieferte Dateien */
app.use(express.static(path.join(__dirname, 'public')));

/** Routen */
app.use('/', indexRouter);
// Nutzer / Aufnahmen / Bestellungen
app.use('/users', usersRouter);
app.use("/records", recordsRouter);
app.use('/orders', orderRouter);

/** Fehlerbehandlung */
// eine Fehlermeldung für alle nicht definierte Pfade:
app.get('*', (req,res, next) =>{
  // Fehler werfen: 
  let fehler = new Error('Diesen Pfad gibt es nicht')
  fehler.statusCode = 404;
  // FEHLER EXTRA: wir können fehler-Objekte auch mit dem Paket http-errors erstellen:
  const fehlerKurz = createError(404, 'Diesen Pfad gibt es nicht')

  // weitergeben an nächster Middleware
  next(fehlerKurz)
})


// usere Fehler middle ware: 
app.use((error, req,res,next) => {
  // fehlermeldung auf der Console ausgeben:
  console.log('Unser FehlerMiddleware', error);
  // fehlermedlung senden:
  // status im header setzen:
  res.status(error.statusCode)
  // // wir senden ein Error objekt zurück zum Frontend
  res.send({
    error: {
      status: error.statusCode,
      mitteilung: error.message 
    }
  })
  // nur code schicken: Eine Alternative:
  // res.sendStatus(404)

})

/** Export */
module.exports = app;
