import Error from "@/components/Error";
import Loading from "@/components/Loading";
import PokemonStats from "@/components/PokemonStats";
import { useFavorites } from "@/hooks/useFavorites";
import { usePokemonDetails } from "@/hooks/usePokemonsDetails";
import { getPokemonImage } from "@/utils/getPokemonImage";
import { getPokemonColor } from "@/utils/pokemonColors";
import { formatHeight, formatWeight } from "@/utils/pokemonDetailsFormat";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = Number(Array.isArray(id) ? id[0] : id);
  const { pokemonDetails, loading, error } = usePokemonDetails(pokemonId);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) {
    return <Loading />;
  }

  if (error || !pokemonDetails) {
    return (
      <Error
        onRedirect
        message="Não foi possível carregar os detalhes deste Pokémon."
      />
    );
  }

  const primaryType = pokemonDetails.pokemontypes[0]?.type.name ?? "normal";
  const typeColor = getPokemonColor(primaryType);

  return (
    <SafeAreaView className="flex-1 bg-neutral-50" edges={["top"]}>
      <View className="px-5 pt-2">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white"
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
            #{pokemonId}
          </Text>
          <Text className="mt-1 text-3xl font-semibold capitalize tracking-tight text-gray-900">
            {pokemonDetails.name}
          </Text>

          <View className="mt-3 flex-row gap-2 flex-wrap">
            {pokemonDetails.pokemontypes.map(({ type }) => (
              <View
                key={type.name}
                className="rounded-md px-3 py-2 flex-1"
                style={{ backgroundColor: getPokemonColor(type.name) + "20" }}
              >
                <Text
                  className="text-xs font-medium capitalize text-center"
                  style={{ color: getPokemonColor(type.name) }}
                >
                  {type.name}
                </Text>
              </View>
            ))}
          </View>

          <View
            className="relative mt-6 w-full items-center justify-center rounded-xl py-4"
            style={{ backgroundColor: typeColor + "18" }}
          >
            <Pressable
              onPress={() => toggleFavorite(pokemonDetails.id)}
              className="absolute right-2 top-2 z-10 h-9 w-9 items-center justify-center rounded-md bg-white/80"
            >
              <Ionicons
                name={isFavorite(pokemonDetails.id) ? "heart" : "heart-outline"}
                size={22}
                color={isFavorite(pokemonDetails.id) ? "#ef4444" : "#9ca3af"}
              />
            </Pressable>
            <Image
              source={{ uri: getPokemonImage(pokemonDetails.id) }}
              style={{ width: 180, height: 180 }}
              contentFit="contain"
            />
          </View>
        </View>

        <View className="mt-8 flex-row rounded-xl bg-white px-2 py-5">
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

        <PokemonStats pokemon={pokemonDetails} typeColor={typeColor} />

        <View className="mt-8">
          <Text className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
            Habilidades
          </Text>
          <View className="gap-2">
            {pokemonDetails.pokemonabilities.map(({ ability, is_hidden }) => (
              <View
                key={ability.name}
                className="flex-row items-center justify-between rounded-xl bg-white px-4 py-3.5"
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
            <Text className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
              Espécie
            </Text>
            <View className="flex-row gap-3">
              <View className="flex-1 rounded-xl bg-white px-4 py-4">
                <Text className="text-[11px] text-gray-400">Captura</Text>
                <Text className="mt-1 text-lg font-semibold text-gray-800">
                  {pokemonDetails.pokemonspecy.capture_rate}
                </Text>
              </View>
              <View className="flex-1 rounded-xl bg-white px-4 py-4">
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
