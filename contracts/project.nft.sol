// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract LokianItems is ERC1155 {
    uint256 public constant HEALING_POTION = 0;
    uint256 public constant MANA_POTION = 1;
    uint256 public constant MAGIC_POTION = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;
    uint256 public constant LOKIS_HAMMER = 5;

    constructor() ERC1155("") {
        _mint(msg.sender, HEALING_POTION, 10**27, "");
        _mint(msg.sender, MANA_POTION, 10**27, "");
        _mint(msg.sender, MAGIC_POTION, 10**27, "");
        _mint(msg.sender, LOKIS_HAMMER, 1, "");
        _mint(msg.sender, SWORD, 10**27, "");
        _mint(msg.sender, SHIELD, 10**27, "");
    }
}