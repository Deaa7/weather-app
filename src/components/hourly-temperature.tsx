// import { ForecastData } from "@/API/types";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import { format } from "date-fns";

// type props = {
//   data: ForecastData;
// };

// export default function HourlyTemperature({ data }: props) {
//   let chartData = data.list.slice(0, 8).map((e) => {
//     return {
//       time: format(new Date(e.dt * 1000), "ha"),
//       temp: Math.round(e.main.temp),
//       feels_like: Math.round(e.main.feels_like),
//     };
//   });

//   return (
//     <>
//       <Card className="flex-1">
//         <CardHeader>
//           <CardTitle>Today's Temperature</CardTitle>
//           <CardDescription>Card Description</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[200px] w-full">
//             <ResponsiveContainer>
//               <LineChart data={chartData}>
//                 {/* <Line type="monotone" dataKey={"uv"} stroke="#8884d8" /> */}
//                 <XAxis
//                   dataKey={"time"}
//                   stroke="#888888"
//                   fontSize={12}
//                   tickLine={false}
//                   axisLine={false}
//                 />

//                 <YAxis
//                   dataKey={"time"}
//                   stroke="#888888"
//                   fontSize={12}
//                   tickLine={false}
//                   axisLine={false}
//                   tickFormatter={(e) => `${e}°`}
//                 />

//                               <Tooltip content={({ active, payload }) => {
//                                   if (active && payload && payload.length > 0)
//                                   {
//                                       return (
//                                           <div className="">
//                                               <div className="">
//                                                   <div className="">
//                                                       <span>Temperature</span>
//                                                       <span>{ payload[0].value } °</span>

//                                                   </div>
//                                               </div>
//                                           </div>
//                                       )
//                                       }
//                 }} />
//                 <Line
//                   type="monotone"
//                   dataKey="temp"
//                   stroke="#2563eb"
//                   strokeWidth={2}
//                   dot={false}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="feels_like"
//                   stroke="#64748b"
//                   strokeWidth={2}
//                   dot={false}
//                   strokeDasharray="5 5"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <p>Card Footer</p>
//         </CardFooter>
//       </Card>
//     </>
//   );
// }


import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import type { ForecastData } from "@/API/types"; 

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export default function HourlyTemperature({ data }: HourlyTemperatureProps) {
  // Get today's forecast data and format for chart

  const chartData: ChartData[] = data.list
    .slice(0, 8) // Get next 24 hours (3-hour intervals)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
