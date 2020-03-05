'use strict';

/*
  Monitor confirmed value transactions
*/

const trx_converter = require('@iota/transaction-converter');
const zmq = require('zeromq-stable');

// zmq socket provide
const SOCK_PROVIDER = "tcp://zmq.devnet.iota.org:5556";
const sock = zmq.socket('sub');
sock.connect(SOCK_PROVIDER);

// Event - Transaction trytes of recently confirmed transactions
sock.subscribe("sn_trytes"); 

sock.on('message', msg => {
  const data = msg.toString().split(' '); 
	
  // [0] = sn_trytes (Transaction trytes of recently confirmed transaction)
  // [1] = Transaction trytes
  // [2] = Transaction hash
  // [3] = Index of the milestone that confirmed the transaction
  if (data[0] == "sn_trytes") {
    let trx_object = trx_converter.asTransactionObject(data[1]);        
    if ( trx_object.value > 0 ) {
        console.log("Addr: ", trx_object.address, " Value: ", trx_object.value);
    }
  }
})
