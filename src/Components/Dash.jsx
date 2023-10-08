import React from 'react'
import { useAuth } from './Auth/AuthContext'
import img from "../assets/s.jpg"
const Dash = () => {
    const { theme } = useAuth()
    return (
        <div className={` ${theme == "light" ? "bg-[#f5f1f0]" : " bg-[#0c131d]"} flex h-[85vh] flex-col-reverse sm:flex-row  p-5`}>
            <div className='w-[100%] sm:w-[50%] p-3 flex justify-center items-center'>
                <img src={img} className='w-[80%] h-[80%]' />
            </div>
            <div className='w-[100%] sm:w-[55%] p-2 sm:p-5 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-xl  text-blue-600 sm:text-xl'> Dedicated dashboards to users and admin</h1>
                <p className='font-semibold  px-2'>Our dynamic dashboard offers a centralized space for quick access to key metrics, real-time updates,
                    and actionable insights, empowering you to manage courses and track feedback seamlessly.
                    Gain valuable insights at a glance with our intuitive dashboard. Monitor student progress, manage courses, and analyze feedback trends effortlessly for an enhanced user experience.
                </p>
                <button className='px-5 mt-8 py-[0.5px] border-[1px]  hover:text-white hover:bg-blue-700 rounded-2xl'>Dashboard</button>
            </div>
        </div>
    )
}

export default Dash
