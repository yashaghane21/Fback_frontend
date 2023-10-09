import React from 'react'
import img from "./react.svg"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext';

const Home = () => {
    const navigate = useNavigate();

    const { theme, cusername } = useAuth()
    

    return (
        <div className={`${theme == "light" ? "text-black" : "bg-[#1d232a] text-black"} h-[91vh] overflow-y-auto p-5 w-full`}>
            <section className='bg-blue-500 h-[12vh]  rounded-md'>
                <h1 className={`text-white text-2xl py-4 px-2 font-bold `}>Welcome {cusername}👏👏 </h1>
            </section>
            <div className='flex justify-center sm:justify-start items-center'>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   min-[600px]:grid-cols-1 '>
                <div onClick={() => navigate("/student/cof")} className={`h-[20vh]  mx-5  my-5 w-[40vh] sm:w-[48vh]   hover:shadow-md rounded-lg cursor-pointer ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <div className='flex justify-between items-center p-5 h-[15vh] '>
                            <p className='px-5 mt-2 font-bold text-xl '>Course Feedback</p>
                            <img src={img} alt='dd ' className='h-full w-full' />
                        </div>


                    </div>
                    <div onClick={() => navigate("/student/ecf")} className={`h-[20vh]  mx-5  my-5 w-[40vh] sm:w-[48vh]   hover:shadow-md rounded-lg cursor-pointer ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <div className='flex justify-between items-center p-5 h-[15vh] '>
                            <p className='px-5 mt-2 font-bold text-xl '>EndCourse Feedback</p>
                            <img src={img} alt='dd ' className='h-full w-full' />
                        </div>


                    </div>
                    <div onClick={() => navigate("/student/ecf")} className={`h-[20vh]  mx-5  my-5 w-[40vh] sm:w-[48vh]   hover:shadow-md rounded-lg cursor-pointer ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <div className='flex justify-between items-center p-5 h-[15vh] '>
                            <p className='px-5 mt-2 font-bold text-xl '>EndCourse Feedback</p>
                            <img src={img} alt='dd ' className='h-full w-full' />
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
