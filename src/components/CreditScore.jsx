import React from 'react'
import IndicationBar from './IndicationBar'
import { FiActivity } from "react-icons/fi";
import { IoCubeOutline } from "react-icons/io5";
import { PiWaveformLight } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";



function CreditScore({hide,back}) {

  return (
    <section className='w-full transition-opacity relative animate-fadeIn duration-1000'>
      {hide &&<IoIosArrowBack 
        size={28}
        color='white'
        onClick={back}
        className='absolute top-5 left-5 z-20 cursor-pointer'
      />}
      <div className='bg-gradient-to-r from-blue-950 to-blue-900 py-28'>
        <div className='flex flex-col w-3/5 mx-auto text-center space-y-5'>
          <span className='font-bold text-3xl text-white'>Unlock Your Credit Score Potential</span>
          <span className='text-xl text-white'>Discover the power of your credit score and learn how to improve it with our cutting-edge tools and expert insights.</span>
        </div>
        <div className=''>
          <IndicationBar />
        </div>
        <div className='w-1/5 mx-auto bg-transparent py-10'>
          <input 
            placeholder='+250783771485'
            className='w-full indent-2 py-3 rounded-lg outline-none'
          />
          <div className='w-3/4 mx-auto'> 
            <button
              className='capitalize font-semibold w-full py-3 text-md rounded-2xl  text-white bg-blue-500 mt-10'
            >
              check your score
            </button>
          </div>
        </div>
      </div>

      {
        !hide && 
        <div className='bg-transparent w-3/5 py-10 mx-auto grid grid-cols-3'>
          <div className='flex flex-col justify-center items-center rounded-lg bg-gray-900 py-10 cursor-pointer hover:scale-105 px-5'>
              <FiActivity 
                size={28}
                color='white'
              />
              <span className='text-xl font-bold text-center mt-5 text-white'>Real-Time Monitoring</span>
              
              <span className='text-white mx-5 text-center mt-4'>
                  Keep track of your credit score changes with our advanced real-time monitoring system.
              </span>
          </div>
          <div className='flex flex-col justify-center items-center rounded-lg bg-gray-900 py-10 cursor-pointer hover:scale-105 px-5'>
              <PiWaveformLight 
                size={28}
                color='white'
              />
              <span className='text-xl font-bold text-center mt-5 text-white'>Personalized Insights</span>
              
              <span className='text-white mx-5 text-center mt-4'>
              Receive tailored recommendations to improve your credit score based on your unique financial situation.
              </span>
          </div>
          <div className='flex flex-col justify-center items-center rounded-lg bg-gray-900 py-10 cursor-pointer hover:scale-105 px-5'>
              <IoCubeOutline
                size={28}
                color='white'
              />
              <span className='text-xl font-bold text-center mt-5 text-white'>Credit Score Simulator</span>
              
              <span className='text-white mx-5 text-center mt-4'>
              Explore how different financial decisions can impact your credit score with our interactive simulator.
              </span>
          </div>
          
      </div>
      }
      
    </section>
  )
}

export default CreditScore