import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon(limit: $limit, offset: $offset) {
      id
      name
      height
      weight

      pokemontypes {
        type {
          name
        }
      }
    }
  }
`;