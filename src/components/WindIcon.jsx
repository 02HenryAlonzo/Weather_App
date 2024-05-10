import React from 'react';

export const WindIcon = ({ degrees }) => {
  const style = {
    transform: `rotate(${degrees}deg)`,
  };

  return (
    <i className="fas fa-location-arrow" style={style}></i>
  );
};