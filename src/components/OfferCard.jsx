import React from 'react'

const OfferCard = ({url}) => {
  return (
    <div className=' hover:scale-105 cursor-pointer'>
      <img src={url} alt="" />
    </div>
  )
}

export default OfferCard
