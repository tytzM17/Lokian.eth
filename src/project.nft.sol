// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.3.2/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@4.3.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.3.2/token/ERC1155/extensions/ERC1155Burnable.sol";

contract Lokie is ERC1155, Ownable, ERC1155Burnable {
      // mons, maybe enum?
    // uint256 public constant DRYAD = 0;
    // uint256 public constant HAMADRYAD = 1;
    // uint256 public constant LESHY = 2;
    // uint256 public constant SANTELMO = 3;
    // uint256 public constant CERBERUS = 4;
    // uint256 public constant EFREET = 5;
    // uint256 public constant FASTITOCALON = 6;
    // uint256 public constant ASPIDOCHELONE = 7;
    // uint256 public constant ZARATAN = 8;
    // uint256 public constant ARACHNE = 9;
    // uint256 public constant JOROGUMO = 10;
    // uint256 public constant TSUCHIGUMO = 11;

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
    uint256 public constant GOLD = 151;
    
    constructor() ERC1155("") {
        // mons
        _mint(msg.sender, Species.DRYAD, 10, "");
        _mint(msg.sender, Species.HAMADRYAD, 10, "");
        _mint(msg.sender, Species.LESHY, 10, "");
        _mint(msg.sender, Species.SANTELMO, 10, "");
        _mint(msg.sender, Species.CERBERUS, 10, "");
        _mint(msg.sender, Species.EFREET, 10, "");
        _mint(msg.sender, Species.FASTITOCALON, 10, "");
        _mint(msg.sender, Species.ASPIDOCHELONE, 10, "");
         
		 // token
        _mint(msg.sender, GOLD, 1000, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }
	
	function mintPayable(address account, uint256 id, uint256 amount, bytes memory data)
        public
        payable
    {
		require(msg.value > price);
		
		address payable seller = owner;
        _mint(account, id, amount, data);
		seller.transfer(msg.value);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
	
	function mintBatchPayable(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data, uint price)
        public
        payable
    {
		require(msg.value > price);
		
		address payable seller = owner;
        _mintBatch(to, ids, amounts, data);
		seller.transfer(msg.value);
    }
    
    // for fight winnings
    function mintGold(address account, bytes memory data, uint winnerMonId)
        public
    {
       
        require(winnerMonId > 12);
        // require account has balance of winnerMonId 
        require(_balanceOf(account, winnerMonId) > 0);

        _mint(account, GOLD, 10, data);
    }
}
