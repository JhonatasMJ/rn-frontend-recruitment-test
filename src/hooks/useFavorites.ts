import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  //Função para carregar os favoritos do AsyncStorage.
  const loadFavorites = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("@pokemon-favorites");

      if (data) {
        setFavorites(JSON.parse(data));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  //Função para adicionar ou remover um Pokémon dos favoritos.
  const toggleFavorite = async (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    setFavorites(updated);

    await AsyncStorage.setItem(
      "@pokemon-favorites",
      JSON.stringify(updated)
    );
  };

  //Função para verificar se um Pokémon é favorito.
  const isFavorite = (id: number) => favorites.includes(id);

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    reloadFavorites: loadFavorites,
  };
}