const AgovToken = artifacts.require('AgovToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function (deployer, network, accounts) {
  // Deploy AGOV Token
  await deployer.deploy(AgovToken)
  const agovToken = await AgovToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm) //original: , acomToken.address
  const tokenFarm = await TokenFarm.deployed()

  // Transfer all AGOV Tokens to TokenFarm (1 Mio Token)
  await agovToken.transfer(tokenFarm.address, '1000000000000000000000000')
}
