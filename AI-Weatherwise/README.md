# AI WeatherWise

Document-aligned starter backend for AI WeatherWise.

## Setup
1. Run `npm install`
2. Fill `.env` with your MongoDB URI, JWT secret, and Gemini API key.
3. Run `npm start` or `npm run dev`.

## Main APIs
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET/POST/DELETE `/api/locations`
- GET `/api/weather/current/:city`
- POST `/api/weather/insights`

## Note
The supplied project document requires real-time weather retrieval and fallback behavior, but its listed `.env` variables do not include a weather-provider API key and it does not provide an exact live-weather request implementation. The starter therefore includes a fallback weather endpoint rather than inventing an undocumented provider configuration.
