// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts@4.3.2/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts@4.3.2/access/Ownable.sol';
import '@openzeppelin/contracts@4.3.2/token/ERC1155/extensions/ERC1155Burnable.sol';

contract Lokie is ERC1155, Ownable, ERC1155Burnable {
    // Payable address can receive Ether
    address payable public manager;

    enum Species {
        DRYAD,
        HAMADRYAD,
        LESHY,
        SANTELMO,
        CERBERUS,
        EFREET,
        FASTITOCALON,
        ASPIDOCHELONE,
        ZARATAN,
        ARACHNE,
        JOROGUMO,
        TSUCHIGUMO
    }

    uint256 public basicPackPrice;
    uint256 public intermediatePackPrice;
    uint256 public advancePackPrice;

    uint256 public basicSinglePrice;
    uint256 public intermediateSingePrice;
    uint256 public advanceSingePrice;

    bytes32 public packPriceInfo; // e.g. date
    bytes32 public singlePriceInfo;

    constructor() payable ERC1155('') {
        manager = payable(msg.sender);

        // mons
        _mint(msg.sender, uint256(Species.DRYAD), 1, '');
        _mint(msg.sender, uint256(Species.HAMADRYAD), 1, '');
        _mint(msg.sender, uint256(Species.LESHY), 1, '');
        _mint(msg.sender, uint256(Species.SANTELMO), 1, '');
        _mint(msg.sender, uint256(Species.CERBERUS), 1, '');
        _mint(msg.sender, uint256(Species.EFREET), 1, '');
        _mint(msg.sender, uint256(Species.FASTITOCALON), 1, '');
        _mint(msg.sender, uint256(Species.ASPIDOCHELONE), 1, '');

        basicPackPrice = 0;
        intermediatePackPrice = 0;
        advancePackPrice = 0;

        basicSinglePrice = 0;
        intermediateSinglePrice = 0;
        advanceSinglePrice = 0;

        packPriceInfo = '0x00';
        singlePriceInfo = '0x00';
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    // set prices
    function setPackPrices(
        uint256 basicPrice,
        uint256 intermPrice,
        uint256 advPrice,
        bytes32 memory info
    ) public onlyOwner {
        basicPackPrice = basicPrice;
        intermediatePackPrice = intermPrice;
        advancePackPrice = advPrice;
        packPriceInfo = info;
    }

    function setSinglePrices(
        uint256 basicPrice,
        uint256 intermPrice,
        uint256 advPrice,
        bytes32 memory info
    ) public onlyOwner {
        basicSinglePrice = basicPrice;
        intermediateSinglePrice = intermPrice;
        advanceSinglePrice = advPrice;
        singlePriceInfo = info;
    }

    // for breeding then mint
    function mintBasicPayable(
        address account,
        uint256 id,
        bytes memory data
    ) public payable {
        require(msg.value > basicSinglePrice);
        require(id > 18 && id < 66);

        address payable seller = payable(manager);
        _mint(account, id, 1, data);
        seller.transfer(msg.value);
    }

    function mintIntermPayable(
        address account,
        uint256 id,
        bytes memory data
    ) public payable {
        require(msg.value > intermediateSinglePrice);
        require(id > 65 && id < 111);

        address payable seller = payable(manager);
        _mint(account, id, 1, data);
        seller.transfer(msg.value);
    }

    function mintAdvancePayable(
        address account,
        uint256 id,
        bytes memory data
    ) public payable {
        require(msg.value > advanceSinglePrice);
        require(id > 110 && id < 151);

        address payable seller = payable(manager);
        _mint(account, id, 1, data);
        seller.transfer(msg.value);
    }

    // for buying packs
    function mintBatchBasicPayable(
        address to,
        uint256[] memory ids,
        bytes memory data
    ) public payable {
        require(msg.value > basicPackPrice);
        require(ids.length == 47);

        uint256[] memory amounts;

        for (uint256 i = 0; i < ids.length; i++) {
            amount.push(1);
        }

        address payable seller = payable(manager);
        _mintBatch(to, ids, amounts, data);
        seller.transfer(msg.value);
    }

    // function mintBatchIntermPayable
    function mintBatchIntermPayable(
        address to,
        uint256[] memory ids,
        bytes memory data
    ) public payable {
        require(msg.value > intermediatePackPrice);
        require(ids.length == 45);

        uint256[] memory amounts;

        for (uint256 i = 0; i < ids.length; i++) {
            amount.push(1);
        }

        address payable seller = payable(manager);
        _mintBatch(to, ids, amounts, data);
        seller.transfer(msg.value);
    }

    // function mintBatchAdvancePayable
    function mintBatchAdvPayable(
        address to,
        uint256[] memory ids,
        bytes memory data
    ) public payable {
        require(msg.value > advancePackPrice);
        require(ids.length == 40);

        uint256[] memory amounts;

        for (uint256 i = 0; i < ids.length; i++) {
            amount.push(1);
        }

        address payable seller = payable(manager);
        _mintBatch(to, ids, amounts, data);
        seller.transfer(msg.value);
    }
}
