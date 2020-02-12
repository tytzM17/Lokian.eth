pragma solidity ^0.5.11;

contract Cryptomons {
    
    // 151 different Cryptomon species implemented and saved in the following enum variable.
    enum Species { BULBASAUR, IVYSAUR, VENUSAUR, CHARMANDER, CHARMELEON, CHARIZARD, SQUIRTLE, WARTORTLE, BLASTOISE, CATERPIE,
    METAPOD, BUTTERFREE, WEEDLE, KAKUNA, BEEDRILL, PIDGEY, PIDGEOTTO, PIDGEOT, RATTATA, RATICATE, SPEAROW, FEAROW, EKANS,
    ARBOK, PIKACHU, RAICHU, SANDSHREW, SANDSLASH, NIDORAN_F, NIDORINA, NIDOQUEEN, NIDORAN_M, NIDORINO, NIDOKING, CLEFAIRY,
    CLEFABLE, VULPIX, NINETALES, JIGGLYPUFF, WIGGLYTUFF, ZUBAT, GOLBAT, ODDISH, GLOOM, VILEPLUME, PARAS, PARASECT, VENONAT,
    VENOMOTH, DIGLETT, DUGTRIO, MEOWTH, PERSIAN, PSYDUCK, GOLDUCK, MANKEY, PRIMEAPE, GROWLITHE, ARCANINE, POLIWAG, POLIWHIRL,
    POLIWRATH, ABRA, KADABRA, ALAKAZAM, MACHOP, MACHOKE, MACHAMP, BELLSPROUT, WEEPINBELL, VICTREEBEL, TENTACOOL, TENTACRUEL,
    GEODUDE, GRAVELER, GOLEM, PONYTA, RAPIDASH, SLOWPOKE, SLOWBRO, MAGNEMITE, MAGNETON, FARFETCH_D, DODUO, DODRIO, SEEL,
    DEWGONG, GRIMER, MUK, SHELLDER, CLOYSTER, GASTLY, HAUNTER, GENGAR, ONIX, DROWZEE, HYPNO, KRABBY, KINGLER, VOLTORB,
    ELECTRODE, EXEGGCUTE, EXEGGUTOR, CUBONE, MAROWAK, HITMONLEE, HITMONCHAN, LICKITUNG, KOFFING, WEEZING, RHYHORN, RHYDON,
    CHANSEY, TANGELA, KANGASKHAN, HORSEA, SEADRA, GOLDEEN, SEAKING, STARYU, STARMIE, MR_MIME, SCYTHER, JYNX, ELECTABUZZ,
    MAGMAR, PINSIR, TAUROS, MAGIKARP, GYARADOS, LAPRAS, DITTO, EEVEE, VAPOREON, JOLTEON, FLAREON, PORYGON, OMANYTE, OMASTAR,
    KABUTO, KABUTOPS, AERODACTYL, SNORLAX, ARTICUNO, ZAPDOS, MOLTRES, DRATINI, DRAGONAIR, DRAGONITE, MEWTWO, MEW }

    //enum plant{BULBASAUR, IVYSAUR, VENUSAUR, ODDISH, GLOOM, VILEPLUME, BELLSPROUT, WEEPINBELL, VICTREEBEL, TANGELA}
    //enum Fire {CHARMANDER, CHARMELEON, CHARIZARD, VULPIX, NINETALES, GROWLITHE, ARCANINE, PONYTA, RAPIDASH, MAGMAR, FLAREON, MOLTRES}
    //enum Water {SQUIRTLE, WARTORTLE, BLASTOISE, PSYDUCK, GOLDUCK, POLIWAG, POLIWHIRL, POLIWRATH, TENTACOOL, TENTACRUEL, SLOWPOKE, SLOWBRO, SEEL, DEWGONG, SHELLDER, CLOYSTER, KRABBY, KINGLER, HORSEA, SEADRA, GOLDEEN, SEAKING, STARYU, STARMIE, MAGIKARP, GYARADOS, LAPRAS, VAPOREON, OMANYTE, OMASTAR, KABUTO, KABUTOPS, ARTICUNO }
    //enum Bug {CATERPIE, METAPOD, BUTTERFREE, WEEDLE, KAKUNA, BEEDRILL, PARAS, PARASECT, VENONAT, VENOMOTH,  SCYTHER,  PINSIR}
    //enum Normal {PIDGEY, PIDGEOTTO, PIDGEOT, RATTATA, RATICATE, SPEAROW, FEAROW, NIDORAN_F, NIDORINA, NIDOQUEEN, NIDORAN_M, NIDORINO, NIDOKING, CLEFAIRY, CLEFABLE, JIGGLYPUFF, WIGGLYTUFF, MEOWTH, PERSIAN, MANKEY, PRIMEAPE, MACHOP, MACHOKE, MACHAMP, FARFETCH_D, DODUO, DODRIO, HITMONLEE, HITMONCHAN, LICKITUNG, CHANSEY, KANGASKHAN, MR_MIME, TAUROS, PORYGON, AERODACTYL, SNORLAX}
    //enum Poison {EKANS, ARBOK, ZUBAT, GOLBAT, GRIMER, MUK, KOFFING, WEEZING}
    //enum Thunder {PIKACHU, RAICHU, MAGNEMITE, MAGNETON, VOLTORB, ELECTRODE, ELECTABUZZ, JOLTEON, ZAPDOS}
    //enum Earth {SANDSHREW, SANDSLASH, DIGLETT, DUGTRIO, GEODUDE, GRAVELER, GOLEM, ONIX, CUBONE, MAROWAK, RHYHORN, RHYDON}
    //enum Psychic {ABRA, KADABRA, ALAKAZAM, GASTLY, HAUNTER, GENGAR, DROWZEE, HYPNO, EXEGGCUTE, EXEGGUTOR, JYNX, DRATINI, DRAGONAIR, DRAGONITE, MEW, MEWTWO}
    
    //enum plant{BULBASAUR, ODDISH, BELLSPROUT, TANGELA}
    //enum Fire {CHARMANDER, VULPIX, GROWLITHE, PONYTA, MAGMAR, MOLTRES}
    //enum Water {SQUIRTLE, PSYDUCK, POLIWAG, TENTACOOL, SLOWPOKE, SEEL, SHELLDER, KRABBY, HORSEA, GOLDEEN, STARYU, MAGIKARP, LAPRAS, OMANYTE, KABUTO, ARTICUNO}
    //enum Bug {CATERPIE, WEEDLE, PARAS, VENONAT, SCYTHER,  PINSIR}
    //enum Normal {PIDGEY, RATTATA, SPEAROW, NIDORAN_F, NIDORAN_M, CLEFAIRY, JIGGLYPUFF, MEOWTH, MANKEY, MACHOP, FARFETCH_D, DODUO, HITMONLEE, LICKITUNG, CHANSEY, TAUROS, PORYGON, AERODACTYL, SNORLAX}
    //enum Poison {EKANS, ZUBAT, GRIMER, KOFFING}
    //enum Thunder {PIKACHU, MAGNEMITE, VOLTORB, ELECTABUZZ, ZAPDOS}
    //enum Earth {SANDSHREW, DIGLETT, GEODUDE, ONIX, CUBONE, RHYHORN} KANGASKHAN
    //enum Psychic {ABRA, GASTLY, DROWZEE, EXEGGCUTE, JYNX, DRATINI, MEW}
    
    // All 151 species types. Numbering follows this convention:
    //0(plant), 1(fire), 2(water), 3(bug), 4(normal), 5(poison), 6(tunder), 7(earth), 8(psychic), 9(ditto), 10(eevee)
    uint8[151] monTypes = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 6,
    6, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 5, 5, 0, 0, 0, 3, 3, 3, 3, 7, 7, 4, 4, 2, 2, 4, 4, 1,
    1, 2, 2, 2, 8, 8, 8, 4, 4, 4, 0, 0, 0, 2, 2, 7, 7, 7, 1, 1, 2, 2, 6, 6, 4, 4, 4, 2, 2, 5, 5, 2, 2,
    8, 8, 8, 7, 8, 8, 2, 2, 6, 6, 8, 8, 7, 7, 4, 4, 4, 5, 5, 7, 7, 4, 0, 4, 2, 2, 2, 2, 2, 2, 4, 3, 8,
    6, 1, 3, 4, 2, 2, 2, 9, 10, 2, 6, 1, 4, 2, 2, 2, 2, 4, 4, 2, 6, 1, 8, 8, 8, 8, 8];
    
    // Array keeping which Cryptomon species can evolve to the next one through breeding.
    bool[151] evolves = [true, true, false, true, true, false, true, true, false, true, true, false,
    true, true, false, true, true, false, true, false, true, false, true, false, true, false, true,
    false, true, true, false, true, true, false, true, false, true, false, true, false, true, false,
    true, true, false, true, false, true, false, true, false, true, false, true, false, true, false,
    true, false, true, true, false, true, true, false, true, true, false, true, true, false, true,
    false, true, true, false, true, false, true, false, true, false, false, true, false, true, false,
    true, false, true, false, true, true, false, false, true, false, true, false, true, false, true,
    false, true, false, true, false, false, true, false, true, false, false, false, false, true, false,
    true, false, true, false, false, false, false, false, false, false, false, true, false, false,
    false, false, false, false, false, false, true, false, true, false, false, false, false, false,
    false, true, true, false, true, false];
    
    // Base stats of each species used for fighting. We ended up removing this implementation because
    // it required high gas limit. So instead of having base stats for each species we decided to
    // have a base stat of 100 for all speecies.
    //uint8[151] Hp = [45, 60, 80, 39, 58, 78, 44, 59, 79, 45, 50, 60, 40, 45, 65, 40, 63, 83, 30, 55, 40, 65, 35, 60, 35, 60, 50, 75, 55, 70, 90, 46, 61, 81, 70, 95, 38, 73, 115, 140, 40, 75, 45, 60, 75, 35, 60, 60, 70, 10, 35, 40, 65, 50, 80, 40, 65, 55, 90, 40, 65, 90, 25, 40, 55, 70, 80, 90, 50, 65, 80, 40, 80, 40, 55, 80, 50, 65, 90, 95, 25, 50, 52, 35, 60, 65, 90, 80, 105, 30, 50, 30, 45, 60, 35, 60, 85, 30, 55, 40, 60, 60, 95, 50, 60, 50, 50, 90, 40, 65, 80, 105, 244, 65, 105, 30, 55, 45, 80, 30, 60, 40, 70, 65, 65, 65, 65, 75, 20, 95, 130, 48, 55, 130, 65, 65, 65, 35, 70, 30, 60, 80, 160, 90, 90, 90, 41, 61, 91, 106, 100];
    //uint8[151] Atk = [49, 62, 82, 52, 64, 84, 48, 63, 83, 30, 20, 45, 35, 25, 80, 45, 60, 80, 56, 81, 60, 90, 60, 85, 55, 90, 75, 100, 47, 62, 82, 57, 72, 92, 45, 70, 41, 76, 45, 70, 45, 80, 50, 65, 80, 70, 95, 55, 65, 55, 80, 45, 70, 52, 82, 80, 105, 70, 110, 50, 65, 85, 20, 35, 50, 80, 100, 130, 75, 90, 105, 40, 70, 80, 95, 110, 85, 100, 65, 75, 35, 60, 65, 85, 110, 45, 70, 80, 105, 65, 95, 35, 50, 65, 45, 48, 73, 105, 130, 30, 50, 40, 95, 50, 80, 120, 105, 55, 65, 90, 85, 130, 5, 55, 95, 40, 65, 67, 92, 45, 75, 45, 110, 50, 83, 95, 125, 100, 10, 125, 85, 48, 55, 65, 65, 130, 60, 40, 60, 80, 115, 105, 110, 85, 90, 100, 64, 84, 134, 110, 100];
    //uint8[151] Def = [49, 63, 83, 43, 58, 78, 65, 80, 100, 35, 55, 50, 30, 50, 40, 40, 55, 75, 35, 60, 30, 65, 44, 69, 30, 55, 85, 110, 52, 67, 87, 40, 57, 77, 48, 73, 40, 75, 20, 45, 35, 70, 55, 70, 85, 55, 80, 50, 60, 25, 50, 35, 60, 48, 78, 35, 60, 45, 80, 40, 65, 95, 15, 30, 45, 50, 70, 80, 35, 50, 65, 35, 65, 100, 115, 130, 55, 70, 65, 110, 70, 95, 55, 45, 70, 55, 80, 50, 75, 100, 180, 30, 45, 60, 160, 45, 70, 90, 115, 50, 70, 80, 85, 95, 110, 53, 79, 75, 95, 120, 95, 120, 5, 115, 80, 70, 95, 60, 65, 55, 85, 65, 80, 35, 57, 57, 100, 95, 55, 79, 80, 48, 50, 60, 60, 60, 70, 100, 125, 90, 105, 65, 65, 100, 85, 90, 45, 65, 95, 90, 100];
    //uint8[151] Speed = [45, 60, 80, 65, 80, 100, 43, 58, 78, 45, 30, 70, 50, 35, 75, 56, 71, 91, 72, 97, 70, 100, 55, 80, 90, 100, 40, 65, 41, 56, 76, 50, 65, 85, 35, 60, 65, 100, 20, 45, 55, 90, 30, 40, 50, 25, 30, 45, 90, 95, 120, 90, 115, 55, 85, 70, 95, 60, 95, 90, 90, 70, 90, 105, 120, 35, 45, 55, 40, 55, 70, 70, 100, 20, 35, 45, 90, 105, 15, 30, 45, 70, 60, 75, 100, 45, 70, 25, 50, 40, 70, 80, 95, 110, 70, 42, 67, 50, 75, 100, 140, 40, 55, 35, 45, 87, 76, 30, 35, 60, 25, 40, 50, 60, 90, 60, 85, 63, 68, 85, 115, 90, 105, 95, 105, 93, 85, 110, 80, 81, 60, 48, 55, 65, 130, 65, 40, 35, 55, 55, 80, 130, 30, 85, 100, 90, 50, 70, 80, 130, 100];

        
    // Structure of 1 Cryptomon
    struct Mon {
        uint id;
        address payable owner;
        Species species;
        uint price;
        bool forSale;
        
        uint8 monType;  // Used for breeding
        bool evolve;    // Used for breeding
        
        uint8 hp;       // Used for fighting
        uint8 atk;      // Used for fighting
        uint8 def;      // Used for fighting
        uint8 speed;    // Used for fighting
        
        address sharedTo; // Used for sharing
    }
    
    address public manager;             // Manager of the contract
    mapping(uint => Mon) public mons;   // Holds all created Cryptomons
    uint public totalMons = 0;          // Number of created Cryptomons
    uint max = 2**256 - 1;              // Max number of Cryptomons
    
    uint private nonce = 0;             // Number used for guessable pseudo-random generated number.
    
    constructor() public {
        manager = msg.sender;
        
        // Add initial cryptomons on contract deployment to start game
        createMon(Species(1),0, false);
        createMon(Species(1),0, false);
        createMon(Species(3),0, false);
        createMon(Species(6),0, false);
        createMon(Species(9),0, false);
        createMon(Species(15),0, false);
        createMon(Species(22),0, false);
        createMon(Species(24),0, false);
        createMon(Species(26),0, false);
        createMon(Species(62),0, false);
        createMon(Species(132),0, false);
        createMon(Species(132),0, false);
        createMon(Species(131),0, false);
        createMon(Species(131),0, false);
    }
    
    modifier onlyManager() { // Modifier
        require(
            msg.sender == manager,
            "Only manager can call this."
        );
        _;
    }
    
    function createMon(Species species, uint price, bool forSale) public onlyManager {
        assert(totalMons <  max);
        
        Mon storage mon = mons[totalMons];
        mon.id = totalMons;
        mon.owner = msg.sender;
        mon.species = species;
        mon.price = price;
        mon.forSale = forSale;
        
        mon.monType = monTypes[uint8(species)];    // Assign the type of the cryptomon
        mon.evolve = evolves[uint8(species)];      // Keep whether this cryptomon can evolve
        
        // Assign stats of the cryptomon
        //mon.hp = Hp[uint8(species)] + randomGen(21);
        //mon.atk = Atk[uint8(species)] + randomGen(21);
        //mon.def = Def[uint8(species)] + randomGen(21);
        //mon.speed = Speed[uint8(species)] + randomGen(21);
        mon.hp = 100 + randomGen(41);
        mon.atk = 100 + randomGen(41);
        mon.def = 100 + randomGen(41);
        mon.speed = 100 + randomGen(41);
        
        mon.sharedTo = msg.sender;
        
        totalMons++;
    }
    
    function buyMon(uint id) public payable {
        assert(id < totalMons);
        require(msg.value > mons[id].price);
        address payable seller = mons[id].owner;
        mons[id].owner = msg.sender;
        mons[id].forSale = false;
        seller.transfer(msg.value);
    }
    
    function addForSale(uint id, uint price) public {
        assert(id < totalMons);
        require(mons[id].owner == msg.sender);  // Only owner can add it to sale
        mons[id].forSale = true;
        mons[id].price = price;
    }
    
    function removeFromSale(uint id) public {
        assert(id < totalMons);
        require(mons[id].owner == msg.sender);  // Only owner can remove it from sale
        mons[id].forSale = false;
    }
    
    function findEggSpecies(uint id1, uint id2) private returns (Species){
        // Seperation of some Cryptomon species by types. These arrays are used for
        // breeding into random unevolved Cryptomon of the same type
        uint8[5] memory plant = [0, 42, 59, 68, 113];
        uint8[6] memory fire = [3, 36, 57, 76, 125, 145];
        uint8[16] memory water = [6, 53, 59, 71, 78, 85, 89, 97, 115, 117, 119, 128, 130, 137, 139, 143];
        uint8[6] memory bug = [9, 12, 45, 47, 122, 126];
        uint8[19] memory normal = [15, 18, 20, 28, 31, 34, 38, 51, 55, 65, 82, 83, 105, 107, 112, 127, 136, 141, 142];
        uint8[4] memory poison = [22, 40, 87, 108];
        uint8[5] memory thunder = [24, 80, 99, 124, 144];
        uint8[7] memory earth = [26, 49, 73, 94, 103, 110, 114];
        uint8[8] memory psychic = [62, 91, 95, 101, 121, 123, 146, 149];
        
        Species s;
        //uint8 type1 = monTypes[uint8(mons[id1].species)];
        //uint8 type2 = monTypes[uint8(mons[id2].species)];
        //if (monTypes[uint8(mons[id1].species)] == monTypes[uint8(mons[id2].species)]){

        if (mons[id2].monType == 9) {           // If species 2 is DITTO
            s = mons[id1].species;              // Replicate species 1
        } else if (mons[id1].monType == 9) {    // If species 1 is DITTO
            s = mons[id2].species;              // Replicate species 2
        }
        
        else if (mons[id1].monType == 10) {         // If species 1 is EEVEE
            if (mons[id2].monType == 1) {           // Breed with fire
                s = Species(135);                   // result FLAREON
            } else if (mons[id2].monType == 2) {    // Breed with water
                s = Species(133);                   // result VAPOREON
            } else if (mons[id2].monType == 6) {    // Breed with thunder
                s = Species(134);                   // result JOLTEON
            } else {                                // Breed with other type
                s = Species(132);                   // result EEVEE
            }
        }
        
        else if (mons[id2].monType == 10) {         // If species 2 is EEVEE
            if (mons[id1].monType == 1) {           // Breed with fire
                s = Species(135);                   // result FLAREON
            } else if (mons[id1].monType == 2) {    // Breed with water
                s = Species(133);                   // result VAPOREON
            } else if (mons[id1].monType == 6) {    // Breed with thunder
                s = Species(134);                   // result JOLTEON
            } else {                                // Breed with other type
                s = Species(132);                   // result EEVEE
            }
        }
        
        else if (mons[id1].monType == mons[id2].monType) {      // Only Cryptomons of the same type can breed into evolved type
            if (mons[id1].species == mons[id2].species) {       // If they are the same species
                if (mons[id1].evolve){                          // If they are able to evolve
                    s = Species(uint(mons[id1].species) + 1);   // Produce evolution species
                } else {                                        // If they are not able to evolve
                    s = mons[id1].species;                      // Produce the same species
                }
            } else {
                // If Cryptomons of the same type but different species then
                // produce a random unevolved Mon of the same type
                if(mons[id1].monType == 0) s = Species(plant[randomGen(5)]);
                else if(mons[id1].monType == 1) s = Species(fire[randomGen(6)]);
                else if(mons[id1].monType == 2) s = Species(water[randomGen(16)]);
                else if(mons[id1].monType == 3) s = Species(bug[randomGen(6)]);
                else if(mons[id1].monType == 4) s = Species(normal[randomGen(19)]);
                else if(mons[id1].monType == 5) s = Species(poison[randomGen(4)]);
                else if(mons[id1].monType == 6) s = Species(thunder[randomGen(5)]);
                else if(mons[id1].monType == 7) s = Species(earth[randomGen(7)]);
                else if(mons[id1].monType == 8) s = Species(psychic[randomGen(8)]);
            }
        }
        
        else {
            s = Species(128);       // result MAGIKARP in every other case
        }
        
        return s;
    }
    
    function breedMons(uint id1, uint id2) public {
        assert(id1 < totalMons);
        assert(id2 < totalMons);
        require(mons[id1].owner == mons[id2].owner && id1!=id2);
        
        createMon(findEggSpecies(id1, id2), 0, false);
    }
    
    function damage(uint id1, uint id2) public view returns (uint8) {
        return (mons[id1].atk > mons[id2].def) ? 10 : 5 ;
    }
    
    function fight(uint id1, uint id2) public view returns (uint){
        uint8 hp1 = mons[id1].hp;
        uint8 hp2 = mons[id2].hp;
        
        uint winnerId = 0;
        uint8 round = 0;
        
        do {
            round++;
            if (mons[id1].speed > mons[id2].speed) {
                if (hp2 > damage(id1, id2)){
                    winnerId = id1;
                    break;
                }
                hp2 = hp2 - damage(id1, id2);
                
                if (hp1 > damage(id2, id1)){
                    winnerId = id2;
                    break;
                }
                hp1 = hp1 - damage(id2, id1);
                
            } else {
                hp1 = hp1 - damage(id2, id1);
                if (hp1 <= 0) {
                    winnerId = id2;
                    break;
                }
                hp2 = hp2 - damage(id1, id2);
                if (hp2 <= 0) {
                    winnerId = id1;
                }
            }
        } while (hp1 > 0 && hp2>0);
        return winnerId;
    }
    
    function startSharing(uint id, address addr) public {
        mons[id].sharedTo = addr;
    }
    
    function stopSharing(uint id) public {
        mons[id].sharedTo = mons[id].owner;
    }
    
    // function that generates pseudorandom numbers
    function randomGen(uint i) internal returns (uint8) {
        uint8 x = uint8(uint(keccak256(abi.encodePacked(now, msg.sender, nonce))) % i);
        nonce++;
        return x;
    }
    
    /*
    function findEggSpecies2(uint id1, uint id2) view private returns (Species){
        Species s;
        uint8 type1 = mons[id1].monType;
        uint8 type2 = mons[id2].monType;
        //uint8 type1 = monTypes[uint8(mons[id1].species)];
        //uint8 type2 = monTypes[uint8(mons[id2].species)];
        //if (monTypes[uint8(mons[id1].species)] == monTypes[uint8(mons[id2].species)]){
        if (type1 == type2){    // Only Cryptomons of the same type can breed
            if (mons[id1].species == mons[id2].species) {       // If they are the same species
                if (mons[id1].evolve){                          // If they are able to evolve
                    s = Species(uint(mons[id1].species) + 1);   // Produce evolution species
                } else {
                    s = mons[id1].species;                      // Produce the same species
                }
            }
        }
        else if (type2 == 9){      // If species 2 is DITTO
            s = mons[id1].species;              // Replicate species 1
        } else if (mons[id1].monType == 9) {    // If species 1 is DITTO
            s = mons[id2].species;              // Replicate species 2
        } else if (mons[id1].monType == 10) {   // If species 1 is EEVEE
            if (type2 == 1) {           // Breed with fire
                s = Species(135);                   // result FLAREON
            } else if (type2 == 2) {    // Breed with water
                s = Species(133);                   // result VAPOREON
            } else if (type2 == 6) {    // Breed with thunder
                s = Species(134);                   // result JOLTEON
            } else {                                // Breed with other type
                s = Species(132);                   // result EEVEE
            }
        }else if (type2 == 10){
            if (type1 == 1){          // Breed with fire{
                s = Species(135);                   // result FLAREON
            } else if (type1 == 2) {    // Breed with water
                s = Species(133);                   // result VAPOREON
            } else if (type1 == 6) {    // Breed with thunder
                s = Species(134);                   // result JOLTEON
            } else {                                // Breed with other type
                s = Species(132);                   // result EEVEE
            }
        }
        
        return s;
    }*/
}
