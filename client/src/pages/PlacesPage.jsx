import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AccountNav from '../AccountNav';
import axios from 'axios'
const PlacesPage = () => {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)
        })
    }, [])
    return (
        <div>
            <AccountNav />

            <div className='text-center'>
                <Link id='neumorphism' className='inline-flex gap-1 bg-primary  text-white py-2 px-4 rounded-full' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Place
                </Link>
            </div>
            <div className='mt-4 gap-2'>
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/'+place._id} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
                        <div className='flex w-32 h-32 bg-gray shrink-0 '>
                            {place.photos.length > 0 && (
                                <img className='object-cover' src={'http://localhost:4000/uploads/'+place.photos[0]} alt="photo" />
                            )}
                        </div>
                        <div className='grow-0 shrink'>
                            <h2 className='text-xl'> {place.title}</h2>
                            <p className='text-sm mt-2'>{place.extraInfo}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PlacesPage