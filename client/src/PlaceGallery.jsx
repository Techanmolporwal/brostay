import React, { useState } from 'react'
import PlaceImg from './PlaceImg'
import Image from './Image'
const PlaceGallery = ({place}) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    if (showAllPhotos) {
        return (
            <div className='absolute  bg-black text-white inset-0 min-h-screen'>
                <div className='bg-black p-8 grid gap-4'>
                    <div >
                    <h1 className='text-3xl mr-48'>Photos of {place.title}</h1>
                        <button onClick={() => { setShowAllPhotos(false) }} className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close photos</button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div>
                            <Image src={photo} alt="img" className='w-full' />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
  return (
    <div>
         <div className='relative'>
                <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden '>
                    <div>
                        <PlaceImg place={place}/>
                        
                    </div>
                    <div className='grid'>
                        {place.photos?.[1] && (
                            <Image className='object-cover  cursor-pointer aspect-square' onClick={()=>{setShowAllPhotos(true)}} src={place.photos[1]} />
                        )}
                        <div className='overflow-hidden'>
                            {place.photos?.[2] && (
                                <Image className='object-cover relative  cursor-pointer aspect-square' onClick={()=>{setShowAllPhotos(true)}} src={place.photos[2]} />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => { setShowAllPhotos(true) }} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Show more photos
                </button>
            </div>
    </div>
       

  )
}

export default PlaceGallery