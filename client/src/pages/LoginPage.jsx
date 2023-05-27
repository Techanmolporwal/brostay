import axios from 'axios';
import React,{useContext, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import {UserContext} from '../UserContext';

const LoginPage = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[redirect,setRedirect]=useState(false)
    const {setUser}=useContext(UserContext)
    async function handelLoginSubmit(event){
        event.preventDefault();
        try{
           const {data}= await axios.post('/login',{email,password})
           setUser(data)
            alert('Login Succesful');
            setRedirect(true)
        }catch(e){
            alert('Login Failed')
        }
     
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className='mt-4 grow flex item-center justify-around'>
            <div className='mt-32'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-lg mx-auto' onSubmit={handelLoginSubmit}>
                    <input type='email'
                     placeholder='Your@email.com' 
                     value={email}
                      onChange={event=>setEmail(event.target.value)}>
                      </input>
                    <input
                     type='password' 
                     placeholder='Enter Password'
                     value={password} 
                     onChange={event=>setPassword(event.target.value)}>
                     </input>
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't havae an account yet? <Link className='underline text-black' to={'/register'}>Register Now</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginPage