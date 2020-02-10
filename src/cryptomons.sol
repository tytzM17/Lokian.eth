pragma solidity ^0.5.11;

contract Cryptomons {
    enum Species { BULBASAUR, CHARMANDER, SQUIRTLE }

    struct Card {
        uint id;
        address payable owner;
        Species species;
        uint price;
    }
    
    address public manager;
    mapping(uint => Card) public cards;
    uint public totalCards = 0;
    uint max = 2**256 - 1;
    
    modifier onlyManager() { // Modifier
        require(
            msg.sender == manager,
            "Only manager can call this."
        );
        _;
    }
    
    constructor() public {
        manager = msg.sender;
    }

    function createCard(Species species, uint price) public onlyManager {
        require(totalCards <=  max);
        Card storage card = cards[totalCards];
        card.id = totalCards;
        card.owner = msg.sender;
        card.species = species;
        card.price = price;
        totalCards++;
    }
    
    function buyCard(uint id) public payable {
        require(id < totalCards);
        require(msg.value > cards[id].price);
        address payable seller = cards[id].owner;
        cards[id].owner = msg.sender;
        seller.transfer(msg.value);
    }
}