
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/cart'
import './App.css'
import { Routes } from 'react-router-dom'
import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import Placeorder from './pages/Placeorder'
import LoginPopup from './components/LoginPopup'
import Verify from './pages/Verify'
import Myorders from './pages/Myorders'
function App() {

  const [showLogin,setShowLogin]=useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app overflow-hidden'>
      < Navbar setShowLogin={setShowLogin}/>
      
       <Routes>
       <Route path='/' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
               <Route path='/order' element={<Placeorder/>}/>
          <Route path='/login' element={<LoginPopup/>}/>
        <Route path='/verify' element={<Verify/>}/>
    <Route path='myorders' element={<Myorders/>}/>
     </Routes> 
     </div>
    </>
  )
}

export default App
