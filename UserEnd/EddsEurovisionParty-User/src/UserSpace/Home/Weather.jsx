import { fetchWeatherApi } from "openmeteo";
import { useEffect } from "react";
import { useState } from "react";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import CloudIcon from "@mui/icons-material/Cloud";
import AirIcon from "@mui/icons-material/Air";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState({});

  const getWeather = async () => {
    const params = {
      latitude: 7.577434,
      longitude: 47.571422,
      current: ["temperature_2m", "wind_speed_10m", "cloud_cover"],
      forecast_days: 1,
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0).value(),
        windSpeed10m: current.variables(1).value(),
        cloudCover: current.variables(2).value(),
      },
    };
    return weatherData;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await getWeather();
      console.log(weatherData);
      setWeatherData(weatherData);
    };
    fetchWeather();
  }, []);

  return (
    <p className="text-slate-800 ">
      {weatherData.current && Math.floor(weatherData.current.temperature2m)}*C
      {""}
      <DeviceThermostatIcon /> {""}
      {weatherData.current && Math.floor(weatherData.current.cloudCover)}%{" "}
      <CloudIcon />{" "}
      {weatherData.current && Math.floor(weatherData.current.windSpeed10m)}km/h
      <AirIcon />{" "}
    </p>
  );
};
