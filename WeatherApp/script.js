document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-wather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "681a4e4fde4d156f2705a1677af77af7";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    try {
      const weatherData = await fetachWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  async function fetachWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      showError();
    }
    return (data = await response.json());
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    console.log(data);

    cityNameDisplay.textContent = name;

    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Decription : ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
