// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./AgovToken.sol";

// 0x643fd19acbb31e5247ef652e15368f744e2a265a ETH mainnet ACOM Address ||  0xf67BC5ad4CC64F6acf1825a0bb3A5F3B999Ed42C ropsten mock ACOM Address || 0x50ECbDE759Eb6f23FFefd65CF7Ea8F305bbd0279 local testnetmock ACOM Address

contract TokenFarm is Pausable, Ownable {

    string public name = "ACOM Yield Farm Version 1.0.0";
    AgovToken public agovToken;
    IERC20 public acomToken;

    address[] private stakeholder;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor() public {
        agovToken = new AgovToken();
        acomToken = IERC20(0x643fd19acBb31E5247EF652e15368f744e2a265a);
    }
    
    function setAcomToken(address token) public onlyOwner {
        acomToken = IERC20(token);
    }

    function getStakeholder() public view returns (address[] memory) {
        return stakeholder;
    }

    function stakeTokens(uint _amount) public whenNotPaused {
        require(_amount > 0, "ERROR: You must stake more than 0 ACOM.");
        acomToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if (!hasStaked[msg.sender]) {
            stakeholder.push(msg.sender);
        }
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    function unstakeTokens() public whenNotPaused {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "ERROR: You have not staked any ACOM.");
        acomToken.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    function issueTokens() public onlyOwner {
        for (uint i = 0; i < stakeholder.length; i++) {
            address recipient = stakeholder[i];
            uint balance = stakingBalance[recipient];
            if (balance > 0) {
                uint dailyPay = (balance * 1369863000000000000000) / 1000000000000000000000000;
                agovToken.transfer(recipient, dailyPay);
            }
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    receive() external payable {
        revert();
    }
}
