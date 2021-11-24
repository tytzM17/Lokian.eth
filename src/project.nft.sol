// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.3.2/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@4.3.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.3.2/token/ERC1155/extensions/ERC1155Burnable.sol";

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
    uint256 public constant GOLD = 0;
    
    constructor() ERC1155("") payable {
        manager = payable(msg.sender);
        
        // mons
        _mint(msg.sender, uint(Species.DRYAD), 1, "");
        _mint(msg.sender, uint(Species.HAMADRYAD), 1, "");
        _mint(msg.sender, uint(Species.LESHY), 1, "");
        _mint(msg.sender, uint(Species.SANTELMO), 1, "");
        _mint(msg.sender, uint(Species.CERBERUS), 1, "");
        _mint(msg.sender, uint(Species.EFREET), 1, "");
        _mint(msg.sender, uint(Species.FASTITOCALON), 1, "");
        _mint(msg.sender, uint(Species.ASPIDOCHELONE), 1, "");
         
		 // token
        _mint(msg.sender, GOLD, 100, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    // function mint(address account, uint256 id, uint256 amount, bytes memory data)
    //     public
    //     onlyOwner
    // {
    //     _mint(account, id, amount, data);
    // }
	
	function mintBasicPayable(address account, uint256 id, bytes memory data)
        public
        payable
    {
        require (msg.value > 0); // or >= $0.05 equivalent
        require (id > 18 && id < 66);
   
		address payable seller = payable(manager);
        _mint(account, id, 1, data);
		seller.transfer(msg.value);
    }

    // mint intermediate 
    function mintIntermPayable(address account, uint256 id, bytes memory data)
        public
        payable
    {
        require (msg.value > 0); // or >= $0.1 equivalent
        require (id > 65 && id < 111);
   
		address payable seller = payable(manager);
        _mint(account, id, 1, data);
		seller.transfer(msg.value);
    }

    function mintAdvancePayable(address account, uint256 id, bytes memory data)
        public
        payable
    {
        require (msg.value > 0); // or >= $0.2 equivalent
        require (id > 110);
   
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
	
	function mintBatchBasicPayable(address to, bytes memory data)
        public
        payable
    {
        require(msg.value > 0); // or >= $0.05 equivalent

        // uint256[] memory ids = [19,20,21...65];
        // uint256[] memory amounts = [1,1,1,1,1...n];
		
		address payable seller = payable(manager);
        _mintBatch(to, ids, amounts, data);
		seller.transfer(msg.value);
    }

    // function mintBatchIntermPayable
    // function mintBatchAdvancePayable


    
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
