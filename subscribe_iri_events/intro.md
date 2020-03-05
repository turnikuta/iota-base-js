This little demo shows how to monitor events publish by an IRI node

The demo contains the following scripts:
- **monitor_address_for_confirmed_trx.js** 
- **monitor_value_trx.js** 

#### 1.  Monitor a given address for confirmed transactions

**Example:** 
```
$ node monitor_address_for_confirmed_trx  VJKG9KNTT9HTLSSIOYJQBNZNSFHJMEWWLQWB9GQLTAOFUZGUOMWYUZP9VPAXKMRQMREBSNF9GZWFUHDTW 
Transaction: DGJUQDAJSSSRLAZPIHPAXQCXXMQMRGOEODEYGJEBYDLCKPTISSEDUMTZWOYVFGDECFWFPJQR9MBOAC999  Value: 7
```

#### 2. Monitor all confirmed value transactions

**Example:** 
```
$  node monitor_value_trx.js
Addr:  9ZTJRADQUDVPYPEOYUKJSA9RTKSWBPBDVWYAJUZKSXOY9HDROSUHTKMTI9IJ9PMEYKUENKMWMV9WZFOVZ  Value:  50
Addr:  VJKG9KNTT9HTLSSIOYJQBNZNSFHJMEWWLQWB9GQLTAOFUZGUOMWYUZP9VPAXKMRQMREBSNF9GZWFUHDTW  Value:  7
```
