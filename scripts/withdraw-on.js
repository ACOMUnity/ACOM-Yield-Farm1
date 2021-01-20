const TokenFarm = artifacts.require("TokenFarm");

  console.log("Enabling ACOM Withdrawals.. Please Wait");

module.exports = async function(callback) {
  let tokenFarm = await TokenFarm.deployed();
  await tokenFarm.withdrawOn();

  console.log("ACOM Withdrawals Enabled");

  callback();
};
