"use strict";

/*
  Create a MAM data stream and publish your data at a fixed interval

  public = the "address" and the "root" are identical 
           anyone who knows the address can read the message

  simple = the Merkle tree of the channel consists only of one node
*/

const Mam = require('@iota/mam');
const { asciiToTrytes } = require('@iota/converter')

const PROVIDER = "https://nodes.comnet.thetangle.org:443";

// Time interval (seconds) for the publishing of the data
const timeInterval = 15;

// Channel mode
const mode = 'public';

// Link to the MAM Explorer (can be used to fetch the data)
const mamExplorerLink = `https://comnet.thetangle.org/streams/`

// Initialize the state of the data stream 
//   seed, Null value generates a random seed
//   security, Null value defaults to 2
let mamState = Mam.init(PROVIDER)

// get the Channel ID (root)
const channelId = Mam.getRoot(mamState);

console.log("The Channel ID:\n  ", channelId);
console.log("You can fetch the messages in the MAM Explorer:\n  ", mamExplorerLink + channelId);
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

  // only for the first message in the datastream print ...
  if ( message.state.channel.start === 1 ){
  }

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
