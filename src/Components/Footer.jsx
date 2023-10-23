import React from 'react'
import { AiOutlineTwitter } from "react-icons/ai"
import { AiOutlineInstagram } from "react-icons/ai"
import { AiFillLinkedin } from "react-icons/ai"
import i from "../assets/ss.png"
import { useAuth } from './Auth/AuthContext'
const Footer = () => {
    const { theme } = useAuth()
    return (
        <div className={`${theme == "light" ? "bg-[#f5f1f0]" : " bg-[#0c131d]"} h-[20vh] w-full`}>
            <div className='flex justify-between items-center'>
                <section className='px-5 pt-5 flex  justify-center items-center'>
                    <section>
                        <h1 className='font-bold text-blue-700 mx-5 text-xl'>FeedBacker</h1>
                        <h1>All rights are reserved.</h1>
                        <section className="flex mt-7 gap-3">
                            <AiOutlineTwitter size={33} />
                            <AiOutlineInstagram size={33} />
                            <AiFillLinkedin size={33} />
                        </section>
                    </section>


                </section>
                <section className='px-5 sm:mt-2 mt-9'>
                    <img src={i} className='h-[12vh] rounded-full' />
                </section>
            </div>



        </div>
    )
}

export default Footer
