'use strict';
// 
// In the 'private' and'restricted' mode, the address used to store the
// MAM transactions on the tangle is derived vom 'root'-address (Channel-ID).
//       address = hash(root) 
// 
// The script generates to "address" for a given "root" 
//
const Curl = require('@iota/curl').default
const converter = require('@iota/converter')

// channel-id (root-address)
const root = process.argv[2];
if (root === undefined || !root.match(/^[A-Z9]*$/) || root.length != 81){ 
  console.log("Please add 'root'-address (81-Trytes)!");
  process.exit();
}

function hash(rounds, ...keys) {
    const curl = new Curl(rounds)
    const key = new Int8Array(Curl.HASH_LENGTH)
    curl.initialize()
    keys.map(k => curl.absorb(k, 0, Curl.HASH_LENGTH))
    curl.squeeze(key, 0, Curl.HASH_LENGTH)
    return key
}
const address = converter.trytes(hash(81, converter.trits(root.slice())));
console.log("The address used to store the MAM transactions is: ", address);
