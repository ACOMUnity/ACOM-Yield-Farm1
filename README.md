# ACOM for AGOV Yield Farming Alpha Testing

DeFi app which implements the concept of yield farming / liquidity mining Adapted for Upcoming AGOV / ACOM Yield farm from the this tutorial:

[Dapp University Tutorial](https://www.youtube.com/watch?v=CgXQC4dbGUE).

## Setup & Dependences

First ensure you have all of the below programs installed:
- Install and setup [NodeJs](https://nodejs.org/en/)
- Install and setup [Git](https://git-scm.com/downloads)
- Install and start [Ganache](https://www.trufflesuite.com/ganache)
- Install and setup [MetaMask](https://metamask.io/)

- `git clone https://github.com/ACOMUnity/ACOM-Yield-Farm.git`
- `cd ACOM-Yield-Farm`
- `npm install` (within the ACOM-Yield-Farm folder created from above)

Make sure to fill in your Deploying Address's private mnemonic seed phrase.
Make sure to fill in your [Infura.io](https://infura.io) API key.
These can be fill in within the ```secrets.json``` file in the following format:
```
{
"mnemonic": "word word word word etc etc....",
"projectId": "83c6................."
}
```

## Useful commands

(Windows users don't need to use the ```npx``` prefix in the commands below)

- `npx truffle compile`
- `npx truffle migrate [--reset] [--network ropsten]` (only works on local/ganache, no do-overs on mainnet or ropsten)
- `npx truffle console [--network ropsten]`
- `npx truffle exec <path>.js`
- `npx truffle test` or `npm run test:truffle`
- `npm start -- --cert` (Start the Yield farm web server with ssl cert)
- `npm run start` (Start the Yield farm web server)
- use `ctrl + c` to shut down web server

## Issuing AGOV Tokens Via the Scripts

(Windows users don't need to use the ```npx``` prefix in the commands below)

- Scripts are in the "scripts" folder
- Ensure withdraw bool value set to true with "withdraw-on.js"
- Turn off withdraw using "withdraw-off.js"
- To run scripts use the `npx truffle exec` command prefix followed by script name
(aka to issue tokens run "truffle exec issue-tokens.js" while in "scripts" folder)  

## Misc
Inside of a truffle console you can assign the contract to a variable in order
to look inside of contract running on whatever network truffle is connected to.

To start your truffle console use your console then navigate to directory
in which was created on git clone then type:

truffle console

```
> tokenFarm = await TokenFarm.deployed()

> tokenFarm

> tokenFarm.address

> name = await tokenFarm.name()
```
