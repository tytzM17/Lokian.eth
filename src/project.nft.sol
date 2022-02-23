// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts@4.3.2/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts@4.3.2/access/Ownable.sol';
import '@openzeppelin/contracts@4.3.2/token/ERC1155/extensions/ERC1155Burnable.sol';
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract Lokie is ERC1155, Ownable, ERC1155Burnable {
    IERC20 private _token;

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
    uint256 public intermediateSinglePrice;
    uint256 public advanceSinglePrice;

    bytes32 public packPriceInfo; // e.g. date
    bytes32 public singlePriceInfo;

    constructor(IERC20 token) payable ERC1155('') {
        _token = token;

        // mons
        _mint(msg.sender, uint256(Species.DRYAD), 1, '');
        _mint(msg.sender, uint256(Species.HAMADRYAD), 1, '');
        _mint(msg.sender, uint256(Species.LESHY), 1, '');
        _mint(msg.sender, uint256(Species.SANTELMO), 1, '');
        _mint(msg.sender, uint256(Species.CERBERUS), 1, '');
        _mint(msg.sender, uint256(Species.EFREET), 1, '');
        _mint(msg.sender, uint256(Species.FASTITOCALON), 1, '');
        _mint(msg.sender, uint256(Species.ASPIDOCHELONE), 1, '');

        basicPackPrice = 25000000000000000;// 0.025;
        intermediatePackPrice = 50000000000000000;// 0.05;
        advancePackPrice = 100000000000000000;// 0.1;

        // for breeding mons
        basicSinglePrice = 532000000000000; //0.000532, basicPackPrice / 47 mons
        intermediateSinglePrice = 1111000000000000; // 0.001111, intermediatePackPrice / 45 mons
        advanceSinglePrice = 2222000000000000; // 0.002222, advancePackPrice / 45 mons

        packPriceInfo = '0x00';
        singlePriceInfo = '0x00';
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
    
    // erc20 functions
    function deposit(uint256 amount) private {
        // approve first
        require(amount > 0, "Amount must be greater than 0");
        address from = msg.sender;

        _token.transferFrom(from, address(this), amount);
    }

    function withdraw(uint256 amount) public onlyOwner {
		require(amount > 0, "Amount must be greater than 0");

        _token.transfer(msg.sender, amount);
    }

    // set prices
    function setPackPrices(
        uint256 basicPrice,
        uint256 intermPrice,
        uint256 advPrice,
        bytes32 info
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
        bytes32 info
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
        require(msg.value > basicSinglePrice, "Fee must equal pack price");
        require(id > 18 && id < 66, "Species not in range");

        _mint(account, id, 1, data);
        deposit(msg.value);
    }

    function mintIntermPayable(
        address account,
        uint256 id,
        bytes memory data
    ) public payable {
        require(msg.value > intermediateSinglePrice, "Fee must equal pack price");
        require(id > 65 && id < 111, "Species not in range");

        _mint(account, id, 1, data);
        deposit(msg.value);
    }

    function mintAdvancePayable(
        address account,
        uint256 id,
        bytes memory data
    ) public payable {
        require(msg.value > advanceSinglePrice, "Fee must equal pack price");
        require(id > 110 && id < 151, "Species not in range");

        _mint(account, id, 1, data);
        deposit(msg.value);
    }

    // for buying packs
    function mintBatchBasicPayable(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public payable {
        require(msg.value > basicPackPrice, "Fee must equal pack price");
        require(ids.length == 47, "IDs length must be 47");

        _mintBatch(to, ids, amounts, data);
        deposit(msg.value);
    }

    function mintBatchIntermPayable(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public payable {
        require(msg.value > intermediatePackPrice, "Fee must equal pack price");
        require(ids.length == 45, "IDs length must be 45");

        _mintBatch(to, ids, amounts, data);
        deposit(msg.value);
    }

    function mintBatchAdvPayable(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public payable {
        require(msg.value > advancePackPrice, "Fee must equal pack price");
        require(ids.length == 40, "IDs length must be 40");

        _mintBatch(to, ids, amounts, data);
        deposit(msg.value);
    }
}
