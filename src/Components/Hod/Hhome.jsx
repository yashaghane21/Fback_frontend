import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import FeedbackChart from './Charts/FeedbackChart'
import { useAuth } from '../Auth/AuthContext'
import a from "./1.png"
import b from "./2.png"
import c from "./3.png"
import Mpie from './Charts/Mpie'
import Pie from "./Charts/PIe"

const Hhome = () => {
    const { theme, cusername } = useAuth()
    const [feedbackData, setFeedbackData] = useState({ tfeedbacks: 0 });
    const [totalgood, setTotalGood] = useState(0);
    const [totalaverage, settotalaverage] = useState(0)
    const [totalBelowaverage, settotalBelowaverage] = useState(0)
    const [dep, setdep] = useState("")
    const [fbacks, setfbacks] = useState("")
    const id = localStorage.getItem("userid")


    const [ts, setts] = useState("")
    const [tf, settf] = useState("")
    const [tt, sett] = useState("")

    const getdata = async () => {
        const { data } = await axios.get("https://f-backend-7g5y.onrender.com/api/v2/getdata");
        console.log(data)
        setts(data.totalstudents)
        settf(data.tfeedbacks)
        sett(data.tteacher)
    }
    const fdata = async () => {
        const { data } = await axios.get("https://f-backend-7g5y.onrender.com/api/v2/countf")
        setFeedbackData(data)
        console.log(data)

        const response = await axios.get(`https://f-backend-7g5y.onrender.com/api/v2/countsA/64dbc5db25871abf6b82b2e4`)
        console.log(response)
        setfbacks(response.data)
    }



    const user = async () => {
        const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v3/user`, {
            id: id
        })
        console.log(data)
        console.log("useert", data.user.department)
        setdep(data.user.department)
    }
    useEffect(() => {
        fdata();
        user();
        getdata();
    }, [])


    return (


        <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto   w-full`}>
            <section className='bg-blue-500 h-[12vh] rounded-md m-5'>
                <h1 className={`text-white text-xl sm:text-2xl py-4 px-2 font-bold `}>Welcome , {cusername} 👏👏 </h1>
            </section>

            <div className='flex justify-center items-center sm:justify-start '>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 min-[600px]:grid-cols-1 p-2 sm:p-5 '>
                    <div className={`h-[20vh] w-[40vh] sm:w-[50vh] mx-5 my-5  rounded-lg shadow-md ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <section className='flex justify-between px-5'>
                            <section className='py-5'>
                                <h1 className='font-bold text-blue-700 text-2xl'>{ts}</h1>
                                <h1 className={`font-bold text-xl ${theme == "light" ? "text-black" : "text-white"}`}>Students Enrolled</h1>


                            </section>

                            <section className='flex justify-center items-center'>
                                <img src={a} alt='' className='h-[18vh] w-[20vh] p-2' />
                            </section>


                        </section>

                    </div>

                    <div className={`h-[20vh] w-[40vh] sm:w-[50vh] mx-5 my-5  rounded-lg shadow-md ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <section className='flex justify-between px-5'>
                            <section className='py-5'>
                                <h1 className='font-bold text-blue-700 text-2xl'>{tf}</h1>
                                <h1 className={`font-bold text-xl ${theme == "light" ? "text-black" : "text-white"}`}>Feeedback Submitted</h1>

                            </section>

                            <section className='flex justify-center items-center'>
                                <img src={b} alt='' className='h-[18vh] w-[20vh] p-2' />
                            </section>


                        </section>

                    </div>
                    <div className={`h-[20vh] w-[40vh] sm:w-[50vh] mx-5 my-5  rounded-lg shadow-md ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <section className='flex justify-between px-5'>
                            <section className='py-5'>
                                <h1 className='font-bold text-blue-700 text-2xl'>{tt}</h1>
                                <h1 className={`font-bold text-xl ${theme == "light" ? "text-black" : "text-white"}`}>Teachers</h1>


                            </section>

                            <section className='flex justify-center items-center'>
                                <img src={c} alt='' className='h-[18vh] w-[20vh] p-2' />
                            </section>


                        </section>

                    </div>
                </div>
            </div>
            {/* 
            // <div className='flex justify-center'>
            //     <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   min-[600px]:grid-cols-1 mt-10'>
            //         <div className={`h-[30vh] w-[40vh] bg-[#0c131d]    text-white my-5 sm:mx-5  rounded-md shadow-md p-2 ${theme == "light" ? "bg-white" : "bg-[#0c131d]"} `}>
            //             <FeedbackChart feedbackData={feedbackData} />


            //         </div>
            //         <div className={`h-[40vh] sm:h-[30vh] my-5 sm:mx-5 w-[40vh] rounded-md p-1 shadow-md ${theme == "light" ? "bg-white" : "bg-[#0c131d]"}`}>
            //             <PIe totalgood={totalgood} totalaverage={totalaverage} totalBelowaverage={totalBelowaverage} />
            //         </div>
            //         <div className={`h-[40vh] sm:h-[30vh] my-5 sm:mx-5 w-[40vh] rounded-md p-1 shadow-md ${theme == "light" ? "bg-white" : "bg-[#0c131d]"}`}>
            //             <PIe totalgood={totalgood} totalaverage={totalaverage} totalBelowaverage={totalBelowaverage} />
            //         </div>

            //     </div>
            // </div> */}

            <div className='sm:px-5 p-2 flex justify-center items-center sm:flex-row flex-col-reverse' >
                <div className='flex justify-center items-center sm:justify-start sm:px-5'>
                    <div className='w-[100%] my-5  sm:my-0 sm:w-[30%] ' >
                        <div className={`h-[30vh]  w-[50vh]  rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"} `} >
                            <FeedbackChart feedbackData={feedbackData} />
                        </div>
                        <div className={`h-[18vh] my-2  w-[50vh]  rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                            <section className='flex w-full h-[100%] '>
                                <section className='p-5 w-[50%] h-full '>
                                    <h1 className='font-bold text-xl'>Xyz</h1>
                                    <h1 className='font-bold over text-green-700'>Xyzqwer erfwerfewt  wetfewtrtgerg g</h1>
                                </section>
                                <section className='flex justify-center items-center  rounded-2xl w-[50%]'>
                                    <button className='px-5 py-2 border-green-700  shadow-sm shadow-green-700 border-[1px] rounded-lg '>ABCD</button>
                                </section>
                            </section>

                        </div>
                    </div>
                </div>
                <div className='w-[100%] sm:w-[70%] p-2 flex justify-center items-center'>
                    <section className='hidden sm:block'>
                        <div className={`h-[50vh]  sm:w-[95%] flex flex-col justify-center items-center  w-[90vh] sm:mr-[10vh]  rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`} v>
                            <h1 className={`font-bold text-xl  text-left  ${theme == "light" ? " text-black" : " text-white"}`}>Good Feedbacks</h1>

                            <Pie />
                        </div>
                    </section>

                    <section className='block sm:hidden'>
                        <div className={`h-[50vh] flex justify-center items-center  w-[50vh] rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`} v>

                            <Mpie />
                        </div>

                    </section>
                </div>
            </div>

        </div>
    )
}

export default Hhome
