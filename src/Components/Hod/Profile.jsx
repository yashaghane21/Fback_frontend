import React from 'react'
import { useAuth } from '../Auth/AuthContext'
import { BiEditAlt } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
const Profile = () => {
    const { theme } = useAuth()
    const location = useLocation();
    const navigate = useNavigate()

    const isActive = (path) => {
        return location.pathname === path ? 'border-b-4 border-blue-700' : '';
    };

    const disActive = (path) => {
        return location.pathname === path ? 'border-l-2 border-blue-700' : '';
    };
    return (
        <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto  w-full`}>
            <div className='flex flex-row'>
                <div className={`w-[27%] h-[91vh] border-r-2 hidden sm:block ${theme == "light" ? "bg-white" : "bg-[#1d232a]"}`}>
                    <ul className='font-bold p-2   '>
                        <li onClick={() => navigate("/hod/profile/view")} className={`${disActive("/hod/profile/view")} w-[250px] my-2 flex py-1 px-2 hover:bg-blue-600 rounded-lg `}> <CgProfile className='flex mt-1 mx-4' />View profile </li>
                        <li onClick={() => navigate("/hod/profile/edit")} className={`${disActive("/hod/profile/edit")} w-[250px] my-2 flex py-1 px-2 hover:bg-blue-600  rounded-lg`}> <BiEditAlt className='flex mt-1 mx-4' />Edit profile </li>

                    </ul>
                </div>
                <div className='flex flex-col'>
                    <div className=' sm:hidden h-[2vh] mt-5 p-2'>
                        <ul className='flex font-bold w-[100%]'>
                            <li onClick={() => navigate("/hod/profile/view")} className={`px-2 flex  ${isActive("/hod/profile/view")}`}>View </li>
                            <li onClick={() => navigate("/hod/profile/edit")} className={`flex px-2  ${isActive("/hod/profile/edit")}`}> Edit </li>
                        </ul>
                    </div>
                </div>

                <div className='flex sm:w-[100%] w-[40%]  mt-[10vh] sm:mt-0'>
                    <Outlet />
                </div>
            </div>



        </div >
    )
}

export default Profile
