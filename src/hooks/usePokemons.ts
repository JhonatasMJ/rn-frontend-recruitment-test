import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMONS } from "@/graphql/queries/pokemon";
import { GetPokemonsResponse } from "@/types/pokemon";

export function usePokemons() {
  const { data, loading, error, refetch } = useQuery<GetPokemonsResponse>(GET_POKEMONS);

  const pokemons = useMemo(
    () => data?.pokemon_v2_pokemon ?? [],
    [data]
  );

  return {
    pokemons,
    loading,
    error,
    refetch,
  };
}