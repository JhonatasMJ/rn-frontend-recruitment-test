export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
  }

  export interface GetPokemonsResponse {
    pokemon_v2_pokemon: Pokemon[];
  }