import PokemonList from "@/components/PokemonList";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <PokemonList />
    </View>
  );
}