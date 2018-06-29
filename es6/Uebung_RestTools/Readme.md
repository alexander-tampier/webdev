# Json-Schema Übung

Diese Übung beschäftigt sich vorrangig mit dem Auseinandersetzen von Json-Schemata. Zu finden unter dem folgenden Link <https://spacetelescope.github.io/understanding-json-schema/index.html>.

## ToDo

### Clone repo using git

Mit dem Befehl `git clone https://gogs.vietze.eu/WebTech2_Sommer2018/Uebung_RestTools.git ./` kann das repository in das Root-Verzeichnis kopiert werden samt origin-upstream.


### Create a directory with your name

Um ein Verzeichnis mit dem eigenen Namen anzulegen wird empfohlen, einen eigenen Branch mit dem Befehl `git checkout -b feature/vorNameNachName` anzulegen. Hier wurde anschließend ein Verzeichnis mit dem Namen angelegt. Der Befehl `mkdir alexandertampier` wurde in einer Shell ausgeführt.

###  Document hands-on exercises

* Durch `npm init` wurde ein neues `node.js` Projekt angelegt

* Es wurde ein Entrypoint `index.js` angelegt.

* Die dependency json-schema muss installiert werden mit `npm i jsonschema`

Das Schema für eine österreichische Postadresse ist definiert durch

```javascript
const ADDRESS_SCHEMA = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "description": "Schema einer österreichischen Addresse",
  "title": "Adresse",
  "type": "object",
  "properties": {
    "land" : {"type": "string"},
    "region" : {"type": "string"},
    "strasse": {"type": "string"},
    "hausnummer" : {
      "type" : "integer",
      "minimum" : 0,
      "exclusiveMinimum" : true
    },
    "postleitzahl" : {
      "type" : "integer",
      "minimum" : 1000
    },
    "ort" : {"type" : "string"}
  },
  "required" : ["land", "region", "strasse"],
  "dependencies" : {
    "strasse" : ["hausnummer"],
    "postleitzahl" : ["ort"]
  },
  "additionalProperties" : false
};
```

Die folgende Tabelle erläutert die einzelnen Eigenschaften

| Property        | Description           |
| ------------- |-------------|
| Land      | Es soll das Land defi niert werden, hier muss die Eigenschaft Österreich/Austria eingetragen werden. Eine Validierung erfolgt hier nicht. Die Eigenschaft ist erforderlich. |
| Region | In der Region wird eines der neun Bundesländer eingetragen. Auch hier erfolgt keine Validierung. Die Eigenschaft ist in der Definition erforderlich |   
| Strasse | Die Strasse definiert die jeweilige Adresse auf granularer Ebene und ist erforderlich. |
| HausNummer | Die Hausnummer ist optional muss jedoch in Verbindung mit der Strasse angegeben werden. |
| Postleitzahl | Die Postleitzahl muss in Zusammenhang mit dem Ort angegeben werden. |
| Ort | Optional |

Eine vollständige Adresse wird wie folgt definiert

```javascript
{
  "land" : "Austria",
  "region" : "Upper Austria",
  "strasse" : "Pazminteng",
  "hausnummer" : 33,
  "postleitzahl" : 4743,
  "ort" : "AGGSTEIN"
}
```


### Create Pull-Request when you finished all exercises

* Bevor der Pull-Request gesendet wird kann der Workflow zusammengefasst werden

```
$ git add .
$ git commit -m "message"
```

Sollten mehrere Commit-Punkte entstehen können diese zu einem mit einem git squash zusammengefasst werden.

```
$ git rebase -i HEAD~4
$ git push origin branch-name --force
```

Anschließend wird der Pull-Request am Server erstellt.
