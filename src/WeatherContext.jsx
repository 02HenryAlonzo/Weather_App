import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext({
  location: null,
  setLocation: () => {},
  currentWeather: null,
  forecastWeather: null,
  error: null
});

export const WeatherDataProvider = ({ children }) => {
  const [location, setLocation] = useState({ latitude: 14.64072, longitude: -90.51327 });
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '3de5271ebd7c07f5c2cb97443016c61c';
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;
        const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;

        const currentWeatherRes = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherRes.json();
        setCurrentWeather(currentWeatherData);

        const forecastWeatherRes = await fetch(forecastWeatherUrl);
        const forecastWeatherData = await forecastWeatherRes.json();
        setForecastWeather(forecastWeatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error);
      }
    };

    if (location && location.latitude && location.longitude) {
      fetchWeatherData();
    }
  }, [location]);

  return (
    <WeatherContext.Provider value={{ location, setLocation, currentWeather, forecastWeather, error }}>
      {children}
    </WeatherContext.Provider>
  );
};
