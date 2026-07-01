import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMONS } from "@/graphql/queries/pokemon";
import { GetPokemonsResponse } from "@/types/pokemon";


export function usePokemons() {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, refetch, fetchMore } =
    useQuery<GetPokemonsResponse>(GET_POKEMONS, {
      variables: {
        limit: 10,
        offset: 0,
      },
      notifyOnNetworkStatusChange: true,
    });

  const pokemons = useMemo(() => data?.pokemon ?? [], [data]);

//Usamos a função fetchMore para carregar mais Pokémons quando o usuário chega ao final da lista, evitando que seja feito uma nova requisição se já estiver carregando mais Pokémons, aqui também é verificado se já não tem mais Pokémons para carregar ou se está carregando mais Pokémons.
  const loadMore = async () => {
    if (isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    try {
      await fetchMore({
        variables: {
          limit: 10,
          offset: pokemons.length,
        },
        //Função para atualizar a lista de Pokémons quando são carregados mais Pokémons, aqui também é verificado se já não tem mais Pokémons para carregar ou se está carregando mais Pokémons.
        updateQuery: (
          previousResult: GetPokemonsResponse,
          { fetchMoreResult }: { fetchMoreResult?: GetPokemonsResponse },
        ) => {
          if (!fetchMoreResult) return previousResult;

          if (fetchMoreResult.pokemon.length < 10) {
            setHasMore(false);
          }
          return {
            pokemon: [...previousResult.pokemon, ...fetchMoreResult.pokemon],
          };
        },
      });
    } finally {
      setIsFetchingMore(false);
    }
  };

  return {
    pokemons,
    loading,
    error,
    refetch,
    loadMore,
    isFetchingMore,
    hasMore,
  };
}
