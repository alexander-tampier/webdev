/*
Create a schema specification for an Austrian post address

 Setup a new node.js project and install jsonschema package as
dependency

􏰀 Inspect the example for a product schema given at
http://json-schema.org/example1.html

􏰀 Copy the schema to your local project

􏰀 Create 5 variables with data examples which causes validation errors
and 5 which do not
*/

const VALIDATOR = require('jsonschema').Validator;

// Address, to be embedded on Person
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

let addressList = [
/**
 * address OK
 */
{
  "land" : "Austria",
  "region" : "Upper Austria",
  "strasse" : "Pazminteng",
  "hausnummer" : 33,
  "postleitzahl" : 4743,
  "ort" : "AGGSTEIN"
},
{
  "land" : "Austria",
  "region" : "Upper Austria",
  "strasse" : "Graben",
  "hausnummer" : 67
},
{
  "land" : "Austria",
  "region" : "Lower Austria",
  "strasse" : "Klesenstrasse",
  "hausnummer" : 57,
  "postleitzahl" : 3240,
  "ort" : "KLEINAIGEN"
},
{
  "land" : "Austria",
  "region" : "Lower Austria",
  "strasse" : "Bahngasse",
  "hausnummer" : 68,
  "postleitzahl" : 3910,
  "ort" : "GRADNITZ"
},
{
  "land" : "Austria",
  "region" : "Burgenland",
  "strasse" : "Lettental",
  "hausnummer" : 10,
},

/**
 * address NOT OK
 */

 /**
  * description - not all required attributes given [region,strasse]
  */
 {
   "land" : "Austria"
 },
/**
 * description - not all required attributes given [strasse]
 */
 {
   "land" : "Austria",
   "region" : "Upper Austria",
 },
 /**
  * description - not all dependencies given [hausnummer]
  */
 {
   "land" : "Austria",
   "region" : "Vienna",
   "strasse" : "Wiedner Hauptstrasse",
 },
 /**
  * description - not all dependencies given [ort]
  */
 {
   "land" : "Austria",
   "region" : "Styria",
   "strasse" : "Lustenauer Strasse",
   "hausnummer" : 79,
   "postleitzahl" : 8330,
 },
 /**
  * description - too much properties
  */
 {
   "land" : "Austria",
   "region" : "Vienna",
   "strasse" : "Laxenburger Strasse",
   "hausnummer" : 94,
   "postleitzahl" : 1100,
   "ort" : "vienna",
   "additionalProperty" : "hshshs"
 },
];


addressList.forEach((element, index) => {
  let val = new VALIDATOR().validate(element, ADDRESS_SCHEMA);

  if (val.errors.length) {
    console.log(`${index+1} - error!`);
    val.errors.forEach((item) => {
      console.log(item.message);
    });
  } else {
    console.log(`${index+1} - validation successful`);
  }
});
