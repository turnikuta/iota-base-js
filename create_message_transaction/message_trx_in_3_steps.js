"use strict";

/*
  Create and broadcast a message transaction in 3 steps
*/

// Configure the IRI Node you want to connect to
const PROVIDER = "https://nodes.devnet.iota.org:443";

// IOTA Libs
const core = require('@iota/core');
const trxConverter = require('@iota/transaction-converter');
const converter = require('@iota/converter');

// Helper functions
const utils = require('../lib/utils');

// IOTA Network connect
const iota = core.composeAPI({ provider: PROVIDER });

// Generate seed and first address
const seed = utils.generateRandomSeed();
const address = utils.generateAddress(core, seed, {});

//
//  Step 1 - Create (non-value) transaction object
//

// Message you want to store on the tangle
const message = {
  "data":  "VERY9LONG9MESSAGE9".repeat(250)
};

//Convert ascii to trytes
const messageTrytes = converter.asciiToTrytes(JSON.stringify(message));

const transferObject = [{
  'address': address,
  'value': 0,
  'message': messageTrytes,
  'tag': 'TRX9IN9THREE9STEPS'   // "TRX IN THREE STEPS"
}];


( async () => {

  //
  // Step 2 - Create bundle
  //
  // prepareTransfers()
  // -> Prepares the transaction trytes by generating a bundle, filling in transfers
  //    and inputs, adding remainder and signing.

  let bundleTrytes;
  try {
    bundleTrytes = await iota.prepareTransfers(seed, transferObject);
  }
  catch (err) {console.log("\nprepareTransfers() failed!n\n" + err)};

  //
  // Step 3 - Select tips, Perform PoW & Broadcast
  //
  const DEPTH = 3; // Number of bundles to go back to determine the transactions for approval
  const minWeightMagnitude = 9;   // minimum number of zeroes that a proof-of-work transaction hash 
                                  // must end with to be considered valid by full nodes
                                  // mainnet = 14
                                  // testnet = 9
  let transactions;
  try {
    transactions = await iota.sendTrytes(bundleTrytes, DEPTH, minWeightMagnitude);
  }
  catch (err) {console.log("\nsendTrytes() failed!n\n" + err)};

  // Display bundle and transaction(s) 
  console.log("Bundle: ", transactions[0].bundle);
  for (let i of transactions) {
    console.log(`Transaction: ${i.hash} Index(${i.currentIndex}/${i.lastIndex})`);
  }

})()
 
