import React from 'react'
import { useAuth } from './Auth/AuthContext'
import img from "../assets/aa.png"
const Dash = () => {
    const { theme } = useAuth()
    return (
        <div className={` ${theme == "light" ? "bg-white" : " bg-[#1d232a]"} flex sm:h-[100vh] h-[85vh]  flex-col-reverse sm:flex-row  p-5`}>

            <div className='w-[100%] sm:w-[55%] p-1 sm:p-5 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-xl  text-blue-600 sm:text-4xl py-2'>Analyzed Feedbacks</h1>
                <p className='font-semibold mt-2 '>Our dynamic dashboard offers a centralized space for quick access to key metrics, real-time updates,
                    and actionable insights, empowering you to manage courses and track feedback seamlessly.
                    Gain valuable insights at a glance with our intuitive dashboard. Monitor student progress, manage courses, and analyze feedback trends effortlessly for an enhanced user experience.
                </p>
            </div>   <div className='w-[100%] sm:w-[50%] h-[50vh] sm:h-[100vh] p-3 flex justify-center items-center'>
                <img src={img} className={`w-[100%] sm:w-[100%] h-[100%] sm:h-[70%]  ${theme == "light" ? "border-white" : " border-black"}`} />
            </div>
        </div>
    )
}

export default Dash
