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

export interface PokemonDetails extends Pokemon {
  base_experience: number | null;
  pokemonstats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  pokemonabilities: {
    is_hidden: boolean;
    ability: {
      name: string;
    };
  }[];
  pokemonspecy: {
    capture_rate: number;
    base_happiness: number;
  } | null;
}

export interface GetPokemonsResponse {
  pokemon: Pokemon[];
}

export interface GetPokemonDetailsResponse {
  pokemon: PokemonDetails[];
}
