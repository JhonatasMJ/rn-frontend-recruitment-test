import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_FAVORITE_POKEMONS } from "@/graphql/queries/favoritePokemons";
import { GetPokemonsResponse, Pokemon } from "@/types/pokemon";

//Hook para buscar os Pokémons favoritos.
export function useFavoritePokemons(favoriteIds: number[]) {
  const { data, loading, error, refetch } = useQuery<GetPokemonsResponse>(
    GET_FAVORITE_POKEMONS,
    {
      variables: { ids: favoriteIds },
      skip: favoriteIds.length === 0,
    },
  );

  const pokemons = useMemo(() => {
    if (!data?.pokemon) return [];

    const byId = new Map(data.pokemon.map((pokemon) => [pokemon.id, pokemon]));

    return favoriteIds
      .map((id) => byId.get(id))
      .filter((pokemon): pokemon is Pokemon => pokemon !== undefined);
  }, [data, favoriteIds]);

  return {
    pokemons,
    loading,
    error,
    refetch,
  };
}
