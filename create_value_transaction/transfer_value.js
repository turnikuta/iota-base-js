'use strict';

/*
  Create and broadcast a value transaction
*/

// Configure the IRI Node you want to connect to
const PROVIDER = "https://nodes.devnet.iota.org:443";

// IOTA Libs
const core = require('@iota/core');
const trxConverter = require('@iota/transaction-converter');

// Helper functions
const utils = require('../lib/utils');

// iota network connect
const iota = core.composeAPI({ provider: PROVIDER });

//
if (process.argv.length != 5 ){
  console.log("Usage:   node transfer_value.js <sender> <value> receiver>");
  console.log("Example: node transfer_value.js Alice 20 Bob");
  process.exit();
}
const sender = process.argv[2];
const value = parseInt(process.argv[3]);
const receiver = process.argv[4];
// ...let's just skip the input data check

// generate 'easy to remember' seed from name
const senderSeed = utils.generateNamedSeed(sender);
const receiverSeed = utils.generateNamedSeed(receiver);

( async () => {
  // get receiver address 
  let receiverAddress;
  try {
    receiverAddress = await iota.getNewAddress(receiverSeed)
  }
  catch (err) {
    console.log("\ngetNewAddress() failed!n\n" + err)
    process.exit();
  }

  //
  //  Step 1 - Create (value) transaction object
  //
  const transferObject = [{
    'address': receiverAddress,
    'value': value,
    'tag': 'TOKENS9FOR9YOU'
  }]

  //
  // Step 2 - Create bundle
  //
  let bundleTrytes;
  try {
    bundleTrytes = await iota.prepareTransfers(senderSeed, transferObject);
  }
  catch (err) {
    console.log("\nprepareTransfers() failed!n\n" + err);
    process.exit();
  }

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
  catch (err) {
    console.log("\nsendTrytes() failed!n\n" + err);
    process.exit();
  }

  // Display bundle and transaction(s)
  console.log("Bundle: ", transactions[0].bundle);
  for (let i of transactions) {
    console.log(`Transaction: ${i.hash} Index(${i.currentIndex}/${i.lastIndex})`);
  } 
})()

