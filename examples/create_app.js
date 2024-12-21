const Ain = require('@ainblockchain/ain-js').default;
const { sleep } = require('./utils');

const ain = new Ain('https://testnet-api.ainetwork.ai', 'wss://testnet-event.ainetwork.ai', 0);

// if you want to use mainnet, uncomment the following line:
// const ain = new Ain('https://mainnet-api.ainetwork.ai', 'wss://mainnet-event.ainetwork.ai', 1);

async function main() {
  // import the account using private key
  const address = ain.wallet.addAndSetDefaultAccount('YOUR_PRIVATE_KEY');

  // define a unique app name
  // the app name can only contain letters, numbers, and underscores(_)
  // rename if write rule error occurs
  const appName = 'YOUR_APP_NAME';
  const appPath = `/apps/${appName}`;

  // create an app at /apps/${appName}
  // the admin config below gives 'address' both owner and write permissions for the app
  const res = await ain.db.ref(`/manage_app/${appName}/create/${Date.now()}`).setValue({
    value: {
      admin: {
        [address]: true,
      },
      service: {
        staking: {
          lockup_duration: 604800000, // 7d
        },
      },
    },
    gas_price: 500,
    timestamp: Date.now(),
    nonce: -1,
  });

  console.log('tx_hash:', res.tx_hash);
  console.log('code:', res.result.code);
  // 0: success, if not 0, check the error code: 
  // https://github.com/ainblockchain/ain-blockchain/blob/master/common/result-code.js

  await sleep(5000); // 5s

  // get app owner at /apps/${appName}
  const owner = await ain.db.ref(appPath).getOwner();

  console.log(JSON.stringify(owner, null, 2));
  // example output:
  // {
  //   ".owner": {
  //     "owners": {
  //       "0x09A0d53FDf1c36A131938eb379b98910e55EEfe1": {
  //         "branch_owner": true,
  //         "write_function": true,
  //         "write_owner": true,
  //         "write_rule": true
  //       }
  //     }
  //   }
  // }
}

main();
