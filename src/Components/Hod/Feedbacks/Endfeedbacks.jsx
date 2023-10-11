import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import { BarLoader } from 'react-spinners'
import { AiOutlineEye } from "react-icons/ai"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Endfeedbacks = () => {
    const { theme } = useAuth()
    const [fbacks, setfbacks] = useState([]);
    const [dep, setdep] = useState("")
    const uid = localStorage.getItem("userid")
    const [loader, setloader] = useState(false)
    const navigate = useNavigate()
    console.log(uid)

    const getuser = async () => {
        setloader(true)
        try {
            setloader(true)

            const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v3/user`, {
                id: uid
            });
            console.log(data);
            setdep(data.user.department);
            getfbydep()
            setloader(false);

        } catch (error) {
        }
    }

    const getfbydep = async () => {
        setloader(true)
        console.log(dep)
        try {
            setloader(true)
            const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/ecfeedbackby", {
                dep: dep
            });
            console.log(data.feedback)
            setfbacks(data.feedback)
            setloader(false)
        } catch (error) {
        }
    }


    useEffect(() => {
        console.log("useEffect triggered");
        getuser();
    }, [uid]);

    useEffect(() => {
        if (dep) {
            getfbydep();
        }
    }, [dep]);



    return (
        <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto p-5 w-full`}>
            <h1 className={`text-xl font-bold ${theme == "light" ? "text-black" : "text-white"}`}>EndCourse FeedBack</h1>
            {loader ? <section className='h-[70vh] flex justify-center items-center'>
                <BarLoader size={23} color='blue' />
            </section> :
                <>
                    <div className={`py-3 sm:p-6 flex justify-center mt-5 ${theme == "light" ? "text-black" : "text-white"}`}>

                        <table className='border-collapse select-none w-[90%] '>
                            <thead>
                                <tr className=' bg-blue-700 '>
                                    <th className='p-2 py-2 text-left text-white text-lg hidden sm:block'>Index</th>
                                    <th className='p-2 text-left py-2 text-white text-lg'>Student</th>
                                    <th className='p-2 text-left py-2 text-white text-lg'>Enroll</th>
                                    {/* <th className='p-2 text-left py-2 text-white text-lg'>Student</th> */}
                                    <th className='p-2 text-left py-2 text-white text-lg'>Status</th>
                                </tr>
                            </thead>
                            <>

                                {fbacks.map((item, index) => {
                                    return (
                                        <tr className={`${theme == "light" ? "hover:bg-gray-300 " : "hover:bg-slate-950"}`} key={index}>
                                            <td className=' p-2 font-semibold text-left hidden sm:block text-sm'>{index + 1}</td>
                                            <td className=' p-2 font-semibold  cursor-pointer text-left' >{item.student?.name}</td>
                                            <td className=' p-2 font-semibold cursor-pointer text-left' >{item.student?.Enroll}</td>

                                            <td onClick={() => navigate(`/hod/ecmain/${item._id}`)} className=' p-2 font-semibold text-left flex cursor-pointer ' > View<AiOutlineEye size={23} className='mx-1 mt-1' /></td>
                                        </tr>
                                    )
                                }


                                )
                                }
                            </>


                        </table>
                    </div>
                </>}



        </div >
    )
}

export default Endfeedbacks
