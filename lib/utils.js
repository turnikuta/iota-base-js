'use strict';

const crypto = require('crypto');

function generateRandomSeed(){

  // for further Details see https://www.secureseedcommands.com/#/IOTA

  return [...Array(81)].map( () => ( function getRandomChar() { return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'[crypto.randomBytes(1)[0]] || getRandomChar() })()).join('')
}

function generateNamedSeed(name){

  // generate a 'easy to remember' seed from a given string 
     
  return pad81(name.toUpperCase());
}

function generateAddress(core, seed, {index=0, security=2, checksum=false}) {

  // index=0, get the first address (index=0) for the given seed
  // security=2, Private key/signature length, level 2 is used by trinity
  // checksum=false, don't add additional 9 trytes checksum to an address (81 trytes)

  return core.generateAddress(seed, index, security, checksum )
}

function pad81(data){
  
  // append the tryte '9' to the given trytes until the length of 81 is reached

  return data + '9'.repeat(81 - data.length); 
}

module.exports = {
  generateRandomSeed,
  generateNamedSeed,
  generateAddress,
  pad81
}

