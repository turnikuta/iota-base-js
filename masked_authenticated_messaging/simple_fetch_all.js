"use strict";

/*
  Fetch all messages from the given data stream
*/

const Mam = require('@iota/mam');
const { trytesToAscii } = require('@iota/converter')

const PROVIDER = "https://nodes.devnet.iota.org:443";

const usage = () => {
  const shortHelp = 'Usage: node simple_fetch_all.js <channel-mode> <channel-id> [<secret>]\n' + 
    '  channel-mode: public, private or restricted\n' +
    '  channel-id:   the "root"-address (81-Trytes)\n' +
    '  secret:       only in "restricted" mode, used to decode the message' 
  console.log('\n', shortHelp, '\n');
  process.exit();
}

//
// Get the input parameter
// 

// channel-mode
const mode = process.argv[2];
if ( ! ['public', 'private', 'restricted'].includes(mode) ){ usage() };

// channel-id (root-address)
const root = process.argv[3];
if (root === undefined || !root.match(/^[A-Z9]*$/) || root.length != 81){ usage() }

// secret resp. sideKey
const secret = process.argv[4];
let sideKey = null;
if ( mode === 'restricted' ){
  if ( secret === undefined ){ 
    console.log("Channel mode 'restricted' requires a 'secret'!");
    usage() 
  } else {
    sideKey = secret.toUpperCase().padEnd(81,'9');
  }
};

// Initialize the state of the data stream 
//   seed, null value generates a random seed
//   security, null value defaults to 2
Mam.init(PROVIDER)

/*
  Fetch the data

  There are 3 ways to retrieve the entire data stream
  1. fetchAll()          - read the entire datastrem first, then action
  2. fetchWithCallback() - read the entire datastrem first, then callback for every message
  3. fetchSingle()       - read a single message from the stream, and follow the next_root

  The format of the fetched data
  1. + 2.
    { messages: [ 'ODGAJDPC9DIDTCGADBXAABQAGAHDXC....', '....'],
      nextRoot: 'HYHF....' }
  3.
    { payload:  'ODGAJDPC9D...',
      nextRoot: 'ACCXYAUVPF...' }
*/ 

//
// --> fetchAll()
//
const fetchAll = async () => {
  const stream = await Mam.fetch(root, mode, sideKey)
  stream.messages.forEach(message => console.log(JSON.parse(trytesToAscii(message))))
  console.log("NextRoot: ", stream.nextRoot);
}

//
// --> fetchWithCallback()
//
const logData = data => { console.log(JSON.parse(trytesToAscii(data))); }
const fetchWithCallback = async () => {
  const stream = await Mam.fetch(root, mode, sideKey, logData)
  console.log("NextRoot: ", stream.nextRoot);
}

//
// --> fetchSingle()
//
const fetchSingle = async addr => {

  const message = await Mam.fetchSingle(addr, mode, sideKey)
  if ( message.payload === undefined ) {
    console.log("NextRoot: ", message.nextRoot);
  } else {
    console.log(JSON.parse(trytesToAscii(message.payload)));
    fetchSingle(message.nextRoot);
  }

}

//fetchAll();
//fetchWithCallback();
fetchSingle(root);


