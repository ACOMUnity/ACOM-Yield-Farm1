// SPDX-License-Identifier: MIT
pragma solidity >0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";

contract AgovToken is ERC20, ERC20Capped {

    constructor()
        ERC20('ADSactly Governance Coin', 'AGOV')
        ERC20Capped(1000000000 * (10**uint256(18))) public
    {
        _mint(msg.sender, 1000000 * (10**uint256(decimals())));
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Capped) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
