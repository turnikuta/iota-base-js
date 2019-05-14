"use strict";

/*
  Create an account (seed + first address)
*/

// IOTA Libs
const core = require('@iota/core');

// Helper functions
const utils = require('../lib/utils');

// get a string (name) for the account
const name = process.argv[2];
if (name == undefined){
  console.log("Please provide a string (name)!\nThe string is used to generate an 'easy to remember' seed");
  process.exit();
}

// generate seed and first address (index=0)
const seed = utils.generateNamedSeed(name);
const address = utils.generateAddress(core, seed, {});

console.log("Seed: ", seed);
console.log("Address: ", address);
