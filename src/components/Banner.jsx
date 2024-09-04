import React from 'react'

function Banner() {
  return (
    <div className='h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end' style={{backgroundImage :`url(https://i.pinimg.com/originals/a3/d3/d4/a3d3d418d17c7b76e940fa048c7a01c4.jpg)`}}>
      <div className='text-white text-2xl w-full text-center bg-gray-900/60 p-4'>Movies</div>
    </div>
  )
}

export default Banner
