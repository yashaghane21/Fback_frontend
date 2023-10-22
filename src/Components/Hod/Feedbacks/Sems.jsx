import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import axios from 'axios'
import { BarLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { AiOutlineAlignRight, AiOutlineArrowRight } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { AiOutlineDelete } from "react-icons/ai"
const Sems = () => {
    const { auth } = useAuth()
    const navigate = useNavigate()
    const { theme } = useAuth()
    const [dept, setdept] = useState("")
    const [sems, setsems] = useState([])
    const id = localStorage.getItem("userid")
    const [loader, setloader] = useState(false)
    const [name, setname] = useState("")

    const addsem = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/sem", {
            department: dept,
            name: name
        });
        if (data.success) {
            toast.success("semster added succesfully")
            getsems()
        }
    }
    const getdepid = async () => {
        const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v3/user`, {
            id: id
        })
        console.log(data)
        console.log(data.user.department._id)
        setdept(data.user.department._id)
    }


    const getsems = async () => {
        setloader(true)
        console.log(dept)
        const response = await axios.get(`https://f-backend-7g5y.onrender.com/api/v2/sems/${dept}`)
        console.log(response.data.sems)
        setsems(response.data.sems)
        setloader(false)
    }


    const delsem = async (id) => {
        const confirmed = prompt("Enter password ");

        if (confirmed === "del") {
            console.log(id);
            const { data } = await axios.delete(`https://f-backend-7g5y.onrender.com/api/v2/semdel/${id}`);
            if (data.success) {
                toast.success("Semester deleted succesfully")
                getsems()
            }
        }
        else {
            toast.error("Wrong password")
        }


    }

    useEffect(() => {
        getdepid()
    }, [id])

    useEffect(() => {
        getsems()
    }, [dept])
    return (
        <div className={`${theme == "light" ? " bg-white text-black" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto p-5 w-full`}>
            <section className='flex justify-between items-center'>
                <h1 className={`font-bold text-2xl ${theme == "light" ? "text-black" : "text-white"}`}>FEEDBACKS</h1>
                <section className=' w-[20%]'>
                    <button onClick={() => window.my_modal_1.showModal()} className='px-7 py-1 font-bold  shadow-md hidden sm:block text-white bg-blue-700 rounded-full'> New Semester</button>
                </section>
            </section>
            <div className='mt-5 '>
                {loader ? <section className='flex justify-center w-full items-center h-[100vh]'>
                    <section className=' '><BarLoader size={23} color='blue' className='w-full' /></section>
                </section> :
                    <div className='grid grid-cols-1 sm:grid-cols-2 w-[100%] justify-items-center  md:grid-cols-3 lg:grid-cols-3 gap-5 '>
                        {sems.map((item, index) =>
                            <div className={`relative h-[22vh] my-2 w-[80%]  shadow-xl rounded-2xl   sm:mx-4  ${theme == "light" ? "bg-[#f5f1f0] text-black" : "bg-[#0c131d] text-white"}`} key={index}>
                                {/* <AiOutlineDelete onClick={() => delsem(item._id)} size={23} color='red' className='absolute right-4 bottom-2 cursor-pointer' /> */}

                                <h1 className={`text-center  font-bold p-5  text-3xl ${theme == "light" ? "t" : "text-white"}`}>{item.name}</h1>
                                <section className='flex justify-center gap-3 '>
                                    <button onClick={() => navigate(`/hod/fpage/${item._id}`)} className='my-2 border-[1px] border-gray-400 py-[0.5px] px-4 rounded-3xl  font-semibold hover:bg-blue-600 hover:font-bold hover:border-none hover:text-white '>View</button>

                                    <button onClick={() => delsem(item._id)} className='my-2 border-[1px] border-gray-400 py-[0.5px] px-4 rounded-3xl  font-semibold hover:bg-red-600 hover:font-bold hover:border-none hover:text-white '>Delete</button>
                                </section>
                            </div>
                        )}
                    </div>


                }

            </div>
            <dialog id="my_modal_1" className="modal">
                <form method='dialog' className={`modal-box ${theme == 'dark' ? " text-white bg-[#1d232a]" : "text-blsck bg-white"}`}>
                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                    <h1 className='text-blue-700 font-bold'>Add Semester</h1>
                    <div className='w-full mt-2'>
                        <form className='w-[1005]'>
                            <input type='text' placeholder=' Semester Name' className=
                                {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-white   " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />


                            <button onClick={addsem} className='bg-blue-700 text-white px-8 py-1 mt-3 rounded-full'>Add</button>
                        </form>
                    </div>



                </form>


            </dialog>
        </div>
    )
}

export default Sems

