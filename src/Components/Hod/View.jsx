import React from 'react'
import { useAuth } from '../Auth/AuthContext'
import u from "./Manage/user.png"
import { FiPhoneCall } from "react-icons/fi"
import { AiOutlineMail } from "react-icons/ai"
const View = () => {
    const { theme, cusername } = useAuth()
    return (

        <div className={`${theme == "light" ? "bg-white" : "bg-[#0f1c2e]"} h-[91vh] overflow-y-auto  w-full`}>
            <div className='sm:p-7 mt-5 flex justify-center sm:justify-start'>
                <div className={`${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#5f7b8b] shadow-xl text-white"} h-[54vh] sm:h-[60vh] w-[90%] sm:w-[55%] p-5  rounded-2xl`}>
                    <section className='h-[18vh] flex justify-center ' >
                        <img src={u} alt=' ' className='h-[15vh] ' />
                    </section>
                    <h1 className={`font-bold text-lg my-2 ${theme == "light" ? "text-black" : "text-white"}`}>{cusername}</h1>
                    <section className='flex gap-4 my-2'>
                        <h1 className={`font-bold text-md ${theme == "light" ? "text-black" : "text-white"} `}>34 years</h1>
                        <h1 className={`${theme == "light" ? "text-black" : "text-white"} font-bold text-md`}>male</h1>
                    </section>
                    <h1 className={`font-semibold text-sm sm:text-lg ${theme == "light" ? "text-black" : "text-white"}`}>HOD : INFORMATION TECHNOLOGY</h1>
                    <section className='mt-2 sm:mt-5 flex'>
                        <section className={`h-[5vh] w-[5vh] flex justify-center items-center  rounded-full  ${theme == "light" ? "text-black" : "bg-[#1d232a] "}`}>
                            <FiPhoneCall size={23} className='p-1' />

                        </section>
                        <h1 className={`font-bold px-2 text-lg mt-1 ${theme == "light" ? "text-black" : "text-white"}`}>9309454285</h1>
                    </section>
                    <section className='mt-1 sm:mt-5 flex'>
                        <section className={`h-[5vh] w-[5vh] flex justify-center items-center  rounded-full  ${theme == "light" ? "text-black" : "bg-[#1d232a] "}`}>
                            <AiOutlineMail size={23} className='p-1' />

                        </section>
                        <h1 className={`font-bold px-2 text-lg mt-1 ${theme == "light" ? "text-black" : "text-white"}`}>yashaghane@gmail.com</h1>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default View
