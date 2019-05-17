'use strict';

const core = require('@iota/core');
const zmq = require('zeromq-stable');

const SOCK_PROVIDER = "tcp://zmq.devnet.iota.org:5556";
const sock = zmq.socket('sub');
sock.connect(SOCK_PROVIDER);

const PROVIDER = "https://nodes.devnet.iota.org:443";
const iota = core.composeAPI({ provider: PROVIDER });

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

sock.subscribe(addr);

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
