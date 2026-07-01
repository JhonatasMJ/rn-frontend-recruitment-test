import { usePokemons } from "@/hooks/usePokemons";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonItem from "./PokemonItem";
import Loading from "./Loading";
import Error from "./Error";
import ListHeader from "./ListHeader";

export default function PokemonList() {
  const { pokemons, loading, error, loadMore, isFetchingMore } = usePokemons();

  if (loading && pokemons.length === 0) {
    return <Loading />;
  }
  if (error) {
    return <Error message="Não foi possível carregar a lista de Pokémons." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50" edges={["top"]}>
      <FlatList
        className="flex-1"
        data={pokemons}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PokemonItem
            pokemon={item}
            onPress={() => router.push(`/pokemon/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
        onEndReached={loadMore} //Função para carregar mais Pokémons quando o usuário chega ao final da lista.
        onEndReachedThreshold={0.5} //Ao chegar em 50% do final da lista, a função loadMore é chamada para carregar mais Pokémons.
        ListFooterComponent={
          isFetchingMore ? <Loading /> : null
        }
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
        }}
      />
    </SafeAreaView>
  );
}
