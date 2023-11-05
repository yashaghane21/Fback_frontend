import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BiSolidDashboard } from 'react-icons/bi'
import { VscFeedback } from "react-icons/vsc"
import { useAuth } from '../Auth/AuthContext'
import { toast } from "react-hot-toast"
import { HiOutlineLogout } from "react-icons/hi"
import { AiOutlineHome } from "react-icons/ai"
import { BsCalendarCheck } from "react-icons/bs"
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { FaWpforms } from "react-icons/fa"
import { FcDepartment } from "react-icons/fc"

export default function AdminDashB() {
    const { theme, auth, setauth, settheme } = useAuth()
    const navigate = useNavigate()

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? ' border-l-4 border-blue-700' : '';
    };


    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const handletheme = () => {
        if (theme == "light") {
            settheme("dark")
        }
        else {
            settheme("light")
        }
    }

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

    useEffect(() => {

        localStorage.setItem("theme", theme)
        const localtheme = localStorage.getItem("theme")
        document.querySelector('html').setAttribute("data-theme", localtheme)

        const authData = JSON.parse(localStorage.getItem("auth"));
        if (!authData || !authData.user || authData.user.role !== 2) {
            if (window.location.pathname !== '/') {
                navigate("/");
                toast.error("Unauthorized access");
            }
        }
    }, [])
    return (
        <>

            <div className={`${theme == "light" ? "" : ""} w-[100%]      `}>


                <div onClick={handleNav} className='block sm:hidden absolute right-0 top-0 mt-5 m-2'>
                    {nav ? <AiOutlineClose size={20} className='text-white' /> : <AiOutlineMenu size={20} className='text-white' />}
                </div>



                <div className='flex flex-row bg-gray-100 '>
                    <div className={` border-r-[0.5px] ${theme == "light" ? " bg-[#1d232a]" : "bg-[#1d232a]"} hidden md:block h-screen w-[100%] sm:w-[20%]  text-xl pl-2 pt-4`} >


                        <div className='flex justify-center mt-0 items-center '>
                            {/* <h1 className='p-0  text-xl font-bold text-white cursor-none'> Hod Dashboard</h1> */}
                            <section className='h-[6vh] w-[6vh] border-2 rounded-full flex justify-center items-center hover:bg-slate-950 '>
                                <VscFeedback size={40} color='white' className='p-2 font-bold' />
                            </section>

                        </div>
                        <hr className='mt-1 font-bold'></hr>
                        <div className='flex justify-start w-[50%]   mt-8 '>
                            <ul className='mt-4  cursor-pointer px-8 ' >
                                <Link to='/admin/adash'>
                                    <li className={`text-white w-[180px]  my-4    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-3 text-[16px]   rounded-md  cursor-pointer'  ${isActive("/admin/adash")}`}><FaWpforms size={35} className=' pr-2 pb-2 ' />Dashboard</li>
                                </Link>
                                <Link to='/admin/dept'>
                                    <li className={`text-white my-4    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex  text-[16px] px-3 w-[180px]  rounded-md  cursor-pointer  ${isActive("/admin/dept")}`}><FcDepartment size={40} color="white" className=' pr-2 pb-2 ' />Departments</li>
                                </Link>
                                <Link to='/admin/cform'>
                                    <li className={`text-white w-[180px]  my-4    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-3 text-[16px]   rounded-md  cursor-pointer'  ${isActive("/admin/cform")}`}><FaWpforms size={35} className=' pr-2 pb-2 ' />Course Form</li>
                                </Link>

                                <Link to='/admin/ecf'>
                                    <li className={`text-white   my-4 w-[180px]  hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex  text-[16px]  px-3   rounded-md cursor-pointer  ${isActive("/admin/ecf")}`}><VscFeedback size={35} className=' pr-2 pb-2 ' />EndCourse</li>
                                </Link>

                                <Link to='/admin/manage'>
                                    <li className={`text-white my-4    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex  text-[16px] px-3 w-[180px]  rounded-md  cursor-pointer  ${isActive("/admin/manage")}`}><BsCalendarCheck size={35} className=' pr-2 pb-2 ' />Manage</li>
                                </Link>




                                <li onClick={handleLogOut} className='text-white w-[180px] px-3 mt-[30vh]    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex  text-[18px] text-center  rounded-md cursor-pointer'><HiOutlineLogout size={35} className=' pr-2 pb-2 ' />Log Out</li>

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
                        className={`${theme === 'light' ? 'bg-[#1d232a]' : 'bg-[#1d232a]'
                            } ${nav ? 'fixed left-0 top-0 w-[100%] h-full border-r bg-[#0C134F] ease-in-out duration-500 p-5 text-2xl z-40 md:hidden' : 'ease-in-out duration-500  fixed left-[-100%] md:hidden'
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
                                <Link to='/admin/adash'>
                                    <li className={`text-white w-[180px]  my-4    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-3 text-[16px]   rounded-md  cursor-pointer'  ${isActive("/admin/adash")}`}><FaWpforms size={35} className=' pr-2 pb-2 ' />Dashboard</li>
                                </Link>
                                <Link to='/admin/dept'>
                                    <li className={`text-white my-4    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex  text-[16px] px-3 w-[180px]  rounded-md  cursor-pointer  ${isActive("/admin/dept")}`}><FcDepartment size={40} color="white" className=' pr-2 pb-2 ' />Departments</li>
                                </Link>
                                <Link to='/admin/cform'>
                                    <li className={`text-white w-[180px]  my-4    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex px-3 text-[16px]   rounded-md  cursor-pointer'  ${isActive("/admin/cform")}`}><FaWpforms size={35} className=' pr-2 pb-2 ' />Course Form</li>
                                </Link>

                                <Link to='/admin/ecf'>
                                    <li className={`text-white   my-4 w-[180px]  hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex  text-[16px]  px-3   rounded-md cursor-pointer  ${isActive("/admin/ecf")}`}><VscFeedback size={35} className=' pr-2 pb-2 ' />EndCourse</li>
                                </Link>

                                <Link to='/admin/manage'>
                                    <li className={`text-white my-4    hover:rounded-md  font-semibold  hover:bg-[#6528F7]  flex  text-[16px] px-3 w-[180px]  rounded-md  cursor-pointer  ${isActive("/admin/manage")}`}><BsCalendarCheck size={35} className=' pr-2 pb-2 ' />Manage</li>
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
                    {/* bg-[#1e293b] */}
                    <div className=" h-[50vh] w-[100%] bg-[#f1f5f9]">
                        <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#1d232a]'} w-[100%] flex justify-between border-b-2 shadow-lg ml-0 h-[9vh] `}>

                            <section className="flex justify-center items-center ">
                                <h1 className={`text-center font-bold text-xl px-5 ${theme == "light" ? "text-black" : "text-white"}`}>PRINCIPAL DASHBOARD</h1>
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