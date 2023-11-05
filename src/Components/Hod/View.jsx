import React, { useState, useEffect } from 'react'
import { useAuth } from '../Auth/AuthContext'
import u from "./m.png"
import f from "./f.png"
import { FiPhoneCall } from "react-icons/fi"
import { AiOutlineMail } from "react-icons/ai"
import axios from 'axios'
const View = () => {
    const { theme, cusername } = useAuth()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [dob, setdob] = useState("")
    const [gender, setgender] = useState("")
    const [dep, setdep] = useState("")
    const [im, setim] = useState(null)
    const id = localStorage.getItem("userid")
    const getUserData = async () => {
        try {
            console.log("Fetching user data for id:", id)
            const { data } = await axios.post(`https://vercel-zpzg.vercel.app/api/v3/user`, {
                id: id
            })
            console.log(data.user)
            setname(data.user.name)
            setemail(data.user.email)
            setphone(data.user.phone)
            setgender(data.user.gender)
            setdob(data.user.dob)
            console.log(data.user.gender)
            setdep(data.user.department.name)
            setim(data.user.gender === "Male" ? "Male" : "Female")


        } catch (error) {
            console.error("Error fetching user data:", error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (

        <div className={`${theme == "light" ? "bg-white" : ""} h-[91vh] overflow-y-auto  w-full`}>
            <div className='sm:p-7 mt-5 flex justify-center sm:justify-start'>
                <div className={`${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#5f7b8b] shadow-xl text-white"} h-[54vh] sm:h-[60vh] w-[90%] sm:w-[55%] p-5  rounded-2xl`}>
                    <section className='h-[18vh] flex justify-center'>
                        {gender === "Male" ? (
                            <img src={u} alt='' className='h-[15vh]' />
                        ) : gender === "Female" ? (
                            <img src={f} alt='' className='h-[15vh]' />
                        ) : (
                            <>
                            </>
                        )}
                    </section>

                    <h1 className={`font-bold text-lg my-2 ${theme == "light" ? "text-black" : "text-white"}`}>{name}  </h1>
                    <section className='flex gap-4 my-2'>
                        <h1 className={`font-bold text-md ${theme == "light" ? "text-black" : "text-white"} `}>{dob?.slice(0, 10)}</h1>
                        <h1 className={`${theme == "light" ? "text-black" : "text-white"} font-bold text-md`}>{gender}</h1>
                    </section>
                    <h1 className={`font-semibold text-sm sm:text-lg ${theme == "light" ? "text-black" : "text-white"}`}>HOD : {dep}</h1>
                    <section className='mt-2 sm:mt-5 flex'>
                        <section className={`h-[5vh] w-[5vh] flex justify-center items-center  rounded-full  ${theme == "light" ? "text-black" : "bg-[#1d232a] text-white "}`}>
                            <FiPhoneCall size={23} className='p-1' />

                        </section>
                        <h1 className={`font-bold px-2 text-lg mt-1 ${theme == "light" ? "text-black" : "text-white"}`}>{phone}</h1>
                    </section>
                    <section className='mt-1 sm:mt-5 flex'>
                        <section className={`h-[5vh] w-[5vh] flex justify-center items-center  rounded-full  ${theme == "light" ? "text-black" : "bg-[#1d232a] "}`}>
                            <AiOutlineMail size={23} className='p-1' />

                        </section>
                        <h1 className={`font-bold px-2 text-lg mt-1 ${theme == "light" ? "text-black" : "text-white"}`}>{email}</h1>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default View
