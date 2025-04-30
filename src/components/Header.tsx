import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMode, setMode } from "@/features/slice";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./city-search";

export default function Header() {
  let mode = useSelector(getMode);
  let dispatch = useDispatch();

  console.log("mode ", mode);
  return (
    <>
      <header className="sticky top-0 z-50 w-full border- bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to={"/"}>
            {mode === "dark" ? (
              <img src="/logo.png" alt="logo icon" className="h-10" />
            ) : (
              <img src="/logo2.png" alt="logo icon" className="h-10" />
            )}
          </Link>

          <div className="flex gap-4">
            <CitySearch />

            <button
              onClick={() => dispatch(setMode())}
              className={`cursor-pointer items-center flex transition-transform duration-500 
                      ${mode === "dark" ? "rotate-180" : "rotate-0"}`}>
              {mode === "dark" ? (
                <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
              ) : (
                <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
