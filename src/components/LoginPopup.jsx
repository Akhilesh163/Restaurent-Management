import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../context/StroreContext'
import axios  from 'axios'
const LoginPopup = ({setShowLogin}) => {
   
  const {url,setToken}=useContext(StoreContext)


    const [currState,setCurrState]=useState("Sign-up")
  
   const [data,setdata]=useState({
    name:"",
    email:"",
    password:""
   })
        
const onChangeHandler=(event)=>{
   const {name,value}=  event.target;
   
   setdata(data=>({...data,[name]:value}))
}

    const onLogin= async (event)=>{
     event.preventDefault();
     let newUrl=url;
     if(currState=="Login"){
       newUrl+="/api/user/login"
     }
     else{
       newUrl+= "/api/user/register"
     }
      const response= await axios.post(newUrl,data);
      if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }

      

  return (
  <div className=' fixed inset-0 z-[100] w-full h-full bg-[#00000050] flex items-center justify-center'>
      <form onSubmit={onLogin} className='bg-white flex flex-col gap-6 px-18 py-16 rounded-2xl shadow-2xl w-full max-w-md text-gray-600' action="">
  <div className='font-semibold font-momo flex flex-row items-center gap-4 justify-center'>
  <h1 className='text-3xl'>{currState}</h1>
     <img  onClick={()=>setShowLogin(false)} className='w-6 h-6 cursor-pointer' src={assets.cut} alt="Close" />
    
           
        </div>
        <div className='flex flex-col gap-4 items-center w-full'>
          {currState==="Login" ? null : <input name='name' value={data.name} onChange={onChangeHandler} type="text" className="input p-2 input-bordered w-full" placeholder='Your Name' required/>}
         <input name='email' value={data.email} onChange={onChangeHandler} type="email" className="input input-bordered p-2 w-full" placeholder='Your Email' required/>
         <input onChange={onChangeHandler} name='password' value={data.password  } type="password" className="input input-bordered rounded-full p-2 w-full" placeholder='Your Password' required/>
        </div>
  <button type='submit' className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">{currState==="Sign-Up"?"Create Account":"Login"}</button>
    <div className="flex items-start gap-2 text-xs">
      <input type="checkbox" required className="mt-1"/>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus sunt voluptates explicabo. Quibusdam, necessitatibus delectus.</p>
    </div>
   
   
    {
      currState==="Login"
        ? <p className='cursor-pointer text-blue-500 mt-2' onClick={()=>setCurrState("Sign-Up")}>Create a new account <span className="underline">Click here</span></p>
        : <p className='cursor-pointer text-blue-500 mt-2' onClick={()=>setCurrState("Login")}>Already have an account? <span className="underline">Login here</span></p>
    }
    
  

     </form>
    </div>
  )
}

export default LoginPopup
