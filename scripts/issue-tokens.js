const TokenFarm = artifacts.require("TokenFarm");

  console.log("Attempting to Issue AGOV Tokens.. Please Wait");

module.exports = async function(callback) {
  let tokenFarm = await TokenFarm.deployed();
  await tokenFarm.issueTokens();

  console.log("AGOV Tokens issued");

  callback();
};
