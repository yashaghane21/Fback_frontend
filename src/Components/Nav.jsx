import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
import { BiUserCircle } from 'react-icons/bi';
import { useAuth } from './Auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { HiOutlineLogout } from "react-icons/hi"

export default function Nav() {
    const [nav, setnav] = useState(false);
    const navigate = useNavigate();
    const { theme, settheme, auth, setauth } = useAuth()

    const handle = () => {
        setnav(!nav);
    }

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
    }, [theme])


    return (
        <div className=''>
            <div className='flex justify-between items-center px-4 py-4 shadow-lg'>
                <section>
                    <h1 className='mx-2 font-bold text-md sm:text-2xl text-blue-700 cursor-pointer flex'>
                        <VscFeedback size={23} className='mr-2 sm:mt-2 mt-1' />
                        FEED<span className='text-gray-500'>BACKER</span>
                    </h1>
                </section>
                <section onClick={handle} className='sm:hidden'>
                    {nav ? <GiCancel size={23} /> : <GiHamburgerMenu size={23} />}
                </section>

                <ul className='hidden md:flex items-center cursor-pointer'>
                    <li className='mx-2 font-bold text-lg hover:border-b-2 border-blue-700 ' onClick={() => navigate("/")}>Home</li>
                    <li className='mx-3 font-bold text-lg hover:border-b-2 border-blue-700 '>Contact</li>
                    <li className='mx-2 font-bold text-lg hover:border-b-2 border-blue-700 ' onClick={() => navigate("/about")}>About</li>

                    <li className='block '> {!auth?.user ? (
                        <>
                            <div className='flex  justify-center items-center font-bold '>
                                <button className={`mx-2 border-[1px]  cursor-pointer text-lg py-[0.5px] hover:bg-blue-600  hover:text-white  rounded-full px-5 text-white' ${theme == "light" ? " text-black hover:border-blue-700  border-black" : "text-white  hover:border-blue-700 "} `} onClick={() => navigate("/login")}> Login</button>
                                <button className={`mx-2 border-[1px] cursor-pointer   text-lg  py-[0.5px] hover:bg-blue-600 hover:text-white  rounded-full px-4 text-white' ${theme == "light" ? " text-black hover:border-blue-700 border-black " : "text-white hover:border-blue-700 "} `} onClick={() => navigate("/signup")}>Signup</button>                            </div>
                        </>
                    ) : (
                        <>
                            {auth?.user?.role === 1 ? (
                                <div className='flex flex-row cursor-pointer' onClick={() => navigate('/hod')} >
                                    <li className='mx-2 font-bold text-lg hover:border-b-2 border-blue-700 mt-[7px] items-center' >Hod</li>
                                    <li className=' ml-0' >
                                        <BiUserCircle size={40} className='text-blue-700' />
                                    </li>
                                </div>
                            ) : (
                                <>
                                    {auth.user?.role === 2 ? (
                                        <div className='flex flex-row cursor-pointer' onClick={() => navigate('/Admin')} >
                                            <li className='mx-2 font-bold text-lg hover:border-b-2 border-blue-700  mt-2 items-center' >Principal</li>
                                            <li className=' ml-0' >
                                                <BiUserCircle size={40} className='text-blue-700' />
                                            </li>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row">
                                            <Link className='mx-2 font-bold text-lg hover:border-b-2 border-blue-700 mt-2'  >{auth?.user?.name}</Link>
                                            <li className="cursor-pointer" >
                                                <BiUserCircle size={40} className="text-blue-700"  />
                                            </li>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}</li>
                    <li className='mx-2 my-1 font-semibold hover:border-b-2 '>
                        < section >
                            {theme == "light" ? <section className=' flex items-center' onClick={handletheme} size={30}>
                                <h1 className=' text-black font-semibold'></h1> <MdDarkMode size={23} className=' text-black' />
                            </section> : <section className=' flex items-center' onClick={handletheme} >
                                <h1 className=' text-black font-semibold'></h1> <MdOutlineLightMode size={23} className=' text-white' />
                            </section>
                            }
                        </section>
                    </li>

                </ul>
            </div>

            <section className='  sm:hidden '>
                <ul className={`bg-gray-300 flex flex-col absolute left-0 h-screen shadow-sm ${nav ? 'w-[90%] sm:w-17' : "w-0 overflow-hidden"} transition-all ease-linear duration-200`}>
                    <li className='mx-2 text-black my-1 font-semibold hover:border-b-2 border-black inline' onClick={() => navigate("/")}>Home</li>
                    <li className='mx-2 text-black my-1 font-semibold hover:border-b-2 border-black inline'>Contact</li>
                    <li className='mx-2 text-black my-1 font-semibold hover:border-b-2 border-black inline' onClick={() => navigate("/about")}>About</li>
                    <li className='mx-2 text-black my-1 font-semibold hover:border-b-2 '>
                        < section >
                            {theme == "light" ? <section className=' flex items-center' onClick={handletheme} size={30}>
                                <h1 className=' text-black font-semibold'>Dark Mode</h1> <MdDarkMode size={30} className='text-black' />
                            </section> : <section className=' flex items-center' onClick={handletheme} >
                                <h1 className=' text-black font-semibold'>Light Mode</h1> <MdOutlineLightMode size={30} className=' text-white' />
                            </section>
                            }
                        </section>
                    </li>
                    {!auth?.user ? (
                        <>
                            <div className='flex items-center font-bold'>
                                <button className='mx-2 bg-blue-700 py-0.5 rounded-md px-2 text-sm text-white' onClick={() => navigate("/login")}> Login</button>
                                <button className='mx-2 bg-blue-700 py-0.5 text-sm rounded-md px-2 text-white' onClick={() => navigate("/signup")}>Signup</button>
                            </div>
                        </>
                    ) : (
                        <>
                            {auth?.user?.role === 1 ? (
                                <div className='flex flex-row cursor-pointer' onClick={() => navigate('/hod')} >
                                    <li className='mx-2 font-bold mt-2 text-black items-center' >Hod</li>
                                    <li className=' ml-0' >
                                        <BiUserCircle size={40} className='text-green-700' />
                                    </li>
                                </div>
                            ) : (
                                <>
                                    {auth.user?.role === 2 ? (
                                        <div className='flex flex-row cursor-pointer' onClick={() => navigate('/Admin')} >
                                            <li className='mx-2 font-bold mt-2 items-center text-black' >Principal</li>
                                            <li className=' ml-0' >
                                                <BiUserCircle size={40} className='text-green-700' />
                                            </li>
                                        </div>
                                    ) : (

                                        <>
                                            <section className='flex h-[30vh] font-bold'>
                                                <li className="cursor-pointer flex group-hover:underline-offset-1">
                                                    <Link className='mx-2 mt-2 text-black hover:border-b-2 border-blue-700' to='/cof'>Course Feedback</Link>
                                                </li>
                                                <li className="cursor-pointer flex group-hover:underline-offset-1">
                                                    <Link className='mx-2 mt-2 text-black hover:border-b-2 border-blue-700' to='/ecf'>EC Feedback</Link>
                                                </li>
                                                <li onClick={handleLogOut} className={`${theme == "light" ? "" : "text-white"}  flex mt-2 text-black hover:border-b-2 border-blue-700`}>
                                                    <HiOutlineLogout size={27} className='pr-2 mt-1 pb-2' />

                                                </li>
                                            </section>

                                        </>

                                    )}
                                </>
                            )}
                        </>
                    )}
                </ul>
            </section>
        </div>
    )
}
