import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
const RegisterPage = () => {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')
    async function regsterUser(event){
        event.preventDefault();
        try{
            await axios.post('/register',{
                name,
                email,
                password,
            });
            alert('Registration succesful. Now you can login');
        }catch(e){
            alert('Registration Failed, Please try again')
        }
      
    }
    return (
        <div className='mt-4 grow flex item-center justify-around'>
            <div className='mt-32'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-lg mx-auto ' onSubmit={regsterUser}>
                    <input
                        type="text" placeholder='Jack Denials'
                        value={name}
                        onChange={event=>setName(event.target.value)}
                    ></input>
                    <input 
                      value={email}
                      onChange={event=>setEmail(event.target.value)}
                    type='email' placeholder='Your@email.com'></input>
                    <input 
                      value={password}
                      onChange={event=>setPassword(event.target.value)}
                    type='password' placeholder='Enter Password'></input>
                    <button  className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member? <Link className='underline text-black' to={'/login'}>Login Now</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default RegisterPage