import type { ForecastData } from "@/API/types";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

type props = {
  data: ForecastData;
};

type DailyForecastType = {
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  date: number;
};

export default function WeatherForecast({ data }: props) {
  let dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecastType>);

  let nextDays = Object.values(dailyForecasts).slice(0, 6);

  const formatTemp = (temp: number) => `${Math.round(temp)} °`;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>5 Days Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {nextDays.map((e) => {
              return (
                <div
                  key={e.date}
                  className="grid grid-cols-3 gap-4 rounded-lg border p-3">
                  <div className="">
                    <p className="font-medium">
                      {format(new Date(e.date * 1000), "EEE, MMM d")}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {e.weather.description}
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <span className="flex items-center text-blue-500">
                      <ArrowDown className="mr-1 h-4 w-4" />
                      {formatTemp(e.temp_min)}
                    </span>
                    <span className="flex items-center text-red-500">
                      <ArrowUp className="mr-1 h-4 w-4" />
                      {formatTemp(e.temp_max)}
                    </span>
                  </div>

                  <div className="flex justify-end gap-4 flex-wrap">
                    <span className="flex items-center gap-1" title="humidity">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{e.humidity}%</span>
                    </span>
                    <span className="flex items-center gap-1" title="wind speed">
                      <Wind className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{e.wind}m/s</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
