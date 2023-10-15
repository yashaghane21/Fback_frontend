import React from 'react'
import { useAuth } from './Auth/AuthContext'
import img from "../assets/qq.png"
const Dash = () => {
    const { theme } = useAuth()
    return (
        <div className={` ${theme == "light" ? "bg-[#f5f1f0]" : " bg-[#0c131d]"} flex sm:h-[100vh] h-[85vh]  flex-col-reverse sm:flex-row  p-5`}>
            <div className='w-[100%] sm:w-[50%] h-[50vh] sm:h-[100vh] p-3 flex justify-center items-center'>
                <img src={img} className='w-[80%] sm:w-[90%] h-[50%] border-2 border-black rounded-2xl sm:h-[50%]' />
            </div>
            <div className='w-[100%] sm:w-[55%] p-2 sm:p-5 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-xl  text-blue-600 sm:text-4xl'>Analyzed Feedbacks</h1>
                <p className='font-semibold mt-2 px-2'>Our dynamic dashboard offers a centralized space for quick access to key metrics, real-time updates,
                    and actionable insights, empowering you to manage courses and track feedback seamlessly.
                    Gain valuable insights at a glance with our intuitive dashboard. Monitor student progress, manage courses, and analyze feedback trends effortlessly for an enhanced user experience.
                </p>
            </div>
        </div>
    )
}

export default Dash
