const Ain = require('@ainblockchain/ain-js').default;

const ain = new Ain('https://testnet-api.ainetwork.ai');

async function main() {
  // import the account using private key
  const from = ain.wallet.addAndSetDefaultAccount('YOUR_PRIVATE_KEY');
  const to = 'YOUR_TO_ADDRESS';

  console.log('--------------------------------');
  console.log('Before transfer:');
  console.log('- from:', await ain.wallet.getBalance(from));
  console.log('- to:', await ain.wallet.getBalance(to));
  console.log('--------------------------------');

  // transfer 1 AIN to YOUR_TO_ADDRESS
  const res = await ain.wallet.transfer({
    from: from,
    to: to,
    value: 1,
  });

  console.log('After transfer:');
  console.log('- from:', await ain.wallet.getBalance(from));
  console.log('- to:', await ain.wallet.getBalance(to));
  console.log('--------------------------------');

  console.log('tx_hash:', res.tx_hash);
  // 0: success, if not 0, check the error code:
  // https://github.com/ainblockchain/ain-blockchain/blob/master/common/result-code.js
  console.log('code:', res.result.code);
}

main();
