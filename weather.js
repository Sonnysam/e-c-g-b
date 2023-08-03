const axios = require("axios");

// Function to get weather data
async function getWeatherData(city, msg) {
  try {
    const apiKey = "YOUR_WEATHER_API_KEY"; // Replace with your actual weather API key
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const weatherData = response.data;

    // Extract relevant weather information
    const weatherDescription = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;

    // Send the weather information as a reply
    msg.reply(
      `
      Weather in ${city}:
      Description: ${weatherDescription}
      Temperature: ${temperature} °C
      Humidity: ${humidity} %
      Wind Speed: ${windSpeed} m/s
      `
    );
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    // Send an error message as a reply
    msg.reply("Oops, there was an error fetching weather data. Please try again later.");
  }
}

// Example usage within the 'message' event listener:
client.on("message", async (msg) => {
  // ... your existing code ...

  if (msg.body === "!weather") {
    // Call the getWeatherData function with the city name and the message object
    getWeatherData("Accra", msg);
  }

  // ... more of your existing code ...
});
