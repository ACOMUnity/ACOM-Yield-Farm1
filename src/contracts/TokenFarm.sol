// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./AgovToken.sol";

// 0x643fd19acbb31e5247ef652e15368f744e2a265a ETH mainnet ACOM Address ||  0xf67BC5ad4CC64F6acf1825a0bb3A5F3B999Ed42C ropsten mock ACOM Address || 0x50ECbDE759Eb6f23FFefd65CF7Ea8F305bbd0279 local testnetmock ACOM Address

contract TokenFarm {

  string public name = "ACOM Yield Farm Version 1.0.0";
  bool public canWithdraw = false;
  address public owner;
  AgovToken public agovToken;
  IERC20 public acomToken;

  address[] public stakers;

  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(AgovToken _agovToken) {
    agovToken = _agovToken;
    acomToken = IERC20(0x643fd19acbb31e5247ef652e15368f744e2a265a);
    owner = msg.sender;
  }

  function stakeTokens(uint _amount) public {
    require(_amount > 0, "ERROR: Must Invest More Than 0 ACOM!");
    acomToken.transferFrom(msg.sender, address(this), _amount);
    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
    if (!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
    }
    hasStaked[msg.sender] = true;
    isStaking[msg.sender] = true;
  }

  function unstakeTokens() public {
    uint balance = stakingBalance[msg.sender];
    require(balance > 0, "ERROR: No ACOM Investment Detected!");
    require(canWithdraw == true, "ERROR: Withdrawals Are Not Currently Enabled!");
    acomToken.transfer(msg.sender, balance);
    stakingBalance[msg.sender] = 0;
    isStaking[msg.sender] = false;
  }

  function withdrawOff() public {
    require(msg.sender == owner, "ERROR: Insufficient Owner Privileges Detected!");
    canWithdraw = false;
  }

  function withdrawOn() public {
    require(msg.sender == owner, "ERROR: Insufficient Owner Privileges Detected!");
    canWithdraw = true;
  }

  function issueTokens() public {
    require(msg.sender == owner, "ERROR: Insufficient Owner Privileges Detected!");
    for (uint i=0; i<stakers.length; i++) {
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient];
      if (balance > 0){
        uint dailyPay = (balance * 1369863000000000000000) / 1000000000000000000000000;
        agovToken.transfer(recipient, dailyPay);
      }
    }
  }
}
