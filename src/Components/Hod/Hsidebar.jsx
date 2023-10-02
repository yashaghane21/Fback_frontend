import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BiSolidDashboard, BiUserCircle } from 'react-icons/bi'
// import { VscFeedback } from "react-icons/vsc"
import { toast } from "react-hot-toast";
import { VscFeedback } from "react-icons/vsc";
import { AiOutlineHome } from "react-icons/ai"
import { useAuth } from '../Auth/AuthContext'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { MdManageAccounts } from "react-icons/md"
import { PiStudent } from "react-icons/pi"
import { MdSubject } from "react-icons/md"
import { HiOutlineLogout } from "react-icons/hi"
export default function Hsidebar() {

    const { theme, setauth, settheme, auth } = useAuth()

    const [nav, setNav] = useState(false);
    const navigate = useNavigate()
    const handleNav = () => {
        setNav(!nav);
    };

    const handleLogOut = () => {
        setauth({
            user: null,
            token: "",
        })
        localStorage.removeItem("auth");
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
        navigate('/')
    }


    const handletheme = () => {
        if (theme == "light") {
            settheme("dark")
        }
        else {
            settheme("light")
        }
    }

    useEffect(() => {

        localStorage.setItem("theme", theme)
        const localtheme = localStorage.getItem("theme")
        document.querySelector('html').setAttribute("data-theme", localtheme)

    }, [auth?.user?.token])


    return (
        <>

            <div className={`${theme == "light" ? "" : ""} w-[100%]      `}>



                <div onClick={handleNav} className='block sm:hidden absolute right-0 top-0 mt-5 m-2'>
                    {nav ? <AiOutlineClose size={20} className={`${theme == "light" ? "text-black" : ""}`} /> : <AiOutlineMenu size={20} className={`${theme == "light" ? "text-black" : ""}`} />}
                </div>




                <div className='flex flex-row bg-gray-100 '>
                    <div className={`${theme == "light" ? " bg-[#1e293b]" : "bg-[#1e293b]"} hidden md:block h-screen w-[1%] sm:w-[15%]  text-xl pl-2 pt-4`} >


                        <div className='flex justify-center mt-0 items-center '>
                            {/* <h1 className='p-0  text-xl font-bold text-white cursor-none'> Hod Dashboard</h1> */}
                            <section className='h-[6vh] w-[6vh] border-2 rounded-full flex justify-center items-center hover:bg-slate-950 '>
                                <VscFeedback size={40} color='white' className='p-2 font-bold' />
                            </section>

                        </div>
                        <hr className='mt-1 font-bold'></hr>
                        <div className='flex justify-start  mt-8 items-start'>
                            <ul className='mt-4  cursor-none ' >
                                <Link to='/hod/home'>
                                    <li className='text-white w-max  my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><AiOutlineHome size={30} className=' pr-2 pb-2 ' />DashBoard</li>
                                </Link>
                                <Link to='/hod/sems'>
                                    <li className='text-white w-max  my-2   hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><VscFeedback size={30} className=' pr-2 pb-2 ' />FeedBacks</li>
                                </Link>
                                <Link to='/hod/teacher'>
                                    <li className='text-white w-max my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><MdManageAccounts size={30} className=' pr-2 pb-2 ' />Faculties</li>
                                </Link>
                                <Link to='/hod/students'>
                                    <li className='text-white w-max my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><PiStudent size={30} className=' pr-2 pb-2 ' />Students</li>
                                </Link>
                                <Link to='/hod/sub'>
                                    <li className='text-white w-max my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><MdSubject size={30} className=' pr-2 pb-2 ' />Subjects</li>
                                </Link>
                                <Link to='/hod/efb'>
                                    <li className='text-white w-max my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><MdSubject size={30} className=' pr-2 pb-2 ' />EndCourse Feedback</li>
                                </Link>
                                <li onClick={handleLogOut} className='text-white w-max mt-[40vh]    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><HiOutlineLogout size={30} className=' pr-2 pb-2 ' />Log Out</li>

                                < section className='mt-4  px-8 sm:hidden' >
                                    {theme == "light" ? <section className=' flex items-center' onClick={handletheme} size={30}>
                                        <h1 className=' text-black font-semibold'></h1> <MdDarkMode size={30} className=' text-white' />
                                    </section> : <section className=' flex items-center' onClick={handletheme} >
                                        <h1 className=' text-black font-semibold'></h1> <MdOutlineLightMode size={30} className=' text-white' />
                                    </section>
                                    }
                                </section>
                            </ul>



                        </div>
                    </div>




                    {/* Mobile Navbar is here */}

                    <div
                        className={`${theme === 'light' ? 'bg-[#1e293b]' : 'bg-[#1e293b]'
                            } ${nav ? 'fixed left-0 top-0 w-[30vh] h-full border-r bg-[#0C134F] ease-in-out duration-500 p-5 text-2xl z-40 md:hidden' : 'ease-in-out duration-500  fixed left-[-100%] md:hidden'
                            }`}
                        onClick={handleNav}
                    >
                        <div className='flex justify-center items-center '>
                            {/* <h1 className='p-0  text-xl font-bold text-white cursor-none'> Hod Dashboard</h1> */}
                            <section className='h-[7vh] w-[7vh] border-2 rounded-full flex justify-center items-center hover:bg-slate-950 '>
                                <VscFeedback size={40} color='white' className='p-2 font-bold' />
                            </section>

                        </div>
                        <hr></hr>
                        <div className='flex flex-col text-xl  list-none'>
                            <ul className='mt-4  cursor-none' >
                                <Link to='/hod/home'>
                                    <li className='text-white w-max  my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><AiOutlineHome size={30} className=' pr-2 pb-2 ' />DashBoard</li>
                                </Link>
                                <Link to='/hod/sems'>
                                    <li className='text-white w-max     hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><VscFeedback size={30} className=' pr-2 pb-2 ' />FeedBacks</li>
                                </Link>
                                <Link to='/hod/teacher'>
                                    <li className='text-white w-max my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><MdManageAccounts size={30} className=' pr-2 pb-2 ' />Faculties</li>
                                </Link>
                                <Link to='/hod/students'>
                                    <li className='text-white w-max my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><PiStudent size={30} className=' pr-2 pb-2 ' />Students</li>
                                </Link>
                                <Link to='/hod/sub'>
                                    <li className='text-white w-max my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><MdSubject size={30} className=' pr-2 pb-2 ' />Subjects</li>
                                </Link>
                                <Link to='/hod/efb'>
                                    <li className='text-white w-max my-2    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><MdSubject size={30} className=' pr-2 pb-2 ' />EndCourse Feedback</li>
                                </Link>
                                < section className='mt-4  px-8 sm:hidden' >
                                    {theme == "light" ? <section className=' flex items-center' onClick={handletheme} size={30}>
                                        <h1 className=' text-black font-semibold'></h1> <MdDarkMode size={30} className=' text-white' />
                                    </section> : <section className=' flex items-center' onClick={handletheme} >
                                        <h1 className=' text-black font-semibold'></h1> <MdOutlineLightMode size={30} className=' text-white' />
                                    </section>
                                    }
                                </section>
                                <li onClick={handleLogOut} className='text-white w-max mt-[40vh]    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><HiOutlineLogout size={30} className=' pr-2 pb-2 ' />Log Out</li>


                            </ul>
                        </div>
                    </div>

                    <div className="w-full h-[50vh] sm:w-[90%] bg-[#f1f5f9]">
                        <div className={`${theme === 'light' ? 'bg-ehite' : 'bg-[#1e293b]'} w-[100%] flex justify-between border-b-2 shadow-lg ml-0 h-[9vh] `}>

                            <section className="flex justify-center items-center ">
                                <h1 className={`text-center font-bold text-xl px-5 ${theme == "light" ? "text-black" : "text-white"}`}>HOD DASHBOARD</h1>
                            </section>
                            <section>
                                < section className='mt-4  px-8 hidden sm:block' >
                                    {theme == "light" ? <section className=' flex items-center' onClick={handletheme} size={30}>
                                        <h1 className=' text-black font-semibold'></h1> <MdDarkMode size={30} className={`${theme == "light" ? "" : "text-black"}`} />
                                    </section> : <section className=' flex items-center' onClick={handletheme} >
                                        <h1 className=' text-black font-semibold'></h1> <MdOutlineLightMode size={30} className=' text-white' />
                                    </section>
                                    }
                                </section>
                            </section>

                        </div>
                        <Outlet />
                    </div>




                </div>
            </div>
        </>
    )
}