require('babel-register')
require('babel-polyfill')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { projectId, mnemonic } = require('./secrets.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  networks: {
    development: {
      //Tested, seems to work fine
      host: '127.0.0.1', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: '5777', // Any network (default: none)
    },
    ropsten: {
      //Tested, seems to work fine
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${projectId}`),
      network_id: 3, // Ropsten's id
      gas: 70000, // Ropsten has a lower block limit than mainnet
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${projectId}`),
      network_id: 1, // mainnet's id
      gas: 8000000, // Ropsten has a lower block limit than mainnet
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false, // Skip dry run before migrations? (default: false for public nets )
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.7.0',
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'petersburg',
    },
  },
}
