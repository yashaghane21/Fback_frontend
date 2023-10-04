import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthContext'
import { Select } from "antd"
const Option = Select
import axios from 'axios'
import { BarLoader } from 'react-spinners'
import { toast } from 'react-hot-toast'

const Manage = () => {
    const { theme } = useAuth()
    const [departments, setdepartments] = useState([]);
    const [loader, setloader] = useState(false)
    const [name, setname] = useState("")
    const [hodi, sethodi] = useState("")
    const [hods, sethods] = useState([])
    const [hname, sethname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [dept, setdept] = useState("")
    const [password, setpassword] = useState("")

    const handlehod = (value) => {
        console.log(value)
        sethodi(value)
    }

    const updept = async (id, value) => {
        console.log("uuuuu", id, value)

        const { data } = await axios.put("https://f-backend-7g5y.onrender.com/api/v2/uphod", {
            id: id, value: value
        });
        if (data?.success) {
            alldepartments()
            toast.success('Hod updated succesfully.', {
                position: "top-center"
            })
        }
        else {
            toast.error("something went wrong")
        }
    }


    const addhod = async (e) => {
        e.preventDefault()
        const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/addhod", {
            name: hname,
            email: email,
            password: password,
            phone: phone,
            department: dept
        });
        console.log(data)
        if (data.success) {
            toast.success("Hod added succesfullly")
            gethods()
        }
        else {
            alert("not at all")
        }
    }
    const adddept = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(" https://f-backend-7g5y.onrender.com/api/v2/department", {
                name: name,
                hod: hodi
            });
            if (data.success) {
                toast.success("Department Added Succesfully")
                alldepartments()
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.warn(error.response.data.message, {
                    autoClose: 2000,
                });
            } else {
                toast.error("An error occurred:", error.message);
            }
        }


    }

    const gethods = async () => {
        const { data } = await axios.get("https://f-backend-7g5y.onrender.com/api/v3/hods");
        sethods(data.hods)
    }
    const alldepartments = async () => {
        try {
            setloader(true)
            const response = await axios.get("https://f-backend-7g5y.onrender.com/api/v1/department");
            console.log(response.data.departments);
            setdepartments(response.data.departments);
            setloader(false)
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };
    useEffect(() => {
        alldepartments()
        gethods()
    }, [])
    return (
        <div className={`p-2 h-[91vh] overflow-y-auto  sm:p-5 ${theme == "light" ? "bg-white " : "bg-[#1d232a]"}`}>

            <div className='flex items-center justify-between flex-col sm:flex-row w-full'>
                <section>
                    <h1 onClick={() => window.location.reload()} className={`text-2xl cursor-pointer font-bold ${theme == "light" ? "text-black " : "text-white"}`}>Departments </h1>
                </section>

                <section className=' w-[20%]'>
                    <button onClick={() => window.my_modal_1.showModal()} className='px-7 py-1 font-bold text-sm hidden sm:block text-white bg-blue-700 rounded-full'> Add Department</button>
                </section>

            </div>
            <div className={`py-3 sm:p-6 flex justify-center overflow-x-auto mt-5 ${theme == "light" ? "text-black" : "text-white"}`}>
                {loader ? <section className='flex justify-center items-center h-[100vh] w-[100%]'>
                    <section className=' '><BarLoader size={23} color='blue' /></section>
                </section> :
                    <>
                        <table className='border-collapse select-none w-[90%] '>
                            <thead>
                                <tr className=' bg-blue-700 rounded-md'>
                                    <th className='p-2 py-2 text-left text-white text-lg hidden sm:block'>Index</th>
                                    <th className='p-2 text-left py-2 text-white text-lg'>Department</th>
                                    <th className='p-2 text-left py-2 text-white text-lg'>Hod</th>
                                    <th className='p-2 text-left py-2 text-white text-lg'> Update Hod</th>


                                </tr>
                            </thead>
                            {departments.map((item, index) => (
                                <>
                                    <tr className=' hover:bg-gray-400 border-b select-none first-letter: border-slate-500 ' key={index}>
                                        <td className=' p-2 font-semibold text-left hidden sm:block text-sm'>{index + 1}</td>
                                        <td className=' p-2 font-semibold text-left text-blue-600'>{item.name}</td>
                                        <td className={`p-2 font-semibold text-left ${theme == "light" ? "text-black" : "text-white"}`}>{item.hod.name}</td>
                                        <Select className='w-full ant-input text-xl mb-2 mt-2 rounded-2xl ' placeholder='Select A Hod' onChange={(value) => updept(item._id, value)}  >

                                            {hods.map((s) => (
                                                <Option key={s._id} value={s._id}>
                                                    {s.name}
                                                </Option>
                                            ))}
                                        </Select>

                                    </tr>
                                </>
                            ))}

                        </table>
                    </>}

            </div>
            <button onClick={() => window.my_modal_2.showModal()} className='px-7 py-1 font-bold   absolute bottom-5 right-10 text-sm  text-white bg-blue-700 rounded-full'> + Add Hod </button>

            <dialog id="my_modal_1" className="modal">
                <form method='dialog' className={`modal-box ${theme == 'dark' ? " text-white bg-[#1d232a]" : "text-blsck bg-white"}`}>
                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                    <h1 className='text-blue-700 font-bold'>Add Department</h1>
                    <div className='w-full mt-2'>
                        <form className='w-[100%]' >


                            <input type='text' placeholder='name' className=
                                {`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0]  " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={name} onChange={(e) => setname(e.target.value)}
                            />
                            {<select className={`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0]   " : "focus:outline-none bg-[#0c131d] border-none"}' `} placeholder='select a teacher ' onChange={(e) => handlehod(e.target.value)}>
                                <option>Select a Hod</option>
                                {hods.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name}
                                    </option>
                                ))}

                            </select>
                            }

                            <button onClick={adddept}
                                className='hover:bg-blue-700 border-2 text-white px-8 py-1 mt-3 rounded-full'>Add</button>
                        </form>
                    </div>



                </form>


            </dialog>
            <dialog id="my_modal_2" className="modal">
                <form method='dialog' className={`modal-box ${theme == 'dark' ? " text-white bg-[#1d232a]" : "text-blsck bg-white"}`}>
                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                    <h1 className='text-blue-700 font-bold'>Add Hod</h1>
                    <div className='w-full mt-2'>
                        <form className='w-[100%]' >


                            <input type='text' placeholder='name' className=
                                {`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0]  " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={hname} onChange={(e) => sethname(e.target.value)}
                            />
                            <input type='text' placeholder='email' className=
                                {`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0]  " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={email} onChange={(e) => setemail(e.target.value)}
                            />
                            <input type='text' placeholder='password' className=
                                {`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0]  " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={password} onChange={(e) => setpassword(e.target.value)}
                            />
                            <input type='text' placeholder='phone' className=
                                {`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0]  " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={phone} onChange={(e) => setphone(e.target.value)}
                            />

                            {<select className={`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0]   " : "focus:outline-none bg-[#0c131d] border-none"}' `} placeholder='select a teacher ' onChange={(e) => setdept(e.target.value)}>
                                <option>Select a Departments</option>
                                {departments.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name}
                                    </option>
                                ))}

                            </select>
                            }

                            <button onClick={addhod}
                                className='hover:bg-blue-700 border-2 text-white px-8 py-1 mt-3 rounded-full'>Add</button>
                        </form>
                    </div>



                </form>


            </dialog>
        </div>
    )
}

export default Manage
