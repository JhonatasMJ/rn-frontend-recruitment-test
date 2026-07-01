import { Text, View } from "react-native";

export default function ListHeader() {
  return (
    <View className="mb-6 pt-2">
      <Text className="text-3xl font-semibold tracking-tight text-gray-900">
        Pokédex
      </Text>
      <Text className="mt-1 text-sm text-gray-400">
        Explore e descubra todos os Pokémons.
      </Text>
    </View>
  );
}
