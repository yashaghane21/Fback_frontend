import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BiSolidDashboard, BiUserCircle } from 'react-icons/bi'
import { VscFeedback } from "react-icons/vsc"
import { toast } from "react-hot-toast"
import { useAuth } from '../Auth/AuthContext'
import { HiOutlineLogout } from "react-icons/hi"
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
export default function AdminDashB() {

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
        toast.success("Logout Succesfully ")
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
        if (!auth?.user?.role === 0) {
            navigate("/")
        }
        if (!auth?.user) {
            navigate("/")
        }
    }, [auth?.user?.token])

    return (
        <>

            <div className={`${theme == "light" ? "" : "bg-black"} w-[100%]      `}>


                <div onClick={handleNav} className='block sm:hidden absolute right-0 top-0 mt-5 m-2'>
                    {nav ? <AiOutlineClose size={20} className='text-black' /> : <AiOutlineMenu size={20} className='text-black' />}
                </div>



                <div className='flex flex-row bg-gray-100 '>
                    <div className={`${theme == "light" ? " bg-[#1e293b]" : "bg-[#1e293b]"} hidden md:block h-screen w-[1%] sm:w-[15%]  text-xl pl-2 pt-4`} >


                        <div className='flex flex-row ml-2'>
                            <h1 className='p-0  text-sm text-white cursor-none'> Student Dashboard</h1>
                        </div>
                        <div className='flex justify-start items-start'>
                            <ul className='mt-2  cursor-none' >
                                <Link to='/student/home'>
                                    <li className='text-white mt-4 font-semibold  hover:bg-[#6528F7] hover:border-2 flex px-7 text-sm rounded-md border-none cursor-pointer'><VscFeedback size={23} className=' pr-2 ' />Home</li>
                                </Link>
                                <Link to='/student/signup'>
                                    <li className='text-white mt-4 font-semibold  hover:bg-[#6528F7] hover:border-2 flex px-7 text-sm rounded-md border-none cursor-pointer'><VscFeedback size={23} className=' pr-2 ' />Feedback</li>
                                </Link>
                                <li onClick={handleLogOut} className='text-white w-max mt-[50vh]    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><HiOutlineLogout size={30} className=' pr-2 pb-2 ' />Log Out</li>

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
                        <div className='flex flex-row '>
                            <h1 className='mt-1 w-[20px] '>
                                <BiSolidDashboard size='23px' className='text-white' />
                            </h1>
                            <h1 className='p-0  text-white cursor-pointer'>Student Dashboard</h1>
                        </div>
                        <div className='flex flex-col text-xl  list-none'>
                            <ul className='mt-2  cursor-none'>
                                <Link to='/student/home'>
                                    <li className='text-white mt-4 font-semibold hover:bg-[#6528F7] hover:border-2 flex px-7 text-sm rounded-md border-none cursor-pointer'>
                                        <VscFeedback size={23} className='pr-2' />
                                        Home
                                    </li>
                                </Link>
                                <Link to='/student/signup'>
                                    <li className='text-white mt-4 font-semibold hover:bg-[#6528F7] hover:border-2 flex px-7 text-sm rounded-md border-none cursor-pointer'>
                                        <VscFeedback size={23} className='pr-2' />
                                        Feedback
                                    </li>
                                </Link>
                                <li onClick={handleLogOut} className='text-white w-max mt-[50vh]    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-9 text-sm text-center  rounded-md border-none cursor-pointer'><HiOutlineLogout size={30} className=' pr-2 pb-2 ' />Log Out</li>

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

                    <div className="w-full h-[50vh] sm:w-[90%] bg-[#f1f5f9]">
                        <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#1e293b]'} w-[100%] flex justify-between border-b-2 shadow-lg ml-0 h-[9vh] `}>

                            <section className="flex justify-center items-center ">
                                <h1 className={`text-center font-bold text-xl px-5 ${theme == "light" ? "text-black" : "text-white"}`}>STUDENT DASHBOARD</h1>
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