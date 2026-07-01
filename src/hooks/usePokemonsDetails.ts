import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_DETAILS } from "@/graphql/queries/pokemonDetails";
import { GetPokemonDetailsResponse } from "@/types/pokemon";

export function usePokemonDetails(id: number) {
  const { data, loading, error, refetch } =
    useQuery<GetPokemonDetailsResponse>(GET_POKEMON_DETAILS, {
      variables: {
        id,
      },
      skip: !id || Number.isNaN(id),
    });

  const pokemonDetails = useMemo(() => {
    return data?.pokemon[0];
  }, [data]);

  return {
    pokemonDetails,
    loading,
    error,
    refetch,
  };
}