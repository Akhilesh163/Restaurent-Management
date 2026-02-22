import React, { useState, useContext } from 'react';
import { StoreContext } from '../context/StroreContext';
import { assets } from '../assets/assets';
import plus from '../assets/plus.svg'
import cut from '../assets/cut.svg'
const Fooditem = ({id, name, price, description, image}) => {
  
  

   const {cartitems, addToCart, removeFromCart ,url} = useContext(StoreContext); 

   
  return (
    <div className='relative p-4'>
      <div className=''>
<img src={`${url}/images/${image}`} alt="" className='  h-50 rounded-t-2xl w-full image-cover image-center ' />
        <div className={`absolute ease-in-out  top-40 right-7 flex gap-1 bg-white rounded-full p-2.5 transition-transform duration-200 ${cartitems[id] ? 'scale-110' : ''}`}>
          {cartitems[id] === 0 ? (
            <img
              onClick={() => addToCart(id)}
              className='w-6 h-6'
              src={plus}
              alt="Add"
            />
          ) : (
            <>
              <img
                onClick={() => addToCart(id)}
                className='w-6 h-6'
                src={plus}
                alt="Add"
              />
              <p>{cartitems[id]}</p>
              {cartitems[id] > 0 && (
                <img onClick={() => removeFromCart(id)} className='w-6 h-6' src={cut} alt="Remove" />
              )}
            </>
          )}
        </div>
      </div>
      <div className='p-8 flex flex-col gap-1 top-2 rounded-b-2xl max-h-full min-w-max left-1.5 bg-[#eee] '>
        <div>
          <p className='text-xl font-semibold'>{name}</p>
        </div>
        <p className='text-xs w-50 font-semibold'>{description}</p>
        <p className='text-lg hover:text-blue-700 font-bold text-orange-400'>₹{price}.00</p>
      </div>
    </div>
  )
}

export default Fooditem

