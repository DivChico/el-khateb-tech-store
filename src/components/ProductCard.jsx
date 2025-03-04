import React from 'react'
const ProductCard = () => {
  return (
    <div className='h-64 w-52 bg-white border border-bgTertiary hover:border-fontPrimary cursor-pointer hover:scale-105 ease-in rounded-lg overflow-hidden relative'>
        <div className=' bg-bgTertiary h-40 flex items-center  justify-center '><img src="https://i.ibb.co/RGGSt0sQ/image-3.png" alt="" /></div>
        <div className='px-4 py-6 text-center text-fontSecondary'>
            
            <h3 className=' font-bold'>Galaxy S22 Ultra</h3>
            <p>4GB ram | 64 GB storage</p>
        </div>
       <div className='  bg-fontPrimary text-white absolute top-0 right-0 p-1 rounded-bl-lg'>
        <p className='font-semibold text-xs'>خصم</p>
        <p className=' font-semibold'>50%</p>
       </div>
      
    </div>
  )
}

export default ProductCard
