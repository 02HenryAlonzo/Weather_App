import React, { useContext, useState } from 'react';
import { WeatherContext } from '../WeatherContext';
import { LargeCard } from './LargeCard';
import { SmallCard } from './SmallCard';
import { WindIcon } from './WindIcon';

export const MainContent = () => {
  const { currentWeather, forecastWeather } = useContext(WeatherContext);
  const [temp, setTemp] = useState('C');

  const changeTemp = (temperature) => {
    setTemp(temperature);
  };

  const formatDate = (date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  
    return `${dayName}, ${dayNumber} ${monthName}`;
  };
  

  const groupForecastByDay = (forecastData) => {
    const groupedForecast = {};
    
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt_txt);
      const dateKey = date.toDateString();
  
      if (!groupedForecast[dateKey]) {
        groupedForecast[dateKey] = {
          date: date,
          iconCounts: {},
          maxTemp: item.main.temp_max,
          minTemp: item.main.temp_min,
          icon: item.weather[0].icon
        };
      }
  
      const dayData = groupedForecast[dateKey];
      dayData.maxTemp = Math.max(dayData.maxTemp, item.main.temp_max);
      dayData.minTemp = Math.min(dayData.minTemp, item.main.temp_min);
      
      if (dayData.iconCounts[item.weather[0].icon]) {
        dayData.iconCounts[item.weather[0].icon]++;
      } else {
        dayData.iconCounts[item.weather[0].icon] = 1;
      }
  
      const maxCount = Math.max(...Object.values(dayData.iconCounts));
      dayData.icon = Object.keys(dayData.iconCounts).find(icon => dayData.iconCounts[icon] === maxCount);
    });
  
    const sortedDays = Object.values(groupedForecast).sort((a, b) => a.date - b.date);
    return sortedDays.slice(1, 6).map((dayData, index) => ({
      dayTitle: index === 0 ? "Tomorrow" : formatDate(dayData.date),
      icon: dayData.icon,
      maxTemp: dayData.maxTemp,
      minTemp: dayData.minTemp
    }));
  };
  
  const convertTemperature = (temp, unit) => {
    if (unit === 'C') {
      return temp;
    } else {
      return (temp * 9) / 5 + 32;
    }
  };

  if (!currentWeather || !forecastWeather) {
    return <div>Cargando datos del clima...</div>;
  }

  const dailyForecast = groupForecastByDay(forecastWeather);


  return (
    <div className="text-gray-100 p-10 flex-grow lg:p-0 lg:flex lg:flex-col lg:max-w-[700px] lg:m-auto">
      <div className="space-x-3 text-right mb-5">
        <button
          className={`${
            temp === 'C' ? 'bg-gray-100 text-darkblue' : 'bg-[#585676] text-gray-100'
          } rounded-full w-10 h-10 lg:w-7 lg:h-7 font-bold text-xl lg:text-base`}
          onClick={() => changeTemp('C')}
        >
          &deg;C
        </button>
        <button
          className={`${
            temp === 'F' ? 'bg-gray-100 text-darkblue' : 'bg-[#585676] text-gray-100'
          } rounded-full w-10 h-10 lg:w-7 lg:h-7 font-bold text-xl lg:text-base`}
          onClick={() => changeTemp('F')}
        >
          &deg;F
        </button>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-10 lg:gap-12">
          {dailyForecast.map((item, index) => (
            <SmallCard
              key={index}
              dayTitle={item.dayTitle}
              img={item.icon}
              max={Math.round(convertTemperature(item.maxTemp, temp))}
              min={Math.round(convertTemperature(item.minTemp, temp))}
              temp={temp}
            />
          ))}
        </div>
      </div>

      <div className="mt-20 ml-10 lg:mt-8 sm:ml-0 md:ml-24 lg:ml-0">
        <h3 className="text-2xl font-bold">Today's Highlights</h3>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-5">
          <LargeCard title="Wind Status" num={currentWeather.wind.speed} desc="mph">
            <div className="flex justify-between space-x-5 items-center">
              <div className="bg-gray-500 rounded-full w-[30px] h-[30px] flex justify-center items-center">
                <WindIcon degrees={currentWeather.wind.deg} />
              </div>
              <p className="text-gray-150 text-sm">{currentWeather.wind.deg}&deg;</p>
            </div>
          </LargeCard>

          <LargeCard title="Humidity" num={currentWeather.main.humidity} desc="%">
            <div className="text-gray-250 text-xs ">
              <div className="flex justify-between space-x-5 items-center px-1">
                <p>0</p>
                <p>50</p>
                <p>100</p>
              </div>
              <div className="w-[229px] h-2 bg-gray-150 rounded-full overflow-hidden">
                <div
                  className="bg-[#FFEC65] h-2"
                  style={{ width: `${currentWeather.main.humidity}%` }}
                ></div>
              </div>
              <p className="text-right">%</p>
            </div>
          </LargeCard>

          <LargeCard
            title="Visibility"
            num={(currentWeather.visibility / 1000).toFixed(1)}
            desc=" miles"
          />

          <LargeCard title="Air Pressure" num={currentWeather.main.pressure} desc=" mb" />
        </div>
      </div>
    </div>
  );
};