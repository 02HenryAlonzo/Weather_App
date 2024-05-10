import React from 'react'

export const LargeCard = ({title, num, desc, children}) => {
  return (
    <div className='bg-darkblue w-[328px] h-[204px] flex flex-col items-center justify-evenly sm:w-[275px] lg:h-[175px] lg:w-[336px]'>
        <p>{title}</p>
        <h2 className='text-6xl font-bold'>
            {num}
            <span className='text-4xl font-normal'>{desc}</span>
        </h2>
        {children}
    </div>
  )
}
