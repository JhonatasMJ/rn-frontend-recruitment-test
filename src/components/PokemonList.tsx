import { usePokemons } from "@/hooks/usePokemons";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonItem from "./PokemonItem";
import Loading from "./Loading";
import Error from "./Error";

export default function PokemonList() {
  const { pokemons, loading, error } = usePokemons();

  if (loading) {
    return (
      <Loading />
    );
  }
  if (error) {
    return (
      <Error message="Não foi possível carregar a lista de Pokémons." />
    );
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
        ListHeaderComponent={() => (
          <View className="mb-6 pt-2">
            <Text className="text-3xl font-semibold tracking-tight text-gray-900">
              Pokédex
            </Text>
            <Text className="mt-1 text-sm text-gray-400">
              Explore e descubra todos os Pokémons.
            </Text>
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
        }}
      />
    </SafeAreaView>
  );
}
