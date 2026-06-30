import { Pokemon } from "@/types/pokemon";
import { getPokemonImage } from "@/utils/getPokemonImage";
import { Image } from "expo-image";
import { Text, View } from "react-native";


export default function PokemonItem({ pokemon }: { pokemon: Pokemon }) {
  return (
    <View className="flex-row items-center gap-4 p-4 rounded-lg">
      <Image
        source={{ uri: getPokemonImage(pokemon.id) }}
        style={{ width: 72, height: 72 }}
        contentFit="contain"
      />
      <View>
        <Text>{pokemon.name}</Text>
        <Text>{pokemon.height}</Text>
        <Text>{pokemon.weight}</Text>
      </View>
    </View>
  );
}