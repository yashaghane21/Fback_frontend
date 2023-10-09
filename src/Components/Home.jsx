import React from 'react'
import img from "../assets/yy.png"
import { BiUserCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext'
import { TypeAnimation } from 'react-type-animation';

const Home = () => {

    const { theme, auth } = useAuth()
    const navigate = useNavigate()
    return (
        <div>
            <section className={`${theme == "light" ? "bg-[#f1f5f9]" : "bg-[#1d232a]"} hidden sm:block p-6 font-bold  w-full justify-center items-center `}>
                <ul className='flex absolute   sm:right-36'>

                    <li>
                        {!auth?.user ? (
                            <>
                                <div className={`flex items-center font-bold `}>
                                    <button className={`mx-2 border-[1px]  text-sm py-[0.5px] hover:bg-blue-600 hover:text-white  rounded-full px-3 text-white' ${theme == "light" ? " text-black border-black" : "text-white border-white "} `} onClick={() => navigate("/login")}> Login</button>
                                    <button className={`mx-2 border-[1px] border-black  text-sm py-[0.5px] hover:bg-blue-600 hover:text-white  rounded-full px-3 text-white' ${theme == "light" ? " text-black border-black" : "text-white border-white"} `} onClick={() => navigate("/signup")}>Signup</button>
                                </div>
                            </>
                        ) : (
                            <>
                                {auth?.user?.role === 1 ? (
                                    <div className='flex flex-row cursor-pointer' onClick={() => navigate('/hod')} >
                                        <li className=' ml-0 flex' >
                                            <BiUserCircle size={23} className='text-blue-700 mt-2' />
                                            <li className='mx-2 font-bold mt-2 items-center  hover:border-b-4 border-blue-700' >Hod</li>
                                        </li>
                                    </div>
                                ) : (
                                    <>
                                        {auth.user?.role === 2 ? (
                                            <div className='flex flex-row cursor-pointer' onClick={() => navigate('/Admin')} >
                                                <li className='mx-2 font-bold mt-2 items-center  hover:border-b-2' >Principal</li>
                                                <li className=' ml-0' >
                                                    <BiUserCircle size={23} className='text-blue-700' />
                                                </li>
                                            </div>
                                        ) : (
                                            <div className="flex flex-row">

                                                <li className="cursor-pointer flex group-hover:underline-offset-1 " >

                                                    <Link className='mx-2 font-bold mt-2 hover:border-b-2 border-blue-700' to='/student ' >{auth?.user?.name}</Link>
                                                    <BiUserCircle size={23} className="text-blue-700 mt-2" onClick={() => navigate('/student')} />
                                                </li>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </li>
                </ul>
            </section>
            <div className={`${theme == "light" ? "bg-[#f1f5f9]" : "bg-[#1d232a]"} flex flex-col sm:flex-row h-screen `}>
                <div className='h-[50vh] w-full sm:h-[70vh] sm:w-[43%] flex flex-col  justify-center  items-start p-5 '>




                    <p className={`${theme == "light" ? "" : "text-white"}`}>
                        <h1 className={`font-bold text-2xl mt-2 sm:text-5xl`}> Website is under development please ignore </h1>
                      <TypeAnimation
                            sequence={[

                                ' Better Student Experiences ',
                                1000,
                                ' Continuous Improvement',
                                1000,
                                ' Building Trust',
                                1000,
                                ' More Engagement    ',
                                1000
                            ]}
                            wrapper="span"
                            speed={100}
                            style={{ fontSize: ' 2rem', display: 'inline-block', paddingLeft: "5px" }}
                            repeat={Infinity}
                        />
                    </p>
                    {/* <button className='bg-blue-700 rounded-md text-white  px-4 py-1 mt-5 '>Get Started </button> */}

                </div>
                <div className='w-full sm:w-[50%] flex justify-center p-2 mt-5'>
                    <img src={img} alt='' className='h-[25vh] sm:h-[70vh] w-full  ' />

                </div>

            </div>
        </div>

    )
}

export default Home
