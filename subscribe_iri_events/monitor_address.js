'use strict';

/* 
  Monitor a given address for confirmed transactions
*/

const core = require('@iota/core');
const zmq = require('zeromq-stable');

// iota network connect
const PROVIDER = "https://nodes.comnet.thetangle.org:443";
const iota = core.composeAPI({ provider: PROVIDER });

//
// --> Please add your comnet node >>>here<<<
//     The ZMQ Plugin musst be enabled!
//
//const SOCK_PROVIDER = "tcp://<your-zmq-comnet-node>:5556";
const SOCK_PROVIDER = "tcp://iota63.nodes.omsiluli.de:5556";
const sock = zmq.socket('sub');
sock.connect(SOCK_PROVIDER);

// get address 
let addr = process.argv[2];
if (addr == undefined || !addr.match(/^[A-Z9]*$/) || addr.length < 81){
  console.log("Please provide the address you want to monitor! (81 Trytes)");
  process.exit();
}
// addr without checksum
if (addr.length > 81) {
  addr = addr.slice(0,81);
}

// Event - Monitor a given address for a confirmed transaction
sock.subscribe(addr);

console.log("ZMQ Node: ", SOCK_PROVIDER);
sock.on('message', msg => {
  const data = msg.toString().split(' '); 
  // [0] = address
  // [1] = trx hash
  // [2] = milestone index
  iota.getTransactionObjects([data[1]])  // array with trx hashes
  .then(trxObjects => {
    trxObjects.map(trxData => {
      console.log(`Transaction: ${trxData.hash}  Value: ${trxData.value}`);
    })
  })
})

