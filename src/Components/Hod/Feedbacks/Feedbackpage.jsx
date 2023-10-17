import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import axios from 'axios'
import { AiOutlineEye } from "react-icons/ai"
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import Bar from "../Charts/Bar"
import { CgProfile } from "react-icons/cg"
import { BiSearch } from "react-icons/bi"
const Feedbackpage = () => {

    const { theme } = useAuth()
    const id = useParams()
    const [fback, setfback] = useState([])
    const [sub, setsub] = useState([])
    const [subid, setsubid] = useState("")
    const [loader, setloader] = useState(false)
    const [ploader, setploader] = useState(false)
    const [student, setstudent] = useState([])
    const uid = localStorage.getItem("userid")
    // const [sid, setsid] = useState("")
    const currentYear = new Date().getFullYear();
    const pastYears = 3;
    const futureYears = 10;
    const years = [];

    for (let i = -pastYears; i <= futureYears; i++) {
        years.push(String(currentYear + i));
    }
    const navigate = useNavigate()

    const feedbacks = async () => {
        setloader(true)
        const { data } = await axios.get(`https://f-backend-7g5y.onrender.com/api/v2/feedback/${id.id}`)
        console.log(data)
        setfback(data.feedback)
        setloader(false)
    }

    const getbyyear = async (year) => {
        setloader(true)


        const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/fbacksemyr", {
            sem: id.id,
            year: year
        })
        console.log(data)
        setfback(data.feedback)
        setloader(false);

    }





    const getbysub = async (subject) => {
        setloader(true)
        setsubid(subject)
        console.log(subject);

        const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/feedbacksub", {
            sub: subject
        })
        console.log(data)
        setfback(data.feedback)
        setloader(false)
            ;
    }


    const subjects = async () => {
        try {
            console.log(id)
            const response = await axios.post("https://f-backend-7g5y.onrender.com/api/v3/subjectsq", {
                sem: id.id
            })

            console.log("uuuu", response.data.subjects)
            setsub(response.data.subjects)

        } catch (error) {
            console.error(error)
        }

    }

    const getuser = async (sid) => {
        try {
            setploader(true);
            window.my_modal_1.showModal()
            // console.log("ghfjhvjh", sid);
            const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v3/user`, {
                id: sid
            });
            window.my_modal_1.showModal()
            setstudent(data.user);
            setploader(false);
            console.log(data);
        } catch (error) {

        }
    }


    useEffect(() => {
        feedbacks()
        subjects()
        console.log(id)
    }, [uid])
    return (
        <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto p-5 w-full`}>

            <div className='overflow-x-auto   '>
                <ul className='flex  w-full cursor-pointer select-none'>
                    <li className='  bg-white text-black  border-[1px] border-black rounded-md px-3 font-bold' onClick={feedbacks}>All</li>


                    <select className={` border-[2px] rounded-lg mx-2 ${theme == "light" ? "bg-white" : "bg-white "}`} onChange={(e) => getbysub(e.target.value)}>
                        <option className='text-black'>Filter By Subject </option>
                        {sub.map((item, index) => (
                            // <li className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-bold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} value={item._id} onClick={() => getbysub(item._id)}
                            //     key={index}>{item.name}</li>]
                            <option value={item._id} className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-semibold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} >{item.name} </option>
                        ))}
                    </select>

                    <select className={` border-[2px] rounded-lg mx-2 ${theme == "light" ? "bg-white" : "bg-white "}`} onChange={(e) => getbyyear(e.target.value)}>
                        <option>Filter By Year </option>
                        {years.map((item, index) => (
                            // <li className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-bold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} value={item._id} onClick={() => getbysub(item._id)}
                            //     key={index}>{item.name}</li>]
                            <option value={item} className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-semibold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} >{item} </option>
                        ))}
                    </select>

                </ul>

            </div>
            <section className='p-2 flex sm:justify-end mt-5 justify-center'>
                <form className='sm:w-[28%] w-[100%]  relative' action="" >
                    <input type='text' placeholder='Search  ' className={`rounded-full px-5 p-2 w-[100%] ${theme == "light" ? "bg-white border-b-2  text-black" : "bg-[#0c131d]"}`}
                    />
                    <span className="absolute flex justify-center left-[70px] top-3">
                        <BiSearch  className='mb-2' size={20}/>
                    </span>
                </form>
            </section>
            <div className='flex '>
                <div className={` ${theme == "light" ? "bg-[#f5f1f0]" : "bg-[#0c131d]"}  h-[100%] mt-5 overflow-y-auto w-[100%] pb-2 rounded-lg `}>


                    <table className='border-collapse w-[100%] '>
                        <thead>
                            <tr className=' bg-blue-600 '>
                                <th className='p-2 py-2 text-left text-white text-lg hidden sm:block'>Index</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Course</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Enroll</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Student</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Status</th>
                            </tr>
                        </thead>
                        {loader ? (
                            <tr className=' h-[60vh]'>
                                <td></td>
                                <td></td>
                                <td className='flex justify-center items-center h-[70vh]'>
                                    <BarLoader color='blue' />
                                </td>
                                <td></td>
                            </tr>
                        ) : fback.length === 0 ? (
                            <tr className=' h-[50vh] w-full'>
                                <td className=' w-24'></td>
                                <td className=' w-70'></td>
                                <td className=' w-48 font-bold text-center'>No Feedbacks found</td>
                                <td className=' w-44'></td>
                            </tr>
                        ) : (
                            fback.map((item, index) => (
                                <tr
                                    className={`${theme == "light" ? "hover:bg-gray-300 text-black " : "hover:bg-slate-950 text-white"}`}
                                    key={index}
                                >
                                    <td className='p-2 font-semibold text-left hidden sm:block text-sm'>
                                        {index + 1}
                                    </td>
                                    <td className='p-2 font-semibold text-left text-blue-600'>
                                        {item.course?.name}
                                    </td>
                                    <td
                                        className='p-2 font-semibold text-left cursor-pointer'
                                        onClick={() => getuser(item.student._id)}
                                    >
                                        {item.student?.Enroll}
                                    </td>
                                    <td
                                        className='p-2 font-semibold cursor-pointer text-left'
                                        onClick={() => getuser(item.student._id)}
                                    >
                                        {item.student?.name}
                                    </td>
                                    <td
                                        className='p-2 font-semibold text-left flex cursor-pointer'
                                        onClick={() => navigate(`/hod/mainf/${item._id}`)}
                                    >
                                        View<AiOutlineEye size={23} className='mx-1 mt-1' />
                                    </td>
                                </tr>
                            ))
                        )}



                    </table>


                    <dialog id="my_modal_1" className="modal">
                        <form method='dialog' className={`modal-box ${theme == "dark" ? " text-white bg-[#1d232a]" : " bg-white text-black "}`}>
                            <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                            {ploader ?
                                <section className='flex justify-center items-center h-[20vh]'>
                                    <section className=' '><BarLoader size={23} color='blue' /></section>
                                </section>

                                : <>
                                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-black" : ""}`}>✕</button>
                                    <div className={`${theme == "dark" ? " focus:outline-none border-none text-white " : ""}`}>
                                        <section className='flex justify-center items-center'>
                                            <CgProfile size={80} color='blue ' />

                                        </section>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Name</h1>
                                        <h1 className='font-semibold text-sm my-1'>{student.name}</h1>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Email</h1>
                                        <h1 className='my-2 font-semibold'>{student.email}</h1>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Enroll</h1>
                                        <h1 className='my-2 font-semibold'>{student.Enroll}</h1>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Mobile</h1>
                                        <h1 className='my-2 font-semibold'>{student.phone}</h1>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Semester</h1>
                                        <h1 className='my-2 font-semibold'>{student.sem?.name}</h1>
                                        <hr></hr>
                                    </div>
                                </>

                            }

                        </form>


                    </dialog>
                </div>
                <div>
                    <div className='w-[100%]  hidden sm:block  sm:my-0 sm:w-[100%] pl-5 ' >
                        <div className={`h-[45vh] flex justify-center items-center w-[50vh] mt-5 rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"} `} >
                            <Bar />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Feedbackpage
