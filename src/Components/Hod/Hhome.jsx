import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import PIe from "../Hod/Charts/PIe"
import FeedbackChart from './Charts/FeedbackChart'
import { useAuth } from '../Auth/AuthContext'
import a from "./1.png"
import b from "./2.png"
import c from "./3.png"

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

    const qdata = async () => {
        const { data } = await axios.get(` https://f-backend-7g5y.onrender.com/api/v2/feedbackby/${dep}`)
        console.log("aditya", data)
        setTotalGood(data.totalgood)
        settotalaverage(data.feedback.totalaverage)
    }

    const user = async () => {
        const { data } = await axios.get(`https://f-backend-7g5y.onrender.com/api/v3/user/${id}`)
        console.log(data)
        console.log("useert", data.user.department)
        setdep(data.user.department)
    }
    useEffect(() => {
        fdata()
        user()
        qdata()
        getdata()
    }, [])
    return (


        <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto  w-full`}>
            <section className='bg-blue-500 h-[12vh] rounded-md m-5'>
                <h1 className={`text-white text-xl sm:text-2xl py-4 px-2 font-bold `}>Welcome , {cusername} 👏👏 </h1>
            </section>

            <div className='flex justify-center items-center '>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 min-[600px]:grid-cols-1 p-2 sm:p-5 '>
                    <div className={`h-[20vh] w-[40vh] sm:w-[50vh] mx-5 my-5  rounded-lg shadow-md ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <section className='flex justify-between px-5'>
                            <section className='py-5'>
                                <h1 className='font-bold text-blue-700 text-2xl'>{ts}+</h1>
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
                                <h1 className='font-bold text-blue-700 text-2xl'>{tf}+</h1>
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
                                <h1 className='font-bold text-blue-700 text-2xl'>{tt}+</h1>
                                <h1 className={`font-bold text-xl ${theme == "light" ? "text-black" : "text-white"}`}>Teachers</h1>


                            </section>

                            <section className='flex justify-center items-center'>
                                <img src={c} alt='' className='h-[18vh] w-[20vh] p-2' />
                            </section>


                        </section>

                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   min-[600px]:grid-cols-1 mt-10'>
                    <div className={`h-[30vh] w-[40vh] bg-[#0c131d]    text-white my-5 sm:mx-5  rounded-md shadow-md p-2 ${theme == "light" ? "bg-white" : "bg-[#0c131d]"} `}>
                        <FeedbackChart feedbackData={feedbackData} />


                    </div>
                    <div className={`h-[40vh] sm:h-[30vh] my-5 sm:mx-5 w-[40vh] rounded-md p-1 shadow-md ${theme == "light" ? "bg-white" : "bg-[#0c131d]"}`}>
                        <PIe totalgood={totalgood} totalaverage={totalaverage} totalBelowaverage={totalBelowaverage} />
                    </div>
                    <div className={`h-[40vh] sm:h-[30vh] my-5 sm:mx-5 w-[40vh] rounded-md p-1 shadow-md ${theme == "light" ? "bg-white" : "bg-[#0c131d]"}`}>
                        <PIe totalgood={totalgood} totalaverage={totalaverage} totalBelowaverage={totalBelowaverage} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Hhome
