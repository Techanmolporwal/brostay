import React from 'react'
import Image from './Image';
const PlaceImg = ({place,index=0,className=null}) => {
    if(!place.photos?.length){
        return '';
    }
    if(!className){
        className='object-cover'
    }
  return (
    <div>
        <Image className={className} src={place.photos[index]} alt="photo" />
    </div>
  )
}

export default PlaceImg