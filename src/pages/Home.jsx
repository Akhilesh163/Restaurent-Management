import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/Header'
import { useState } from 'react'
import FoodDisplay from '../components/FoodDisplay'
import ExploreMenu from '../components/ExploreMenu'
import Footer from '../components/Footer.jsx'
const Home = () => {

   const [category, setCategory] = useState("All");


  return (
<>
   
    <div>
    <Header/>
    </div>

        {/* <h1   className='mt-6  w-full text-5xl font-extralight font-serif text-blue-500'>Savor the art of fine dining — explore our menu</h1>       */}
    <div className="explore-menu-container" id='explore-menu' >
                   
                   
      <ExploreMenu category={category} setCategory={setCategory}/>
               
    </div>

    <div className="explore-menu-container" >
      <FoodDisplay category={category} />  
    </div>

         <footer className='   explore-footer'><Footer /></footer>

    </>
  )
}

export default Home
