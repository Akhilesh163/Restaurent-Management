import React from 'react'
import { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Timeline } from 'gsap/gsap-core';
const Header = () => {
  
   const head =useRef(null)    
    useGSAP(()=>{
    const tl= gsap.timeline();
      tl.from(".tag",{

         scale:0.5,
         stagger:0.2,
         delay:0.5,

      opacity: 0,
      duration: 2,
      ease: "power2.out"
      })
    },[])

     useGSAP(()=>{
    const t= gsap.timeline();
      t.from(head.current,{
       
         x:150,
     
      opacity: 0,
      duration: 2,
      ease: "power2.out"
      })
    },[])
    
  return (
   
   

     
     
      <div
       ref={head}  
      className="   w- rounded-4xl  bg-cover   h-[70vh]     justify-center bg-center    bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D')]"
      >
        <div className='relative flex flex-col gap-y-5.5  top-1/4 left-11.5 '>
        <h1 className=' tag text-6xl text-white font-semibold font-serif   '>Order your <h1 classn="mb-4 text-6xl font-semibold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">favourite food here</span> </h1></h1>
        <p className='tag w-2xl text-[#eee] font-serif '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste facere architecto, alias corrupti ratione, deleniti animi quos ex necessitatibus quam sint fugiat magni excepturi, voluptate repellendus itaque tempore. Quas, magnam!</p>
          {/* <button type="button" class=" w-29 h-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-8 py-4.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View Menu</button> */}
       <button type="button" className=  "tag w-29 h-10 bg-white text-black  hover:text-white border border-gray-800 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-white-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-800">View Menu</button>
        </div>

    </div>
  )
}

export default Header
