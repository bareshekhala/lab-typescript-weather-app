// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}
//
export async function getCurrentWeather(
  locationDetails: Location
): Promise<WeatherResponse> {

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;

  const response = await axios.get(url);
    return response.data;
}
//
export function displayLocation(locationDetails: Location): void {
  const locationNameElm = document.querySelector<HTMLElement>("#location-name");

  const countryElm = document.querySelector<HTMLElement>("#country");

  if (locationNameElm && countryElm) {
    locationNameElm.innerText = locationDetails.name;
    countryElm.innerText = `(${locationDetails.country})`;
  }
}
//
export function displayWeatherData(obj: WeatherResponse): void {
  const temperatureElm = document.querySelector<HTMLElement>("#temperature");
  const windspeedElm = document.querySelector<HTMLElement>("#windspeed");
  const winddirectionElm = document.querySelector<HTMLElement>("#winddirection");

  if (temperatureElm && windspeedElm && winddirectionElm) {
    temperatureElm.innerText =
      `Temperature: ${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`;

    windspeedElm.innerText =
      `Wind Speed: ${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`;

    winddirectionElm.innerText =
      `Wind Direction: ${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`;
  }
}



