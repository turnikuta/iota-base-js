"use strict";

// Configure the IRI Node you want to connect to
const PROVIDER = "https://nodes.devnet.iota.org:443";

// IOTA Libs
const core = require('@iota/core');
const extJson = require('@iota/extract-json');

// IOTA Network connect
const iota = core.composeAPI({ provider: PROVIDER });

// Check Input - Hash of tail transaction required
if ( process.argv.length < 3 || process.argv[2] == undefined ) {
  console.log("Transaction Hash missing ...\n");
  process.exit();
}
if ( ! process.argv[2].match(/^[A-Z9]*$/) || process.argv[2].length != 81 ) {
  console.log("Specified Transaction Hash is not valid ...\n");
  process.exit();
} 
let trxHash = process.argv[2];

iota.getBundle(trxHash)
.then( bundle => {
  const message = JSON.parse(extJson.extractJson(bundle)); 
  console.log("Message:\n", message);
})

