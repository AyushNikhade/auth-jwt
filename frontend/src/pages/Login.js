import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { handleError, handleSuccess } from '../utils'
function Login() {

  const [loginInfo,setloginInfo]=useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  
  const handleChange=(e)=>{
   const {name,value}=e.target;
   console.log(name, value);
   const copyLoginInfo  ={...loginInfo};
   copyLoginInfo[name]=value;
   setloginInfo(copyLoginInfo);
  }

  console.log('login ',loginInfo)

  
  const handleLogin =async(e)=>{
  e.preventDefault();
  const {email,password} = loginInfo;
  if(!email||!password){
    return handleError('Enter Login Details.')
  }
  try{
    const url = "https://auth-jwt-api-nine.vercel.app/auth/login";
    const response = await fetch(url,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
        ,"Authorization": `Bearer ${localStorage.getItem('token')}` 
      },
      body:JSON.stringify(loginInfo)
    });
     const result =await response.json();
         
      
     const {success, message,jwtToken,name ,error} = result;
          if(success){
            handleSuccess(message);
            localStorage.setItem('token',jwtToken);
            localStorage.setItem('loggedInUser',name);
            setTimeout(()=>{navigate('/home')},1000)
          }else if(error){
            const details = error?.details[0].message;
            handleError(details);
          }else if(!success){
            handleError(message);
          }
          
          console.log(result)
  }


       catch(err){
           handleError(err.message);
       }
  }


  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        
        <div>
          <label htmlFor='email'>Email</label>
          <input onChange={handleChange} type='email' name='email' autoFocus placeholder='Enter your Email...' value={loginInfo.email}/>
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input onChange={handleChange} type='password' name='password' autoFocus placeholder='Enter your password...' value={loginInfo.password}/>
        </div>
        
        <button type='submit'>Login</button>
             <span> Don't have an account?
              <Link to='/signup'>Signup</Link>
             </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
