const Ain = require('@ainblockchain/ain-js').default;

const ain = new Ain('https://testnet-api.ainetwork.ai');

function main() {
  // create new account
  const accounts = ain.wallet.create(1);
  const address = accounts[0];

  // set the new account as the default account
  ain.wallet.setDefaultAccount(address);

  console.log(ain.wallet.defaultAccount);
  // example output:
  // {
  //   address: '0xB5f90cC1b813aff4326f34c3D6215B1bEfCd2DF5',
  //   private_key: '...',
  //   public_key: '...'
  // }
}

main();