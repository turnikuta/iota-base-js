'use strict';

/*
  Monitor confirmed value transactions
*/

const trx_converter = require('@iota/transaction-converter');
const zmq = require('zeromq-stable');

//
// --> Please add your comnet node >>>here<<< 
//     The ZMQ Plugin musst be enabled!
//
//const SOCK_PROVIDER = "tcp://<your-zmq-comnet-node>:5556";
const SOCK_PROVIDER = "tcp://iota63.nodes.omsiluli.de:5556";
const sock = zmq.socket('sub');
sock.connect(SOCK_PROVIDER);

// Event - Transaction trytes of recently confirmed transactions
sock.subscribe("tx"); 

console.log("ZMQ Node: ", SOCK_PROVIDER);
sock.on('message', msg => {
  const data = msg.toString().split(' '); 

  if (data[0] == "tx") {
    // Index 0: tx (Transaction that the node has recently appended to its database)
    // Index 1: Transaction hash
    // Index 2: Address
    // Index 3: Value
    // Index 4: Obsolete tag
    // Index 5: Value of the transaction's timestamp field
    // Index 6: Index of the transaction in the bundle
    // Index 7: Last transaction index of the bundle
    // Index 8: Bundle hash
    // Index 9: Trunk transaction hash
    // Index 10: Branch transaction
    if ( data[3] > 0 ) {
        console.log("Value Transaction: ", data[1], " Value: ", data[3]);
    }
  }
})
