import React, { useState } from 'react'
import toast from 'react-hot-toast'
import CreditScore from './CreditScore'

function Home() {
    const [smartSuggestion,setSmartSuggestion]=useState(true)
    const [quickLoan,setQuickLoan]=useState(false)
    const [financialReport,setFinancialReport]=useState(false)
    const [creditScore,setCreditScore]=useState(false)
    const[phoneNumber,setPhoneNumber]=useState('')
    


    const handlePhoneInput=(e)=>{
      e.preventDefault()
      console.log("phone->",phoneNumber)
      
    }
  return (
    <div className="w-3/4 mx-auto">
      <div className='w-[80%] mx-auto'>
        {
          creditScore ? <CreditScore hide back={()=>setCreditScore(false)} />:(
            <>
              <div className='mt-24 text-center flex-col flex space-y-10'>
                <span className='text-5xl text-white font-bold'>Revolutionize Your Finances</span>
                <span className='text-white text-xl'>
                  Revolutionize Your Finances
                  Unlock your financial potential with cutting-edge tools and insights.
                </span>
              </div>
              <div className='mt-24 w-3/4 mx-auto flex justify-between items-center'>
                <button 
                  onClick={()=>{
                    setFinancialReport(false)
                    setQuickLoan(false)
                    setSmartSuggestion(true)
                  }}
                  className={
                    smartSuggestion ?
                    'text-white text-center bg-blue-600 capitalize w-[30%] py-3 rounded-3xl':
                    'text-white text-center cursor-pointer bg-gray-700 capitalize w-[30%] py-3 rounded-3xl'
                    }
                >
                    smart suggestion
                  </button>
                <button 
                  onClick={()=>{
                    setFinancialReport(false)
                    setQuickLoan(true)
                    setSmartSuggestion(false)
                  }}
                  className={
                    quickLoan ?
                    'text-white text-center bg-blue-600 capitalize w-[30%] py-3 rounded-3xl':
                    'text-white text-center cursor-pointer bg-gray-700 capitalize w-[30%] py-3 rounded-3xl'
                    }
                >
                  quick loan
                </button>
                <button 
                  onClick={()=>{
                    setFinancialReport(true)
                    setQuickLoan(false)
                    setSmartSuggestion(false)
                  }}
                  className={
                    financialReport ?
                    'text-white text-center bg-blue-600 capitalize w-[30%] py-3 rounded-3xl':
                    'text-white text-center cursor-pointer bg-gray-700 capitalize w-[30%] py-3 rounded-3xl'
                    }
                >
                  financial report
                </button>
              </div>
              <div className='w-3/4 mx-auto bg-gray-800 py-16 rounded-md mt-10'>
                {
                  smartSuggestion ? (
                    <div className='w-2/4 mx-auto '>
                      <input 

                        placeholder='+250783771485'
                        className='w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white'
                        onChange={(e)=>{
                          setPhoneNumber(e.target.value.trim())
                        }}
                        required
                      />
                      <button 
                        onClick={handlePhoneInput}
                        className='w-full py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md'
                      >
                        get personalized insights
                      </button>
                    </div>
                  ):quickLoan?(
                    <div className='w-2/4 mx-auto'>
                      <input 
                        placeholder='Desired Loan amount'
                        className='w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white'
                        onChange={()=>{}}
                        required
                        type='number'
                      />
                      <input 
                        placeholder='Phone Number'
                        className='w-full py-3 outline-none indent-2 mt-5 bg-gray-600 rounded-md text-white'
                        onChange={()=>{}}
                        required
                      />
                    
                      <button 
                        onClick={()=>{
                          setCreditScore(true)
                        }}
                        className='w-full py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md'
                      >
                        apply for a loan
                      </button>
                    </div>
                  ):financialReport?(
                    <div className='w-2/4 mx-auto'>
                      <input 
                        placeholder='+250783771485'
                        className='w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white'
                        onChange={()=>{}}
                        required
                        type='text'
                      />
                      
                      <button className='w-full py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md'>generate financial report</button>
                    </div>
                  ):(
                    <div className=''>

                    </div>
                  )
                }
              </div>
            </>
          )
        }
        

      </div>
    </div>
  )
}

export default Home