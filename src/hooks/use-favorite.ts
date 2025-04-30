import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "./use-local-storage";

type FavoriteCity = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
};

export default function useFavorite() {
  let [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    "favorites",
    []
  );

  let queryClient = useQueryClient();

  let favoriteQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime : Infinity
  });

  const addToFavorite = useMutation({
    mutationFn: async (
      city: Omit<FavoriteCity, "id" | "addedAt">
    ) => {
      let newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };
      let exists = favorites.some( fav => fav.id  === newFavorite.id  )
          
          if (exists) return favorites;


      const newFavorites = [ ...favorites ,newFavorite].slice(0, 10);

      setFavorites(newFavorites);

      return newFavorite;
    },
    onSuccess: (newHistory) => {
        queryClient.invalidateQueries({
            queryKey: ['favorites'],
            
      });
    },
  });

  let removeFavorite = useMutation({
      mutationFn: async (cityId: string) => {
          const newFavorites = favorites.filter(city => city.id !== cityId);

      setFavorites(  newFavorites );
      return newFavorites;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    favorites: favoriteQuery.data ?? [],
    addToFavorite,
      removeFavorite,
    isFavorite : (lat:number , lon : number) =>favorites.some( city =>  city.lat === lat && city.lon === lon  ),
  }
}
