import { BigNumber } from "ethers"
export interface Lokimon {
    id: number,
    atk: number,
    def: number, 
    evolve: boolean,
    forSale: boolean,
    hp:  number,
    monType: number,
    owner: string,
    price: bigint,
    sharedTo: string,
    species: number,
    speed: number
} 

export interface LokimonContract {
    id: BigNumber,
    atk: number,
    def: number, 
    evolve: boolean,
    forSale: boolean,
    hp:  number,
    monType: number,
    owner: string,
    price: BigNumber,
    sharedTo: string,
    species: number,
    speed: number
} 