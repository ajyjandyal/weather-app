async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name.");

  // Geocoding to get coordinates
  const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    alert("City not found!");
    return;
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // Fetch weather
  const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const weatherData = await weatherRes.json();
  const weather = weatherData.current_weather;

  // Display
  document.getElementById("cityName").innerText = `${name}, ${country}`;
  document.getElementById("temperature").innerText = `Temperature: ${weather.temperature}°C`;
  document.getElementById("wind").innerText = `Wind Speed: ${weather.windspeed} km/h`;

  let description = "";
  let gifSrc = "assets/default.gif";

  if (weather.weathercode >= 0 && weather.weathercode <= 3) {
    description = "Clear/Sunny";
    gifSrc = "assets/sunny.gif";
  } else if (weather.weathercode >= 45 && weather.weathercode <= 48) {
    description = "Cloudy";
    gifSrc = "assets/cloudy.gif";
  } else if (weather.weathercode >= 51 && weather.weathercode <= 67) {
    description = "Rainy";
    gifSrc = "assets/rainy.gif";
  } else if (weather.weathercode >= 71 && weather.weathercode <= 77) {
    description = "Snowy";
    gifSrc = "assets/rainy.gif";
  } else if (weather.weathercode >= 95) {
    description = "Windy/Stormy";
    gifSrc = "assets/windy.gif";
  } else {
    description = "Mild or Unknown";
  }

  document.getElementById("condition").innerText = `Condition: ${description}`;
  document.getElementById("weatherGif").src = gifSrc;
}
