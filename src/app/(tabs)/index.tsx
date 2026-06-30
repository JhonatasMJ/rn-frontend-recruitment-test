import PokemonList from "@/components/PokemonList";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 ">
      <PokemonList />
    </SafeAreaView>
  );
}