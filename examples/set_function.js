const Ain = require('@ainblockchain/ain-js').default;

const ain = new Ain('https://testnet-api.ainetwork.ai');

async function main() {
  // import the account using private key
  const address = ain.wallet.addAndSetDefaultAccount('YOUR_PRIVATE_KEY');

  const appName = 'YOUR_APP_NAME'; // use your app name
  const appPath = `/apps/${appName}`;

  const functionPath = `${appPath}/messages/$user_addr/$timestamp/user`; // wild cards!

  // set a function to be triggered when writing values at the function path
  const res = await ain.db.ref(functionPath).setFunction({
    value: {
      '.function': {
        'my-bot-trigger': {
          function_type: 'REST',
          function_url: 'http://echo-bot.ainetwork.ai/trigger', // endpoint to your event listener server
          function_id: 'my-bot-trigger', // use your own function id
        },
      },
    },
    nonce: -1,
  });

  console.log('tx_hash:', res.tx_hash);
  // 0: success, if not 0, check the error code:
  // https://github.com/ainblockchain/ain-blockchain/blob/master/common/result-code.js
  console.log('code:', res.result.code);
}

main();
