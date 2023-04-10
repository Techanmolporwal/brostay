import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AccountNav from '../AccountNav'
import Perks from '../Perks'
import PhotosUploader from '../PhotosUploader'

const PlacesFormPage = () => {
    const{id}=useParams();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfor] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuest] = useState(1)
    const[price,setPrice]=useState(100)
    const[redirect,setRedirect]=useState(false)
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data}=response
            setTitle(data.title);
            setAddress(data.address)
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks)
            setExtraInfor(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuest(data.maxGuest)
            setPrice(data.price);
        })
    },[id])


    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }
    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function savePlace(event) {
        event.preventDefault();
        const placeData= { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuest, price }
        if(id){
            //update
            await axios.put('/places', { 
                id,    ...placeData
             });

        }
        else{
            //newPlace
            await axios.post('/places',placeData);
        }
        setRedirect(true)
        
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }
    return (
        <div>
            <AccountNav />
            <form className='p-4' onSubmit={savePlace}>
                {preInput('title', 'Title for your place.should be short and catchy')}
                <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder='title, for example: My Lovely apt' />
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={event => setAddress(event.target.value)} placeholder='address' />
                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'discription of the place')}
                <textarea value={description} onChange={event => setDescription(event.target.value)} />
                {preInput('Perks', 'Select all the perks of  your place')}
                <Perks selected={perks} onChange={setPerks} />

                {preInput('Extra Info', 'house rule, etc ')}

                <textarea value={extraInfo} onChange={event => { setExtraInfor(event.target.value) }} />
                {preInput('check in & check out , max guests', 'add check in and check out times, rember to have some time window for cleaning the room between guests')}

                <div className='grid gap-2  sm:grid-cols-2 md:grid-cols-4'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input type='text'
                            value={checkIn}
                            onChange={event => setCheckIn(event.target.value)}
                            placeholder='14'
                        />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input type='text'
                            value={checkOut}
                            onChange={event => setCheckOut(event.target.value)}
                            placeholder='2'
                        />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input type='text'
                            value={maxGuest}
                            onChange={event => setMaxGuest(event.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Price per night</h3>
                        <input type='text'
                            value={price}
                            onChange={event => setPrice(event.target.value)}
                        />
                    </div>
                </div>
                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage