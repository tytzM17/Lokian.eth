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

export type AppProps = {
  // For error boundary
  fallback: JSX.Element,
  children: JSX.Element,   
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  /** an object with known properties (but could have more at runtime) */
  obj: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** any non-primitive value - can't access any properties (NOT COMMON but useful as placeholder) */
  obj2: object;
  /** an interface with no required properties - (NOT COMMON, except for things like `React.Component<{}, State>`) */
  obj3: {};
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
  /** when passing down the state setter function returned by `useState` to a child component. `number` is an example, swap out with whatever the type of your state */
  setState: React.Dispatch<React.SetStateAction<number>>;
}