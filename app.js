/** Externe Abhängigkeiten */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/* Ich will mit LowDB in ne lokale Datei schreiben */
const low = require('lowdb');
// Als Adapter verwende ich Syncrones (also blockierendes Schreiben in Dateien)
const FileSync = require("lowdb/adapters/FileSync");
// Hier wähle ich die Datei
const adapter = new FileSync('records.json');
// und hier mach ich mir meine Mock-Datenbank 
const aufnahmenDB = low(adapter);
// Als Standard einen Leeren records-Eintrag anlegen, wenn nix da ist
aufnahmenDB.defaults({ records:[] }).write();

/** Routen */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require("./routes/records");

/** Initialisierung */
const app = express();

/** Protokollierung */
app.use(logger('dev'));

/** Anfrage (Request) Parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Bevor ich die Routen-Middlewares hinzufüge
// Packe ich die CORS header via Middleware in jede Antwort.
const corsHeader = require("./middleware/cors");
app.use(corsHeader);

/** Statisch ausgelieferte Dateien */
app.use(express.static(path.join(__dirname, 'public')));


/** Routen */
app.use('/', indexRouter);
app.use('/users', usersRouter);
// Aufnahmen-Router unter /records einfügen
app.use("/records", recordsRouter);

/** Export */
module.exports = app;
