import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { usePokemonDetails } from "@/hooks/usePokemonsDetails";
import { getPokemonImage } from "@/utils/getPokemonImage";
import { getPokemonColor } from "@/utils/pokemonColors";
import { formatHeight, formatWeight } from "@/utils/pokemonDetailsFormat";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PokemonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = Number(Array.isArray(id) ? id[0] : id);
  const { pokemonDetails, loading, error } = usePokemonDetails(pokemonId);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error || !pokemonDetails) {
    return (
     <Error message="Não foi possível carregar os detalhes deste Pokémon." />
    );
  }

  const primaryType = pokemonDetails.pokemontypes[0]?.type.name ?? "normal";
  const typeColor = getPokemonColor(primaryType);

  return (
    <SafeAreaView className="flex-1 bg-neutral-50" edges={["top"]}>
      <View className="px-5 pt-2">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-md bg-white border border-gray-200"
        >
          <Ionicons name="chevron-back" size={22} color="#374151" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        <View className="items-center pt-2">
          <Text className="text-xs font-medium text-gray-400">
            #{String(pokemonDetails.id).padStart(3, "0")}
          </Text>
          <Text className="mt-1 text-3xl font-semibold capitalize tracking-tight text-gray-900">
            {pokemonDetails.name}
          </Text>

          <View className="mt-3 flex-row gap-2">
            {pokemonDetails.pokemontypes.map(({ type }) => (
              <View
                key={type.name}
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: getPokemonColor(type.name) + "20" }}
              >
                <Text
                  className="text-xs font-medium capitalize"
                  style={{ color: getPokemonColor(type.name) }}
                >
                  {type.name}
                </Text>
              </View>
            ))}
          </View>

          <View
            className="mt-6 items-center justify-center rounded-2xl flex-1 w-full py-4 "
            style={{ backgroundColor: typeColor + "18" }}
          >
            <Image
              source={{ uri: getPokemonImage(pokemonDetails.id) }}
              style={{ width: 180, height: 180 }}
              contentFit="contain"
            />
          </View>
        </View>

        <View className="mt-8 flex-row rounded-2xl bg-white px-2 py-5">
          {[
            { label: "Altura", value: formatHeight(pokemonDetails.height) },
            { label: "Peso", value: formatWeight(pokemonDetails.weight) },
            {
              label: "Exp.",
              value: String(pokemonDetails.base_experience ?? "—"),
            },
          ].map((item, index) => (
            <View key={item.label} className="flex-1 items-center">
              {index > 0 && (
                <View className="absolute left-0 h-8 w-px bg-gray-100" />
              )}
              <Text className="text-[11px] text-gray-400">{item.label}</Text>
              <Text className="mt-1 text-sm font-semibold text-gray-800">
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-8">
          <Text className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">Status</Text>
          <View className="gap-3 rounded-2xl bg-white px-4 py-5">
            {pokemonDetails.pokemonstats.map(({ stat, base_stat }) => (
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

        <View className="mt-8">
          <Text className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">Habilidades</Text>
          <View className="gap-2">
            {pokemonDetails.pokemonabilities.map(({ ability, is_hidden }) => (
              <View
                key={ability.name}
                className="flex-row items-center justify-between rounded-2xl bg-white px-4 py-3.5"
              >
                <Text className="capitalize text-sm text-gray-800">
                  {ability.name}
                </Text>
                {is_hidden && (
                  <Text className="text-[11px] text-gray-400">oculta</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {pokemonDetails.pokemonspecy && (
          <View className="mt-8">
            <Text className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">Espécie</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 rounded-2xl bg-white px-4 py-4">
                <Text className="text-[11px] text-gray-400">Captura</Text>
                <Text className="mt-1 text-lg font-semibold text-gray-800">
                  {pokemonDetails.pokemonspecy.capture_rate}
                </Text>
              </View>
              <View className="flex-1 rounded-2xl bg-white px-4 py-4">
                <Text className="text-[11px] text-gray-400">Felicidade</Text>
                <Text className="mt-1 text-lg font-semibold text-gray-800">
                  {pokemonDetails.pokemonspecy.base_happiness}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
