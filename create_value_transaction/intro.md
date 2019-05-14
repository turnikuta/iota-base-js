This little demo shows how to create and send a value transaction. 

The demo contains the following scripts:
- **create_account.js** - generate a 'easy-to-remeber' seed
- **transfer_value.js** - create and send value transaction
- **get_account_info.js** - show the account balance 


#### 1. Create Accounts

**Example:** Create the two accounts "Karen" and "Richard"
```
$ node create_account.js karen
Seed:  KAREN9999999999999999999999999999999999999999999999999999999999999999999999999999
Address:  YLXSEZIW9FUEBQHWQTJM9RIIEIQIQTEDANCPY9KDOLIYVGUPIGAKRCOECPRGJVFEFKXFOKTNXUCJVA9OZ

$ node create_account.js richard
Seed:  RICHARD99999999999999999999999999999999999999999999999999999999999999999999999999
Address:  BOOLNPSJATRTZATOWIJZVJCZSYMMTWVIXKFHRTRNIAAZXDERY9SOIQYDYGKMCLNV9YFYVCNKTTQVMUVUD

```
**Note**
- the 'easy-to-remember' seed (.... but, never use such a seed with real values!)
- the first address (index 0) 


#### 2. Deposit Tokens

Use the IOTA  Faucet  https://faucet.devnet.iota.org/  and deposit 1K IOTA tokens on Karen's first address

You can check the status of the transaction on https://devnet.thetangle.org

Once the transaction has been confirmed, you can check the balances.
```
$ node get_account_info.js karen
Available Tokens:  1000
0 'YLXSEZIW9FUEBQHWQTJM9RIIEIQIQTEDANCPY9KDOLIYVGUPIGAKRCOECPRGJVFEFKXFOKTNXUCJVA9OZ' 1000

$ node get_account_info.js richard
Available Tokens:  0
```
#### 2. Transfer Tokens

**Example:** "Karen" sends 100 IOTA to "Richard"
```
$ node transfer_value.js karen 100 richard 
Bundle:  IKTEZOOGDQJO9KANGXSEC9KV9XFOPLDSVYWLECAKBSFZDKLZUGGEIZIRHGZQBKFVF9GJ9CYJ9WYNJDWZW
Transaction: FQFDRHCRNCUPEFEPCLOSPJNCI9BAXSYMZTTVSTHBPNDUJUXCOWXTEQWFVVAXRIFHDIW9TZIDEZPNMX999 Index(0/3)
Transaction: XAUBA9AFEAZEBTSEJTDUICUDCQFATLYGZZJBDWKVEHYDTRRQRXCPBYQZR9S9DHIIZMZFCTO9MKUGPW999 Index(1/3)
Transaction: ZSSLUNPQANMJTHHARRUWFESDVTHCKDTUQBVOMNCLCALSQASPWHRJWJKCIDNALGQQUWBCWORYYWNVPC999 Index(2/3)
Transaction: DZILYMUAQZBLCG9SSNR9FRORRXEOOQSELRIPRQAGQKNYBJVHODZKLQOJADTAGTZ99XUWCIMB9PKJNJ999 Index(3/3)
```
Withe the default security level 2 a total of 4 transactions were generated. 

One "Input Transaction" (with negative value) and three "Output Transactions":
- Index 0, Tail transaction with recipient's address (value = + 100)
- Index 1, Sender's address and its signature + (value = - 1000)
- Index 2, Sender's address and the rest of its signature (value = 0)
- Index 3. Remainder address (value = 900)

#### 3. Check Balances

Once the transaction has been confirmed, you can check the balances.
```
$ node get_account_info.js karen
Available Tokens:  900
1 'ZDPMMULDACOWR9ACIRRREJMHSFSZDLUDIEUHFMMFEFPPJTPRZZVEAIKQXPAHNQTCYAXLBZBGYBCMULIUC' 900

$ node get_account_info.js richard
Available Tokens:  100
0 'BOOLNPSJATRTZATOWIJZVJCZSYMMTWVIXKFHRTRNIAAZXDERY9SOIQYDYGKMCLNV9YFYVCNKTTQVMUVUD' 100
```
**Remark**
- Karen's remaining balance is now stored on a different address (Index 1)
- Richard's new balance is stored on the first address (Index 0)


#### 4. Miscellaneous 

The transfer script always generates a new receiver address. 

**Example:** "Karen" transfers tokens to "Richard" again
```
$ node transfer_value.js karen 50 richard
Bundle:  JMTGIALTBLLWEBBEAHNZSKGPCFFTJ9VVBWLL9DJCRRPFQDSAOECPZFSZTUAKHXWJDI9TNDGXZVWLDGHHC
Transaction: 9RMXBUUJPLCTOPTCVHRSXMRDZERG9SVRYFKRJJUEMF9UAMD9OPBGSMGENDR9FNMJYQJQLQLCEKCXJE999 Index(0/3)
Transaction: NBBBAKQR9HTHFCDR9QWMPNUZHFRHZKVWOBVNHURHUNNKECYJUUDXFSFMHGNBGOGHGEBOUZMWKNLSQO999 Index(1/3)
Transaction: WRFTWXNQRZL9YWTPHJTGXOMOWUUJQFQHMKITMTZZSNJKTQTFPDSEPQIFMNOSQZTCPQ9OXCZB9UIEOD999 Index(2/3)
Transaction: 9IUFNDFVHUOKOTUFGTDGJGCWMWXALDECMNCCQQXMSERDAYILLYYLYJADOUVOEKOADVHWPC9VLYPDFX999 Index(3/3)
```

Richard's balance is now distributed to 2 addresses
```
$ node get_account_info.js richard
Available Tokens:  150
0 'BOOLNPSJATRTZATOWIJZVJCZSYMMTWVIXKFHRTRNIAAZXDERY9SOIQYDYGKMCLNV9YFYVCNKTTQVMUVUD' 100
1 'MGDV9XKLUHPXRPOBULDSIHIYUZRCRMZUVXNFOPVDVVJEPWAIGLSJXLBZGMFLVPNZQIVDUYCGTZLGOMJCY' 50
```

Karen's remaining balance is now stored on the third address (Index 2)
```
$ node get_account_info.js karen
`AccountData.transfers` field is deprecated, and `AccountData.transactions` field should be used instead.
Fetching of full bundles should be done lazily.
Available Tokens:  850
2 'XPEVRJE9JIYGKXRANSMT9WHFIJMJCW9LXU9FQRUSYEDT9DRWYLPLDPOBAKUSFPFFZHSKA9BADS9SJGYSY' 850
```

**Example:** "Richard" transfers all tokens back to "Karen"
```
$ node transfer_value.js richard 150 karen
Bundle:  ZCLTKSADIASQ9AFQDCQCTNPHAFDVVGJTJFGSOKYKUWRKEFXCDJPLZCH9EKMGEQBPUADGYVDWKFALZLLHC
Transaction: Y99UVJFZMACVLBALYBWFTJLZIT9MZ9PDXFOYTPWXMDPNAYIA9UXPWKMWNSQDWNMBBXOEOUWOVMBYAP999 Index(0/4)
Transaction: IMOQKTNWYJRAACWUI9FWLIGCOEPD9NWWZGDUTMQXZUACKNRDKOUDEEKFSIBTW9TJJTTWH9JMT9DMIM999 Index(1/4)
Transaction: JLQCTF9EYBYVHSIOIPGGUFHRS9RSNADCDOAJ9FVJMWKCGCJAARRKSFDKQTTSKTAO9KBUS9GUQOYEZP999 Index(2/4)
Transaction: 9KUMRHBNZFYSPMDFKSBNQWHDSSNBNRNMMITRYNWAFSLWZJVS9TZEUVDZHFLF9BAPSKVNHRHZCRH9P9999 Index(3/4)
Transaction: TRTFYYTTJBZOSBMTZDDSUWTWLVOKLIYAYJMTYZOMD9RDJOBVDLFLAGBVRETCCTCMVOHGPGYOQXAFGX999 Index(4/4)
```
This time 5 transactions were generated. 

Two "Input Transactions", because Richard's balance was spread over two addresses.
- Index 0, Tail transaction with recipient's address (value = + 150)
- Index 1, first Sender's address and its signature + (value = - 100)
- Index 2, first Sender's address and the rest of its signature (value = 0)
- Index 3, second Sender's address and its signature + (value = - 50)
- Index 4. second Sender's address(value = 0)


Richards balance is 0
```
$ node get_account_info.js richard
Available Tokens:  0
```
**Remark**
* No remainder address is generated, because Richard's balance is 0.
* The two sender addresses should never be used again! -> https://i.imgur.com/3oejD6v.jpg  ;-)


Karens's balance is now distributed to 2 addresses
```
$ node get_account_info.js karen
Available Tokens:  1000
2 'XPEVRJE9JIYGKXRANSMT9WHFIJMJCW9LXU9FQRUSYEDT9DRWYLPLDPOBAKUSFPFFZHSKA9BADS9SJGYSY' 850
3 'SSUOYBGHRNSJWVVGMHUJ9KRGMJSWCWUAYNWGMGM9UIHFSNIJMEYOHGWKHYQHZWHRDNNSJYAIAGGFJJLBC' 150
```

