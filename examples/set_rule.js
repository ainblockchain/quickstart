const Ain = require('@ainblockchain/ain-js').default;

const ain = new Ain('https://testnet-api.ainetwork.ai', 'wss://testnet-event.ainetwork.ai', 0);

// if you want to use mainnet, uncomment the following line:
// const ain = new Ain('https://mainnet-api.ainetwork.ai', 'wss://mainnet-event.ainetwork.ai', 1);

async function main() {
  // import the account using private key
  const address = ain.wallet.addAndSetDefaultAccount('YOUR_PRIVATE_KEY');

  const appName = 'YOUR_APP_NAME'; // use your app name
  const appPath = `/apps/${appName}`;

  // set write rules to allow anyone to write data
  const res = await ain.db.ref(appPath).setRule({
    value: {
      '.rule': {
        write: true,
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

  const rule = await ain.db.ref(appPath).getRule();

  console.log(JSON.stringify(rule, null, 2));
  // example output:
  // {
  //   ".rule": {
  //     "write": true
  //   }
  // }
}

main();
