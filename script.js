async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name.");

  const apiKey = 'your_openweathermap_api_key'; // Replace with your key
  const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const weatherData = await weatherRes.json();

  if (weatherData.cod !== 200) {
    alert("City not found!");
    return;
  }

  // Extract weather info
  const { name, sys, main, wind, weather } = weatherData;
  document.getElementById("cityName").innerText = `${name}, ${sys.country}`;
  document.getElementById("temperature").innerText = `Temperature: ${main.temp}°C`;
  document.getElementById("wind").innerText = `Wind Speed: ${wind.speed} m/s`;
  document.getElementById("condition").innerText = `Condition: ${weather[0].description}`;

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
