import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StroreContext';
import { assets } from '../assets/assets';
import { useRef } from 'react';
import gsap from 'gsap';
import Myorders from '../pages/Myorders';
import { useGSAP } from '@gsap/react';
import { Timeline } from 'gsap/gsap-core';
const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState('home');
  const [orders, setOrders] = useState([]);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const {getTotalCartAmount,token,setToken,url}=useContext(StoreContext)
  const navigate=useNavigate();

  // Fetch orders for dropdown when logged in
  React.useEffect(() => {
    const fetchOrders = async () => {
      if (token) {
        try {
          const response = await fetch(url + '/api/order/userorders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          });
          const data = await response.json();
          setOrders(data.data || []);
        } catch (err) {
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [token, url]);

  const tl=  gsap.timeline();
  useGSAP(()=>{
    tl.from(".navsec",{
       y:30,
       opacity:0,
       duration:1,
       stagger:0.1,
    });
  },[])

  const logout=()=>{
      localStorage.removeItem("token")
      setToken("");
      navigate("/")
  }

  return (
    <>
      <div  className="sticky top-0 z-50 bg-white h-20 flex justify-between items-center">
        <h1 className=" navsec text-3xl font-mono font-extralight text-orange-600">Fresh~Bite</h1>
        <div className="section1 flex gap-6 items-center font-semibold">
          <div className="home-section navsec ">
            <Link to=''
              
              onClick={() => setMenu('home')}
              className={`cursor-pointer pb-1 transition-all duration-200 ${
                menu === 'home' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
          </div>
          <div className="menu-section navsec">
            <a
              href="#explore-menu"
              onClick={() => setMenu('menu')}
              className={`cursor-pointer pb-1 transition-all duration-200 ${
                menu === 'menu' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-700'
              }`}
            >
              Menu
            </a>
          </div>
          <div className="mobile-app-section navsec">
            <a
              href="#app-download"
              onClick={() => setMenu('mobile-app')}
              className={`cursor-pointer pb-1 transition-all duration-200 ${
                menu === 'mobile-app' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-700'
              }`}
            >
              Mobile App
            </a> 
          </div>
          <div className="contact-us-section navsec">
            <a
              href="#footer"
              onClick={() => setMenu('contact-us')}
              className={`cursor-pointer pb-1 transition-all duration-200 ${
                menu === 'contact-us' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-700'
              }`}
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="sec2 gap-6 flex items-center">
          <i className="navsec fa-solid fa-magnifying-glass"></i>
         <Link to='/cart'><i className="navsec fa-solid fa-bag-shopping"></i></Link>  
          
          
          {/* {!token?  <Link onClick={() => setShowLogin(true)} className="h-8 w-20 flex items-center justify-center px-4 py-2 text-gray-900 hover:text-white border border-gray-600  focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
            Sign In
          </Link>:<div className='h-6 w-6 flex items-center justify-center '>
            <  img src={assets.profile} alt="" /></div>}
        <ul className='flex flex-col'>
          <li className='flex'><img className='h-5' src={assets.bag} alt="" /><p className='text-sm'>Orders</p></li>
          <hr />
          <li className='flex'><img className='h-5' src={assets.logout} alt="" /><p className='text-sm'>Logout</p></li>
        </ul> */}
                  {/* If not logged in */}
          {!token ? (
            <Link
              onClick={() => setShowLogin(true)}
              className=" navsec h-8 w-20 flex items-center justify-center px-4 py-2 text-gray-900 hover:text-white border border-gray-600 rounded-full text-sm"
            >
              Sign In
            </Link>
          ) : (
            // If logged in - profile dropdown
            <div className="relative group">
              <img src={assets.profile} alt="Profile" className="h-8 w-8 rounded-full cursor-pointer" />

              {/* Dropdown menu */}
              <ul className="absolute right-0 mt-2 w-56 bg-white shadow-lg border rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                <li onClick={() => navigate('/myorders')} className="flex items-center gap-2 px-4 py-2 cursor-pointer">
                  <img className="h-5" src={assets.bag} alt="Orders" />
                  <p className="text-sm">Orders</p>
                </li>
      {/* Orders Modal Section */}
      {showOrdersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="verify-orders" style={{ maxWidth: '700px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '32px', position: 'relative' }}>
            <button onClick={() => setShowOrdersModal(false)} style={{ position: 'absolute', top: 16, right: 16, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>&times;</button>
            <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#3399cc', fontWeight: 700, fontSize: '2rem' }}>Your Orders</h2>
            {Array.isArray(orders) && orders.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem' }}>No orders found.</p>
            ) : (
              <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', fontSize: '1rem' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5', color: '#333' }}>
                    <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0' }}>Items</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0' }}>Amount</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0' }}>Address</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0' }}>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '10px' }}>
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} style={{ marginBottom: '4px', color: '#444' }}>
                            <span style={{ fontWeight: 500 }}>{item.name}</span> x <span>{item.quantity}</span>
                          </div>
                        ))}
                      </td>
                      <td style={{ padding: '10px', color: '#3399cc', fontWeight: 600 }}>₹{order.amount}</td>
                      <td style={{ padding: '10px', color: '#666' }}>{order.address && typeof order.address === 'object' ? Object.values(order.address).join(', ') : order.address}</td>
                      <td style={{ padding: '10px', fontWeight: 600 }}>{order.payment ? <span style={{ color: 'green' }}>✅ Paid</span> : <span style={{ color: 'red' }}>❌ Pending</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
                <hr />
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <img className="h-5" src={assets.logout} alt="Logout" />
                  <p onClick={logout} className="text-sm">Logout</p>
                </li>
                <hr />
              </ul>
            </div>
          )}

        </div>
        
      </div>
    </>
  );

  
  
  
};

export default Navbar;
