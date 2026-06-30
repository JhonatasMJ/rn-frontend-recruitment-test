import { usePokemons } from "@/hooks/usePokemons";
import { ActivityIndicator, FlatList, Text } from "react-native";
import PokemonItem from "./PokemonItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function PokemonList() {
  const { pokemons, loading } = usePokemons();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="flex-1 w-full"
        data={pokemons}
        renderItem={({ item }) => <PokemonItem pokemon={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className=" mb-12">
            <Text className="text-3xl text-gray-800 font-bold">Pokédex</Text>
            <Text className="text-gray-500 text-lg">
              Encontre todos os Pokémons, filtre por tipo, busca por nome e
              muito mais!
            </Text>
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 16,
        }}
      />
    </SafeAreaView>
  );
}
