const Ain = require('@ainblockchain/ain-js').default;

const ain = new Ain('https://testnet-api.ainetwork.ai');

async function main() {
  // import the account using private key
  const address = ain.wallet.addAndSetDefaultAccount('YOUR_PRIVATE_KEY');

  const appName = 'YOUR_APP_NAME'; // use your app name
  const appPath = `/apps/${appName}`;

  const userMessagePath = `${appPath}/messages/${address}`;

  // set a value at the path to trigger the function
  const res = await ain.db.ref(`${userMessagePath}/${Date.now()}/user`).setValue({
    value: 'Hello!',
    nonce: -1,
  });

  console.log('tx_hash:', res.tx_hash);
  // 0: success, if not 0, check the error code:
  // https://github.com/ainblockchain/ain-blockchain/blob/master/common/result-code.js
  console.log('code:', res.result.code);

  // check that the value is set correctly
  // if the echo bot is alive, it should have responded to your message
  const data = await ain.db.ref(userMessagePath).getValue();

  console.log(JSON.stringify(data, null, 2));
  // example output:
  // {
  //   "1631691438245": {
  //     "user": "Hello!",
  //     "echo-bot": "Did you mean \"Hello!\"?" // Written by the echo bot.
  //   }
  // }
}

main();
