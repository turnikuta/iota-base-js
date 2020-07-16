'use strict';

/*
  Get the used addresses and their balances for the given account
*/

// Configure the network you want to connect to
const PROVIDER = "https://nodes.comnet.thetangle.org";

// IOTA Libs
const core = require('@iota/core');

// Helper functions
const utils = require('../lib/utils');

// iota network connect
const iota = core.composeAPI({ provider: PROVIDER });

// get a the account name used to generate an 'easy to remember' seed
const name = process.argv[2];
if (name == undefined){
  console.log("Please provide the initial string (name) used to generate an 'easy to remember' seed");
  process.exit();
}

// generate the seed 
const seed = utils.generateNamedSeed(name);

// get the data of the account 
//  - used addresses and their balances
iota.getNewAddress(seed,{index: 0, checksum: false, returnAll: true })
.then( addresses => {
  iota.getBalances(addresses)
  .then( response => {
    const sum = response.balances.reduce((a, b) => a + b, 0)
    console.log("Available Tokens: ", sum);
    for (var i = 0; i < response.balances.length; i++) {
      if ( response.balances[i] > 0 ) {
        console.log(i, addresses[i], response.balances[i]);
      }
    }
  });
});

