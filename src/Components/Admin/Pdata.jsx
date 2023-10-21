import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { useAuth } from "../Auth/AuthContext"
import a from "./1.png"
import b from "./2.png"
import c from "./3.png"
import Mpie from "../Hod/Charts/Mpie"
import Pie from "../Hod/Charts/PIe"
import Bar from "../Hod/Charts/Bar"
import { useParams } from 'react-router-dom'
import Spie from './Graphs/Spie'

const Pdata = () => {
    const { theme, cusername } = useAuth()
    const [feedbackData, setFeedbackData] = useState({ tfeedbacks: 0 });
    const [totalgood, setTotalGood] = useState(0);
    const [totalaverage, settotalaverage] = useState(0)
    const [totalBelowaverage, settotalBelowaverage] = useState(0)
    const [dep, setdep] = useState("")
    const [fbacks, setfbacks] = useState("")
    const id = useParams()
    console.log(id.id)
    const [type, settype] = useState("good😃")
    const [sems, setsems] = useState([])
    const date = new Date().getFullYear();
    const cyear = date;

    const [year, setyear] = useState(cyear)
    let values = ['good😃', 'average🙂', 'below average🙂'];
    const currentYear = new Date().getFullYear();
    const pastYears = 3;
    const futureYears = 10;
    const years = [];

    for (let i = -pastYears; i <= futureYears; i++) {
        years.push(String(currentYear + i));
    }
    const [ts, setts] = useState("")
    const [tf, settf] = useState("")
    const [tt, sett] = useState("")
    const [uid, setuid] = useState(id)
    const def = "6527f14233a29f8db1e31de1"
    const [pyear, setpyear] = useState(cyear)
    const [psem, setpsem] = useState(def)

    const user = async () => {
        const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v3/user`, {
            id: id.id
        })
        console.log(data)
        console.log("useert", data.user.department)
        setdep(data.user.department._id)
        getdata();
    }
    const getdata = async () => {
        const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/getdata", {
            dep: dep
        });
        console.log("fgfg", data)
        setts(data.totalstudents)
        settf(data.tfeedbacks)
        sett(data.tteacher)
    }
    const getsems = async () => {
        console.log(dep)
        const response = await axios.get(`https://f-backend-7g5y.onrender.com/api/v2/sems/${dep}`)
        console.log("ssss", response.data.sems)
        setsems(response.data.sems)
    }

    const fdata = async () => {
        const { data } = await axios.get("https://f-backend-7g5y.onrender.com/api/v2/countf")
        setFeedbackData(data)
        console.log(data)

        const response = await axios.get(`https://f-backend-7g5y.onrender.com/api/v2/countsA/64dbc5db25871abf6b82b2e4`)
        console.log(response)
        setfbacks(response.data)
    }



    useEffect(() => {
        user();
        fdata();
        setuid(id)
    }, [id]);

    useEffect(() => {
        if (dep) {
            getdata();
            getsems();
        }
    }, [dep]);

    return (


        <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto   w-[100%]`}>
            <section className='rounded-md  px-7 mt-4'>
                <h1 className={`  text-center sm:text-left text-xl sm:text-2xl px-2 font-bold ${theme == "light" ? "text-black" : "text-white"}`}>Welcome , 👏👏 </h1>
            </section>

            <div className='flex justify-center items-center w-[100%] sm:pl-5  '>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-[715px]:justify-items-center justify-items-center sm:justify-items-start p-5  w-[100%] '>
                    <div className={`h-[18vh] w-[90%] sm:w-[80%]  rounded-2xl shadow-md ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <section className='flex justify-between px-5'>
                            <section className='py-5'>
                                <h1 className='font-bold text-blue-700 text-2xl'>{ts}</h1>
                                <h1 className={`font-bold text-xl ${theme == "light" ? "text-black" : "text-white"}`}>Students Enrolled</h1>


                            </section>

                            <section className='flex justify-center items-center'>
                                <img src={a} alt='' className='h-[18vh] w-[20vh] p-2' />
                            </section>


                        </section>

                    </div>

                    <div className={`h-[18vh] w-[90%] sm:w-[80%]    rounded-2xl shadow-md ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <section className='flex justify-between px-5'>
                            <section className='py-5'>
                                <h1 className='font-bold text-blue-700 text-2xl'>{tf}</h1>
                                <h1 className={`font-bold text-xl ${theme == "light" ? "text-black" : "text-white"}`}>Feeedback Submitted</h1>

                            </section>

                            <section className='flex justify-center items-center'>
                                <img src={b} alt='' className='h-[18vh] w-[20vh] p-2' />
                            </section>


                        </section>

                    </div>
                    <div className={`h-[18vh] w-[90%] sm:w-[80%]   rounded-2xl shadow-md ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <section className='flex justify-between px-5'>
                            <section className='py-5'>
                                <h1 className='font-bold text-blue-700 text-2xl'>{tt}</h1>
                                <h1 className={`font-bold text-xl ${theme == "light" ? "text-black" : "text-white"}`}>Teachers</h1>


                            </section>

                            <section className='flex justify-center items-center'>
                                <img src={c} alt='' className='h-[18vh] w-[20vh] p-2' />
                            </section>


                        </section>

                    </div>
                </div>
            </div>
            {/* 
            // <div className='flex justify-center'>
            //     <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   min-[600px]:grid-cols-1 mt-10'>
            //         <div className={`h-[30vh] w-[40vh] bg-[#0c131d]    text-white my-5 sm:mx-5  rounded-md shadow-md p-2 ${theme == "light" ? "bg-white" : "bg-[#0c131d]"} `}>
            //             <FeedbackChart feedbackData={feedbackData} />


            //         </div>
            //         <div className={`h-[40vh] sm:h-[30vh] my-5 sm:mx-5 w-[40vh] rounded-md p-1 shadow-md ${theme == "light" ? "bg-white" : "bg-[#0c131d]"}`}>
            //             <PIe totalgood={totalgood} totalaverage={totalaverage} totalBelowaverage={totalBelowaverage} />
            //         </div>
            //         <div className={`h-[40vh] sm:h-[30vh] my-5 sm:mx-5 w-[40vh] rounded-md p-1 shadow-md ${theme == "light" ? "bg-white" : "bg-[#0c131d]"}`}>
            //             <PIe totalgood={totalgood} totalaverage={totalaverage} totalBelowaverage={totalBelowaverage} />
            //         </div>

            //     </div>
            // </div> */}
            <div className='sm:px-5 p-2 flex justify-center items-center sm:flex-row flex-col-reverse' >
                <div className='flex justify-center items-center sm:justify-start sm:px-5'>
                    <div className='w-[100%] my-5  sm:my-0 sm:w-[30%] ' >
                        <div className={`h-[50vh]  w-[55vh]  rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"} `} >
                            <section className='flex px-7'>
                                <select onChange={(e) => setpyear(e.target.value)} className={`px-5 my-5 rounded-2xl text-left mx-5 '  ${theme == "light" ? " bg-[#f5f1f0]" : "bg-[#0c131d] border-[1px]  text-white"}`}>
                                    <option>{year}</option>
                                    {years.map((y) => (

                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                                <select placeholder='Select sem' onChange={(e) => setpsem(e.target.value)} className={`px-5 my-5 rounded-2xl text-left mx-5 '  ${theme == "light" ? " bg-[#f5f1f0]" : "bg-[#0c131d] border-[1px]  text-white"}`}>

                                    {sems.map((y) => (

                                        <option key={y} value={y._id}>{y.name}</option>
                                    ))}
                                </select>
                            </section>
                            <Bar sem={psem} year={pyear} />
                        </div>

                    </div>
                </div>
                <div className='w-[100%] sm:w-[70%] p-2 flex justify-center items-center'>
                    <section className='hidden sm:block'>
                        <div className={`h-[50vh]  sm:w-[95%] flex flex-col  justify-center items-center   w-[90vh] sm:mr-[10vh]  rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`} v>
                            <section className=''>
                                {/* <h1 className={`font-bold text-xl   ${theme == "light" ? " text-black" : " text-white"}`}>Good Feedbacks</h1> */}
                                <select onChange={(e) => setyear(e.target.value)} className={`px-5 rounded-2xl text-left mx-5 '  ${theme == "light" ? " bg-[#f5f1f0]" : "bg-[#0c131d] border-[1px]  text-white"}`}>
                                    <option>{year}</option>
                                    {years.map((y) => (

                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                                <select onChange={(e) => settype(e.target.value)} className={`px-5 my-2 rounded-2xl text-left mx-5 '  ${theme == "light" ? " bg-[#f5f1f0]" : "bg-[#0c131d] border-[1px]  text-white"}`}>
                                    {values.map((item, index) => (
                                        <option key={index} value={item}>
                                            <h1 className='font-semibold'>{item}</h1>
                                        </option>
                                    ))}
                                </select>
                            </section>

                            <Spie year={year} type={type} uid={uid} />
                        </div>
                    </section>

                    <section className='block sm:hidden'>
                        <div className={`h-[50vh] flex flex-col justify-center items-center  w-[50vh] rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`} v>
                            <select onChange={(e) => setyear(e.target.value)} className={`px-5 rounded-2xl text-left mx-5 '  ${theme == "light" ? " bg-[#f5f1f0]" : "bg-[#0c131d] border-[1px]  text-white"}`}>
                                <option>{year}</option>
                                {years.map((y) => (

                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                            <select onChange={(e) => settype(e.target.value)} className={`px-5 my-2 rounded-2xl text-left mx-5 '  ${theme == "light" ? " bg-[#f5f1f0]" : "bg-[#0c131d] border-[1px]  text-white"}`}>
                                {values.map((item, index) => (
                                    <option key={index} value={item}>
                                        <h1 className='font-semibold'>{item}</h1>
                                    </option>
                                ))}
                            </select>
                            <Mpie year={year} type={type} />
                        </div>

                    </section>
                </div>
            </div>

        </div >
    )
}

export default Pdata
