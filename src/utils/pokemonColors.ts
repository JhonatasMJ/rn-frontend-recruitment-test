export const pokemonColors: Record<string, string> = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    steel: "#B8B8D0",
    normal: "#A8A878",
  };

  //pegando a cor do tipo do pokemon
  //se o tipo do pokemon não estiver no objeto, retorna a cor normal
  //se o tipo do pokemon estiver no objeto, retorna a cor do tipo do pokemon
  //se o tipo do pokemon não estiver no objeto, retorna a cor normal
export function getPokemonColor(typeName: string) {
  return pokemonColors[typeName] ?? pokemonColors.normal;
}