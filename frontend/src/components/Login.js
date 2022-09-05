import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
const  axios = require('axios').default;

const Login=()=>{
    const [detail,setDetail] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate();
    useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth)
      {
          navigate('/')
      }
    })
    const handleLogin=async() =>{
        console.log("email,password",detail.email,detail.password)
          axios({
          method: 'POST',
          url: 'http://localhost:5000/login',
          data:{
            email:detail.email,password:detail.password
          }
        }).then((resp)=>{
            if(resp.data.auth)
            {
                localStorage.setItem('user',JSON.stringify(resp.data.user))
                localStorage.setItem('token',JSON.stringify(resp.data.auth))
                navigate('/')
            }else{
                alert('Please Enter correct details');
            }
        })
        var data = JSON.parse(localStorage.getItem('user'));
        console.log(data);
    }

    const handleChange = e =>{
       const {name, value} = e.target
       setDetail({
           ...detail,
           [name]:value
       })
    }
    return(
        <div className='login'>
            <h1>Login</h1>
            <input type='text' name='email' className='inputBox' 
            value={detail.email} onChange={handleChange} 
            placeholder='Enter email'/>

            <input type='password' name='password'  className='inputBox' 
            value={detail.password} onChange={handleChange} 
            placeholder='Enter password'/>

            <button onClick={handleLogin} type='button' 
            className='appButton'>Login</button>
        </div>
    )
}

export default Login;