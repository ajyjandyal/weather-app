async function getWeather() {
      const city = document.getElementById("cityInput").value;
      if (!city) return alert("Please enter a city name.");

      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found!");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      const apiKey = "1RgQ0jqsdl4OZQjVFntJgwFMFHGlzhti"; // Replace with your Tomorrow.io API key

      const weatherRes = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${apiKey}`);
      const data = await weatherRes.json();
      const weather = data.data.values;

      document.getElementById("cityName").innerText = `${name}, ${country}`;
      document.getElementById("temperature").innerText = `Temperature: ${weather.temperature}°C`;
      document.getElementById("wind").innerText = `Wind Speed: ${weather.windSpeed} km/h`;

      let condition = "Unknown";
      let gifSrc = "assets/default.gif";

      if (weather.weatherCode === 1000) {
        condition = "Clear/Sunny";
        gifSrc = "assets/sunny.gif";
      } else if (weather.weatherCode >= 1100 && weather.weatherCode < 1200) {
        condition = "Cloudy";
        gifSrc = "assets/cloudy.gif";
      } else if (weather.weatherCode >= 4000 && weather.weatherCode < 4200) {
        condition = "Rainy";
        gifSrc = "assets/rainy.gif";
      } else if (weather.weatherCode >= 5000 && weather.weatherCode < 5100) {
        condition = "Snowy";
        gifSrc = "assets/rainy.gif";
      } else if (weather.windSpeed > 30) {
        condition = "Windy";
        gifSrc = "assets/windy.gif";
      }

  // Set image
  document.getElementById("condition").innerText = `Condition: ${condition}`;
  document.getElementById("weather-image").src = gifSrc;
}
