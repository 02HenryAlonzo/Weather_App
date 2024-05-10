import React, { useState, useContext } from 'react';
import { SearchLocation } from './SearchLocation';
import bgImg from '../assets/Cloud-background.png';
import locationImg from '../assets/location.png';
import iconMap from './iconMap';
import { WeatherContext } from '../WeatherContext';

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { location, setLocation, currentWeather } = useContext(WeatherContext);

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const formatDate = (date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  
    return `${dayName}, ${dayNumber} ${monthName}`;
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-darkblue w-full lg:w-1/3 xl:w-1/4 p-7 lg:p-4 xl:p-7 space-y-10 overflow-x-hidden">
      {isOpen ? (
        <SearchLocation onClose={() => setIsOpen(false)} onLocationSelect={setLocation} />
      ) : (
        <>
          <div className="flex justify-between mb-8 lg:mb-6">
            <button
              className="px-4 bg-[#6E707A] hover:bg-[#6E707A]/70 text-gray-150 cursor-pointer rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              Search for places
            </button>
            <button
              className="w-12 h-12 bg-[#6E707A] hover:bg-[#6E707A]/70 text-gray-150 rounded-full flex justify-center items-center shadow-lg"
              onClick={getGeoLocation}
            >
              <img src={locationImg} alt="location" className="w-8" />
            </button>
          </div>

          <div className="relative w-full flex justify-center items-center">
            <div className="absolute -mx-20">
              <img src={bgImg} alt="Background" className="opacity-10" />
            </div>
            {currentWeather && currentWeather.weather && currentWeather.weather[0].icon && (
              <img
                src={iconMap[currentWeather.weather[0].icon]}
                alt="Weather icon"
                className="max-h-40"
              />
            )}
          </div>

          {currentWeather && (
            <div className="flex flex-col items-center justify-between flex-grow">
              <h1 className="text-gray-150 text-[144px] font-medium">
                {Math.round(currentWeather.main.temp)}
                <span className="text-5xl text-gray-250">&deg;C</span>
              </h1>
              <h3 className="font-semibold text-4xl text-gray-250 capitalize">
                {currentWeather.weather[0].description}
              </h3>
              <div className="flex flex-col items-center text-center text-gray-350 text-lg space-y-5">
                <p className="capitalize">Today · {formatDate(new Date())}</p>
                <p>
                  <i className="fas fa-map-marker-alt"></i> {currentWeather.name},{' '}
                  {currentWeather.sys.country}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};