import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthContext'
import axios from "axios"
import Cpie from './Graphs/Cpie'
import Cbar from './Graphs/Cbar'
import Qbar from './Graphs/Qbar'
import Ecpie from './Graphs/Ecpie'
import lottie from 'lottie-web';
import animationData from "./ec.json"
const Hadmin = () => {
    const { theme, cusername } = useAuth()
    const [departments, setdepartments] = useState([]);
    const d = "64dbc27b25871abf6b82b27c"
    const [dep, setdep] = useState(d)
    const [edep, setedep] = useState(d)

    const date = new Date().getFullYear();
    const yr2 = date - 1
    const yr3 = date - 2
    console.log(yr3)
    const [y1, sety1] = useState(date)
    const [y2, sety2] = useState(yr2)
    const [y3, sety3] = useState(yr3)


    console.log(yr3)
    const alldepartments = async () => {
        try {
            const response = await axios.get("https://f-backend-7g5y.onrender.com/api/v1/department");
            console.log(response.data.departments);
            setdepartments(response.data.departments);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    useEffect(() => {
        alldepartments()
        const anim = lottie.loadAnimation({
            container: document.getElementById('lottie-container'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
        });
        return () => anim.destroy();
    }, [])
    return (
        <div className={`p-2 h-[91vh] overflow-y-auto  sm:p-5 ${theme == "light" ? "bg-white " : "bg-[#1d232a]"}`}>
            <section className='rounded-md  px-7 mt-4'>
                <h1 className={`  text-center sm:mx-7 sm:text-left text-xl sm:text-2xl px-2 font-bold ${theme == "light" ? "text-black" : "text-white"}`}>Welcome , {cusername}  👏👏 </h1>
            </section>

            <div className='w-[100%] h-[150vh] sm:[100vh] mt-5  p-2 flex  justify-center  flex-col sm:flex-row gap-5'>

                <div className=' flex flex-col h-[150vh] gap-5 sm:[70vh] sm:w-[90%]'>
                    <div className={`h-[160vh] sm:h-[65vh]  sm:w-[95%] •    rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`} >
                        <section className='flex flex-col sm:flex-row sm:justify-between'>

                            <select onChange={(e) => setdep(e.target.value)} className={` px-1 h-[4vh] w-[50%]  mx-2 my-2 rounded-lg ${theme == "light" ? " bg-[#f5f1f0] border-[1px] border-black text-black" : "bg-[#0c131d] border-[1px]  text-white"}`}>
                                {departments.map((item, index) => (
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                            <h1 className={`p-2 font-bold text-center text-xl px-5 ${theme == "light" ? "text-black" : "text-white"}`}>Department Feedback</h1>
                        </section>


                        <section className='flex flex-col justify-center items-center sm:flex-row pl-5 '>

                            <Cpie dept={dep} />


                            <section className=''>
                                <Cbar y1={y1} y2={y2} y3={y3} dep={dep} />
                            </section>

                        </section>





                    </div>

                    <section className={` h-[130vh] sm:h-[65vh]  w-[100%] flex flex-col  sm:fllex-row rounded-2xl mt-5 sm:w-[95%] ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"}`}>
                        <section className='flex justify-between flex-col sm:flex-row'>
                            <select onChange={(e) => setedep(e.target.value)} className={` px-2 h-[4vh] w-[50%]  mx-2 my-2 rounded-lg ${theme == "light" ? " bg-[#f5f1f0] border-[1px] border-black text-black" : "bg-[#0c131d] border-[1px]  text-white"}`}>
                                {departments.map((item, index) => (
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                            <h1 className={`font-bold text-xl px-5 ${theme == "light" ? "text-black" : "text-white"}`}>EndCourse Feedack</h1>
                        </section>

                        <section className='flex pl-5 justify-center flex-col sm:flex-row '>

                            <Ecpie dept={edep} />


                            <section className=''>
                                <div id="lottie-container" style={{ width: '300px', height: '350px' }} />
                            </section>

                        </section>

                    </section>
                </div>





            </div>

        </div >
    )
}

export default Hadmin
