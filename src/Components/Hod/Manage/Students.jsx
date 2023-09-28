import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import axios from 'axios'
import { BarLoader } from 'react-spinners'
import { toast } from 'react-hot-toast'

const Students = () => {
    const { theme } = useAuth()
    const [students, setstudents] = useState([])
    const id = localStorage.getItem("userid")
    const [dep, setdep] = useState("")
    const [sems, setsems] = useState([])
    const [s, sets] = useState("")
    const [loading, setLoading] = useState(false)
    const [old, setold] = useState("");
    const [snew, setsnew] = useState("");
    const [search, setsearch] = useState("")


    const getUserData = async () => {
        try {
            console.log("Fetching user data for id:", id)
            const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v3/user`,{
                id:id
            })
            console.log(data.user)
            setdep(data.user.department)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching user data:", error)
            setLoading(false)
        }
    }

    const getstudents = async () => {
        setLoading(true);
        const { data } = await axios.get("https://f-backend-7g5y.onrender.com/api/v2/students")
        console.log(data.students)
        setstudents(data.students)
        setLoading(false);
    }


    const handlesearchchange = (e) => {
        setsearch(e.target.value);
    }

    const getsems = async () => {
        setLoading(true)
        console.log(dep)
        const response = await axios.get(`https://f-backend-7g5y.onrender.com/api/v2/sems/${dep}`)
        console.log("ankita", response.data.sems)
        setsems(response.data.sems)
        setLoading(true)
    }
    const getbyfilter = async (sem) => {
        setLoading(true)
        sets(sem)
        const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/stubysem", {
            sem: sem
        });
        setstudents(data.students)

        setLoading(false)
    }

    const handleold = (value) => {
        setold(value)
        console.log(value)
    }

    const handlenew = (value) => {
        setsnew(value)
        console.log(value)
    }

    const updatesem = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/updstusem", {
            osem: old, nsem: snew
        })
        if (data.success) {
            toast.success("Semsters Updated Succesfully")
        }
    }

    const searchs = async (e) => {
        e.preventDefault();

        const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/searchstud", {
            search: search
        });
        console.log("test4", data.result)
        setstudents(data.result)
    }
    useEffect(() => {
        getstudents()
        getUserData()

    }, [])

    useEffect(() => {
        if (dep) {
            getsems()
        }
    }, [dep])
    return (
        <div className={`p-2 h-[91vh] overflow-y-auto sm:p-5 ${theme == "light" ? "bg-white " : "bg-[#1d232a]"}`}>
            <div className='flex items-center justify-between flex-col sm:flex-row w-full'>
                <section>
                    <h1 onClick={() => window.location.reload()} className={`text-2xl cursor-pointer font-bold ${theme == "light" ? "text-black " : "text-white"}`}>Students </h1>
                </section>
                <section className='flex w-[90%] p-2 sm:[50%] justify-center items-center'>
                    <form className='w-[100%] sm:w-[80%] ' action="" onSubmit={searchs} >
                        <input value={search} onChange={handlesearchchange} type='text' placeholder='Search For Students' className={`rounded-full px-5 p-1 w-[100%] ${theme == "light" ? "bg-white border-b-2  text-black" : ""}`}

                        />
                    </form>
                </section>
                <section className=' w-[30%]'>
                    <button onClick={() => window.my_modal_1.showModal()} className='px-4 font-bold shadow-blue-700 shadow-lg  hidden sm:block text-white bg-blue-700 rounded-full'> Update Students</button>
                </section>

            </div>
            {loading ? <section className='h-[70vh] flex justify-center items-center'>
                <BarLoader size={23} color='blue' />
            </section> :
                <>
                    <div className='overflow-x-auto mt-5 '>
                        <ul className='flex  cursor-pointer select-none'>
                            <li className='mx-2 shadow-lg bg-white text-black rounded-md px-3 font-bold' onClick={getstudents} >All</li>
                            {sems.map((item, index) => (
                                <li className={`mx-2 shadow-lg bg-white select-none text-black rounded-md px-3 font-bold ${item._id == s ? "border-l-8 border-blue-700" : "border-b-0"} `} onClick={() => getbyfilter(item._id)}>{item.name}</li>
                            ))}



                        </ul>
                    </div>
                    <div className={`py-3 sm:p-6 flex justify-center overflow-x-auto mt-5 ${theme == "light" ? "text-black" : "text-white"}`}>
                        <table className='border-collapse select-none w-[90%] '>
                            <thead>
                                <tr className=' bg-blue-700 rounded-md'>
                                    <th className='p-2 py-2 text-left text-white text-lg hidden sm:block'>Index</th>
                                    <th className='p-2 text-left py-2 text-white text-lg'>Student</th>
                                    <th className='p-2 text-left py-2 text-white text-lg'>Enroll</th>
                                    <th className='p-2 text-left py-2 text-white text-lg'>Email</th>


                                </tr>
                            </thead>
                            {students.map((item, index) => (
                                <>
                                    <tr className=' hover:bg-gray-400 border-b select-none first-letter: border-slate-500 ' key={index}>
                                        <td className=' p-2 font-semibold text-left hidden sm:block text-sm'>{index + 1}</td>
                                        <td className=' p-2 font-semibold text-left text-blue-600'>{item.name}</td>
                                        <td className={`p-2 font-semibold text-left ${theme == "light" ? "text-black" : "text-white"}`}>{item.Enroll}</td>
                                        <td className={`p-2 font-semibold text-left ${theme == "light" ? "text-black" : "text-white"}`}>{item.email}</td>
                                    </tr>
                                </>
                            ))}


                        </table>
                    </div>


                </>
            }
            <dialog id="my_modal_1" className="modal">
                <form method='dialog' className={`modal-box ${theme == 'dark' ? " text-white bg-[#1d232a]" : "text-blsck bg-white"}`}>
                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                    <h1 className='text-blue-700 font-bold'>Update Semsetser Of Students</h1>
                    <div className='w-full mt-2'>
                        <form className='w-[1005]' >


                            {<select className={`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-white   " : "focus:outline-none border-none"}' `} placeholder='select a semester ' onChange={(e) => handleold(e.target.value)} >
                                <option value="">Select Old Semester</option>
                                {sems.map((item, index) => (
                                    <option className='' key={index} value={item._id}>{item.name}</option>
                                ))}


                            </select>
                            }
                            {

                                <select className={`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-white   " : "focus:outline-none border-none"}' `} placeholder='select a semester ' onChange={(e) => handlenew(e.target.value)} >
                                    <option value="">Select New option</option>
                                    {sems.map((item, index) => (
                                        <option className='' key={index} value={item._id}>{item.name}</option>
                                    ))}


                                </select>
                            }

                            <button onClick={updatesem} className='hover:bg-blue-700 border-2 text-white px-8 py-1 mt-3 rounded-full'>Update</button>
                        </form>
                    </div>



                </form>


            </dialog>
        </div>
    )
}

export default Students
