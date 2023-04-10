import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import AccountNav from '../AccountNav'
import { UserContext } from '../UserContext'
import PlacesPage from './PlacesPage'

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useContext(UserContext)
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null);
  }

  if (!ready) {
    return 'Loading..'
  }
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }


  

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
     <AccountNav/>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto justify-center'>
          <div className='flex justify-center items-center'>
            <img id='womenimg' src='women.gif' alt='women img' className='h-60 w-60 mb-8 rounded-full  shadow-xl dark:shadow-gray-500' />
          </div>
          User: {user.name} <br />
          {user.email}
          <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}

      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  )
}

export default ProfilePage