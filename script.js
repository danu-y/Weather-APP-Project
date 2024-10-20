const apiKey = "76e38afd41835302tc2b2d326b8154o1"; // Use your provided API key

async function getWeather() {
  const city = document.getElementById("city-input").value || "Addis Ababa";
  try {
    // Fetch weather data from SheCodes API
    const response = await fetch(
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    );
    const data = await response.json();

    if (response.status !== 200) throw new Error("City not found");

    displayWeather(data);

    // Fetch 5-day forecast data (using the same API for demonstration)
    const forecastResponse = await fetch(
      `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
    );
    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById("city-name").textContent = data.city;
  document.getElementById("current-temp").textContent =
    data.temperature.current;
  document.getElementById("humidity").textContent = data.temperature.humidity;
  document.getElementById("wind").textContent = data.wind.speed.toFixed(2);
  document.getElementById("weather-description").textContent =
    data.condition.description;

  // Add weather icon
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.src = data.condition.icon_url;
}

function displayForecast(data) {
  const forecastContainer = document.getElementById("forecast-data");
  forecastContainer.innerHTML = "";

  // Display a 5-day forecast
  data.daily.forEach((day, index) => {
    if (index < 5) {
      // Only display the next 5 days
      const dayElement = document.createElement("div");
      dayElement.classList.add("forecast-day");

      const date = new Date(day.time * 1000);
      const options = { weekday: "short" };
      const dayOfWeek = date.toLocaleDateString("en-US", options);

      dayElement.innerHTML = `
        <h3>${dayOfWeek}</h3>
        <img src="${day.condition.icon_url}" alt="weather icon">
        <p>${day.temperature.minimum}° / ${day.temperature.maximum}°</p>
      `;

      forecastContainer.appendChild(dayElement);
    }
  });
}
