import React from 'react'
import { FaRegFaceSmile } from "react-icons/fa6";
import { FiCheckCircle,FiMapPin } from "react-icons/fi";




function Loan() {
  return (
    <div className='w-full'>
      <div className='bg-gradient-to-r from-blue-950 to-blue-900 py-16'>
        <div className='flex flex-col w-3/5 mx-auto text-center space-y-5'>
          <span className='font-bold text-5xl text-white'>
            Empower Your Future with a Tailored Loan
          </span>
          <span className='text-xl text-white'>
            Discover flexible financing options designed to meet your unique needs and aspirations
          </span>
        </div>
        <form className='bg-gradient-to-r w-2/5 mt-10 py-10 mx-auto from-blue-950 to-blue-900 rounded-md shadow-md'>
            <div className='flex flex-col space-y-2 justify-center text-center'>
              <span className='text-white font-semibold'>Loan Amount - $</span>
              <input 
                type='number'
                placeholder='Loan Amount'
                onChange={()=>{}}
                className='bg-transparent outline-none text-white rounded-md py-3 indent-2 w-2/4 mx-auto border-gray-300 border-[1px]'
              />
            </div>
            <div className='flex flex-col space-y-2  mt-5 justify-center text-center'>
              <span className='text-white font-semibold'>Phone Number</span>
              <input 
                type='text'
                placeholder='+250783771485'
                onChange={()=>{}}
                className='bg-transparent outline-none text-white rounded-md py-3 indent-2 w-2/4 mx-auto border-gray-300 border-[1px]'
              />
            </div>
            <div className='w-2/4 mx-auto mt-5'> 
            <button
              className='capitalize font-semibold w-full py-3 rounded-2xl text-white bg-blue-500 mt-10'
            >
              request loan
            </button>
          </div>
        </form>
      </div>
      <div className='bg-transparent w-3/5 py-10 mx-auto grid grid-cols-3'>
          <div className='flex flex-col justify-center items-center rounded-lg bg-gray-900 py-10 cursor-pointer hover:scale-105 px-5'>
              <FaRegFaceSmile 
                size={28}
                color='white'
              />
              <span className='text-xl font-bold text-center mt-5 text-white'>Personalized Rates</span>
              
              <span className='text-white mx-5 text-center mt-4'>
                Get competitive interest rates tailored to your unique financial profile.
              </span>
          </div>
          <div className='flex flex-col justify-center items-center rounded-lg bg-gray-900 py-10 cursor-pointer hover:scale-105 px-5'>
              <FiCheckCircle 
                size={28}
                color='white'
              />
              <span className='text-xl font-bold text-center mt-5 text-white'>Quick Approval</span>
              
              <span className='text-white mx-5 text-center mt-4'>
                Experience a streamlined application process with fast decision-making.
              </span>
          </div>
          <div className='flex flex-col justify-center items-center rounded-lg bg-gray-900 py-10 cursor-pointer hover:scale-105 px-5'>
              <FiMapPin
                size={28}
                color='white'
              />
              <span className='text-xl font-bold text-center mt-5 text-white'>Flexible Terms</span>
              
              <span className='text-white mx-5 text-center mt-4'>
                Choose from a variety of repayment options that fit your budget and timeline.
              </span>
          </div>
          
      </div>
      
    </div>
  )
}

export default Loan