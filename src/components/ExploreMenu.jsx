import React, { useRef } from 'react';
import { menu_list } from '../assets/assets';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Timeline } from 'gsap/gsap-core';
const ExploreMenu = ({ category, setCategory }) => {
  

  
  return (
    <>
      <div className=' mt-12 px-6 exp flex flex-col gap-y-10' >
        <h1   className='  w-full text-5xl font-extralight font-serif text-blue-500'>Savor the art of fine dining — explore our menu</h1>
        <p className='text-sm text-gray-600 max-w-3xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolor saepe cum quam reiciendis, inventore temporibus nesciunt odio ipsum voluptatum, numquam eos nulla, modi nemo porro omnis! Aliquid, corrupti modi.
        </p>

        <div className='flex justify-between overflow-x-scroll gap-12 overflow-y-auto max-h-97'>
          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name;

            return (
              <div
                key={index}
                onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
                className='flex flex-col items-center cursor-pointer gap-2 min-w-max'
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className={`h-36 w-36 rounded-full object-cover transition-all duration-200 border-4 
                    ${isActive ? 'border-orange-500 p-2' : 'border-transparent'}`}
                />
                <p
                  className={`text-xl font-semibold text-center transition-colors duration-200 
                    ${isActive ? 'text-orange-500' : 'text-black'}`}
                >
                  {item.menu_name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className='line w-full mt-20 h-0.5 bg-black'></div>
    </>
  );
};

export default ExploreMenu;
