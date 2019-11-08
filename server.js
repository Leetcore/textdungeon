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
      "Du stehst am Eingang des Dungeon. Vor dir wartet die Dunkelheit und eine Horde hungriger Monster. Versuche /osten oder die /hilfe."
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
    text:
      "Aus dem Süden hört man regelmäßiges Schlagen auf Metall. Was ist das?"
  },
  {
    type: "amboss",
    x: 1,
    y: 4,
    text:
      "🛠️ Eine kleine Schmiede mit Amboss. Der Ofen glüht noch und es gibt auch einige Zauberbücher. Du könntest versuchen deine Waffe zu /verbessern oder einen Zauberspruch /lernen. Zur Verteidigung gibt es ein mächtiges /Schild für eine Heldentat. Es gibt dir 150🛡️ Gesundheit."
  },
  {
    type: "truhe",
    x: 2,
    y: 1,
    text:
      "Du siehst eine alte Holztruhe. Willst du wissen was sich darin befindet, dann versuche /öffnen.\n\nWaffen können in der Schmiede verbessert werden. Vorher solltest du aber Monster töten. Wenn du weiter nach /Osten gehst, bist du auf dich allein gestellt.",
    inhalt: 1
  },
  {
    type: "feld",
    x: 2,
    y: 3,
    text:
      "Es ist so heiß hier! Es muss ein großer Ofen in der Nähe sein. Puh, du schwitzt, hoffentlich hält dein Deo."
  },
  {
    type: "feld",
    x: 2,
    y: 4,
    text: "Im Westen kannst du deine Waffe verbessern."
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
      "Mitten im Dungeon siehst du eine 🍀Kiste des Glücks! Diese Kiste bietet ein wechselndes Angebot von gewöhnlichen Waffen. Versuche deine Glück mit /öffnen.",
    inhalt: 4
  },
  {
    type: "feld",
    x: 4,
    y: 1,
    text: "Ein kahler Platz. Deine Fackel erleuchtet den Weg."
  },
  {
    type: "feld",
    x: 4,
    y: 2,
    text: "Du siehst Blut an den Wänden. Hier wird viel gekämpft."
  },
  {
    type: "feld",
    x: 4,
    y: 3,
    text: "Dunkelheit, Dreck und Monstergeschrei!"
  },
  {
    type: "feld",
    x: 4,
    y: 4,
    text: "Hier sind Schädel gestapelt. Pass besser auf deinen Kopf auf!"
  },
  {
    type: "feld",
    x: 5,
    y: 1,
    text: "Im /Osten siehst du etwas leuchten im Dunkeln!"
  },
  {
    type: "feld",
    x: 5,
    y: 2,
    text: "Ist das eine Ratte? Wow, ist das düster hier unten."
  },
  {
    type: "feld",
    x: 5,
    y: 3,
    text: "Alles ist voller Eier. Hier kann jederzeit ein Monster schlüpfen!"
  },
  {
    type: "feld",
    x: 5,
    y: 4,
    text:
      "Du bist ganz in der Nähe des dunklen Throns. Hier gibt es einige Monstereier!"
  },
  {
    type: "truhe",
    x: 6,
    y: 1,
    text:
      "Du siehst eine 🍀Kiste des Glücks! Diese Kiste bietet ein wechselndes Angebot von gewöhnlichen Waffen. Versuche deine Glück mit /öffnen.",
    inhalt: 7
  },
  {
    type: "altar",
    x: 6,
    y: 2,
    text:
      "Ein kleiner Altar mit Kerzen und einige Zeichen auf dem Boden. Du siehst ein Amulett, es wird deine Heilung verbessern! /nehmen?"
  },
  {
    type: "feld",
    x: 6,
    y: 3,
    text:
      "Hier hat die Brut ihren Ursprung. Jederzeit können neue Monster auftauchen! Früher war hier ein netter Ort. Jetzt nicht mehr..."
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
    heilung: 2
  },
  {
    id: 1,
    name: "🗡️ Kleines Anfängerschwert",
    angriff: 14,
    heilung: 2,
    kritisch: 4
  },
  {
    id: 2,
    name: "🔧 Alter Schraubenschlüssel",
    angriff: 25,
    kritisch: 3
  },
  {
    id: 3,
    name: "🎯 Tasche mit Dartpfeilen",
    angriff: 18,
    ausweichen: 3
  },
  {
    id: 4,
    name: "🏒 Blutiger Eishockeyschläger",
    angriff: 30,
    kritisch: 4
  },
  {
    id: 5,
    name: "🥁 Trommel des Todes",
    angriff: 40,
    kritisch: 3
  },
  {
    id: 6,
    name: "💣 Handliche Bomben",
    angriff: 50,
    ausweichen: 4,
    kritisch: 3
  },
  {
    id: 7,
    name: "🏹 Geschickter Bogen",
    angriff: 45,
    ausweichen: 4,
    kritisch: 3
  },
  {
    id: 8,
    name: "📿 Gesegnete Gebetskette",
    angriff: 38,
    heilung: 2,
    kritisch: 4,
    ausweichen: 3
  },
  {
    id: 9,
    name: "💍 Magischer Ring",
    angriff: 40,
    ausweichen: 3,
    heilung: 5
  },
  {
    id: 10,
    name: "🏹 Göttlicher Bogen",
    angriff: 45,
    ausweichen: 4,
    heilung: 4,
    kritisch: 4
  },
  {
    id: 11,
    name: "🌂 Spitzer Regenschirm",
    angriff: 40,
    kritisch: 5
  },
  {
    id: 12,
    name: "🔱 Neptuns Dreizack",
    angriff: 80,
    kritisch: 3
  },
  {
    id: 13,
    name: "☄️ Brennende Zauberkraft",
    angriff: 20,
    ausweichen: 4,
    heilung: 10
  }
];

var txtadvDEFAULTs = {
  spieler: [],
  karte: aktuelleKarte,
  beantwortet: [],
  monster: []
};
var kampfTimer = 5 * 60 * 1000;
var DMTimer = 1 * 60 * 1000;
var globalTimer = 5000;
var allTimer = [];
var tempBuff = {};

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
        txtadv.karte = aktuelleKarte;

        setTimeout(requestMessages, 60 * 1000);
        setTimeout(allgemeinerTimer, 60 * 1000);
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
      count: 50,
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
          if (txtadv.beantwortet.length >= 150) {
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

            clearTimeout(allTimer[aktuellerSpieler.id_str]);

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
                    sendMessage(
                      message.sender.id_str,
                      eineWand() + " Willst du dich /umsehen?"
                    );
                  }
                  break;

                case "/gehe richtung osten":
                case "/gehe osten":
                case "/osten":
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
                    sendMessage(
                      message.sender.id_str,
                      eineWand() + " Willst du dich /umsehen?"
                    );
                  }
                  break;

                case "/gehe richtung süden":
                case "/gehe süden":
                case "/süden":
                case "/unten":
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
                    sendMessage(
                      message.sender.id_str,
                      eineWand() + " Willst du dich /umsehen?"
                    );
                  }
                  break;

                case "/gehe richtung westen":
                case "/gehe westen":
                case "/westen":
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
                    sendMessage(
                      message.sender.id_str,
                      eineWand() + " Willst du dich /umsehen?"
                    );
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
                        "\nDeine aktuelle Waffe ist stärker...";
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
                    aktuellerSpieler.waffe = waffen[kartenPunkt.inhalt || 0];
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
                    (aktuellerSpieler.waffe || {}).heilung = 2;
                    sendMessage(
                      message.sender.id_str,
                      "Du hast ein Amulett der Heilung gefunden!"
                    );
                  } else {
                    sendMessage(
                      message.sender.id_str,
                      "Hier kannst du nichts nehmen. Versuch doch in der Zeit Monster zu töten und die Welt zu retten!"
                    );
                  }
                  break;

                case "/benutzen":
                case "/benutze":
                case "/nutzen":
                case "/nutze":
                  // gegenstand benutzen
                  var kartenPunkt = koordinaten(
                    aktuellerSpieler.x,
                    aktuellerSpieler.y
                  );
                  if (
                    kartenPunkt.type == "heiltrank" &&
                    aktuellerSpieler.leben < 100
                  ) {
                    aktuellerSpieler.leben = 80;
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

                case "/verbessern":
                case "/amboss":
                  // waffe verbessern
                  var kartenPunkt = koordinaten(
                    aktuellerSpieler.x,
                    aktuellerSpieler.y
                  );
                  if (kartenPunkt.type == "amboss") {
                    if (
                      aktuellerSpieler.waffe &&
                      (aktuellerSpieler.waffe.verbesserung || 0) < 1 &&
                      aktuellerSpieler.kills > 0
                    ) {
                      aktuellerSpieler.kills = aktuellerSpieler.kills - 1;
                      aktuellerSpieler.waffe.verbesserung =
                        (aktuellerSpieler.waffe.verbesserung || 0) + 1;
                      aktuellerSpieler.waffe.maxSchaden =
                        aktuellerSpieler.waffe.angriff +
                        aktuellerSpieler.waffe.verbesserung * 50;

                      sendMessage(
                        message.sender.id_str,
                        "Mit der Kraft deiner Heldentat konntest du deine Waffe ⚔️ verbessern."
                      );
                    } else {
                      sendMessage(
                        message.sender.id_str,
                        "Du kannst deine Waffen nicht weiter verbessern..."
                      );
                    }
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
                      aktuellerSpieler.leben < 150
                    ) {
                      aktuellerSpieler.leben = 150;
                      aktuellerSpieler.kills = aktuellerSpieler.kills - 1;
                      sendMessage(
                        message.sender.id_str,
                        "Mit dem Schild hast du 150🛡️ Gesundheit."
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
                    "Du kämpfst automatisch, wenn du ein Feld mit einem Gegner betrittst. Der Kampf findet alle 10 Minuten gegen den ersten Gegner in der Reihe statt.\n\n";
                  if (fullInfo(aktuellerSpieler, "monster") == "") {
                    antwort += "Hier befindet sich gerade kein Monster.\n";
                  } else if (fullInfo(aktuellerSpieler, "monster") !== "") {
                    antwort += fullInfo(aktuellerSpieler, "monster");
                  }
                  sendMessage(message.sender.id_str, antwort);
                  break;

                case "/umsehen":
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
                      "Hier liegt diese Waffe: " +
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
                  // aktuelle zustand des Spielers
                  var antwort = "";
                  if (aktuellerSpieler.bluten) {
                    antwort += "😱 Überall Blut! ";
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

                case "/fähigkeiten":
                case "/fähigkeit":
                  var alleFähigkeiten =
                    "/heilen: Besinne dich auf deine 🏅Heldentaten und verarzte dich! Stoppt Blutungen! Du schaffst das.\n";
                  alleFähigkeiten +=
                    "/beten: 🙏 Wirf deine Waffe weg und bete, dass du diesen Kampf überlebst! -Waffe +1/2👤 +1/3💉.\n";
                  sendMessage(message.sender.id_str, alleFähigkeiten);
                  break;

                case "/heilen":
                case "/heile":
                  if (aktuellerSpieler.kills >= 1) {
                    aktuellerSpieler.kills = aktuellerSpieler.kills - 1;
                    aktuellerSpieler.leben = aktuellerSpieler.leben + 50;
                    aktuellerSpieler.bluten = false;
                    if (zufallszahl(1, 5) == 1) {
                      sendMessage(
                        message.sender.id_str,
                        "Du heilst dich +50🛡️!"
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
                  aktuellerSpieler.waffe.ausweichen = 4;
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
        // wenn es keinen fehler mit der api gibt
        speichereDB();
      }
    }
  );

  setTimeout(requestMessages, DMTimer);
}

function allgemeinerTimer() {
  // glückstruhe
  if (koordinaten(8, 0).inhalt && zufallszahl(1, 360) == 1) {
    koordinaten(8, 0).inhalt = waffen[zufallszahl(2, 5)].id;
    var texte = [
      "🍀 Ein Hauch des Zaubers weht durch den Dungeon.",
      "🍀 Die Glückstruhe hat eine andere Waffe ausgewählt!",
      "🍀 Neue Waffe, neues Glück!"
    ];
    client.post(
      "statuses/update",
      {
        status: texte[zufallszahl(0, texte.length - 1)]
      },
      function(error, tweet, response) {
        if (error) {
          console.log(error);
        }
      }
    );
  }

  // spieler langsam heilen
  var map = txtadv.karte;
  map.forEach(function(mapPoint) {
    if (mapPoint.type == "heiltrank") {
      var tempSpieler = spielerArray(mapPoint.x, mapPoint.y);
      tempSpieler.forEach(function(spieler) {
        if (spieler.leben < 90) {
          spieler.leben = spieler.leben + 10;
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
      spieler.leben <= 95 &&
      zufallszahl(1, (spieler.waffe || {}).heilung) == 1
    ) {
      spieler.leben = spieler.leben + 5;
      console.log(spieler.screen_name + " wurde geheilt +5 durch Waffe!");
    }

    // stoppt blutung
    if (spieler.bluten && zufallszahl(1, 25) == 1) {
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
      if (süden || tempBuff.ragemode) {
        wegOptionen.push(süden);
      }
      var norden = koordinaten(monsters[index].x, monsters[index].y - 1);
      if (norden || tempBuff.ragemode) {
        wegOptionen.push(norden);
      }
      var osten = koordinaten(monsters[index].x + 1, monsters[index].y);
      if (osten || tempBuff.ragemode) {
        wegOptionen.push(osten);
      }
      var westen = koordinaten(monsters[index].x - 1, monsters[index].y);
      if (westen || tempBuff.ragemode) {
        wegOptionen.push(westen);
      }
      if (wegOptionen.length > 0) {
        var spieler = txtadv.spieler;
        for (
          var spielerIndex = 0;
          spielerIndex < spieler.length;
          spielerIndex++
        ) {
          if (
            spieler[spielerIndex].x == monsters[index].x &&
            spieler[spielerIndex].y == monsters[index].y
          ) {
            // sendMessage(spieler[spielerIndex].id_str, monsters[index].name + ' ist geflüchtet!')
          }
        }
        var weg = wegOptionen[zufallszahl(0, wegOptionen.length - 1)];
        if (weg) {
          console.log("monster bewegt sich: x" + weg.x + "y" + weg.y);
          monsters[index].x = weg.x;
          monsters[index].y = weg.y;
        }
      }
    }
  }

  speichereDB();
  setTimeout(allgemeinerTimer, 6 * 60000);
}

function calcFight() {
  // kämpfe berechnen
  var spieler = txtadv.spieler;
  for (var spielerIndex = 0; spielerIndex < spieler.length; spielerIndex++) {
    kampf(spieler[spielerIndex]);
  }
  bossSpawn();
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
        richtungen.push("Norden");
      }
      if (koordinaten(aktuellerSpieler.x + 1, aktuellerSpieler.y)) {
        richtungen.push("Osten");
      }
      if (koordinaten(aktuellerSpieler.x, aktuellerSpieler.y + 1)) {
        richtungen.push("Süden");
      }
      if (koordinaten(aktuellerSpieler.x - 1, aktuellerSpieler.y)) {
        richtungen.push("Westen");
      }
      antwort += richtungen.join(" oder ");
      antwort += " weiter gehen oder dich /umsehen.";
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

      // unterbrechen reisen!
      clearTimeout(allTimer[geladenerSpieler.id_str]);

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
        if (zufallszahl(1, monsters[index].kritisch || 25) == 1) {
          tempSchaden = tempSchaden + 10;
          kritischerTextMonster = "⚡ Du wurdest stark getroffen!\n";
          console.log(geladenerSpieler.screen_name + " mehr schaden");

          // bluten
          if (zufallszahl(1, 10) == 1) {
            kritischerTextMonster =
              "⚡🩸 Du wurdest stark getroffen und blutest!\n";
            geladenerSpieler.bluten = true;
            console.log(
              geladenerSpieler.screen_name +
                " hat schaden kritisch, spieler blutet"
            );
          }

          if (
            zufallszahl(1, 15) == 1 &&
            (geladenerSpieler.waffe || {}).angriff >= 13
          ) {
            kritischerTextMonster +=
              "Vor Schreck hast du deine Waffe fallen lassen. Sie ist etwas ramponiert -3⚔️.\n";
            geladenerSpieler.waffe.angriff = geladenerSpieler.waffe.angriff - 3;
            console.log(geladenerSpieler.screen_name + " waffe ramponiert -3");
          }
        }

        // waffen verlieren kraft
        var waffeSchwach = false;
        if (
          zufallszahl(1, 15) == 1 &&
          (geladenerSpieler.waffe || {}).angriff >= 20
        ) {
          geladenerSpieler.waffe.angriff = geladenerSpieler.waffe.angriff - 1;
          if (
            geladenerSpieler.waffe.maxSchaden &&
            geladenerSpieler.waffe.angriff + 11 <
              geladenerSpieler.waffe.maxSchaden
          ) {
            geladenerSpieler.waffe.maxSchaden =
              geladenerSpieler.waffe.maxSchaden - 5;
          }
          console.log(geladenerSpieler.screen_name + " waffe schaden -1");
          waffeSchwach = true;
        }
        if (
          zufallszahl(1, 15) == 1 &&
          (geladenerSpieler.waffe || {}).ausweichen < 20
        ) {
          geladenerSpieler.waffe.ausweichen =
            geladenerSpieler.waffe.ausweichen + 1;
          console.log(geladenerSpieler.screen_name + " waffe ausweichen -1");
          waffeSchwach = true;
        }
        if (
          zufallszahl(1, 15) == 1 &&
          (geladenerSpieler.waffe || {}).kritisch < 15
        ) {
          geladenerSpieler.waffe.kritisch = geladenerSpieler.waffe.kritisch + 1;
          console.log(geladenerSpieler.screen_name + " waffe kritisch -1");
          waffeSchwach = true;
        }
        if (
          zufallszahl(1, 15) == 1 &&
          (geladenerSpieler.waffe || {}).heilung < 12
        ) {
          geladenerSpieler.waffe.heilung = geladenerSpieler.waffe.heilung + 1;
          console.log(geladenerSpieler.screen_name + " waffe heilung -1");
          waffeSchwach = true;
        }
        if (waffeSchwach) {
          kritischerTextMonster += "Deine Waffe ist abgenutzt...\n";
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
          "\nDeine Gesundheit fällt auf " +
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
        // tempschaden mit bonus oder nicht und maxschaden
        var aktSchaden = zufallszahl(
          geladenerSpieler.waffe.angriff,
          geladenerSpieler.waffe.maxSchaden || geladenerSpieler.waffe.angriff
        );
        if (zufallszahl(1, geladenerSpieler.waffe.kritisch || 40) == 1) {
          aktSchaden = aktSchaden + 10;
          kritischerText +=
            "🔥 Kritischer Treffer! Du machst starken Schaden.\n";
        }

        // bossschaden an spielerschaden orientieren
        if (aktSchaden > (txtadv.maxPlayerDamage || 0)) {
          txtadv.maxPlayerDamage = aktSchaden;
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
        !monsters[index].bluten &&
        monsters[index].leben <= 30 &&
        monsters[index].leben > 0 &&
        zufallszahl(1, monsters[index].heilung || 15) == 1
      ) {
        console.log("monster heilt sich");
        monsters[index].leben = monsters[index].leben + 5;
        kampfInfo += "Es scheint sich etwas zu erholen... +5🛡️.\n";
      }

      // wenig energie warnung
      if (
        geladenerSpieler.leben <= 10 &&
        geladenerSpieler.leben > 0 &&
        zufallszahl(1, 5) == 1
      ) {
        console.log("wenig energie warnung");
        kampfInfo +=
          "⚠️ Erschöpfung, Verletzungen und Schreie! Langsam solltest du dich selbst in Sicherheit bringen...\n";
        client.post(
          "statuses/update",
          {
            status:
              "📯 Jemand braucht Hilfe! Macht euch auf den Weg. x" +
              geladenerSpieler.x +
              "y" +
              geladenerSpieler.y
          },
          function(error, tweet, response) {
            if (error) {
              console.log(error);
            }
          }
        );
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
        }, 30 * 60000);

        gegnerSpawn();
        break;
      }

      // monster gestorben???
      if (monsters[index].leben <= 0) {
        // loot
        if (monsters[index].inhalt) {
          kartenPunkt.inhalt = monsters[index].inhalt;
          setTimeout(
            function(kartenPunkt) {
              kartenPunkt.inhalt = false;
            },
            60 * 60000,
            kartenPunkt
          );
        }
        var loot = "";
        if (kartenPunkt.inhalt) {
          loot +=
            "\n\n💎 Bling! Es wurde eine Waffe fallen gelassen. Welche? /umsehen.";
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
          }, 15 * 60000);
        }
        
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
        } else {
          client.post(
            "statuses/update",
            {
              status:
                "💀 Ein Monster weniger. " +
                gewinner.join(", ") +
                mehrzahl +
                "siegreich. Was ein Kampf! " +
                capitalizeFirstLetter(monsters[index].name) +
                " wurde vernichtet!" +
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

        // neues monster???
        if (zufallszahl(1, 3) === 1) {
          console.log("neues monster!");
          gegnerSpawn();
        } else {
          console.log("monster dauerhaft tot!");
        }
      }
      if (!tempBuff.ragemode) {
        break;
      }
    }
  }
}

function bossSpawn() {
  if (zufallszahl(1, 10) == 1) {
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
        }
      ];
      var dieseZahl = zufallszahl(0, alleBosse.length - 1);

      var derBoss = new neuesMonster(
        alleBosse[dieseZahl].name,
        bossFelder[zufall].x,
        bossFelder[zufall].y,
        zufallszahl(15, 25),
        alleBosse[dieseZahl].spruch
      );
      derBoss.heilung = zufallszahl(5, 8);
      derBoss.ausweichen = zufallszahl(4, 8);
      derBoss.leben = 250;
      derBoss.kritsch = zufallszahl(5, 8);
      derBoss.istBoss = true;
      derBoss.inhalt = waffen[zufallszahl(6, waffen.length - 1)].id;
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

function gegnerSpawn(angriff, kritisch, ausweichen, x, y) {
  var gegnerFelder = [];
  if (x && y) {
    gegnerFelder.push({
      x: x,
      y: y
    });
  } else {
    // var map = txtadv.karte
    /* for (var index = 0; index < map.length; index++) {
			if (map[index].type == "feld") {
				gegnerFelder.push(map[index])
			}
		} */
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
  }

  console.log("monster spawn");
  var zufall = zufallszahl(0, gegnerFelder.length - 1);

  if (zufallszahl(1, 3) == 1) {
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
        spruch: "💢 Er spießt dich fast ganz auf!"
      },
      {
        name: "🐍 Giftige Schlange",
        spruch: "💢 Sie beißt dich an deiner Schulter!"
      },
      {
        name: "🐀 Kratzende Ratte",
        spruch: "💢 Sie kratzt dir den Arm auf!"
      },
      {
        name: "🐓 Aufgescheuchter Kampfhahn",
        spruch: "💢 Er will dir ein Auge auspicken!"
      }
    ];
    var dieseZahl = zufallszahl(0, alleMonsterSTARK.length - 1);
    var zufallsMonsterSTARK = new neuesMonster(
      alleMonsterSTARK[dieseZahl].name,
      gegnerFelder[zufall].x,
      gegnerFelder[zufall].y,
      angriff || zufallszahl(5, 30),
      alleMonsterSTARK[dieseZahl].spruch,
      zufallszahl(70, 120)
    );
    zufallsMonsterSTARK.inhalt = waffen[zufallszahl(2, 5)].id;
    zufallsMonsterSTARK.ausweichen = ausweichen || zufallszahl(4, 8);
    zufallsMonsterSTARK.heilung = zufallszahl(5, 10);
    zufallsMonsterSTARK.kritisch = kritisch || zufallszahl(5, 10);
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
      zufallszahl(3, 6),
      alleMonster[dieseZahl].spruch,
      zufallszahl(40, 70)
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
  if (waffe.ausweichen) {
    antwort +=
      "Mit dieser Waffe hast du eine 1/" +
      waffe.ausweichen +
      "👤 Chance Angriffen auszuweichen.\n";
  }
  if (waffe.heilung) {
    antwort +=
      "Damit hast du eine 1/" +
      waffe.heilung +
      "💉 Chance dich selbst zu heilen.\n";
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
          globalTimer = globalTimer + globalTimer;
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
    " " +
    fullInfo(aktuellerSpieler, "bewegungSpielerInfo") +
    " " +
    fullInfo(aktuellerSpieler, "monstershort") +
    " " +
    fullInfo(aktuellerSpieler, "richtung")
  );
}

function alleBefehle() {
  return "Befehle: /ich, /umsehen, /norden, /runter, /öffnen, /nehmen, /heilen, /nutzen, /fähigkeiten. Befehle werden auch ohne / erkannt. \n\nKeine Lust mehr? 😥 Sende /löschmich und höre auf.";
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
