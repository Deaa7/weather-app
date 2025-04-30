import { Coordinates } from "@/API/types";
import { weatherAPI } from "@/API/weather";
import { useQuery } from "@tanstack/react-query";


export const WEATHER_KEYS = {
    weather : (coords : Coordinates ) => ["weather" , coords]  ,
    forecast : (coords : Coordinates ) => ["forecast" , coords]  ,
    location: (coords: Coordinates) => ["location", coords],
    search: (query : string) => ["location-search", query],
     
}
export  function useWeatherQuery( coordinates : Coordinates | null)
{
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates??{lat:0 , lon:0}),
        queryFn : ()=> coordinates? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
      
    })
}

export  function useForecastQuery( coordinates : Coordinates | null)
{
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates??{lat:0 , lon:0}),
        queryFn : ()=> coordinates? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates,
      
    })
}


export  function useReverseGeocodeQuery( coordinates : Coordinates | null)
{
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates??{lat:0 , lon:0}),
        queryFn : ()=> coordinates? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates,
      
    })
}

export function useSearchLocations(query: string) {
   
    return useQuery({
        queryKey: WEATHER_KEYS.search(query),
        queryFn : ()=> weatherAPI.searchLocations(query),
        enabled: query.length >= 3,
      
    })

}