import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { useState } from "react";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useSearchLocations } from "@/hooks/use-weather";
import { CommandSeparator } from "./ui/command";
import { useNavigate } from "react-router-dom";
import useSearchHistory from "@/hooks/use-search-history";
import { format } from "date-fns";
import useFavorite from "@/hooks/use-favorite";

export default function CitySearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  let nav = useNavigate();

  let { data, isLoading } = useSearchLocations(query);
  let { history, clearHistory, addToHistory } = useSearchHistory();

  // useEffect(() => {
  // ({ data , isLoading };

  // }, [query]);
  let handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    nav(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const { favorites } = useFavorite();

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
        Search cities...
        <Search className="mr-2 h-4 w-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Search cities ..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.length > 2 && !isLoading && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}

            {/* <CommandSeparator /> */}
            <CommandGroup heading="Favorites">
              {/* <CommandItem>Calendar</CommandItem> */}
            </CommandGroup>

            {favorites.length > 0 && (
              <>
                 
                <CommandGroup heading="Favorites">
        
                  {favorites.map((e) => {
                    return (
                      <CommandItem
                        key={e.id}
                        value={`${e.lat}|${e.lon}|${e.name}|${e.country}`}
                        onSelect={handleSelect}>
                        <Star className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>{e.name}</span>
                        {e?.state && (
                          <span className="text-sm text-muted-foreground">
                            , {e.state}
                          </span>
                        )}

                        <span className="text-sm text-muted-foreground">
                          , {e.country}
                        </span>

        
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}


            {history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup >
                  <div className="flex items-center justify-between px-2 my-2">
                    <p className="text-xs text-muted-foreground" >Recent Searches</p>
                    <Button
                      variant={"ghost"}
                      size="sm" 
                      onClick={() => clearHistory.mutate()}>
                      <XCircle className="h-4 w-4" />
                      Clear
                    </Button>
                  </div>

                  {history.map((e) => {
                    return (
                      <CommandItem
                        key={e.lat + "-" + e.lon}
                        value={`${e.lat}|${e.lon}|${e.name}|${e.country}`}
                        onSelect={handleSelect}>
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{e.name}</span>
                        {e?.state && (
                          <span className="text-sm text-muted-foreground">
                            , {e.state}
                          </span>
                        )}

                        <span className="text-sm text-muted-foreground">
                          , {e.country}
                        </span>

                        <span className="text-xs text-muted-foreground ml-auto">
                          , {format(e.searchedAt, "MMM d ,h:mm a")}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}

            {data && data.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Suggestions">
                  {isLoading && (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {data.map((e) => {
                    return (
                      <CommandItem
                        key={e.lat + "-" + e.lon}
                        value={`${e.lat}|${e.lon}|${e.name}|${e.country}`}
                        onSelect={handleSelect}>
                        <Search className="mr-2 h-4 w-4" />
                        <span>{e.name}</span>
                        {e?.state && (
                          <span className="text-sm text-muted-foreground">
                            , {e.state}
                          </span>
                        )}

                        <span className="text-sm text-muted-foreground">
                          , {e.country}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
