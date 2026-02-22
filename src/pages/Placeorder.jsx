import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../context/StroreContext';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify';



const Placeorder = () => {
  const { cartitems, food_list, getTotalCartAmount, token } = useContext(StoreContext);
  const navigate = useNavigate();

  // Hardcode your backend url here or get it from context/env variable
  const url = "http://localhost:4000";

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);



  const [address,setaddress] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      zip: "",
      state:"",
    });

    const onChangeHandler=(event)=>{
             const {name,value}=event.target;
             setaddress(address=>({...address,[name]:value}))
    }
console.log(address)


  const handlePayment = () => {
    const subtotal = getTotalCartAmount();
    const delivery = subtotal > 0 ? 2 : 0;
    const totalAmount = subtotal + delivery;

    const items = Object.keys(cartitems)
      .filter((id) => cartitems[id] > 0)
      .map((id) => {
        const item = food_list.find((food) => food._id === id);
        return {
          foodId: item._id,
          name: item.name,
          quantity: cartitems[id],
          price: item.price,
        };
      });

  
    const options = {
      key: "rzp_test_kRMd2DEILL5qE6", // Your Razorpay key
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Food Delivery App",
      description: "Test Transaction",
      
      handler: async function (response) {
        try {
          // Directly save order after payment
          await axios.post(
            `${url}/api/order/place`,
            {
              items,
              amount: totalAmount,
              address,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        
          setTimeout(() => {
            navigate('/verify');
          }, 100);
        } catch (err) {
          console.error('❌ Error saving order:', err);
          alert('Order save failed.');
        }
      },
      prefill: {
        name: "Akhi",
        email: "test@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Customer Address"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

useEffect(()=>{
   if(!token){
      navigate('/login')
   }   else if(getTotalCartAmount()===0){
      navigate('/')
   }
},[token])


  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="left col-span-1">
          <p className="text-xl font-semibold mb-4">Delivery Info</p>

          <input type="text" value={address.firstName} name='firstName' onChange={onChangeHandler} placeholder="First Name" className="mb-4 w-full p-2 border rounded" />
          <input type="text" value={address.lastName} name='lastName' onChange={onChangeHandler} placeholder="Last Name" className="mb-4 w-full p-2 border rounded" />
          <input type="text" value={address.phone} name='phone' onChange={onChangeHandler} placeholder="Phone Number" className="mb-4 w-full p-2 border rounded" />
          <input type="text" value={address.city} name='city' onChange={onChangeHandler} placeholder="City" className="mb-4 w-full p-2 border rounded" />
          <div className="flex gap-4 mb-6">
            <input type="text" value={address.zip} onChange={onChangeHandler} name='zip' placeholder="ZIP Code" className="w-1/2 p-2 border rounded" />
            <input type="text" value={address.state} onChange={onChangeHandler} name='state' placeholder="State" className="w-1/2 p-2 border rounded" />
          </div>

          <button
            type="button"
            onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition duration-200"
          >
            Proceed to Pay ₹{getTotalCartAmount() > 0 ? (getTotalCartAmount() + 2).toFixed(2) : '0.00'}
          </button>
        </div>
                
        {/* Right Section - Order Summary */}
        <div className="right col-span-1 bg-gray-100 p-6 rounded-lg">
          <p className="text-xl font-semibold mb-4">Order Summary</p>

          <div className="grid grid-cols-2 mb-2 text-gray-700">
            <p>Subtotal</p>
            <p className="text-right">₹{getTotalCartAmount().toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 mb-2 text-gray-700">
            <p>Delivery Fee</p>
            <p className="text-right">₹{getTotalCartAmount() > 0 ? "2.00" : "0.00"}</p>
          </div>

          <hr className="my-3" />

          <div className="grid grid-cols-2 text-lg font-bold text-gray-900">
            <p>Total</p>
            <p className="text-right">
              ₹{getTotalCartAmount() > 0 ? (getTotalCartAmount() + 2).toFixed(2) : "0.00"}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Placeorder;
