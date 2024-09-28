import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CreditScore from './CreditScore'
import { useDispatch, useSelector } from 'react-redux'
import { selectPhone, setAnalyze, setService } from '../redux/slices/serviceSlice'
import PDFDownloadComponent from './PdfComponent'
import { useGetMessageMutation } from '../redux/services/services'
import axios from 'axios'
import { redirect } from 'react-router-dom'
import LoadinComponent from './LoadinComponent'

function Home() {
    const [smartSuggestion,setSmartSuggestion]=useState(true)
    const [quickLoan,setQuickLoan]=useState(false)
    const [financialReport,setFinancialReport]=useState(false)
    const [creditScore,setCreditScore]=useState(false)
    const [genReport,setGenReport]=useState(false)
    const[phoneNumber,setPhoneNumber]=useState('')
    const [login,setLogin]=useState(true)
    const [register,setRegister]=useState(false)
    const [suggestion,setSuggestion]=useState(null)
    const [requestLoanSuggestion,setRequestLoanSuggestion]=useState(null)
    const [amount,setAmount]=useState(0)
    const [lPhoneNumber,setLPhoneNumber]=useState(null)
    const [loading,setLoading]=useState({
      suggestion:false,
      loan:false
    })


    const [getMessage,{data,isLoading,isError,error,isSuccess}]=useGetMessageMutation()

    const dispatch=useDispatch()
    // const phone=useSelector(selectPhone)
    const phone=useState("+250783771485")


    const saveSuggestion = (value,key) => {
      setSuggestion(value)
      localStorage.setItem(key,value)
    }


    const deleteSuggestion = (value) => {
      setSuggestion(null)
      setRequestLoanSuggestion(null)
      localStorage.removeItem(value)
    }



    const handlePhoneInput=async(e)=>{
      setLoading({...loading,suggestion:true})
      e.preventDefault()
      // console.log("phone->",phoneNumber)
      // dispatch(setService({
      //   phone_number:phoneNumber
      // }))
      try {
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/transactions/analyze`,{
          phoneNumber:phoneNumber
        })
        console.log(response.data)
        setLoading({...loading,suggestion:false})
        saveSuggestion(response?.data?.analysis)

        // dispatch(setAnalyze(response?.data?.analysis))
      } catch (error) {
        console.log("error",error)
        setLoading({...loading,suggestion:false})
      }
    }

    const requestLoansuggestion=async(e)=>{
      setLoading({...loading,loan:true})
      e.preventDefault()
      try {
        
        let response=await axios.post(`${process.env.REACT_APP_API_URL}/transactions/request-loan`,{
          phoneNumber:lPhoneNumber,
          amount:amount
        })
        setLoading({...loading,loan:false})
        console.log("request loan response->",response.data)
        saveSuggestion(response?.data?.analysis,"suggestion-loan")
        setRequestLoanSuggestion(response?.data?.analysis)
      } catch (error) {
        setLoading({...loading,loan:false})
      }

    }

    const handleRequestLoan=async(e)=>{
      e.preventDefault()
      // console.log("phone->",phoneNumber)
      // dispatch(setService({
      //   phone_number:phoneNumber
      // }))
      try {
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/transactions/analyze`,{
          phoneNumber:phoneNumber
        })
        console.log(response.data)
        saveSuggestion(response?.data?.analysis,"suggestion")

        // dispatch(setAnalyze(response?.data?.analysis))
      } catch (error) {
        console.log("error",error)
      }
    }
    
    
  return (
    <div className="w-3/4 mx-auto py-10">
      {
        genReport &&(
          <PDFDownloadComponent 
            className="absolute top-[70%] right-[10%] w-[300px] mx-auto h-[150px] bg-slate-700 z-20 shadow-md"
            back={()=>{
              setGenReport(false)
            }} 
          />
        )
      }
      {
        phone!=="" ?(
          <div className={genReport ?'w-[80%] mx-auto':'w-[80%] mx-auto'}>
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
                        onClick={async()=>{
                          setFinancialReport(false)
                          setQuickLoan(false)
                          setSmartSuggestion(true)
                          if(suggestion){
                            deleteSuggestion("suggestion")
                          }
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
                          if(requestLoanSuggestion){
                            deleteSuggestion("suggestion-loan")
                            setRequestLoanSuggestion(null)
                          }
                          
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
                          if(suggestion){
                            deleteSuggestion("suggestion-loan")
                          }
                        }}
                        className={
                          financialReport ?
                          'text-white text-center bg-blue-600 capitalize w-[30%] py-3 rounded-3xl':
                          'text-white text-center cursor-pointer bg-gray-700 capitalize w-[30%] py-3 rounded-3xl'
                          }
                      >
                        advice financial report
                      </button>
                    </div>
                    <div className={suggestion?'w-full  bg-gray-800 p-8 rounded-md mt-10':'w-3/4 mx-auto bg-gray-800 py-16 rounded-md mt-10'}>
                      {
                        smartSuggestion ? (
                          <div className={suggestion ? 'w-full px-8':'w-2/4 mx-auto '}>
                            {
                              suggestion && <p className='text-white text-xl text-justify'>{suggestion}</p>
                            }
                            {!suggestion && 
                            <><input 

                              placeholder='+250783771485'
                              className='w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white'
                              onChange={(e)=>{
                                setPhoneNumber(e.target.value.trim())
                              }}
                              required
                            />
                            <button 
                              
                              onClick={handlePhoneInput}
                              className='w-full p-8 bg-blue-600 text-white text-center capitalize mt-5 rounded-md'
                            >
                              {loading.suggestion ? <LoadinComponent />:"get personalized insights"}
                              
                            </button></>}
                          </div>
                        ):quickLoan?(
                          <div className={requestLoanSuggestion ? 'w-full px-8':'w-2/4 mx-auto '}>
                            {
                              requestLoanSuggestion && <span className='text-white text-xl text-justify'>{requestLoanSuggestion}</span>
                            }
                            {
                              !requestLoanSuggestion&&<>
                                  <input 
                                    placeholder='Desired Loan amount'
                                    className='w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white'
                                    onChange={(e)=>setAmount(Number(e.target.value.trim()))}
                                    required
                                    type='number'
                                  />
                                  <input 
                                    placeholder='Phone Number'
                                    className='w-full py-3 outline-none indent-2 mt-5 bg-gray-600 rounded-md text-white'
                                    onChange={(e)=>setLPhoneNumber(e.target.value.trim())}
                                    required
                                  />
                                  <button 
                                    onClick={requestLoansuggestion}
                                    className='w-full py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md'
                                  >
                                    {loading.loan ? <LoadinComponent />:"apply for a loan"}
                                    
                                  </button>
                              </>
                            }
                            
                          </div>
                        ):financialReport ?(
                          <div className='w-2/4 mx-auto'>
                            <input 
                              placeholder='+250783771485'
                              className='w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white'
                              onChange={()=>{}}
                              required
                              type='text'
                            />
                            <button 
                              onClick={()=>{
                                setGenReport(true)
                              }}
                              className='w-full py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md'
                            >
                              generate financial report
                            </button>
                          </div>
                        ):(
                          <div className=''></div>
                        )
                      }
                    </div>
                  </>
                )
              }
        </div>
        ):(
          <div className='w-3/4 mx-auto bg-gray-800 pt-5 pb-10 rounded-md mt-10'>
            <div className='flex items-center justify-end gap-5 pr-10'>
                <span onClick={()=>{
                  setLogin(true)
                  setRegister(false)
                  
                }} className={login?'text-white w-1/6 text-center bg-blue-600 py-2 font-semibold':'text-white w-1/6 text-center py-2 font-semibold'}>Login</span>
                <span onClick={()=>{
                  setLogin(false)
                  setRegister(true)
                  
                }} className={register?'text-white w-1/6 text-center bg-blue-600 py-2 font-semibold':'text-white w-1/6 text-center py-2 font-semibold'}>Register</span>
            </div>
            {
              login ?(
                <div className='w-2/4 mx-auto mt-16'>
                  <input 
                    placeholder='+250783771485'
                    className='w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white'
                    onChange={()=>{}}
                    required
                    type='text'
                  />
                  <input 
                    placeholder='+250783771485'
                    className='w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white'
                    onChange={()=>{}}
                    required
                    type='text'
                  />
                  <button 
                    onClick={()=>{
                      setGenReport(true)
                    }}
                    className='w-1/3 mx-auto py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md'
                  >
                    login
                  </button>
                </div>
              ):(
                <div className='w-2/4 mx-auto mt-10'>
                  <input 
                    placeholder='business'
                    className='w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white'
                    onChange={()=>{}}
                    required
                    type='text'
                  />
                  <input 
                    placeholder='owner'
                    className='w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white'
                    onChange={()=>{}}
                    required
                    type='text'
                  />
                  <input 
                    placeholder='email'
                    className='w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white'
                    onChange={()=>{}}
                    required
                    type='text'
                  />
                  <input 
                    placeholder='Phone Number'
                    className='w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white'
                    onChange={()=>{}}
                    required
                    type='text'
                  />
                  <input 
                    placeholder='Password'
                    className='w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white'
                    onChange={()=>{}}
                    required
                    type='text'
                  />
                  <input 
                    placeholder='Confirm Password'
                    className='w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white'
                    onChange={()=>{}}
                    required
                    type='text'
                  />
                  <button 
                    onClick={()=>{
                      setGenReport(true)
                    }}
                    className='w-1/3 mx-auto py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md'
                  >
                    Register
                  </button>
                </div>
              )
            }
            
          </div>
        )
      }
      
      
    </div>
  )
}

export default Home