/** Externe Abhängigkeiten */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// für die Fehlerbehandlung mit http-errors
const createError = require('http-errors')


/** Routen */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const orderRouter = require('./routes/orders');

/** Initialisierung */
const app = express();
/* 
// Mongoose Modul importieren  
const mongoose = require("mongoose");

// Simpler Adressstring: Protokoll ://  Host : Port / Datenbank  
let addressString = process.env.mongo || "mongodb://localhost:27017/datenbank";
let optionen = { useNewUrlParser: true, useUnifiedTopology: true };

// Verbindung für das Mongoose Modul herstellen mit Connect 
mongoose.connect(addressString, optionen);

// für üblich verwenden wir immer eine zentrale connection aus dem mongoose Modul 
let db = mongoose.connection;

// Ereignishandler für Fehler 
db.on('error', (fehler) => {
    console.error("Fehler mit MongoDB: "+fehler);
});

// Ereignishandler für Verbindungsaufbau 
db.on('open', ()=> {
    console.log("Bin mit der Datenbank verbunden");
})
 */

// Extern konfigurierte Datenbankverbindung//
const verbindeDB = require("./mongo-db");
verbindeDB();

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
