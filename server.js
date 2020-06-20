// init project
var express = require("express");
var app = express();
var fs = require("fs");

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

var aktuelleKarte = [
  {
    type: "spawn",
    x: 1,
    y: 1,
    text:
      "Du stehst am Eingang des Dungeons. Vor dir wartet die Dunkelheit und eine Horde hungriger Monster. Versuche /osten oder die /hilfe."
  },
  {
    type: "heiltrank",
    x: 1,
    y: 2,
    text:
      "Auf einem Tisch stehen ein paar Flaschen. Auf dem Etikett steht Heiltrank. Du könntest ihn /benutzen. Wenn du nach /süden weiter gehst, landest du im unteren Teil des Dungeons."
  },
  {
    type: "feld",
    x: 1,
    y: 3,
    text: "Aus dem Süden hörst du regelmäßiges Hämmern auf Metall. Was ist das?"
  },
  {
    type: "amboss",
    x: 1,
    y: 4,
    text:
      "🛠️ Eine kleine Schmiede. Der Ofen glüht noch und es gibt auch einige Zauberbücher. Du kannst für 5 Heldendaten einen Zauberspruch /lernen oder zur Verteidigung ein /Schild schmieden im Austausch für eine Heldentat. Das Schild gibt dir 180🛡️ Gesundheit."
  },
  {
    type: "truhe",
    x: 2,
    y: 1,
    text:
      "🎁 Du siehst eine alte Holztruhe. Willst du wissen was sich darin befindet, dann versuche /öffnen.\n\nStärkere Monster lassen Waffen fallen, die du danach vom Boden /nehmen kannst.",
    inhalt: 1
  },
  {
    type: "feld",
    x: 2,
    y: 3,
    text:
      "🌡️ Es ist so heiß hier! Es muss ein großer Ofen in der Nähe sein. Puh, du schwitzt, hoffentlich hält dein Deo."
  },
  {
    type: "feld",
    x: 2,
    y: 4,
    text:
      "👈 Im Westen ist eine Schmiede. Dort kannst du dir ein Schild schmieden."
  },
  {
    type: "feld",
    x: 3,
    y: 1,
    text: "Du stehst am Tor zum gefährlichen Teil des Dungeons!"
  },
  {
    type: "feld",
    x: 3,
    y: 2,
    text: "Du stehst am Tor zum gefährlichen Teil des Dungeons!"
  },
  {
    type: "feld",
    x: 3,
    y: 3,
    text: "Du stehst am Tor zum gefährlichen Teil des Dungeons!"
  },
  {
    type: "truhe",
    x: 3,
    y: 4,
    text:
      "🍀 Mitten im Dungeon siehst du eine Kiste des Glücks! Diese Kiste bietet ein wechselndes Angebot von gewöhnlichen Waffen. Versuche deine Glück mit /öffnen.",
    inhalt: 2
  },
  {
    type: "feld",
    x: 4,
    y: 1,
    text: "🔥 Ein kahler Platz. Deine Fackel erleuchtet den Weg."
  },
  {
    type: "feld",
    x: 4,
    y: 2,
    text: "🩸 Du siehst Blut an den Wänden. Hier wird viel gekämpft."
  },
  {
    type: "feld",
    x: 4,
    y: 3,
    text: "⛔ Dunkelheit, Dreck und Monstergeschrei!"
  },
  {
    type: "altar",
    x: 4,
    y: 4,
    text:
      "⛩️ Überall hörst du Monster! Moment, da glitzert etwas im Dreck! /nehmen?"
  },
  {
    type: "feld",
    x: 5,
    y: 1,
    text: "👉 Im /Osten siehst du etwas leuchten im Dunkeln!"
  },
  {
    type: "feld",
    x: 5,
    y: 2,
    text: "🌫️ Ist das eine Ratte? Wow, ist das düster hier unten."
  },
  {
    type: "feld",
    x: 5,
    y: 3,
    text: "⚠️ Ist das ihr Nest? Hier können jederzeit neue Monster auftauchen!"
  },
  {
    type: "feld",
    x: 5,
    y: 4,
    text: "⚠️ Du bist ganz in der Nähe des dunklen Throns!"
  },
  {
    type: "truhe",
    x: 6,
    y: 1,
    text:
      "Du siehst eine 🍀Kiste des Glücks! Diese Kiste bietet ein wechselndes Angebot von gewöhnlichen Waffen. Versuche deine Glück mit /öffnen.",
    inhalt: 3
  },
  {
    type: "altar",
    x: 6,
    y: 2,
    text:
      "⛩️ Ein kleiner Altar mit Kerzen und einige Zeichen auf dem Boden. Du siehst ein Amulett, es wird deine Heilung verbessern! /nehmen?"
  },
  {
    type: "feld",
    x: 6,
    y: 3,
    text:
      "⚠️ Hier hat die Brut ihren Ursprung. Jederzeit können neue Monster auftauchen!"
  },
  {
    type: "bossfeld",
    x: 6,
    y: 4,
    text: "☠️ Der Thron des Bossgegner! Du hast ihn gefunden..."
  }
];
var waffen = [
  {
    id: 0,
    name: "👊 Nackte Fäuste",
    angriff: 10,
    heilung: 1
  },
  {
    id: 1,
    name: "🗡️ Kleines Anfängerschwert",
    angriff: 15,
    heilung: 1,
    kritisch: 3
  },
  {
    id: 2,
    name: "🔧 Alter Schraubenschlüssel",
    angriff: 25,
    heilung: 2,
    kritisch: 2
  },
  {
    id: 3,
    name: "🎯 Tasche mit Dartpfeilen",
    angriff: 25,
    heilung: 2,
    kritisch: 2
  },
  {
    id: 4,
    name: "🏒 Blutiger Eishockeyschläger",
    angriff: 30,
    heilung: 2,
    kritisch: 2
  },
  {
    id: 5,
    name: "🥁 Trommel des Todes",
    angriff: 30,
    heilung: 2,
    kritisch: 2
  },
  {
    id: 6,
    name: "💣 Handliche Bomben",
    angriff: 35,
    heilung: 2,
    ausweichen: 4,
    kritisch: 2
  },
  {
    id: 7,
    name: "🏹 Geschickter Bogen",
    angriff: 25,
    ausweichen: 4,
    heilung: 2,
    kritisch: 2
  },
  {
    id: 8,
    name: "📿 Gesegnete Gebetskette",
    angriff: 25,
    heilung: 1,
    kritisch: 2,
    ausweichen: 3
  },
  {
    id: 9,
    name: "💍 Magischer Ring",
    angriff: 40,
    ausweichen: 3,
    kritisch: 2,
    heilung: 1
  },
  {
    id: 10,
    name: "🏹 Göttlicher Bogen",
    angriff: 35,
    ausweichen: 2,
    heilung: 1,
    kritisch: 1
  },
  {
    id: 11,
    name: "🌂 Spitzer Regenschirm",
    angriff: 40,
    heilung: 3,
    kritisch: 2
  },
  {
    id: 12,
    name: "🔱 Neptuns Dreizack",
    angriff: 80,
    kritisch: 1,
    heilung: 1
  },
  {
    id: 13,
    name: "☄️ Brennende Zauberkraft",
    angriff: 40,
    kritisch: 2,
    ausweichen: 2,
    heilung: 1
  },
  {
    id: 14,
    name: "🧱 Ziegelsteinwerfer",
    angriff: 50,
    heilung: 3,
    kritisch: 2
  },
  {
    id: 15,
    name: "🧨 Feuerwerkskörper",
    angriff: 50,
    heilung: 3,
    kritisch: 2
  }
];

var txtadvDEFAULTs = {
  spieler: [],
  karte: aktuelleKarte,
  beantwortet: [],
  monster: []
};
var kampfTimer = 3 * 60 * 1000 + 1;
var DMTimer = 1 * 60 * 1000;
var globalTimer = 5000;
var tempBuff = {};
tempBuff.ragemode = false;

var txtadv = txtadvDEFAULTs;
// speichereDB()

// DB STUFF
fs.readFile(
  [__dirname, "/db.json"].join(""),
  {
    encoding: "utf8"
  },
  function(err, data) {
    try {
      txtadv = JSON.parse(data);
      console.log("DB read!");
      if (typeof txtadv === "object") {
        // txtadv.karte = aktuelleKarte;

        setTimeout(requestMessages, 60 * 1000);
        setTimeout(allgemeinerTimer, 1000);
        setTimeout(calcFight, kampfTimer);
      }
    } catch (e) {
      console.log("DB read error: " + e);
    }
    if (err) {
      console.log("error DB");
    }
  }
);

function speichereDB() {
  if (typeof txtadv === "object") {
    try {
      var data = JSON.stringify(txtadv);
      if (typeof data === "string" && data !== "") {
        fs.writeFile([__dirname, "/db.json"].join(""), data, function(err) {
          if (err) {
            return console.log(err);
          }
          console.log("DB saved!");
        });
      }
    } catch (e) {
      console.log("DB WRITE ERROR: " + e);
    }
  }
}

// URLS
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile([__dirname, "/views/index.html"].join(""));
});

app.get("/karte", function(request, response) {
  response.end(
    JSON.stringify(txtadv.karte, {
      encoding: "utf8"
    })
  );
});

app.get("/spieler", function(request, response) {
  response.end(
    JSON.stringify(txtadv.spieler, {
      encoding: "utf8"
    })
  );
});

app.get("/monster", function(request, response) {
  response.end(
    JSON.stringify(txtadv.monster, {
      encoding: "utf8"
    })
  );
});

var Twitter = require("twit");
var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
  strictSSL: true
});

function requestMessages() {
  client.get(
    "direct_messages/events/list",
    {
      count: 100,
      skip_status: true
    },
    function(error, messages, response) {
      if (error) {
        console.error(error);
      } else {
        // read DM
        messages = messages.events
          .reverse()
          .filter(message => {
            if (message.message_create.sender_id == "922728274006040578") {
              return false;
            } else {
              return true;
            }
          })
          .map(message => {
            return {
              id: message.id,
              sender_id: message.message_create.sender_id,
              sender: {
                id_str: message.message_create.sender_id,
                id: parseInt(message.message_create.sender_id)
              },
              user: {
                id: message.message_create.sender_id
              },
              text: message.message_create.message_data.text
            };
          });

        messages = messages.filter(message => {
          if (message) {
            return true;
          } else {
            return false;
          }
        });

        messages.forEach(message => {
          if (error) {
            console.warn(error);
            return false;
          }

          // message.user.id == 250090545 &&
          if (txtadv.beantwortet.length > 150) {
            // räumt db auf
            txtadv.beantwortet.splice(0, 1);
          }
          if (
            nichtBeantwortet(message.id)
            // && message.user.id == 250090545
          ) {
            txtadv.beantwortet.push(parseFloat(message.id));
            console.log("message: ", message.text);

            // lade spieler
            var aktuellerSpieler = ladeSpieler(
              message.sender.id_str,
              message.sender.id
            );

            // analysiere tweet
            var textInput = message.text.toLowerCase();
            textInput = textInput.trim().replace("@textdungeon", "");
            textInput = textInput.trim();
            if (textInput.indexOf("/") < 0) {
              textInput = "/" + textInput;
            }

            console.log(
              "befehl = " + textInput + " von " + aktuellerSpieler.screen_name
            );

            // befehle ausführen
            if (aktuellerSpieler === false && textInput === "/start") {
              // create new user at spawn
              client
                .get("users/show", {
                  user_id: message.sender_id
                })
                .then(result => {
                  // direct result
                  var checkSpieler = ladeSpieler(
                    message.sender.id_str,
                    message.sender.id
                  );
                  if (!checkSpieler) {
                    message.screen_name = result.data.screen_name;

                    var einneuerspieler = new neuerSpieler(
                      message.sender.id,
                      message.sender.id_str,
                      message.screen_name
                    );
                    console.log("neuer Spieler = " + message.screen_name);

                    txtadv.spieler.push(einneuerspieler);
                    var kartenPunkt = koordinaten(
                      einneuerspieler.x,
                      einneuerspieler.y
                    );
                    speichereDB();
                    sendMessage(message.sender.id_str, kartenPunkt.text);
                  }
                })
                .catch(error => {
                  console.warn(error);
                });
            } else if (aktuellerSpieler) {
              switch (textInput) {
                case "/start":
                  sendMessage(
                    message.sender.id_str,
                    "Es kann losgehen! " + alleBefehle()
                  );
                  break;

                case "/hilfe":
                case "/help":
                  sendMessage(
                    message.sender.id_str,
                    "Wenn du ein Feld mit Monstern betrittst kämpfst du automatisch gegen diese. Alle fünf Minuten findet ein Kampf statt. Bring dich bei schwacher Gesundheit in Sicherheit. \nWeitere " +
                      alleBefehle()
                  );
                  break;

                case "/gehe richtung norden":
                case "/gehe norden":
                case "/norden":
                case "/hoch":
                case "/👆":
                case "/oben":
                  // gehe richtung norden wenn es das gibt
                  if (koordinaten(aktuellerSpieler.x, aktuellerSpieler.y - 1)) {
                    aktuellerSpieler.y = aktuellerSpieler.y - 1;
                    var kartenPunkt = koordinaten(
                      aktuellerSpieler.x,
                      aktuellerSpieler.y
                    );
                    sendMessage(
                      message.sender.id_str,
                      directionInfos(kartenPunkt, aktuellerSpieler)
                    );
                  } else {
                    sendMessage(message.sender.id_str, eineWand());
                  }
                  break;

                case "/gehe richtung osten":
                case "/gehe osten":
                case "/osten":
                case "/👉":
                case "/rechts":
                  // gehe richtung osten wenn es das gibt
                  if (koordinaten(aktuellerSpieler.x + 1, aktuellerSpieler.y)) {
                    aktuellerSpieler.x = aktuellerSpieler.x + 1;
                    var kartenPunkt = koordinaten(
                      aktuellerSpieler.x,
                      aktuellerSpieler.y
                    );
                    sendMessage(
                      message.sender.id_str,
                      directionInfos(kartenPunkt, aktuellerSpieler)
                    );
                  } else {
                    sendMessage(message.sender.id_str, eineWand());
                  }
                  break;

                case "/gehe richtung süden":
                case "/gehe süden":
                case "/süden":
                case "/unten":
                case "/👇":
                case "/runter":
                  // gehe richtung süden wenn es das gibt
                  if (koordinaten(aktuellerSpieler.x, aktuellerSpieler.y + 1)) {
                    aktuellerSpieler.y = aktuellerSpieler.y + 1;
                    var kartenPunkt = koordinaten(
                      aktuellerSpieler.x,
                      aktuellerSpieler.y
                    );
                    sendMessage(
                      message.sender.id_str,
                      directionInfos(kartenPunkt, aktuellerSpieler)
                    );
                  } else {
                    sendMessage(message.sender.id_str, eineWand());
                  }
                  break;

                case "/gehe richtung westen":
                case "/gehe westen":
                case "/westen":
                case "/👈":
                case "/links":
                  // gehe richtung westen wenn es das gibt
                  if (koordinaten(aktuellerSpieler.x - 1, aktuellerSpieler.y)) {
                    aktuellerSpieler.x = aktuellerSpieler.x - 1;
                    var kartenPunkt = koordinaten(
                      aktuellerSpieler.x,
                      aktuellerSpieler.y
                    );
                    sendMessage(
                      message.sender.id_str,
                      directionInfos(kartenPunkt, aktuellerSpieler)
                    );
                  } else {
                    sendMessage(message.sender.id_str, eineWand());
                  }
                  break;

                case "/öffne":
                case "/öffnen":
                  // aktion / interaktion mit truhe z.B.
                  var kartenPunkt = koordinaten(
                    aktuellerSpieler.x,
                    aktuellerSpieler.y
                  );
                  if (kartenPunkt.inhalt && kartenPunkt.type == "truhe") {
                    var antwort = "";
                    if (
                      aktuellerSpieler.waffe.angriff <=
                      waffen[kartenPunkt.inhalt].angriff
                    ) {
                      antwort +=
                        "Wow, du hast eine Waffe gefunden! " +
                        waffenInfoText(waffen[kartenPunkt.inhalt]) +
                        "\nWenn du sie gegen deine Waffe eintauschen möchtest, solltest du sie /nehmen.";
                    } else {
                      antwort +=
                        "Du hast eine Waffe gefunden! " +
                        waffenInfoText(waffen[kartenPunkt.inhalt]) +
                        "\nDeine getragene Waffe ist stärker... Du kannst sie aber trotzdem /nehmen.";
                    }
                    sendMessage(message.sender.id_str, antwort);
                  } else {
                    sendMessage(
                      message.sender.id_str,
                      "Hier kannst du nichts öffnen. Versuch doch in der Zeit Monster zu töten und die Welt zu retten!"
                    );
                  }
                  break;

                case "/nehmen":
                case "/nehme":
                case "/nimm":
                  // gegenstand aufnehmen
                  var kartenPunkt = koordinaten(
                    aktuellerSpieler.x,
                    aktuellerSpieler.y
                  );
                  if (kartenPunkt.inhalt) {
                    aktuellerSpieler.waffe = waffen[kartenPunkt.inhalt];
                    if (
                      kartenPunkt.type !== "truhe" &&
                      zufallszahl(1, 2) == 1
                    ) {
                      kartenPunkt.inhalt = false;
                    }
                    sendMessage(
                      message.sender.id_str,
                      "Du streckst stolz deine neue Waffe in die Luft. Mögen die Monster der Unterwelt vor deiner Kraft erzittern!"
                    );
                  } else if (kartenPunkt.type == "heiltrank") {
                    sendMessage(
                      message.sender.id_str,
                      "Der Zauber verliert seine Wirkung, wenn er nicht direkt getrunken wird. Versuche den Heiltrank zu /nutzen."
                    );
                  } else if (kartenPunkt.type == "altar") {
                    aktuellerSpieler.amulett = true;
                    (aktuellerSpieler.waffe || {}).heilung = 1;
                    sendMessage(
                      message.sender.id_str,
                      "Du hast ein Amulett der Heilung gefunden. ☘️ Damit kann deine Heilkraft nicht mehr geschwächt werden!"
                    );
                  } else {
                    sendMessage(
                      message.sender.id_str,
                      "Hier kannst du nichts nehmen. Vielleicht war jemand schneller als du..."
                    );
                  }
                  break;

                case "/benutzen":
                case "/benutze":
                case "/nutzen":
                case "/nutze":
                case "/trinken":
                case "/trinke":
                case "/trink":
                  // gegenstand benutzen
                  var kartenPunkt = koordinaten(
                    aktuellerSpieler.x,
                    aktuellerSpieler.y
                  );
                  if (
                    kartenPunkt.type == "heiltrank" &&
                    aktuellerSpieler.leben < 100
                  ) {
                    aktuellerSpieler.leben = 100;
                    sendMessage(
                      message.sender.id_str,
                      "Du nimmst einen großen Schluck und fühlst dich etwas besser. " +
                        aktuellerSpieler.leben +
                        "🛡️."
                    );
                  } else if (kartenPunkt.type == "heiltrank") {
                    sendMessage(
                      message.sender.id_str,
                      "Der Heiltrank wirkt nicht mehr bei dir. Du solltest dich ausruhen."
                    );
                  }
                  break;

                case "/schild":
                  // schild
                  var kartenPunkt = koordinaten(
                    aktuellerSpieler.x,
                    aktuellerSpieler.y
                  );
                  if (kartenPunkt.type == "amboss") {
                    if (
                      aktuellerSpieler.kills > 0 &&
                      aktuellerSpieler.leben < 180
                    ) {
                      aktuellerSpieler.leben = 180;
                      aktuellerSpieler.kills = aktuellerSpieler.kills - 1;
                      sendMessage(
                        message.sender.id_str,
                        "180🛡️! Das Schild wird dich schützen."
                      );
                    } else {
                      sendMessage(
                        message.sender.id_str,
                        "Ohne Heldentaten kann ich nichts für dich tun..."
                      );
                    }
                  }
                  break;

                case "/kampf":
                case "/kämpfen":
                case "/angriff":
                  // kampf infos
                  var kartenPunkt = koordinaten(
                    aktuellerSpieler.x,
                    aktuellerSpieler.y
                  );
                  var antwort =
                    "Du kämpfst automatisch, wenn du ein Feld mit einem Gegner betrittst. Der Kampf findet alle 5 Minuten gegen den ersten Gegner in der Reihe statt.\n\n";
                  if (fullInfo(aktuellerSpieler, "monster") == "") {
                    antwort += "Hier befindet sich gerade kein Monster.\n";
                  } else if (fullInfo(aktuellerSpieler, "monster") !== "") {
                    antwort += fullInfo(aktuellerSpieler, "monster");
                  }
                  sendMessage(message.sender.id_str, antwort);
                  break;

                case "/umsehen":
                case "/sehen":
                  // mehr infos
                  var antwort = "";
                  var mitspieler = spielerArray(
                    aktuellerSpieler.x,
                    aktuellerSpieler.y,
                    aktuellerSpieler.id_str
                  );
                  if (mitspieler.length > 0) {
                    antwort += "\n\nDu wirst von ";
                    var namen = [];
                    for (var index = 0; index < mitspieler.length; index++) {
                      namen.push("@" + mitspieler[index].screen_name);
                    }
                    antwort += namen.join(", ") + " unterstützt.\n";
                  }
                  var kartenPunkt = koordinaten(
                    aktuellerSpieler.x,
                    aktuellerSpieler.y
                  );

                  // loot?
                  if (kartenPunkt.inhalt && kartenPunkt.type !== "truhe") {
                    antwort +=
                      "\n\nHier liegt diese Waffe: " +
                      waffenInfoText(waffen[kartenPunkt.inhalt]) +
                      " Willst du sie /nehmen?";
                  }

                  sendMessage(
                    message.sender.id_str,
                    (kartenPunkt.text || "") +
                      " " +
                      fullInfo(aktuellerSpieler, "monster") +
                      antwort +
                      " " +
                      fullInfo(aktuellerSpieler, "koords")
                  );
                  break;

                case "/ich":
                case "/status":
                  // aktuelle zustand des Spielers
                  var antwort = "";
                  if (aktuellerSpieler.bluten) {
                    antwort +=
                      "😱 Überall Blut! Das verringert deine Regeneration. ";
                  }
                  if (aktuellerSpieler.leben <= 50) {
                    antwort +=
                      "Du siehst geschwächt aus und hast noch " +
                      aktuellerSpieler.leben +
                      "🛡️.";
                  } else {
                    antwort +=
                      "Deine Gesundheit: " + aktuellerSpieler.leben + "🛡️.";
                  }
                  if (aktuellerSpieler.amulett) {
                    antwort += " Du trägst ein Amulett.\n";
                  } else {
                    antwort += "\n";
                  }
                  antwort += waffenInfoText(aktuellerSpieler.waffe) + "\n";
                  antwort +=
                    "Du hast " +
                    (aktuellerSpieler.kills || 0) +
                    "🏅 Heldentaten vollbracht.";
                  //  und bist " + (aktuellerSpieler.tot || 0) + " mal gescheitert
                  sendMessage(message.sender.id_str, antwort);
                  break;

                case "/heilen":
                case "/heile":
                  if (aktuellerSpieler.kills >= 1) {
                    if (aktuellerSpieler.leben >= 80) {
                      aktuellerSpieler.bluten = false;
                      aktuellerSpieler.kills = aktuellerSpieler.kills - 1;
                      aktuellerSpieler.waffe.heilung = 1;
                      sendMessage(
                        message.sender.id_str,
                        "Du bist gesund und fit! Deine Regenerationsrate ist 1/1💉."
                      );
                    } else {
                      aktuellerSpieler.kills = aktuellerSpieler.kills - 1;
                      aktuellerSpieler.leben = aktuellerSpieler.leben + 20;
                      aktuellerSpieler.bluten = false;
                      aktuellerSpieler.waffe.heilung = 1;
                      sendMessage(
                        message.sender.id_str,
                        "Du heilst dich +20🛡️! Deine Regenerationsrate ist 1/1💉."
                      );
                    }
                  } else {
                    sendMessage(
                      message.sender.id_str,
                      "Nicht genügend 🏅Heldentaten, um dich darauf zu besinnen."
                    );
                  }
                  break;

                case "/beten":
                case "/bete":
                  aktuellerSpieler.waffe = waffen[0];
                  aktuellerSpieler.waffe.ausweichen = 3;
                  sendMessage(
                    message.sender.id_str,
                    "Du wirfst deine Waffe im hohen Bogen weg, fängst an zu beten und hoffst Angriffen auszuweichen."
                  );
                  break;

                case "/lernen":
                case "/lerne":
                  if (aktuellerSpieler.kills >= 5) {
                    aktuellerSpieler.kills = aktuellerSpieler.kills - 5;
                    aktuellerSpieler.waffe = waffen[13];
                    sendMessage(
                      message.sender.id_str,
                      "Zisch! Licht ströhmt durch den Dungeon. Du hast 💫Sternenzauber gelernt!"
                    );
                  } else {
                    sendMessage(
                      message.sender.id_str,
                      "Du liest spannende Zaubersprüche, leider hast du nicht genügend 🏅Heldentaten, um einen davon zu lernen."
                    );
                  }
                  break;

                case "/löschmich":
                  // spieler löschen!
                  var alleSpieler = txtadv.spieler;
                  for (var index = 0; index < alleSpieler.length; index++) {
                    if (aktuellerSpieler.id_str == alleSpieler[index].id_str) {
                      sendMessage(
                        aktuellerSpieler.id_str,
                        "Du wurdest gelöscht. Um wieder zu spielen, benutze /start."
                      );
                      alleSpieler.splice(index, 1);
                    }
                  }
                  break;

                default:
                  sendMessage(
                    message.sender.id_str,
                    "Befehl nicht erkannt. Um alle Befehle zu lesen, sende /hilfe."
                  );
                  break;
              }
            } else {
              sendMessage(
                message.sender.id_str,
                "Befehl nicht erkannt. Bist du ein neuer Spieler oder bereits gestorben? Um neu zu starten, schreibe mir /start. Um alle Befehle zu lesen, tippe /hilfe."
              );
            }
            // user closed
          }
        });
      }
    }
  );
  speichereDB();
  setTimeout(requestMessages, DMTimer);
}

function allgemeinerTimer() {
  // glückstruhe
  if (koordinaten(6, 1).inhalt && zufallszahl(1, 10) == 1) {
    koordinaten(6, 1).inhalt = waffen[zufallszahl(2, 8)].id;
  }
  
  // spawn enemy. 1 per day (app running time)
  if (zufallszahl(1, 24 * 60) == 1) {
    gegnerSpawn();
  }

  // spieler langsam heilen
  var map = txtadv.karte;
  map.forEach(function(mapPoint) {
    if (mapPoint.type == "heiltrank") {
      var tempSpieler = spielerArray(mapPoint.x, mapPoint.y);
      tempSpieler.forEach(function(spieler) {
        if (spieler.leben < 89) {
          spieler.leben = spieler.leben + 1;
          console.log(
            spieler.screen_name + " wurde geheilt " + spieler.leben + "."
          );
        }
      });
    }
  });

  // heilung, bluten, bonus
  var alleSpieler = txtadv.spieler;
  alleSpieler.forEach(function(spieler) {
    // heilung
    if (
      !spieler.bluten &&
      spieler.leben <= 99 &&
      zufallszahl(1, (spieler.waffe || {}).heilung || 5) == 1
    ) {
      if (spieler.leben < 20) {
        spieler.leben = spieler.leben + 5;
      } else {
        spieler.leben = spieler.leben + 1;
      }

      console.log(spieler.screen_name + " wurde geheilt +1 durch Waffe!");
    }

    // stoppt blutung
    if (
      spieler.bluten &&
      zufallszahl(1, (spieler.waffe || {}).heilung || 2) == 1
    ) {
      spieler.bluten = false;
      console.log(spieler.screen_name + " hat Blutung gestoppt!");
    }
  });

  // gegner bewegen
  var monsters = txtadv.monster;
  for (var index = 0; index < monsters.length; index++) {
    var normalMovement = 30;
    if (tempBuff.ragemode) {
      normalMovement = 10;
    }
    if (
      (!monsters[index].istBoss || tempBuff.ragemode) &&
      zufallszahl(1, normalMovement) == 1
    ) {
      var wegOptionen = [];
      var süden = koordinaten(monsters[index].x, monsters[index].y + 1);
      if (süden) {
        wegOptionen.push(süden);
      }
      var norden = koordinaten(monsters[index].x, monsters[index].y - 1);
      if (norden) {
        wegOptionen.push(norden);
      }
      var osten = koordinaten(monsters[index].x + 1, monsters[index].y);
      if (osten) {
        wegOptionen.push(osten);
      }
      var westen = koordinaten(monsters[index].x - 1, monsters[index].y);
      if (westen) {
        wegOptionen.push(westen);
      }
      if (wegOptionen.length > 0) {
        var weg = wegOptionen[zufallszahl(0, wegOptionen.length - 1)];
        if (weg) {
          console.log("monster bewegt sich: x" + weg.x + "y" + weg.y);
          monsters[index].x = weg.x;
          monsters[index].y = weg.y;
        }
      }
    }
  }

  bossSpawn();
  setTimeout(allgemeinerTimer, 1 * 60000);
}

function calcFight() {
  // kämpfe berechnen
  var spieler = txtadv.spieler;
  for (var spielerIndex = 0; spielerIndex < spieler.length; spielerIndex++) {
    kampf(spieler[spielerIndex]);
  }
  setTimeout(calcFight, kampfTimer);
}

function fullInfo(aktuellerSpieler, type) {
  switch (type) {
    case "monster":
      var monsterInfo = "";
      var monsters = txtadv.monster;
      var monsterarray = [];
      for (var index = 0; index < monsters.length; index++) {
        if (
          aktuellerSpieler.x == monsters[index].x &&
          aktuellerSpieler.y == monsters[index].y
        ) {
          if (monsterarray.length == 0 || monsterarray.length == 1) {
            monsterarray.push(
              monsters[index].name +
                " " +
                monsters[index].angriff +
                "⚔️ " +
                monsters[index].leben +
                "🛡️"
            );
          } else {
            monsterarray.push(monsters[index].name);
          }
        }
      }
      if (monsterarray.length > 0) {
        monsterInfo += "Automatischer Kampf: " + monsterarray.join(", ") + ".";
      }
      return monsterInfo;
      break;

    case "monstershort":
      var monsterInfo = "";
      var monsters = txtadv.monster;
      var monsterarray = [];
      for (var index = 0; index < monsters.length; index++) {
        if (
          aktuellerSpieler.x == monsters[index].x &&
          aktuellerSpieler.y == monsters[index].y
        ) {
          return (
            "Du kämpfst automatisch gegen " +
            capitalizeFirstLetter(monsters[index].name) +
            " " +
            monsters[index].angriff +
            "⚔️ " +
            monsters[index].leben +
            "🛡️."
          );
        }
      }
      return "";
      break;

    case "bewegungSpielerInfo":
      var antwort = "";
      var mitspieler = spielerArray(
        aktuellerSpieler.x,
        aktuellerSpieler.y,
        aktuellerSpieler.id_str
      );
      if (mitspieler.length > 0) {
        antwort += "\n\nDu kommst ";
        var namen = [];
        for (var index = 0; index < mitspieler.length; index++) {
          namen.push("@" + mitspieler[index].screen_name);
        }
        antwort += namen.join(", ") + " zur Hilfe!";
      }
      return antwort;
      break;

    case "richtung":
      var antwort = "\n\nDu kannst Richtung ";
      var richtungen = [];
      if (koordinaten(aktuellerSpieler.x, aktuellerSpieler.y - 1)) {
        richtungen.push("👆 /Norden");
      }
      if (koordinaten(aktuellerSpieler.x + 1, aktuellerSpieler.y)) {
        richtungen.push("👉 /Osten");
      }
      if (koordinaten(aktuellerSpieler.x, aktuellerSpieler.y + 1)) {
        richtungen.push("👇 /Süden");
      }
      if (koordinaten(aktuellerSpieler.x - 1, aktuellerSpieler.y)) {
        richtungen.push("👈 /Westen");
      }
      antwort += richtungen.join(" oder ");
      antwort += " weiter gehen oder dich nach Loot /umsehen.";
      return antwort;
      break;

    case "koords":
      return (
        "\nAuf dem Boden ist etwas eingeritzt: x" +
        aktuellerSpieler.x +
        "y" +
        aktuellerSpieler.y +
        "."
      );
    default:
      return "";
      break;
  }
}

function kampf(geladenerSpieler) {
  var monsters = txtadv.monster;
  var aktuellerSpieler = geladenerSpieler;
  for (var index = 0; index < monsters.length; index++) {
    if (
      geladenerSpieler.x == monsters[index].x &&
      geladenerSpieler.y == monsters[index].y
    ) {
      var kartenPunkt = koordinaten(geladenerSpieler.x, geladenerSpieler.y);

      // internes logging
      console.log(
        "kampf! " +
          geladenerSpieler.screen_name +
          " = " +
          geladenerSpieler.leben +
          " angriff = " +
          geladenerSpieler.waffe.angriff
      );
      console.log(
        "monster " +
          monsters[index].leben +
          " = " +
          monsters[index].leben +
          " angriff = " +
          monsters[index].angriff
      );

      var tempSchaden = monsters[index].angriff;

      // kampf info
      // schaden an spieler
      var kampfInfo = "Du kämpfst gegen " + monsters[index].name + ".\n\n";
      if (
        !geladenerSpieler.bluten &&
        zufallszahl(1, geladenerSpieler.waffe.ausweichen || 15) == 1
      ) {
        // spieler blockt angriff
        console.log("spieler geblockt");
        kampfInfo += "👤 Du bist einem Angriff ausgewichen wie ein Ninja!\n";
      } else {
        console.log("schaden an spieler verursacht");

        var kritischerTextMonster = "";
        if (zufallszahl(1, monsters[index].kritisch || 15) == 1) {
          tempSchaden = tempSchaden + 10;
          kritischerTextMonster = "⚡ Du wurdest stark getroffen!\n";
          console.log(geladenerSpieler.screen_name + " mehr schaden");

          // bluten
          if (zufallszahl(1, 3) == 1) {
            tempSchaden = tempSchaden + 5;
            kritischerTextMonster =
              "⚡🩸 Du wurdest stark getroffen und blutest!\n";
            geladenerSpieler.bluten = true;
            console.log(
              geladenerSpieler.screen_name +
                " hat schaden kritisch, spieler blutet"
            );
          }

          if (
            zufallszahl(1, 3) == 1 &&
            (geladenerSpieler.waffe || {}).angriff >= 21
          ) {
            kritischerTextMonster +=
              "Vor Schreck hast du deine Waffe fallen lassen. Sie ist etwas ramponiert -1⚔️.\n";
            geladenerSpieler.waffe.angriff = geladenerSpieler.waffe.angriff - 1;
            console.log(geladenerSpieler.screen_name + " waffe ramponiert -1");
          }
        }

        // waffen verlieren kraft
        var waffeSchwach = false;
        if (
          zufallszahl(1, 10) == 1 &&
          (geladenerSpieler.waffe || {}).ausweichen < 5
        ) {
          geladenerSpieler.waffe.ausweichen =
            geladenerSpieler.waffe.ausweichen + 1;
          console.log(geladenerSpieler.screen_name + " waffe ausweichen -1");
          waffeSchwach = true;
        }
        if (
          zufallszahl(1, 15) == 1 &&
          (geladenerSpieler.waffe || {}).kritisch < 5
        ) {
          geladenerSpieler.waffe.kritisch = geladenerSpieler.waffe.kritisch + 1;
          console.log(geladenerSpieler.screen_name + " waffe kritisch -1");
          waffeSchwach = true;
        }
        if (
          !geladenerSpieler.amulett &&
          zufallszahl(1, 15) == 1 &&
          (geladenerSpieler.waffe || {}).heilung < 2
        ) {
          geladenerSpieler.waffe.heilung = geladenerSpieler.waffe.heilung + 1;
          console.log(geladenerSpieler.screen_name + " waffe heilung -1");
          waffeSchwach = true;
        }
        if (waffeSchwach) {
          kritischerTextMonster += "Deine Waffe nutzt sich langsam ab...\n";
        }
        geladenerSpieler.leben = geladenerSpieler.leben - tempSchaden;
        var auaTexte = [
          "💢 War das eine Kopfnuss? Das wird eine fette Beule...",
          "💢 AUA! Das Vieh beißt dich in den Fuß.",
          "💢 Aaah, es beißt dich!",
          "💢 Eine fiese Beleidigung trifft dich ins Herz.",
          "💢 Autsch! Voll zwischen die Augen.",
          "💢 Mist, getroffen."
        ];
        var spruch = "";
        if (monsters[index].spruch && zufallszahl(1, 3) == 1) {
          spruch += monsters[index].spruch;
        } else {
          spruch = auaTexte[zufallszahl(0, auaTexte.length - 1)];
        }
        kampfInfo +=
          kritischerTextMonster +
          spruch +
          "\n\nDeine Gesundheit liegt bei " +
          geladenerSpieler.leben +
          "🛡️.\n";
      }

      // schaden an monster
      if (zufallszahl(1, monsters[index].ausweichen || 30) == 1) {
        // geblockt
        console.log("schaden an monster geblockt");
        kampfInfo +=
          "😳 Das Monster macht einen Schritt zur Seite. Dein Angriff hat keinen Schaden verursacht...\n";
      } else {
        console.log("schaden verursacht");
        var kritischerText = "";
        // tempschaden mit bonus
        var aktSchaden = geladenerSpieler.waffe.angriff;
        if (zufallszahl(1, geladenerSpieler.waffe.kritisch || 30) == 1) {
          aktSchaden = aktSchaden + 10;
          kritischerText +=
            "🔥 Kritischer Treffer! Du machst starken Schaden.\n";
        }

        monsters[index].leben = (monsters[index].leben || 0) - aktSchaden;

        // texte für kampf ausgabe!
        var geschafftText = [""];
        if (monsters[index].leben > 0) {
          geschafftText = [
            "Gegenangriff! " +
              aktSchaden +
              "⚔️. Du triffst es: " +
              monsters[index].leben +
              "🛡️.",
            aktSchaden +
              "⚔️. Du schlägst es zurück auf " +
              monsters[index].leben +
              "🛡️.",
            "Du wehrst dich! " +
              aktSchaden +
              "⚔️. Es hat " +
              monsters[index].leben +
              "🛡️.",
            "Du schlägst zu " +
              aktSchaden +
              "⚔️ und triffst. Es hat noch " +
              monsters[index].leben +
              "🛡️."
          ];
        }
        kampfInfo +=
          kritischerText +
          geschafftText[zufallszahl(0, geschafftText.length - 1)] +
          "\n";
      }

      // monster heilung
      if (
        monsters[index].leben <= 20 &&
        monsters[index].leben > 0 &&
        zufallszahl(1, monsters[index].heilung || 15) == 1
      ) {
        console.log("monster heilt sich");
        monsters[index].leben = monsters[index].leben + 5;
        kampfInfo += "Es scheint sich etwas zu erholen... +5🛡️.\n";
      }

      // wenig energie warnung
      if (geladenerSpieler.leben <= 30) {
        console.log("wenig energie warnung");
        kampfInfo +=
          "\n\n⚠️ Erschöpfung, Verletzungen und Schreie! Langsam solltest du dich selbst in Sicherheit bringen...\n\n";
      }

      // kurze info
      if (monsters[index].leben <= 15 && monsters[index].leben > 0) {
        console.log("info: monster schwach");
        kampfInfo += "Das Monster schwächelt. Du hast es fast geschafft!\n";
      }
      if (kampfInfo != "" && geladenerSpieler.leben > 0) {
        sendMessage(geladenerSpieler.id_str, kampfInfo);
      }

      // jemand gestorben???
      if (geladenerSpieler.leben <= 0) {
        console.log("spieler tot");

        // var name = "Ein Held"
        // if (geladenerSpieler.screen_name) {
        //     name = "@" + geladenerSpieler.screen_name
        // }
        sendMessage(
          geladenerSpieler.id_str,
          "⚰️ Du liegst im Dreck. " +
            monsters[index].name +
            " hat dich besiegt. 😱 Nach einer Schweigeminute solltest du nochmal /start tippen..."
        );
        var alleSpieler = txtadv.spieler;
        for (
          var SpielerIndex = 0;
          SpielerIndex < alleSpieler.length;
          SpielerIndex++
        ) {
          if (aktuellerSpieler.id_str == alleSpieler[SpielerIndex].id_str) {
            alleSpieler.splice(SpielerIndex, 1);
          }
        }
        client.post(
          "statuses/update",
          {
            status:
              "⚰️ Ein Held oder eine Heldin wurde niedergestreckt von " +
              monsters[index].name +
              " mit " +
              monsters[index].angriff +
              "⚔️ und " +
              monsters[index].leben +
              "🛡️. Schreie hallen durch den Dungeon. \n\n☠️ Die Monster überrennen uns!!!"
          },
          function(error, tweet, response) {
            if (error) {
              console.log(error);
            }
          }
        );

        // rage mode
        tempBuff.ragemode = true;
        setTimeout(function() {
          tempBuff.ragemode = false;
        }, 1.5 * 60000);

        gegnerSpawn();
      }

      // monster gestorben???
      if (monsters[index].leben <= 0) {
        // loot
        var loot = "";
        if (
          monsters[index].inhalt &&
          kartenPunkt.type !== "truhe" &&
          kartenPunkt.type !== "amulett" &&
          kartenPunkt.type !== "amboss" &&
          kartenPunkt.type !== "heiltrank"
        ) {
          kartenPunkt.inhalt = monsters[index].inhalt;

          if (kartenPunkt.inhalt) {
            loot +=
              "\n\n💎 Bling! Es wurde eine Waffe fallen gelassen. Welche? /umsehen.";
          }
        }

        // alle gewinner informieren
        var gewinner = [];
        if (geladenerSpieler.screen_name) {
          gewinner.push("@" + geladenerSpieler.screen_name);
        }
        var infomiereSpieler = spielerArray(
          geladenerSpieler.x,
          geladenerSpieler.y,
          geladenerSpieler.id_str
        );
        if (infomiereSpieler.length > 0) {
          for (
            var spielerIndex = 0;
            spielerIndex < infomiereSpieler.length;
            spielerIndex++
          ) {
            // alle bekommen heldentaten
            infomiereSpieler[spielerIndex].kills =
              (infomiereSpieler[spielerIndex].kills || 0) + 1;
            if (monsters[index].istBoss) {
              infomiereSpieler[spielerIndex].bosskills =
                (infomiereSpieler[spielerIndex].bosskills || 0) + 1;
            }
            gewinner.push("@" + infomiereSpieler[spielerIndex].screen_name);
            sendMessage(
              infomiereSpieler[spielerIndex].id_str,
              "@" +
                geladenerSpieler.screen_name +
                " hat das Monster besiegt!" +
                loot
            );
          }
        }
        geladenerSpieler.kills = (geladenerSpieler.kills || 0) + 1;
        if (monsters[index].istBoss) {
          geladenerSpieler.bosskills = (geladenerSpieler.bosskills || 0) + 1;
        }

        // textdinge
        var mehrzahl = " war ";
        if (gewinner.length > 1) {
          var mehrzahl = " waren ";
        }

        // rage mode
        var rage_mode = "";
        if (zufallszahl(1, 15) == 1) {
          tempBuff.ragemode = true;
          console.log("rage mode!!!");
          rage_mode =
            "\n\n☠️ Der Dungeon kocht vor Wut! Die Monster überrennen uns!";
          setTimeout(function() {
            console.log("rage mode off");
            tempBuff.ragemode = false;
          }, 5 * 60000);
        }

        // frag message
        sendMessage(
          geladenerSpieler.id_str,
          "🏆 Du warst stärker als " + monsters[index].name + "!" + loot
        );

        if (monsters[index].istBoss) {
          client.post(
            "statuses/update",
            {
              status:
                "💀 Der Boss " +
                capitalizeFirstLetter(monsters[index].name) +
                " wurde besiegt! Herzlichen Glückwunsch! " +
                gewinner.join(", ") +
                mehrzahl +
                "erfolgreich im epischen Kampf!" +
                rage_mode
            },
            function(error, tweet, response) {
              if (error) {
                console.log(error);
              }
            }
          );
        }

        monsters.splice(index, 1);
      }
      break;
    }
  }
}

function bossSpawn() {
  if (zufallszahl(1, 60) == 1) {
    // big boss
    var map = txtadv.karte;
    var bossFelder = [];
    for (var index = 0; index < map.length; index++) {
      if (
        map[index].type == "bossfeld" &&
        !gibtGegnerXY(map[index].x, map[index].y)
      ) {
        bossFelder.push(map[index]);
      }
    }
    if (bossFelder.length > 0) {
      console.log("boss spawn");

      var zufall = zufallszahl(0, bossFelder.length - 1);
      var alleBosse = [
        {
          name: "👻 Schatten der Unterwelt",
          spruch: "💢 Er springt aus dem Schatten und erschrickt dich!"
        },
        {
          name: "👸 Böse Prinzessin Leia",
          spruch: "💢 Sie würgt dich mit der Macht!"
        },
        {
          name: "🧛‍♂️ Bissiger Vampir Edward",
          spruch: "💢 Er gräbt seine Zähne in deinen Hals!"
        },
        {
          name: "🧝‍♂️ Besessener Legolas",
          spruch: "💢 Ein Pfeil landet in deiner Brust!"
        },
        {
          name: "🐉 Feuerspuckender Drache",
          spruch: "💢 Sein Feuerkegel bläst dich fast weg!"
        },
        {
          name: "🛸 Grünes Alien",
          spruch: "💢 Sie versuchen dich hoch zu beamen!"
        },
        {
          name: "🦖 Wütender T-Rex",
          spruch: "💢 Er frisst dich fast!"
        },
        {
          name: "👃🏻 Lord Voldemort",
          spruch: "💢 Avada Kedavra!"
        },
        {
          name: "🦁 Hinterlistiger Scar",
          spruch: "💢 Er will dich in den Nacken beißen!"
        },
        {
          name: "🦄 Laser-Einhorn",
          spruch: "💢 Pwuu pwwuuu pwuu!!!"
        },
        {
          name: "🗿 Langsamer Steingolem",
          spruch: "💢 Er zerquetscht dich fast!"
        },
        {
          name: "🤖 Todesroboter aus dem All",
          spruch: "💢 Laser! Überall Laser!"
        },
        {
          name: "🧙‍♂️ Böser Saruman",
          spruch: "💢 Er will dich auf seinen Turm verbannen."
        },
        {
          name: "👑 König der Unterwelt",
          spruch: "💢 Seine Untertanen greifen dich an!"
        }
      ];
      var dieseZahl = zufallszahl(0, alleBosse.length - 1);

      var derBoss = new neuesMonster(
        alleBosse[dieseZahl].name,
        bossFelder[zufall].x,
        bossFelder[zufall].y,
        zufallszahl(20, 25),
        alleBosse[dieseZahl].spruch
      );
      derBoss.heilung = zufallszahl(2, 4);
      derBoss.ausweichen = zufallszahl(3, 4);
      derBoss.leben = 200;
      derBoss.kritsch = zufallszahl(2, 4);
      derBoss.istBoss = true;
      derBoss.inhalt = waffen[zufallszahl(8, waffen.length - 1)].id;
      txtadv.monster.push(derBoss);

      var maxGegnerSpawn = txtadv.spieler.length * 10;
      for (var gegnerZahl = 1; gegnerZahl < maxGegnerSpawn; gegnerZahl++) {
        gegnerSpawn();
      }

      client.post(
        "statuses/update",
        {
          status:
            "⚔️ Der Dungeon bebt vor Zorn! Bossgegner " +
            derBoss.name +
            " ist aufgetaucht! ️⚔️"
        },
        function(error, tweet, response) {
          if (error) {
            console.log(error);
          }
        }
      );
    }
  }
}

function gegnerSpawn() {
  var gegnerFelder = [];
  gegnerFelder.push({
    x: 6,
    y: 4
  });
  gegnerFelder.push({
    x: 6,
    y: 3
  });
  gegnerFelder.push({
    x: 5,
    y: 4
  });

  console.log("monster spawn");
  var zufall = zufallszahl(0, gegnerFelder.length - 1);

  if (zufallszahl(1, 2) == 1) {
    var alleMonsterSTARK = [
      {
        name: "🦍 Hungriger Gorilla",
        spruch: "💢 Er wirft mit einem Fass nach dir!"
      },
      {
        name: "🐺 Böser Wolf",
        spruch: "💢 Er beißt dich ins Bein!"
      },
      {
        name: "🦇 Infizierte Fledermaus",
        spruch: "💢 Sie zerkratzt dein Gesicht!"
      },
      {
        name: "🐼 Heimtückischer Panda",
        spruch: "💢 Er rollt dich überraschend um!"
      },
      {
        name: "🦅 Jagender Adler",
        spruch: "💢 Seine scharfen Krallen schlagen sich in deine Haut!"
      },
      {
        name: "🐊 Getarntes Krokodil",
        spruch: "💢 Es reißt an deinem Bein!"
      },
      {
        name: "🐐 Wilde Ziege",
        spruch: "💢 Sie stößt dich um!"
      },
      {
        name: "🐂 Rotäugiger Stier",
        spruch: "💢 Er spießt dich fast auf!"
      },
      {
        name: "🦙 Spuckendes Lama",
        spruch: "💢 Ihh, voll ins Gesicht gespuckt!"
      },
      {
        name: "🐍 Giftige Schlange",
        spruch: "💢 Sie beißt dich in deine Schulter!"
      },
      {
        name: "🐀 Kratzende Ratte",
        spruch: "💢 Sie kratzt dir den Arm auf!"
      },
      {
        name: "🐓 Aufgescheuchter Kampfhahn",
        spruch: "💢 Er will dir ein Auge auspicken!"
      },
      {
        name: "👺 Fieser Goblin",
        spruch: "💢 Er zwickt dich in den Zeh!"
      }
    ];
    var dieseZahl = zufallszahl(0, alleMonsterSTARK.length - 1);
    var zufallsMonsterSTARK = new neuesMonster(
      alleMonsterSTARK[dieseZahl].name,
      gegnerFelder[zufall].x,
      gegnerFelder[zufall].y,
      zufallszahl(10, 18),
      alleMonsterSTARK[dieseZahl].spruch,
      zufallszahl(50, 100)
    );
    zufallsMonsterSTARK.inhalt = waffen[zufallszahl(2, 8)].id;
    zufallsMonsterSTARK.ausweichen = zufallszahl(3, 6);
    zufallsMonsterSTARK.heilung = zufallszahl(3, 6);
    zufallsMonsterSTARK.kritisch = zufallszahl(3, 6);
    txtadv.monster.push(zufallsMonsterSTARK);
  } else {
    var alleMonster = [
      {
        name: "Hinterlistiger Gnom",
        spruch: "💢 Er tritt dir heftig auf deinen Fuß!"
      },
      {
        name: "Stinkender Troll",
        spruch: "💢 Seine Keule trifft dich am Kopf!"
      },
      {
        name: "Verfaultes Skelett",
        spruch: "💢 Es wird mit einem Knochen nach dir!"
      },
      {
        name: "Kratzender Untoter",
        spruch: "💢 Er beißt sich an deinem Bein fest!"
      },
      {
        name: "Frecher Dieb",
        spruch: "💢 Sein Dolch trifft dich!"
      },
      {
        name: "Fleischfressende Pflanze",
        spruch: "💢 Sie umschlingt deinen Arm!"
      }
    ];
    var dieseZahl = zufallszahl(0, alleMonster.length - 1);
    var zufallsMonster = new neuesMonster(
      alleMonster[dieseZahl].name,
      gegnerFelder[zufall].x,
      gegnerFelder[zufall].y,
      zufallszahl(3, 8),
      alleMonster[dieseZahl].spruch,
      zufallszahl(30, 50)
    );
    txtadv.monster.push(zufallsMonster);
  }
}

function gibtGegnerXY(x, y) {
  var monsters = txtadv.monster;
  for (var index = 0; index < monsters.length; index++) {
    if (x == monsters[index].x && y == monsters[index].y) {
      return true;
    }
  }
  return false;
}

function spielerArray(x, y, id_str) {
  var gefundeneSpieler = [];
  var alleSpieler = txtadv.spieler;
  for (var index = 0; index < alleSpieler.length; index++) {
    if (
      x == alleSpieler[index].x &&
      y == alleSpieler[index].y &&
      alleSpieler[index].id_str !== id_str
    ) {
      gefundeneSpieler.push(alleSpieler[index]);
    }
  }
  return gefundeneSpieler;
}

function waffenInfoText(waffe) {
  var antwort = "";
  if (waffe.name) {
    antwort += waffe.name;
  }
  var bisSchaden = "";
  if (waffe.maxSchaden) {
    bisSchaden = " - " + waffe.maxSchaden;
  }
  if (waffe.angriff) {
    antwort += " " + waffe.angriff + bisSchaden + "⚔️\n";
  }
  if (waffe.kritisch) {
    antwort += "1/" + waffe.kritisch + "🔥 Angriff ist kritisch!\n";
  }
  if (waffe.heilung) {
    antwort +=
      "Damit hast du eine 1/" +
      waffe.heilung +
      "💉 Chance dich selbst zu heilen.\n";
  }
  if (waffe.ausweichen) {
    antwort +=
      "Mit dieser Waffe hast du eine 1/" +
      waffe.ausweichen +
      "👤 Chance Angriffen auszuweichen.\n";
  }
  return antwort;
}

function istKommando(textInput, checkString) {
  if (textInput.indexOf(checkString) >= 0) {
    return true;
  } else {
    return false;
  }
}

function sendMessage(id, text) {
  setTimeout(() => {
    client.post(
      "direct_messages/events/new",
      {
        event: {
          type: "message_create",
          message_create: {
            target: {
              recipient_id: id.toString()
            },
            message_data: {
              text: text
            }
          }
        }
      },
      function(error, message, response) {
        if (error) {
          if (globalTimer < 25000) {
            globalTimer = globalTimer + globalTimer;
          }
          console.warn(error);
        } else {
          console.log(text);
        }
      }
    );
  }, globalTimer || 10000);
}

function eineWand() {
  var texte = [
    "Da kannst du nicht hin. Hier ist nur die kalte Wand des Dungeon.",
    "Willst du etwa mit dem Kopf durch die Wand?",
    "Vorsicht! Die Wände des Dungeons sind mächtig."
  ];
  return texte[zufallszahl(0, texte.length - 1)];
}

function directionInfos(kartenPunkt, aktuellerSpieler) {
  return (
    (kartenPunkt.text || "") +
    "\n\n" +
    fullInfo(aktuellerSpieler, "bewegungSpielerInfo") +
    " " +
    fullInfo(aktuellerSpieler, "monstershort") +
    " " +
    fullInfo(aktuellerSpieler, "richtung")
  );
}

function alleBefehle() {
  return "Befehle: /ich, /umsehen, /norden, /runter, /öffnen, /nehmen, /heilen, /beten, /nutzen. Befehle werden auch ohne / erkannt. \n\nKeine Lust mehr? 😥 Sende /löschmich und höre auf.";
}

function neuerSpieler(id, idstr, screenname) {
  this.id = id;
  this.id_str = idstr;
  this.screen_name = screenname || null;
  this.x = 1;
  this.y = 1;
  this.waffe = waffen[0];
  this.leben = 100;
}

function neuesMonster(name, x, y, angriff, spruch, leben) {
  this.name = name;
  this.x = x;
  this.y = y;
  this.angriff = angriff;
  this.spruch = spruch;
  this.leben = leben || 80;
}

function ladeSpieler(idstr, id) {
  var alleSpieler = txtadv.spieler;
  for (var index = 0; index < alleSpieler.length; index++) {
    if (idstr == alleSpieler[index].id_str || id == alleSpieler[index].id) {
      return alleSpieler[index];
    }
  }
  return false;
}

function zufallszahl(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function koordinaten(x, y) {
  var map = txtadv.karte;
  for (var index = 0; index < map.length; index++) {
    if (map[index].x == x && map[index].y == y && map[index].blocked !== true) {
      return map[index];
    }
  }
  return false;
}

function nichtBeantwortet(id) {
  for (var tweetid of txtadv.beantwortet) {
    if (parseFloat(id) == tweetid) {
      return false;
    }
  }
  return true;
}

function isinArray(array, search) {
  for (var item of array) {
    if (search == item) {
      return true;
    }
  }
  return false;
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
