import React, { useContext } from 'react'
import { StoreContext } from '../context/StroreContext';
import { assets } from '../assets/assets';
import { Navigate } from 'react-router-dom';
import { Links } from 'react-router-dom';
import Placeorder from './Placeorder';

import { useNavigate } from 'react-router-dom';
const cart = () => {

 const {cartitems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);
 
 const navigate=useNavigate();


 

 





 
  return (
    <>
          {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" /> */}
    <div className='h-full bg-[#eee] rounded-2xl p-5 '>
       <div>
        <div className='grid grid-cols-6'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item)=>{
             if(cartitems[item._id]>0){
              return(
                  <div className='mt-10 '>
                  <div className='grid grid-cols-6 items-center  mb-4 ' >
                     <img className='h-18 rounded-2xl' src={url+"/images/"+item.image} alt="" />
                    <p className=''>{item.name}</p>
                    <p>{item.price}</p>
                   
                    <p>{cartitems[item._id]}</p>
                    <p>{cartitems[item._id]*item.price}</p>
                     <img onClick={() => removeFromCart(item._id)} className='h-6 w-6' src={assets.cut} alt="" />
                   </div>
                   </div>
              )
             }
        })}
       </div>
    <div className="flex flex-col md:flex-row gap-5 mt-10 px-4">
  {/* Cart Total Section */}

  <div className="cart-bottom  w-full  md:w-1/2  p-6 rounded-lg shadow-md">

    <h2 className="text-3xl font-bold mb-4">Cart Total</h2>

    <div className="grid grid-cols-2 mb-2 bg-[#e8e8e8]">


      <p className="font-semibold">Subtotal</p>
      <p className="font-semibold text-right">$ {getTotalCartAmount()}</p>
    </div>
    <hr className="my-2" />

    <div className="grid grid-cols-2 mb-2">
      <p>Delivery Fee</p>
      <p className="text-right">{getTotalCartAmount() > 0 ? (2).toFixed(2) : 0}</p>
    </div>
    <hr className="my-2" />

    <div className="grid grid-cols-2 mb-4">
      <b>Total</b>
      <b className="text-right">$ {getTotalCartAmount()>0? (getTotalCartAmount() + 2) : 0}</b>
    </div>

    <button onClick={() => navigate('/order')} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold">
      PROCEED TO CHECKOUT </button>
  </div>

  
  <div className="cardpromoinput w-full md:w-1/2  p-6 rounded-lg shadow-md">
    <div className="cardPromo  p-3 rounded mb-4 text-black font-medium">
      <p>If you have a Promo code, enter it below:</p>
    </div>

    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Promo code"
        className="flex-1 px-4 py-2 rounded border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-semibold">
        Submit
      </button>
    </div>
  </div>
</div>

               <div>
                 
       </div>
    </div>
    </>
  )
}

export default cart
