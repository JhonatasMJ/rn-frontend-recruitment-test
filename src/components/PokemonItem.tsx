import { Pokemon } from "@/types/pokemon";
import { getPokemonImage } from "@/utils/getPokemonImage";
import { getPokemonColor } from "@/utils/pokemonColors";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

function formatHeight(height: number) {
  return `${(height / 10).toFixed(1)} m`;
}

function formatWeight(weight: number) {
  return `${(weight / 10).toFixed(1)} kg`;
}

export default function PokemonItem({ pokemon }: { pokemon: Pokemon }) {
  const primaryType = pokemon.pokemontypes[0]?.type.name ?? "normal";
  const typeColor = getPokemonColor(primaryType);

  return (
    <TouchableOpacity
      className="mb-4 min-h-[140px] flex-row items-center overflow-hidden rounded-xl "
      style={{ backgroundColor: typeColor + "60" }}
    >
      <View className="flex-1 justify-center px-4 py-3">
        <Text className="text-xs font-semibold text-gray-500">
          #{pokemon.id}
        </Text>

        <Text className="mt-0.5 text-xl font-bold capitalize text-gray-800">
          {pokemon.name}
        </Text>

        <View className="mt-2 flex-row flex-wrap gap-1.5">
          {pokemon.pokemontypes.map(({ type }) => (
             <View
             key={type.name}
             className="flex-row items-center gap-1 rounded-md px-2.5 py-1"
             style={{ backgroundColor: getPokemonColor(type.name) }}
           >
             <Text className="text-xs font-semibold capitalize text-white">
               {type.name}
             </Text>
           </View>
          ))}
        </View>

        <View className="mt-2 flex-row items-center gap-3">
          <Text className="text-xs text-gray-600">
            <Text className="font-semibold text-gray-700">Altura</Text>{" "}
            {formatHeight(pokemon.height)}
          </Text>
          <View className="h-3 w-px bg-gray-400/50" />
          <Text className="text-xs text-gray-600">
            <Text className="font-semibold text-gray-700">Peso</Text>{" "}
            {formatWeight(pokemon.weight)}
          </Text>
        </View>
      </View>

      <Image
        source={{ uri: getPokemonImage(pokemon.id) }}
        style={{ width: 100, height: 100, marginRight: 12 }}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
}
