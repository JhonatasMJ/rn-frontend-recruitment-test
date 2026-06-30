import { usePokemons } from "@/hooks/usePokemons";
import { FlatList } from "react-native";
import PokemonItem from "./PokemonItem";

export default function PokemonList() {
  const { pokemons } = usePokemons();
  console.log(pokemons);
  return (
    <FlatList
      data={pokemons}
      renderItem={({ item }) => <PokemonItem pokemon={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
    />
  );
}