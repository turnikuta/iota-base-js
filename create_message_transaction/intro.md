## Introduction

The scripts show how to save a message in the IOTA Tangle. The JavaScript library iota.js provides the required functions. The creation and sending of a transaction basically requires 5 steps, whereas the library allows to combine steps.

- message_trx_in_5_steps.js
- message_trx_in_3_steps.js
- get_message_from_trx.js

#### Create Message Transaction in 5 Steps
**Example 1:** Short Message that fits in one transaction
```
$ node trx_in_5_steps.js
Bundle:  IEDRVRWULAAIDWFARUFJDZGXJYTYLA9W9IEYGXCLZPDKYGRVBEZCNVAIZNSYKYAFEGBRTRDVHZVTDGIZD
Transaction: HM9CXW9JLMJHCGLZCYIOGWWSFUSQMTNNR9WEMRRHEYFFFNIURKFNGGSVQBFBJAOOYYVVHURSPOVIOD999 Index(0/0)
```

#### Create Message Transaction in 3 Steps
**Example 2:** Long message that needs 5 transactions
```
$ node trx_in_3_steps.js
Bundle:  DBWVROCIFB9DSKDVOWLJFUKL9WYICKTTAJCUDJQOOEVWBGLIIYAGJ9ZSLQKZWGIJLXXNS9ACFZZIZCBVA
Transaction: GFJPANOMHKYOCRREJZUVLBLIJKUWVFOHBBVZQMKYQJGUY9VMREUIMIHTMLEWTJUTZ9FXGLNVLNYWEZ999 Index(0/4)
Transaction: QAFRDLHNAVYSXFEUSKVR9EDODB9RYKZFV9HCIMMPZZLPKIMEJKVWZMUWMPKQVRI9YA9QG9BJGB9TJS999 Index(1/4)
Transaction: HHTBMEJZCTJIGYDEETUMA9AIVJHWJAPEZPHQWZWUMLWEGSAHPEEWBMAJOHJQBIFSLSNDIGMIFOBWPJ999 Index(2/4)
Transaction: UDX9TORUDBHCZMBHYJWMVCUOJIPEQZWZEUEF9BVELYEYNQSZKCSLZSFQDQWBYIXQLMDKVJF9IKMQKY999 Index(3/4)
Transaction: XGXQHNSIWTRT99LWQJMGHSQ9NCKRXVGIA9YRKNVOWRFKVBUDBDC9GBXLCKFKEMSIG9CGJYLPYGNXRT999 Index(4/4)
```

#### Retrieve Message from the Tangle
**Remark:** Always pass the tail transaction (Index 0) to the script

Retrieve Message from Example 1
```
$ node get_message_from_trx.js HM9CXW9JLMJHCGLZCYIOGWWSFUSQMTNNR9WEMRRHEYFFFNIURKFNGGSVQBFBJAOOYYVVHURSPOVIOD999
Message:
 { name: 'document.odt',
  version: '2.4',
  size: 306598,
  modified: '2018-10-12T08:12:24.000Z' }

```

Retrieve Message from Example 2
```
$ node get_message_from_trx.js GFJPANOMHKYOCRREJZUVLBLIJKUWVFOHBBVZQMKYQJGUY9VMREUIMIHTMLEWTJUTZ9FXGLNVLNYWEZ999
Message:
 { data:
   'VERY9LONG9MESSAGE9VERY9LONG9MESSAGE9VERY9LONG9MESSAGE9VERY9LONG9MESSAGE9V..........}

```
