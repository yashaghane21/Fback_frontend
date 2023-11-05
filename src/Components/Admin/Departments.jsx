import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthContext'
import axios from 'axios'
import { BiRightArrow } from "react-icons/bi"
import { Navigate, useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const Departments = () => {
    const { theme } = useAuth()
    const [deps, setdeps] = useState([])
    const [loader, setloader] = useState(false)

    const alldepartments = async () => {
        try {
            setloader(true)
            const response = await axios.get("https://vercel-zpzg.vercel.app/api/v2/depsfback");
            console.log(response.data.responseData);
            setdeps(response.data.responseData);
            setloader(false)
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const navigate = useNavigate()
    useEffect(() => {
        alldepartments()
    }, [])
    return (
        <div className={`p-2 h-[91vh] overflow-y-auto  sm:p-5 ${theme == "light" ? "bg-white " : "bg-[#1d232a]"}`}>
            <h1 className={`p-2 font-bold text-xl ${theme == "light" ? "text-black" : "text-white"}`}>
                All Departments
            </h1>
            <div className='flex justify-center'>
                <div className={` ${theme == "light" ? "bg-[#f5f1f0]" : "bg-[#0c131d]"}   h-[70vh] mt-5 overflow-y-auto sm:w-[90%] w-[100%] pb-2 rounded-lg `}>


                    <table className='border-collapse w-[100%]  '>
                        <thead>
                            <tr className=' bg-blue-600 '>
                                <th className='p-2 py-2 text-left text-white text-lg hidden sm:block'>Index</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Courses</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Good</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Average</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Below average</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Action</th>
                            </tr>
                        </thead>
                        {loader ?
                            <tr className=' h-[60vh]'>
                                <td></td>
                                <td></td>
                                <td className='flex justify-center w-[100%] items-center h-[70vh]'>
                                    <BarLoader color='blue' />
                                </td>
                                <td></td>
                            </tr>
                            : <>

                                <tbody>
                                    {deps.map((item, index) => (
                                        <tr
                                            className={`${theme == "light" ? "hover:bg-gray-300 text-black " : "hover:bg-slate-950 text-white"}`}

                                        >
                                            <td className='p-2 font-semibold hidden sm:block text-left text-lg'>
                                                {index + 1}
                                            </td>
                                            <td className='p-3 font-semibold text-left text-lg'>
                                                {item.name}
                                            </td>
                                            <td className='p-3 font-bold text-lg text-green-700 text-left  '>
                                                {item?.good}
                                            </td>
                                            <td className='p-3 font-bold text-yellow-700 text-left text-lg'>
                                                {item?.average}
                                            </td>
                                            <td className='p-3 font-bold text-red-700 text-left  text-lg'>
                                                {item?.belowaverage}
                                            </td>
                                            <td className='p-3 font-bold  text-left  text-lg'>
                                                <BiRightArrow size={23} onClick={() => navigate(`/admin/pdata/${item.hod}`)} />
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>
                            </>}






                    </table>
                </div>

            </div>


        </div>
    )
}
export default Departments
