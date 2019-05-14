'use strict';

/*
  Get the used addresses and their balances for the given account
*/

// Configure the IRI Node you want to connect to
const PROVIDER = "https://nodes.devnet.iota.org:443";

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
iota.getAccountData(seed, {})
.then(accountData => {
    const { inputs, balance } = accountData;
    console.log("Available Tokens: ", balance);
    for (let i in inputs){
       console.log(inputs[i].keyIndex, inputs[i].address, inputs[i].balance);
    }
});
