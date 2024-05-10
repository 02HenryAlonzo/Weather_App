import React, { useState, useContext } from 'react';
import { WeatherContext } from '../WeatherContext';

const predefinedLocations = [
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 }
];

export const SearchLocation = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const { setLocation } = useContext(WeatherContext);

  const handleSearch = async () => {
    try {
      const apiKey = '3de5271ebd7c07f5c2cb97443016c61c';
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${apiKey}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLocation({ latitude: lat, longitude: lon });
        onClose();
      } else {
        setError('No results found for the search');
      }
    } catch (error) {
      setError('Error al buscar ubicación');
      console.error('Error al buscar ubicación:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setError('');  
  };

  const handleLocationSelect = (lat, lon) => {
    setLocation({ latitude: lat, longitude: lon });
    onClose();
  };

  return (
    <div className="text-gray-150">
      <div className="text-right">
        <button className="text-2xl" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-between my-5 space-x-4">
        <input
          type="text"
          className="border border-gray-150 bg-transparent p-3 flex-grow rounded-lg"
          placeholder="Search Location"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={(event) => event.key === 'Enter' && handleSearch()}
        />
        <button
          className="bg-[#3C47E9] py-3 px-5 hover:bg-[#3C47E9]/70 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="mt-20">
        {predefinedLocations.map((location, index) => (
          <button key={index} className="hover:border border-gray-250 px-4 py-6 w-full flex justify-between"
                  onClick={() => handleLocationSelect(location.lat, location.lon)}>
            <p>{location.name}</p>
            <i className="fas fa-chevron-right text-gray-350"></i>
          </button>
        ))}
      </div>
    </div>
  );
};
