import { Pokemon } from "@/types/pokemon";
import { formatHeight, formatWeight } from "@/utils/pokemonDetailsFormat";
import { getPokemonImage } from "@/utils/getPokemonImage";
import { getPokemonColor } from "@/utils/pokemonColors";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

export default function PokemonItem({
  pokemon,
  onPress,
}: {
  pokemon: Pokemon;
  onPress: (id: number) => void;
}) {
  const primaryType = pokemon.pokemontypes[0]?.type.name ?? "normal";
  const typeColor = getPokemonColor(primaryType);

  return (
    <Pressable
      onPress={() => onPress(pokemon.id)}
      className="mb-3 flex-row items-center overflow-hidden rounded-2xl bg-white px-4 py-3.5 active:opacity-80"
    >
      <View className="flex-1">
        <Text className="text-[11px] font-medium text-gray-400">
          #{String(pokemon.id).padStart(3, "0")}
        </Text>
        <Text className="mt-0.5 text-lg font-semibold capitalize tracking-tight text-gray-900">
          {pokemon.name}
        </Text>

        <View className="mt-2 flex-row flex-wrap gap-1.5">
          {pokemon.pokemontypes.map(({ type }) => (
            <View
              key={type.name}
              className="rounded-full px-2.5 py-0.5"
              style={{ backgroundColor: getPokemonColor(type.name) + "20" }}
            >
              <Text
                className="text-[11px] font-medium capitalize"
                style={{ color: getPokemonColor(type.name) }}
              >
                {type.name}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-2.5 flex-row items-center gap-3">
          <Text className="text-[11px] text-gray-400">
            {formatHeight(pokemon.height)}
          </Text>
          <View className="h-2.5 w-px bg-gray-200" />
          <Text className="text-[11px] text-gray-400">
            {formatWeight(pokemon.weight)}
          </Text>
        </View>
      </View>

      <View
        className="ml-3 items-center justify-center rounded-2xl"
        style={{
          width: 72,
          height: 72,
          backgroundColor: typeColor + "18",
        }}
      >
        <Image
          source={{ uri: getPokemonImage(pokemon.id) }}
          style={{ width: 56, height: 56 }}
          contentFit="contain"
        />
      </View>
    </Pressable>
  );
}
