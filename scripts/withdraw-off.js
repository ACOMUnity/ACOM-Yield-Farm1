const TokenFarm = artifacts.require("TokenFarm");

  console.log("Disabling ACOM Withdrawals.. Please Wait");

module.exports = async function(callback) {
  let tokenFarm = await TokenFarm.deployed();
  await tokenFarm.withdrawOff();

  console.log("ACOM Withdrawals Disabled");

  callback();
};
