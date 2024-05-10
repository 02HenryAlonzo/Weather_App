import React from 'react';
import iconMap from './iconMap'

export const SmallCard = ({ dayTitle, img, min, max, temp }) => {
    let iconSrc = iconMap[img];

    return (
        <div className='bg-darkblue h-[177px] w-[120px] flex flex-col items-center justify-around lg:h-[150px] lg:w-[100px]'>
            <p className='capitalize md:text-sm'>{dayTitle}</p>
            <img src={iconSrc} alt="weather-icon" className='max-h-16' />

            <div className='flex justify-between space-x-5'>
                <p>{max}&deg;{temp}</p>
                <p className='text-gray-250'>{min}&deg;{temp}</p>
            </div>
        </div>
    );
}

