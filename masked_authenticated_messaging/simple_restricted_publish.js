"use strict";

/*
  Create a MAM data stream and publish your data at a fixed interval

  restricted =  the "address" is derived from the "root" via a hash function
                to read a message, you need the "root" 
                to decrypt a message, you need the "secret"

  simple = the Merkle tree of the channel consists only of one node
*/

const Mam = require('@iota/mam');
const { asciiToTrytes } = require('@iota/converter')

const PROVIDER = "https://nodes.comnet.thetangle.org:443";

// Time interval (seconds) for the publishing of the data
const timeInterval = 15;

// Channel mode
const mode = 'restricted';

// "Secret" - Encryption Key 
//    The sideKey is used to en/decrypt the messages
//    Convert the "Secret"-String to 81-Trytes to get the sideKey
let secret = 'nobodyknows';
const sideKey = secret.toUpperCase().padEnd(81, '9');

// Initialize the state of the data stream 
//   seed, Null value generates a random seed
//   security, Null value defaults to 2
let mamState = Mam.init(PROVIDER)

// Set the channel mode
mamState = Mam.changeMode(mamState, mode, sideKey);

// get the Channel ID (root)
const channelId = Mam.getRoot(mamState);

console.log("The Channel ID:\n  ", channelId);
console.log("Published data:");

/*
  Publish the data
*/
const publish = async data => {
  const trytes = asciiToTrytes(JSON.stringify(data));

  // Creates a MAM message payload (returns an updated "mamState" and the payload for sending)
  const message = Mam.create(mamState, trytes);

  // store the current status of the data stream
  mamState = message.state;

  // Attach the payload(transaction) to the tangle.
  const depth = 3;
  const minWeightMagnitude = 10;
  const trxTag = "TURNIKUTA";
  const trxObject = await Mam.attach(message.payload, message.address, depth, minWeightMagnitude, trxTag);

  // print the published data
  console.log("  ", data);
}

/*
  Generate the data and start the publishing 
*/
const startPublishing = async () => {
  let randomNumber = Math.floor((Math.random()*89)+10);
  let json = { "value": randomNumber, "timestamp": (new Date()).toLocaleString() };
  await publish(json);
}

setInterval( startPublishing, parseInt(timeInterval)*1000 );
