import { gql } from "@apollo/client";

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon(where: { id: { _eq: $id } }, limit: 1) {
      id
      name
      height
      weight
      base_experience

      pokemontypes {
        type {
          name
        }
      }

      pokemonstats {
        base_stat
        stat {
          name
        }
      }

      pokemonabilities {
        is_hidden
        ability {
          name
        }
      }

      pokemonspecy {
        capture_rate
        base_happiness
      }
    }
  }
`;
