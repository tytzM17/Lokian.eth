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

    // token
    // uint8 public constant GOLD = 0;

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

        // token
        // _mint(msg.sender, GOLD, 100, '');

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

    // function mint(address account, uint256 id, uint256 amount, bytes memory data)
    //     public
    //     onlyOwner
    // {
    //     _mint(account, id, amount, data);
    // }

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
        require(id > 110);

        address payable seller = payable(manager);
        _mint(account, id, 1, data);
        seller.transfer(msg.value);
    }

    // function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    //     public
    //     onlyOwner
    // {
    //     _mintBatch(to, ids, amounts, data);
    // }

    // for buying packs
    function mintBatchBasicPayable(address to, uint256[] memory ids, bytes memory data) public payable {
        require(msg.value > basicPackPrice);

        // uint256[] memory ids = [
        //     19,
        //     20,
        //     21,
        //     22,
        //     23,
        //     24,
        //     25,
        //     26,
        //     27,
        //     28,
        //     29,
        //     30,
        //     31,
        //     31,
        //     33,
        //     34,
        //     35,
        //     36,
        //     37,
        //     38,
        //     39,
        //     40,
        //     41,
        //     42,
        //     43,
        //     44,
        //     45,
        //     46,
        //     47,
        //     48,
        //     49,
        //     50,
        //     51,
        //     52,
        //     53,
        //     54,
        //     55,
        //     56,
        //     57,
        //     58,
        //     59,
        //     60,
        //     61,
        //     62,
        //     63,
        //     64,
        //     65,
        //     65
        // ];
        uint256[] memory amounts = [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
        ];

        address payable seller = payable(manager);
        _mintBatch(to, ids, amounts, data);
        seller.transfer(msg.value);
    }

    // function mintBatchIntermPayable
    function mintBatchIntermPayable(address to, bytes memory data) public payable {
        require(msg.value > intermediatePackPrice);

        uint256[] memory ids = [
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            82,
            83,
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93,
            94,
            95,
            96,
            97,
            98,
            99,
            100,
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110
        ];
        uint256[] memory amounts = [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
        ];

        address payable seller = payable(manager);
        _mintBatch(to, ids, amounts, data);
        seller.transfer(msg.value);
    }

    // function mintBatchAdvancePayable
    function mintBatchAdvPayable(address to, bytes memory data) public payable {
        require(msg.value > advancePackPrice);

        uint256[] memory ids = [
            111,
            112,
            113,
            114,
            115,
            116,
            118,
            119,
            120,
            121,
            122,
            123,
            124,
            125,
            126,
            127,
            128,
            129,
            130,
            131,
            132,
            133,
            134,
            135,
            136,
            137,
            138,
            139,
            140,
            141,
            142,
            143,
            144,
            145,
            146,
            147,
            148,
            149,
            150
        ];
        uint256[] memory amounts = [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
        ];

        address payable seller = payable(manager);
        _mintBatch(to, ids, amounts, data);
        seller.transfer(msg.value);
    }

    // for fight winnings/ maybe the meme coin
    // function mintGold(address account, bytes memory data, uint winnerMonId)
    //     public
    // {

    //     require(winnerMonId > 18);
    //     // require account has balance of winnerMonId
    //     require(balanceOf(account, winnerMonId) > 0);

    //     _mint(account, GOLD, 100, data);
    // }
}
