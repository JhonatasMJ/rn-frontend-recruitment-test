import { gql } from "@apollo/client";

export const GET_FAVORITE_POKEMONS = gql`
  query GetFavoritePokemons($ids: [Int!]!) {
    pokemon(where: { id: { _in: $ids } }) {
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
