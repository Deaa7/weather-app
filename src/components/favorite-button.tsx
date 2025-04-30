import { WeatherData } from "@/API/types"
import useFavorite from "@/hooks/use-favorite"
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

type props = {
    data : WeatherData,
}

export default function FavoriteButton({data } : props ) {
    
   const{addToFavorite,isFavorite,removeFavorite}=  useFavorite(    )

    let isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    
    const handleToggleFavorite = () => {
        
        if (isCurrentlyFavorite)
        {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favorites`)
        }
        else {
            addToFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} to Favorites`)
        }
    }
    return <>
        
        <Button variant={isCurrentlyFavorite ? "default" : "outline"}
            size={"icon"}
            className={isCurrentlyFavorite ? "bg-yellow-500 hover:border-e-yellow-600" : ""}
            onClick={handleToggleFavorite}
        >
            <Star
             className={`h-4 w-4 ${isCurrentlyFavorite? "fill-current":"" }`}
            />
        </Button>
    
    </>
}