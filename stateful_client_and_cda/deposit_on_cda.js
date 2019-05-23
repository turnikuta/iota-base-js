"use strict";

/*
  Deposit on a conditional deposit address (CDA)
*/

const { generateNamedSeed } = require('../lib/utils.js');
const { generateAccount, verifyMagnetLink }  = require('./functions.js');
const { parseCDAMagnet } = require('@iota/cda');

// load configuration
const CONFIG = require('./config.json');

if (process.argv.length != 5 ){
  console.log("Usage:   node deposit_on_cda.js <sender> <value> <cda-magnet-link>>");
  console.log("Example: node deposit_on_cda.js Alice 20 \"iota://VHF...EO/?timeout_at=1558011844&multi_use=1\"");
  process.exit();
}
const sender = process.argv[2];
const value = parseInt(process.argv[3]);
const magnetLink = process.argv[4];
// ...let's just skip the input data check

// generate 'easy-to-remember' seed
let seed = generateNamedSeed(sender)

// verify magnet link
verifyMagnetLink(magnetLink)
.then ( _ => {
  const { address, timeoutAt, multiUse, expectedAmount } = parseCDAMagnet( magnetLink);

  // get sender account 
  generateAccount(seed, CONFIG)
  .then(account => { 
    // deposit to CDA
    account.sendToCDA({address: address, 
                       timeoutAt: timeoutAt, 
                       multiUse: multiUse, 
                       expectedAmount: expectedAmount, 
                       value: value})
    .then(trytes => {
      console.log('Successfully prepared transaction trytes:', trytes)
    }) 
    .catch(error => {
      console.log("sendToCDA failed!\n", error.message);	
    })

    // start attaching to the tangle
    account.startAttaching({ depth: 3, minWeightMagnitude: 9, delay: 30 * 1000 });
  })
  .catch( error => console.log("generateAccount() failed!\n", error.message) )
})
.catch( error => console.log("CDA is NOT valid!\n", error.message) )


