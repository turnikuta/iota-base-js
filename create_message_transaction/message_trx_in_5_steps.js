"use strict";

/*
  Create and broadcast a message transaction in 5 steps
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
  "name": "document.odt",
  "version": "2.4",
  "size": 306598,
  "modified": "2018-10-12T08:12:24.000Z"
};

// Convert ascii to trytes
const messageTrytes = converter.asciiToTrytes(JSON.stringify(message));

const transferObject = [{
  'address': address,
  'value': 0,
  'message': messageTrytes,
  'tag': 'TRX9IN9FIVE9STEPS'   // "TRX IN FIVE STEPS"
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
  // Step 3 - Select tips
  //
  // getTransactionsToApprove()
  // -> Returns a pair of approved transactions, which are chosen randomly after validating 
  //    the transaction trytes, the signatures and cross-checking for conflicting transactions.
  //    Tip selection is executed by a Random Walk (RW) starting at random point in given depth. 

  const depth = 3; // The random walk starts 3 milestones back, 3 is typically used by wallets
  let trxToApprove;
  try {
     trxToApprove = await iota.getTransactionsToApprove(depth);
  }
  catch (err) {console.log("\ngetTransactionsToApprove() failed!n\n" + err)};

  //
  // Step 4 - Performing PoW
  //
  // attachToTangle()
  // -> Performs the Proof-of-Work required to attach a transaction to the Tangle
  //    Returns list of transaction trytes and overwrites the following fields:
  //    * hash
  //    * nonce
  //    * attachmentTimestamp
  //    * attachmentTimsetampLowerBound
  //    * attachmentTimestampUpperBound

  const minWeightMagnitude = 9;   // minimum number of zeroes that a proof-of-work transaction hash 
                                  // must end with to be considered valid by full nodes
                                  // mainnet = 14
                                  // testnet = 9
  let attachedTrytes;
  try {
    attachedTrytes = await iota.attachToTangle(trxToApprove['trunkTransaction'],
                                               trxToApprove['branchTransaction'],
                                               minWeightMagnitude,
                                               bundleTrytes);
  }
  catch (err) {console.log("\niota.attachToTangle() failed!n\n" + err)};

  //
  // Step 5 - Broadcasting
  //
  // storeAndBroadcast()
  // -> Stores and broadcasts a list of attached transaction trytes by calling 
  //    storeTransactions()
  //      Persists a list of attached transaction trytes in the store of connected node
  //    broadcastTransactions()
  //      Broadcasts an list of attached transaction trytes to the network

  try {
    iota.storeAndBroadcast(attachedTrytes);
  }
  catch (err) {console.log("\nstoreAndBroadcast() failed!n\n" + err)};

  // Display bundle and transaction(s)
  console.log("Bundle: ", trxConverter.asTransactionObject(attachedTrytes[0]).bundle);
  for (let i of attachedTrytes) {
    let trx = trxConverter.asTransactionObject(i); 
    console.log(`Transaction: ${trx.hash} Index(${trx.currentIndex}/${trx.lastIndex})`);
  }

})()
 

