export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemontypes: {
    type: {
      name: string;
    };
  }[];
}

  export interface GetPokemonsResponse {
    pokemon: Pokemon[];
  }