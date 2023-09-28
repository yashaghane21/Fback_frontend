import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import axios from 'axios'
import { BarLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { AiOutlineAlignRight, AiOutlineArrowRight } from 'react-icons/ai'

const Sems = () => {
    const { auth } = useAuth()
    const navigate = useNavigate()
    const { theme } = useAuth()
    const [dept, setdept] = useState("")
    const [sems, setsems] = useState([])
    const id = localStorage.getItem("userid")
    const [loader, setloader] = useState(false)
    const getdepid = async () => {
        const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v3/user`,{
            id:id
        })
        console.log(data)
        console.log(data.user.department)
        setdept(data.user.department)
    }


    const getsems = async () => {
        setloader(true)
        console.log(dept)
        const response = await axios.get(`https://f-backend-7g5y.onrender.com/api/v2/sems/${dept}`)
        console.log(response.data.sems)
        setsems(response.data.sems)
        setloader(false)
    }

    useEffect(() => {
        getdepid()
    }, [id])

    useEffect(() => {
        getsems()
    }, [dept])
    return (
        <div className={`${theme == "light" ? " bg-white text-black" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto p-5 w-full`}>
            <section>
                <h1 className={`font-bold text-2xl ${theme == "light" ? "text-black" : "text-white"}`}>FEEDBACKS</h1>
            </section>
            <div className='flex justify-center items-center w-full  sm:justify-start'>
                {loader ? <section className='flex justify-center w-full items-center h-[100vh]'>
                    <section className=' '><BarLoader size={23} color='blue' className='w-full' /></section>
                </section> :
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   min-[600px]:grid-cols-1 p-5'>
                        {sems.map((item, index) =>
                            <div className={`h-[27vh] my-5 shadow-xl rounded-md w-[40vh]  mx-5  ${theme == "light" ? "bg-white" : "bg-[#0c131d]"}`} key={index} onClick={() => navigate(`/hod/fpage/${item._id}`)}>
                                <h1 className={`text-center  font-bold p-5 mt-7 text-4xl ${theme == "light" ? "" : "text-white"}`}>{item.name}</h1>
                                <h1 className={`text-center sm:p-2 sm:pl-4  font-bold flex mx-10 px-2  text-xl ${theme == "light" ? "" : "text-white"}`}>View FeedBacks <AiOutlineArrowRight size={28} color='blue' className='mx-2' />   </h1>
                                <h1 className={` font-bold   text-xl ${theme == "light" ? "" : "text-white"}`}>   </h1>
                            </div>
                        )}
                    </div>

                }

            </div>
        </div>
    )
}

export default Sems

