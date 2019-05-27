These scripts show how to publish and read data via Masked Authenticated Messaging (MAM)

The demo contains the following scripts:
- **simple_public_publish.js** - publish data in MAM mode 'public'
- **simple_private_publish.js**  - publish data in MAM mode 'private'
- **simple_restricted_publish.js** - publish data im MAM mode 'restricted'
- **simple_fetch_all.js** - retrieve the data
- **get_addr_from_root.js** - show the address for a given root (in mode 'private' or 'restricted')

**Remark**
I have chosen the prefix 'simple', because the Merkle Tree of the used channels consists only of a single node (the default behaviour of MAM).I believe that the current version of the MAM library does not support more complex Merkle Trees, because i never managed to fetch the data...


#### 1. Mode 'public'
Publish data:
```
$ node simple_public_publish.js
The Channel ID:
   YXQFQOVIDRHPMZ9GGQEBNSRNOGEAXH9QQOCJWLXPIEDFVTWOYIXFPILDQKYIIIEBYLHGSZE9WVXVFUWNA
You can fetch the messages in the MAM Explorer:
   https://mam-explorer.firebaseapp.com/?provider=https%3A%2F%2Fnodes.devnet.iota.org%3A443&mode=public&root=YXQFQOVIDRHPMZ9GGQEBNSRNOGEAXH9QQOCJWLXPIEDFVTWOYIXFPILDQKYIIIEBYLHGSZE9WVXVFUWNA
Published data:
   { value: 19, timestamp: '5/27/2019, 3:52:50 PM' }
   { value: 18, timestamp: '5/27/2019, 3:53:05 PM' }
   { value: 26, timestamp: '5/27/2019, 3:53:20 PM' }
```
Retrieve data:
```
$ node simple_fetch_all.js public YXQFQOVIDRHPMZ9GGQEBNSRNOGEAXH9QQOCJWLXPIEDFVTWOYIXFPILDQKYIIIEBYLHGSZE9WVXVFUWNA
{ value: 19, timestamp: '5/27/2019, 3:52:50 PM' }
{ value: 18, timestamp: '5/27/2019, 3:53:05 PM' }
{ value: 26, timestamp: '5/27/2019, 3:53:20 PM' }
NextRoot:  MUQGIRS9ISAIYVAYBNIWKOZRSETZXTNSYJACHFUKPBTNRAGXAGWJAJ9ZZQKPOEJLERZSSGUUQH9FFIBZT
```

#### 2. Mode 'private'
Publish data:
```
$ node simple_private_publish.js
The Channel ID:
   RTDDXUOLSELENPSKFQOQPNXUJANBVKNHBIQVFNSLSCSGBYZKVJLAMUDHJWLXGEFMYVYUBSAUHNANRZQ9Z
You can fetch the messages in the MAM Explorer:
   https://mam-explorer.firebaseapp.com/?provider=https%3A%2F%2Fnodes.devnet.iota.org%3A443&mode=private&root=RTDDXUOLSELENPSKFQOQPNXUJANBVKNHBIQVFNSLSCSGBYZKVJLAMUDHJWLXGEFMYVYUBSAUHNANRZQ9Z
Published data:
   { value: 54, timestamp: '5/27/2019, 3:55:54 PM' }
   { value: 40, timestamp: '5/27/2019, 3:56:09 PM' }
   { value: 46, timestamp: '5/27/2019, 3:56:24 PM' }
```
Retrieve data:
```
$ node simple_fetch_all.js private RTDDXUOLSELENPSKFQOQPNXUJANBVKNHBIQVFNSLSCSGBYZKVJLAMUDHJWLXGEFMYVYUBSAUHNANRZQ9Z
{ value: 54, timestamp: '5/27/2019, 3:55:54 PM' }
{ value: 40, timestamp: '5/27/2019, 3:56:09 PM' }
{ value: 46, timestamp: '5/27/2019, 3:56:24 PM' }
```

#### 3. Mode 'restricted'
Publish data:
```
$ node simple_restricted_publish.js
The Channel ID:
   CPQMDIPNBK9KHOIVFLVMKJKYAFPBPXKNYPFXCSOWDMQRCILCAEFSEYIHPCZPLUKTJFPTVZESVADTQTFZU
You can fetch the messages in the MAM Explorer:
   https://mam-explorer.firebaseapp.com/?provider=https%3A%2F%2Fnodes.devnet.iota.org%3A443&mode=restricted&key=NOBODYKNOWS9999999999999999999999999999999999999999999999999999999999999999999999&root=CPQMDIPNBK9KHOIVFLVMKJKYAFPBPXKNYPFXCSOWDMQRCILCAEFSEYIHPCZPLUKTJFPTVZESVADTQTFZU
Published data:
   { value: 62, timestamp: '5/27/2019, 4:00:17 PM' }
   { value: 76, timestamp: '5/27/2019, 4:00:32 PM' }
   { value: 51, timestamp: '5/27/2019, 4:00:47 PM' }
```
Retrieve data:
```
$ node simple_fetch_all.js restricted CPQMDIPNBK9KHOIVFLVMKJKYAFPBPXKNYPFXCSOWDMQRCILCAEFSEYIHPCZPLUKTJFPTVZESVADTQTFZU nobodyknows
{ value: 62, timestamp: '5/27/2019, 4:00:17 PM' }
{ value: 76, timestamp: '5/27/2019, 4:00:32 PM' }
{ value: 51, timestamp: '5/27/2019, 4:00:47 PM' }
NextRoot:  HTCKJMNDS9NTEBQHCPBXYQKYHRTNFLWHHNURHQE9PNWMIQRRI9ESEBOUJGTELDQTVBLZPMLYETJHGCZ9Y
```


#### 4. Miscellaneous
If you want to find the MAM transactions in the Tangle Explorer (https://devnet.thetangle.org/), you can use the 'root' (Channel ID) only for the MAM mode 'public'. In the 'private' and'restricted' mode, the address is derived from the 'root'-address (`address = hash(root)`).

```
$ node get_addr_from_root.js CPQMDIPNBK9KHOIVFLVMKJKYAFPBPXKNYPFXCSOWDMQRCILCAEFSEYIHPCZPLUKTJFPTVZESVADTQTFZU
The address used to store the MAM transactions is:  JXQGJUDYDTRTWLEHSWPDCHBES9EWLJFJEFNSUNFLKZVV9VJWTURKWZKIEKTTENKBEIEJTREUEHDCFTFTQ
```



