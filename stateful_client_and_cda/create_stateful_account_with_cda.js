"use strict";

/*
  Create a stateful client (account) and a conditional deposit address (CDA)
*/

const fs = require('fs'); 
const { generateNamedSeed } = require('../lib/utils.js');
const { generateAccount, generateCda }  = require('./functions.js');

// load configuration
const CONFIG = require('./config.json');

// create directory to store the account information
fs.mkdirSync(CONFIG.persistencePath, { recursive: true });

// get a string (name) for the account
const name = process.argv[2];
if (name == undefined){
  console.log("Please provide a string (name)!\nThe string is used to generate an 'easy to remember' seed");
  process.exit();
}

// generate 'easy-to-remember' seed
let seed = generateNamedSeed(name)
console.log("SEED: ", seed);

// generate statefule account
generateAccount(seed, CONFIG)
.then(account => { 
  // generate cda
  generateCda(account, CONFIG)
  .then(magnetLink => { 
    console.log("CDA:  ", magnetLink); 
  })
})
.catch(error => { 
  console.log("Something went wrong!!\n\n",error);
})
