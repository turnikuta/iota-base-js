This little demo shows how to monitor events published by an IOTA node

The demo contains the following scripts:
- monitor_address.js
- monitor_value_trx.js 

#### 1.  Monitor a given address for confirmed transactions

**Example:** 
```
$ node monitor_address  VJKG9KNTT9HTLSSIOYJQBNZNSFHJMEWWLQWB9GQLTAOFUZGUOMWYUZP9VPAXKMRQMREBSNF9GZWFUHDTW 
ZMQ Node:  <your-zmq-comnet-node>:5556>
Transaction: DGJUQDAJSSSRLAZPIHPAXQCXXMQMRGOEODEYGJEBYDLCKPTISSEDUMTZWOYVFGDECFWFPJQR9MBOAC999  Value: 7
```

#### 2. Monitor all value transactions

**Example:** 
```
$  node monitor_value_trx
ZMQ Node:  <your-zmq-comnet-node>:5556>
Value Transaction:  NXREMFRQFHOVYFXGJTTPGNKTRRYXPY9YWVNTXTEYNITPJXHHNGHQWUVXT9MHDDGQUWPPSAUUPFYRCZ999  Value:  113
```
