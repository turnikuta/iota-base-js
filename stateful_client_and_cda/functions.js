'use strict';

const { createAccount }  = require('@iota/account');
const { trytesToTrits } = require('@iota/converter');
const { serializeCDAMagnet, parseCDAMagnet, verifyCDA } = require('@iota/cda');
const { createPersistenceAdapter }  = require('@iota/persistence-adapter-level')

/*
  Generate a stateful account
*/

function generateAccount(seed, config){
  return new Promise(
    (resolve, reject) => {
      try {
        // *** temporary workaround ***
        // In version account@1.0.0-beta.14 you have to convert trytes to trits
        // to avoid the error message
        //    .... Illegal seed length. Expected length of 243 trits.
        // will be fixed in the upcoming release (see commit 9ad3c8f)
        seed = trytesToTrits(seed);
 
        // create an account or retrieve the data of an existing account
        resolve(createAccount({seed, 
                               provider: config.provider, 
                               persistencePath: config.persistencePath,
                               stateAdapter: createPersistenceAdapter,
                               historyAdapter: createPersistenceAdapter }) );  }
      catch(error) {
        reject(error); 
      }
    }
  )
}

/*
  Generate a CDA

  The expiration condition has to beconfigured
   - "timeoutAt" (required)
   - "multiUse" (optional) or "expectedAmount" (optional)
   -  one of the two parameters are possible and recommended
   -  if "multiUse" is true, "expectedAmount" will be ignored
*/

function getCdaOptions(config){
  return new Promise( 
    (resolve, reject) => {
      let CDAoptions = {};
      if ( typeof(config.cdaTimeout) !== 'undefined' && Number.isInteger(config.cdaTimeout) ){
        // use default security level
        CDAoptions = { security: 2 };

        // required
        CDAoptions.timeoutAt = Math.floor(new Date().getTime() / 1000 + config.cdaTimeout);

        // optional
        if ( typeof(config.multiUse) !== 'undefined' && config.multiUse === true){
          CDAoptions.multiUse = config.multiUse; 
        } else if ( typeof(config.expectedAmount) !== 'undefined' ){
            CDAoptions.expectedAmount = config.expectedAmount;
        }
        resolve(CDAoptions);
      } else {
        reject("Please set the parameter >>>cdaTimeout<<< in the config file!\n");
      }
    }
  )
}

function generateCda(account, config){

  return new Promise(
    (resolve, reject) => {
      getCdaOptions(config)
      .then(data => {
        account.generateCDA(data)
        .then(cda => {
          resolve(serializeCDAMagnet(cda))
        })
      })
      .catch(error => {
        reject(error) 
      })
    }
  )
}

/*
  Verify CDA Magnet Link
*/

function verifyMagnetLink(link){
    return new Promise(
    (resolve, reject) => {
      let currentTime = Math.floor(new Date().getTime() / 1000);
      try {
        verifyCDA(currentTime, parseCDAMagnet(link));
        resolve();
      }
      catch(error) {
        reject(error);
      }
    }
  )
}

module.exports={
  generateAccount,
  generateCda,
  verifyMagnetLink,
}
