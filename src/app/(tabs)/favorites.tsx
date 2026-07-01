import Error from "@/components/Error";
import Loading from "@/components/Loading";
import PokemonItem from "@/components/PokemonItem";
import { useFavoritePokemons } from "@/hooks/useFavoritePokemons";
import { useFavorites } from "@/hooks/useFavorites";
import { useFocusEffect, router } from "expo-router";
import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  const { favorites, loading: loadingFavorites, reloadFavorites } =
    useFavorites();
  const { pokemons, loading: loadingPokemons, error } =
    useFavoritePokemons(favorites);
    

  //useFocusEffect para recarregar os favoritos quando a tela for focada.
  useFocusEffect(
    useCallback(() => {
      reloadFavorites();
    }, [reloadFavorites]),
  );


  if (loadingFavorites || (favorites.length > 0 && loadingPokemons)) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error message="Não foi possível carregar seus Pokémon favoritos." />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50" edges={["top"]}>
      <FlatList
        className="flex-1"
        data={pokemons}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonItem
            pokemon={item}
            onPress={() => router.push(`/pokemon/${item.id}`)}
          />
        )}
        ListHeaderComponent={
          <View className="mb-6 pt-2">
            <Text className="text-3xl font-semibold tracking-tight text-gray-900">
              Favoritos
            </Text>
            <Text className="mt-1 text-sm text-gray-400">
              {pokemons.length === 0
                ? "Nenhum Pokémon favoritado ainda."
                : `${pokemons.length} Pokémon${pokemons.length > 1 ? "s" : ""} salvo${pokemons.length > 1 ? "s" : ""}.`}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center px-8 pt-16 flex-1 justify-center">
            <Text className="text-center text-sm text-gray-400">
              Toque no coração na tela de detalhes para adicionar Pokémon aos
              seus favoritos.
            </Text>
          </View>
        }
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          flexGrow: 1,
        }}
      />
    </SafeAreaView>
  );
}
