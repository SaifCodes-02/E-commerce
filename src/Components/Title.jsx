import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='flex flex-col gap-3 items-center mb-3 justify-center'>
      <p className='text-gray-800 font-medium'>{text1} <span className='text-gray-800 font-bold'>{text2}</span></p>
     <p className='w-32 sm:w-60 h-[1px] sm:h-[2px] bg-gray-800'></p>

    </div>
  )
}

export default Title