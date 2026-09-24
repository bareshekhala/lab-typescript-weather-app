//
import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
} from "./utils";


const form = document.querySelector<HTMLFormElement>("#weather-form");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const locationInput =
    document.querySelector<HTMLInputElement>("#location");

  if (!locationInput) return;

  const locationName = locationInput.value;

  locationInput.value = "";

  try {
    const response = await getLocation(locationName);

    if (!response.results || response.results.length === 0) {
      throw new Error("Location not found");
    }

    const location = response.results[0];

    displayLocation(location);

    const weatherData = await getCurrentWeather(location);

    displayWeatherData(weatherData);
  } catch (error) {
    console.log(error);
  }
});
