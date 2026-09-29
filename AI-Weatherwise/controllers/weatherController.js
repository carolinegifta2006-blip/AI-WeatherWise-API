// Fallback weather data
const fallbackWeather = (city) => ({
  city,
  temperature: 28,
  humidity: 65,
  condition: "Partly cloudy",
  source: "fallback"
});


// ===============================
// CURRENT WEATHER
// ===============================

exports.getCurrentWeather = async (req, res) => {
  try {
    const city = req.params.city;

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch live weather");
    }

    const data = await response.json();

    const weather = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      condition: data.weather[0].description,
      windSpeed: data.wind.speed,
      source: "OpenWeatherMap"
    };

    res.json({
      message: "Current weather fetched successfully",
      weather: weather
    });

  } catch (error) {

    console.error("Weather API Error:", error.message);

    const weather = fallbackWeather(req.params.city);

    res.json({
      message: "Live weather unavailable. Showing fallback data.",
      weather: weather
    });
  }
};


// ===============================
// GEMINI AI WEATHER INSIGHT
// ===============================

exports.getAIInsight = async (req, res) => {
  try {

    const { city, weather } = req.body;

    if (!city || !weather) {
      return res.status(400).json({
        message: "City and weather data are required"
      });
    }


    // If Gemini API key is unavailable
    if (
      !process.env.GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY === "your_gemini_api_key"
    ) {

      return res.json({
        city,
        insight:
          `Weather in ${city}: ${weather.condition || "Current conditions available"}. ` +
          `Temperature is ${weather.temperature ?? "unknown"}°C and ` +
          `humidity is ${weather.humidity ?? "unknown"}%. ` +
          `Plan your activities and clothing according to the current weather.`,
        source: "fallback"
      });
    }


    // Import Gemini SDK dynamically
    const { GoogleGenAI } = await import("@google/genai");


    // Initialize Gemini
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });


    // Generate AI response
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",

      contents:
        `Give a short natural-language weather summary and personalized ` +
        `activity and clothing recommendations for ${city}. ` +
        `Weather data: ${JSON.stringify(weather)}`
    });


    res.json({
      city,
      insight: response.text,
      source: "gemini"
    });


  } catch (error) {

    console.error("Gemini Error:", error.message);

    const { city, weather } = req.body;

    const temperature =
      weather?.temperature ?? "unknown";

    const humidity =
      weather?.humidity ?? "unknown";

    const condition =
      weather?.condition ?? "current weather";


    const fallbackInsight =
      `Weather in ${city}: ${condition}, ` +
      `temperature ${temperature}°C and humidity ${humidity}%. ` +
      `Choose comfortable clothing and plan outdoor activities ` +
      `according to the current weather conditions.`;


    res.json({
      city,
      insight: fallbackInsight,
      source: "fallback"
    });
  }
};