import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import axios from "axios"
import { Select } from "antd"
import { toast } from 'react-hot-toast'
const Option = Select
import { BarLoader } from 'react-spinners'


const Subjects = () => {


    const { theme } = useAuth();
    const [dep, setDep] = useState("")
    const [s, sets] = useState("")
    const id = localStorage.getItem("userid")
    const [teachers, setTeachers] = useState([])
    const [subjects, setSubjects] = useState([])
    const [dept, setdept] = useState("")
    const [sems, setsems] = useState([])
    const [name, setname] = useState("")
    const [sem, setsem] = useState("")
    const [teacher, setteacher] = useState("")
    const [loading, setLoading] = useState(true)
    const [search, setsearch] = useState("")


    const getUserData = async () => {
        try {
            console.log("Fetching user data for id:", id)
            const { data } = await axios.post(`https://vercel-zpzg.vercel.app/api/v3/user`, {
                id: id
            })
            console.log(data.user.department._id)
            setDep(data.user.department._id)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching user data:", error)
            setLoading(false)
        }
    }

    const getTeachers = async () => {
        try {
            getUserData()
            setLoading(true)
            const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/fac", {
                dep: dep
            })
            console.log(data.teachers)
            setTeachers(data.teachers)
        } catch (error) {
            console.error("Error fetching teachers:", error)
        } finally {
            setLoading(false)
        }
    }

    const getSubjects = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/subjects", {
                dep: dep
            })
            console.log(data)
            setSubjects(data.subjects)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching subjects:", error)
        } finally {

        }
    }

    const upteacher = async (id, value) => {
        console.log("uuuuu", id, value)

        const { data } = await axios.put("hhttps://vercel-zpzg.vercel.app/api/v2/uteacher", {
            id: id, value: value
        });
        if (data?.success) {
            getSubjects();
            toast.success('teacher updated succesfully.', {
                position: "top-center"
            })
        }
        else {
            toast.error("something went wrong")
        }
    }


    const getsems = async () => {
        setLoading(true)
        console.log(dept)
        const response = await axios.get(`https://vercel-zpzg.vercel.app/api/v2/sems/${dep}`)
        console.log("ankita", response.data.sems)
        setsems(response.data.sems)
        setLoading(false)
    }

    const getbyfilter = async (sem) => {
        setLoading(true)
        sets(sem)
        const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/getsubbysem", {
            sem: sem
        });
        console.log("test2", data.subjects)
        setSubjects(data.subjects)
        getTeachers();
        setLoading(false)
    }
    const handlet = (value) => {
        console.log(value)
        setteacher(value)
    }
    const handles = (value) => {
        console.log(value)
        setsem(value)
    }
    const addsub = async (e) => {
        e.preventDefault();
        console.log("sem", sem, "dep", dep)
        const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/course", {
            name: name,
            department: dep,
            sem: sem,
            teacher: teacher
        });
        if (data?.success) {
            toast.success('subject added succesfully.', {
                position: "top-center"
            })
            getSubjects()
        }
    }

    const handlesearchchange = (e) => {
        setsearch(e.target.value);
    }

    const searchsub = async (e) => {
        e.preventDefault();
        setLoading(true)
        const { data } = await axios.post("hhttps://vercel-zpzg.vercel.app/api/v2/searchsub", {
            search: search
        });
        console.log("test 3 ", data)
        setSubjects(data.result)
        getTeachers();
        setLoading(false)
    }
    useEffect(() => {
        getUserData()
    }, [])

    useEffect(() => {
        if (dep) {
            getTeachers()
            getSubjects()
            getsems()
        }
    }, [dep])
    return (
        <div className={`p-2 h-[91vh] overflow-y-auto sm:p-5 ${theme == "light" ? "bg-white " : "bg-[#1d232a]"}`}>

            <div className='flex items-center justify-between'>
                <section>
                    <h1 onClick={() => window.location.reload()} className={`text-2xl cursor-pointer font-bold ${theme == "light" ? "text-black " : "text-white"}`}>Subjects </h1>
                </section>
                <section className='flex w-[100%] sm:w-[60%] p-2 sm:[50%] justify-center items-center'>
                    <form className='w-[100%] ' action="" onSubmit={searchsub} >
                        <input type='text' placeholder='Search For Subject' value={search} onChange={handlesearchchange} className={`rounded-full px-5 p-1 w-[100%] ${theme == "light" ? "bg-white border-b-2  text-black" : "bg-[#0c131d]"}`}

                        />
                    </form>
                </section>
                <section className='w-[20%] '>
                    <button className='px-7 py-1 hidden sm:block text-white  bg-blue-700 rounded-full' onClick={() => window.my_modal_1.showModal()} > New Subject</button>
                </section>
                <button onClick={() => window.my_modal_1.showModal()} className='px-7 py-1 sm:hidden absolute bottom-1 right-2  text-white font-semibold bg-blue-700 rounded-full'> New Subject +</button>



            </div>
            <div className='overflow-x-auto mt-5 '>
                <ul className='flex  cursor-pointer select-none'>
                    <li className='mx-2 shadow-lg bg-white border-[1px] border-black text-black rounded-md px-3 font-bold' onClick={() => { getTeachers(); getSubjects(); }}>All</li>
                    {sems.map((item, index) => (
                        <li className={`mx-2 shadow-lg border-[1px] border-black bg-white select-none text-black rounded-md px-3 font-bold ${item._id == s ? "border-b-4 border-blue-700" : "border-b-0"} `} onClick={() => getbyfilter(item._id)}>{item.name}</li>
                    ))}



                </ul>
            </div>
            {loading ? <section className='flex justify-center items-center h-[70vh]' >
                <BarLoader size={23} color='blue' />

            </section> : <>
                <div className={`py-3 sm:p-6 flex justify-center overflow-x-auto mt-5 ${theme == "light" ? "text-black" : "text-white"}`}>
                    <table className='border-collapse select-none w-[90%] '>
                        <thead>
                            <tr className=' bg-blue-700 rounded-md'>
                                <th className='p-2 py-2 text-left text-white text-lg hidden sm:block'>Index</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Course</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Teacher</th>
                                <th className='p-2 text-left py-2 text-white text-lg'> Update Teacher</th>


                            </tr>
                        </thead>

                        {subjects.map((item, index) => (
                            <>
                                <tr className={`${theme == "light" ? "hover:bg-gray-300 " : "hover:bg-slate-950"}`} key={index}>
                                    <td className=' p-2 font-semibold text-left hidden sm:block text-sm'>{index + 1}</td>
                                    <td className=' p-2 font-semibold text-left text-blue-600'>{item.name}</td>
                                    <td className={`p-2 font-semibold text-left ${theme == "light" ? "text-black" : "text-white"}`}>{item.teacher?.name}</td>
                                    <Select className='w-full ant-input text-xl mb-2 mt-2 rounded-2xl ' placeholder='Select A Teacher' onChange={(value) => upteacher(item._id, value)} >
                                        {teachers.map((s) => (
                                            <Option key={s._id} value={s._id}>
                                                {s.name}
                                            </Option>
                                        ))}
                                    </Select>

                                </tr>
                            </>
                        ))}









                    </table>
                    <dialog id="my_modal_1" className="modal">
                        <form method='dialog' className={`modal-box ${theme == 'dark' ? " text-white bg-[#1d232a]" : "text-black bg-white"}`}>
                            <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                            <h1 className='text-blue-700 font-bold'>Add Subject</h1>
                            <div className='w-full mt-2'>
                                <form className='w-[1005]'>
                                    <input type='text' placeholder='Name' className=
                                        {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-white  text-black " : " bg-[#0c131d] focus:outline-none border-none"}' `}
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                    />

                                    {<select className={`p-2 my-2 w-full rounded-full ${theme == "light" ? "bg-white text-black   " : " bg-[#0c131d] focus:outline-none border-none"}' `} placeholder='select a teacher ' onChange={(e) => handlet(e.target.value)}>
                                        <option>select a teacher</option>
                                        {teachers.map((item, index) => (

                                            <option className='' key={index} value={item._id}>{item.name}</option>
                                        ))}


                                    </select>
                                    }
                                    {<select className={`p-2 my-2 w-full rounded-full ${theme == "light" ? "bg-white   " : " bg-[#0c131d] focus:outline-none border-none"}' `} placeholder='select a semester ' onChange={(e) => handles(e.target.value)}>
                                        <option>select a semester</option>
                                        {sems.map((item, index) => (
                                            <option className='' key={index} value={item._id}>{item.name}</option>
                                        ))}


                                    </select>
                                    }

                                    <button onClick={addsub} className='bg-blue-700 text-white px-8 py-1 mt-3 rounded-full'>Add</button>
                                </form>
                            </div>



                        </form>


                    </dialog>
                </div>
            </>}


        </div>

    )
}

export default Subjects
