export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
  }

  export interface GetPokemonsResponse {
    pokemon: Pokemon[];
  }