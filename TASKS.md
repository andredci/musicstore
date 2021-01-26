## Die Liste der Schritte, die gegangen werden

Diese Datei enthält die Liste der Änderungen, die in jeder Phase gemacht werden müssen. 
Sie ist zeitlich umgekehrt sortiert, also stehen die letzten / neusten Änderungen oben in der Datei. 
So muss nicht immer bis ganz runter gescrollt werden.


## Aufgabe 01 - Aller Schein trügt, Scheindatenbanken und Controller

Das englische Nomen mock oder verb (to) mock, bedeutet sinngemäß "nur zum Schein", angeblich, vorgespielt.

Die meisten Anwendungen, die für das Internet gemacht sind, haben es irgendwann mit der Manipulation von Daten zu tun.
Um unsere Daten zu ändern, werden wir zunächst zwei Dinge tun.

* Wir definieren die sog. Endpunkte (engl. endpoints) unserer Anwendung, an die Nutzer ihre Anfragen schicken (GET, POST, DELETE, etc.) zu deutsch (abfragen, hinsenden, löschen, u.s.w.)
* Wir müssen festlegen wie unsere Daten aussehen sollen und natürlich auch, wo wir sie speichern können.

**Die Geschichte**: Unser Kunde ist Inhaber eines Musikgeschäfts, der seine Produkte auf der Hauptseite seiner Shop-Webseite anzeigen will.
Wir wissen, dass wir Titel, Interpret, Jahr und ein Coverbild, sowie den Preis unserer Produkte anzeigen wollen, die wir auf Lager haben.
Bisher hat der Kunde noch keine volle Liste seiner Produkte. Er möchte also auch neue Produkte zu seinem Angebot hinzufügen können.

**Die Schritte**:

1. Erstelle zwei Endpunkte (Routen) für den oder die Ladeninhaber_in.

- `api/records` -> eine `GET` Anfrage wird alle Produkte des Ladens zurückgeben
- `api/records` -> eine `POST` Anfrage, wird ein neues Produkt zum Angebot hinzufügen.

Zunächst kannst Du hier einfach Meldungen zurückgeben, die die Antwort beschreiben, nur um zu sehen ob alles geht.

2. Als Scheindatenbank für unser Angebot können wir `lowdb` (de: low=niedrig, db=datenbank) benutzen [lowdb auf npmjs.com](https://www.npmjs.com/package/lowdb). Die kann leer sein oder auch Fakedaten enthalten. Aktualisiere deine Routen aus 1. also so, dass sie nun Daten aus der lowdb-Datenbank lesen oder dort reinschreiben.
