

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiOutlinePrinter } from "react-icons/ai"
import moment from 'moment';
import { BarLoader } from 'react-spinners';

const Mainf = () => {

    const { theme } = useAuth();
    const [fbacks, setfbacks] = useState([])
    const [loader, setloader] = useState(false)
    const id = useParams()

    const getf = async () => {
        setloader(true)
        const { data } = await axios.get(` https://vercel-zpzg.vercel.app/api/v2/fback/${id.id}`)
        console.log(data)
        setfbacks(data.fback)
        setloader(false)
    }
    useEffect(() => {
        getf()
    }, [])
    return (
        <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh]  overflow-y-auto `}>
            <section className={`flex flex-col select-none sm:flex-row sm:justify-between ${theme == "light" ? "text-black" : "text-white"}`}>
                <span>
                    <h1 className='font-semibold px-5 py-2'> <span className='text-blue-700'>Subject </span>  :-{fbacks.course?.name} </h1>
                    <h1 className='font-semibold px-5 py-2'> <span className='text-blue-700'>Student   </span>  :-{fbacks.student?.name} </h1>
                </span>
                <span>
                    <h1 className='font-semibold px-5 py-2'> <span className='text-blue-700'>Enrollment</span>  :-{fbacks.student?.Enroll} </h1>
                    <h1 className='font-semibold px-5 py-2'> {moment(fbacks.timestamp).format('MMMM Do YYYY, h:mm:ss a')} </h1>
                    <AiOutlinePrinter size={40} color='blue' className="mx-5 mt-2" onClick={() => window.print()} />
                </span>

            </section>
            {loader ? <section className='flex justify-center items-center h-[50vh]'>
                <BarLoader color='blue' />
            </section> :
                <div className='p-5'>
                    {fbacks.feedback?.map((item, index) => (
                        <section className={`h-[13vh] w-full my-5 select-none  rounded-lg shadow-2xl flex sm:justify-between flex-row ${theme == "light" ? "bg-white text-black shadow-lg" : "bg-[#0c131d] text-white shadow-md"}`} key={index} >
                            <span className='flex justify-center  items-center px-2 font-semibold'>
                                <h1 className=''>{index + 1}) {item.question?.question}</h1>
                            </span>
                            <span className='flex justify-center font-semibold items-center px-2'>
                                <h1 className='px-5'>{item.answer}</h1>
                            </span>
                        </section>

                    ))}

                    {/* <button className='bg-blue-700 px-3 font-semibold text-center py-1 rounded-lg  text-white' onClick={() => window.print()}>Print</button> */}
                </div>
            }

        </div>
    )
}

export default Mainf
