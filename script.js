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


  let gifSrc = "assets/default.gif";

  // Determine weather condition for animation
  if (weather[0].main === "Clear") {
    gifSrc = "assets/default.gif";
  } else if (weather[0].main === "Clouds") {
    gifSrc = "assets/cloudy.gif";
  } else if (weather[0].main === "Rain") {
    gifSrc = "assets/rainy.gif";
  } else if (weather[0].main === "Snow") {
    gifSrc = "assets/default.gif";
  } else if (weather[0].main === "Thunderstorm") {
    gifSrc = "assets/windy.gif";
  }

  // Set image
  document.getElementById("weather-image").src = gifSrc;
}
