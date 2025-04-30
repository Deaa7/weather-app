import type { WeatherData } from "@/API/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type props = {
  data: WeatherData;
};

export default function WeatherDetails({ data }: props) {
  const { wind, main, sys } = data;

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;

    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: format(new Date(sys.sunrise * 1000), "h:mm a"),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: format(new Date(sys.sunset * 1000), "h:mm a"),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg} °) `,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa `,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" grid gap-6 sm:grid-cols-2">
            {details.map((e) => {
                return <>
                 
                    <div key={e.title} className="flex items-center gap-3 rounded-lg border p-4">

                        <e.icon className={`h-5 w-5 ${e.color}`} />
                        <div className="">
                            <p className="text-sm font-medium leading-none">{ e.title}</p>
                            <p className="text-sm text-muted-foreground">{ e.value}</p>
                        </div>
                    </div>
                </>;
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
