"use strict";

/*
  Check if CDA magnet link is valid, i.e. can be used for deposits 
*/

const { verifyMagnetLink }  = require('./functions.js');

// get a CDA magnet link
const cdaMagnetLink = process.argv[2];
if (cdaMagnetLink == undefined){
  console.log("Please provide a CDA magnet link!");
  process.exit();
}

// extract the expiration date
let epoch = cdaMagnetLink.match(/timeout_at=(\d+)/)[1];
var d = new Date(0);
d.setUTCSeconds(epoch);
console.log("CDA Expiration Date: ", d.toLocaleString());

// check if the magnet link is valid
verifyMagnetLink(cdaMagnetLink)
.then( _ => console.log("CDA Magnet Link is valid") )
.catch( error => console.log("CDA Magnet Link is NOT vaild - ", error.message) )
