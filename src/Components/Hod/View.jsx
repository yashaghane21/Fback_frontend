import React from 'react'
import { useAuth } from '../Auth/AuthContext'
import u from "./Manage/user.png"
const View = () => {
    const { theme } = useAuth()
    return (

        <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto  w-full`}>
            <h1 className='font-bold p-2 text-xl'>Profile</h1>
            <div className='sm:p-4  font-bold text-xl flex  flex-col justify-center items-center w-[100%]'>

                <section className='flex justify-center items-center mt-10  h-[20vh] w-[100%] sm:w-full'>
                    <img src={u} className='h-[20vh] ' alt='' />

                </section>

            </div>
            <section className='w-full h-[10vh] flex justify-center items-center px-5 bg-slate-950 rounded-lg'>

            </section>
        </div>
    )
}

export default View
