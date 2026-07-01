import { PokemonDetails } from "@/types/pokemon";
import { Text, View } from "react-native";

interface PokemonStatsProps {
  pokemon: PokemonDetails;
  typeColor: string;
}

export default function PokemonStats({
  pokemon,
  typeColor,
}: PokemonStatsProps) {
  return (
    <View className="mt-8">
      <Text className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
        Status
      </Text>
      <View className="gap-3 rounded-2xl bg-white px-4 py-5">
        {pokemon.pokemonstats.map(({ stat, base_stat }) => (
          <View key={stat.name} className="flex-row items-center gap-3">
            <Text className="w-24 text-xs capitalize text-gray-500">
              {stat.name}
            </Text>
            <View className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(base_stat, 255) / 2.55}%`,
                  backgroundColor: typeColor,
                }}
              />
            </View>
            <Text className="w-7 text-right text-xs font-medium text-gray-700">
              {base_stat}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
