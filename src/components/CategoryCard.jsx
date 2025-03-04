import React from 'react'

const CategoryCard = ({img , title}) => {
  return (
    <div className=' text-center space-y-2 hover:scale-105 ease-in cursor-pointer hover:text-fontPrimary'>
        <div className='rounded-full h-32 w-32 bg-bgTertiary flex items-center justify-center hover:border-fontPrimary hover:border'> 
            <img src={img} alt="" className=' max-h-32 max-w-32' />
        </div>
        <h3 className=' '>{title}</h3>
      
    </div>
  )
}

export default CategoryCard
