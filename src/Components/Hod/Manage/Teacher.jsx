import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import { CgProfile } from "react-icons/cg"
import axios from "axios"
import { BarLoader } from 'react-spinners'
import { toast } from "react-hot-toast"
import { AiOutlineDelete } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"
import up from "../Manage/user.png"
const teacher = () => {
    const { theme } = useAuth()
    const [teachers, setteachers] = useState([])
    const [teach, setteach] = useState("")
    const [ploader, setploader] = useState(false)

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [education, seteducation] = useState("")
    const [dep, setdep] = useState("")

    const [search, setsearch] = useState("")
    const [uid, setuid] = useState("")
    const id = localStorage.getItem("userid")

    const getuser = async () => {
        try {

            console.log("ghfjhvjh", id)
            const { data } = await axios.post(`https://vercel-zpzg.vercel.app/api/v3/user`, {
                id: id
            })
            console.log(data.user.department._id)
            setdep(data.user.department._id)
        } catch (error) {

        }
    }
    const handleEditClick = () => {
        window.my_modal_4.showModal();
    };

    const getst = async (e) => {
        e.preventDefault();
        setploader(true)
        try {
            const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/searchfac", {
                search: search
            });
            if (data.success) {
                console.log(data)
                setteachers(data.result)

            } else {

            }

            setploader(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handlesearchchange = (e) => {
        setsearch(e.target.value);
        getst()
    }

    const addfac = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/addfac", {
                name: name,
                email: email,
                phone: phone,
                education: education,
                department: dep,
            });
            if (data.success) {
                toast.success(" Faculty Added Succesfully  ", {
                    autoClose: 2000,
                });
                getteachers()
            }
        } catch (error) {

        }
    }


    const upfac = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("https://vercel-zpzg.vercel.app/api/v2/updateteacher", {
                name: name,
                email: email,
                phone: phone,
                education: education,
                id: uid
            });
            console.log(data)
            if (data.success) {
                toast.success(" Faculty updated Succesfully  ", {
                    autoClose: 2000,
                });
                getteachers()
            }
        } catch (error) {

        }
    }

    const getteachers = async () => {
        try {
            console.log(dep)
            setploader(true)
            const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/fac", {
                dep: dep
            })
            console.log(data.teachers)
            setteachers(data.teachers)

            setploader(false);


        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    const delfac = async (id) => {
        const confirmed = window.confirm("Are you sure?");

        if (confirmed) {
            console.log(id);
            const { data } = await axios.delete(`https://vercel-zpzg.vercel.app/api/v2/delfac/${id}`);
            if (data.success) {
                toast.success("teacher deleted succesfully")
                getteachers()
            }
        }


    }
    const getbyid = async (id) => {
        setploader(true)
        console.log(id)
        const { data } = await axios.get(`https://vercel-zpzg.vercel.app/api/v2/fac/${id}`)
        console.log("yashhshs", data.teachers)

        setteach(data.teachers)
        setname(data.teachers.name)
        setemail(data.teachers.email)
        seteducation(data.teachers.education)
        setphone(data.teachers.phone)
        setdep(data.teachers.department)
        setuid(data.teachers._id)
        console.log(data.teachers.name)
        window.my_modal_2.showModal();

        setploader(false)
    }


    useEffect(() => {
        getuser()


    }, [id])

    useEffect(() => {
        if (dep) {
            getteachers();
        }
    }, [dep]);

    return (
        <div className={`p-2 h-[91vh] overflow-y-auto sm:p-5 ${theme == "light" ? "bg-white " : "bg-[#1d232a]"}`}>
            <div className='flex items-center justify-between flex-col sm:flex-row w-full'>
                <section>
                    <h1 onClick={() => window.location.reload()} className={`text-2xl cursor-pointer font-bold ${theme == "light" ? "text-black " : "text-white"}`}>Teachers </h1>
                </section>
                <section className='flex w-[90%] p-2 sm:[50%] justify-center items-center'>
                    <form className='w-[80%] ' action="" onSubmit={getst}>
                        <input type='text' placeholder='Search For Teacher' className={`rounded-full px-5 p-1 w-[100%] ${theme == "light" ? "bg-white border-b-2  text-black" : "bg-[#0c131d]"}`}
                            value={search} onChange={handlesearchchange}
                        />
                    </form>
                </section>
                <section className=' w-[20%]'>
                    <button onClick={() => window.my_modal_1.showModal()} className='px-7 py-1 font-bold hidden sm:block text-white bg-blue-700 rounded-full'> New Teacher</button>
                </section>

            </div>

            <button onClick={() => window.my_modal_1.showModal()} className='px-3 mt-5 py-1  shadow-lg sm:hidden absolute bottom-1 right-2  text-white font-semibold bg-blue-700 rounded-full'> New Teacher +</button>
            <div className='flex justify-center'>
                {ploader ? (
                    <section className='flex justify-center items-center h-[100vh]'>
                        <BarLoader color='blue' />
                    </section>
                ) : teachers.length === 0 ? (
                    <section className='flex justify-center items-center h-[70vh]'>
                        <h1 className=''>No  Teacher found</h1>
                    </section>

                ) :
                    (
                        <div className={`p-2 h-[70%] mb-5 sm:h-[70vh] overflow-y-auto  grid grid-cols-1 sm:grid-cols-2 w-[100%] justify-items-center  md:grid-cols-3 lg:grid-cols-3 gap-5 ${theme == "light" ? "text-black" : ""}`}>
                            {teachers?.map((item, index) => (
                                <div className={` relative h-[20vh] sm:h-[22vh] mb-2 w-[80%] mx-5 my-5 flex rounded-2xl ${theme == "light" ? "text-black bg-[#f5f1f0]" : "bg-[#0c131d] text-white shadow-black"}`} key={index}>
                                    <section className='w-[30%] rounded-full p-4'>
                                        {/* <CgProfile size={80} className='' /> */}
                                        <img src={up} alt='dd' />
                                    </section>
                                    <section className='p-2 mx-2 mt-4'>
                                        <h1 className='font-bold text-xl'>{item.name}</h1>
                                        <h1 className='font-bold'>{item.education} </h1>
                                        <h1 onClick={() => getbyid(item._id)} className='absolute right-3 bottom-2 text-blue-700 font-bold cursor-pointer'>View Profile </h1>
                                    </section>
                                </div>
                            ))}
                        </div>
                    )}
            </div>



            <dialog id="my_modal_4" className="modal">
                <form method='dialog' className={`modal-box ${theme == 'dark' ? " text-white bg-[#1d232a]" : "text-blsck bg-white"}`}>
                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                    <h1 className='text-blue-700 font-bold text-xl'>Update Teacher</h1>
                    <div className='w-full mt-2'>
                        <form className='w-[100%]' >
                            <input type='text' placeholder='Name' className=
                                {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0] border-2 text-black   " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={name}
                                required
                                onChange={(e) => setname(e.target.value)}
                            />
                            <input type='email' placeholder='Email' className=
                                {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0] border-2 text-black   " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={email}
                                required
                                onChange={(e) => setemail(e.target.value)}
                            />

                            <input type='text' placeholder='Phone' className=
                                {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0] border-2 text-black  " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={phone}
                                required
                                onChange={(e) => setphone(e.target.value)}
                            />
                            <input type='text' placeholder='Education' className=
                                {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0] border-2 text-black  " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={education}
                                re
                                onChange={(e) => seteducation(e.target.value)}
                            />
                            <button onClick={upfac} className={`hover:bg-blue-700 border-2  px-8 py-1 mt-3 rounded-full ${theme == "light" ? "text-black" : "text-white"}`}>Update</button>
                        </form>
                    </div>



                </form>


            </dialog>

            <dialog id="my_modal_1" className="modal">
                <form method='dialog' className={`modal-box ${theme == 'dark' ? " text-white bg-[#1d232a]" : "text-blsck bg-white"}`}>
                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                    <h1 className='text-blue-700 font-bold text-xl'>Add Teacher</h1>
                    <div className='w-full mt-2'>
                        <form className='w-[1005]'>
                            <input type='text' placeholder='Name'
                                className=
                                {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0] text-black   " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                required />
                            <input type='email' placeholder='Email' required className=
                                {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0] text-black   " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                            {/* <select className={`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-white   " : "focus:outline-none border-none"}' `} placeholder='select '>
                                <option className=''>sd</option>
                                <option className=''>sd</option>
                                <option className=''>sd</option>
                            </select> */}
                            <input type='text' placeholder='Phone' className=
                                {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0] text-black  " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={phone}
                                onChange={(e) => setphone(e.target.value)}
                            />
                            <input type='text' placeholder='Education' className=
                                {`p-2  my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0] text-black  " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={education}
                                onChange={(e) => seteducation(e.target.value)}
                            />
                            <button onClick={addfac} className={` border-[1.5px] hover:bg-blue-700    px-8 py-1 mt-3 rounded-full ${theme == "light" ? "text-black" : "text-white"}`}>Add</button>
                        </form>
                    </div>



                </form>


            </dialog>
            <dialog id="my_modal_2" className="modal">
                <form method='dialog' className={`modal-box ${theme == 'dark' ? " text-white bg-[#1d232a]" : "text-black  bg-white"}`}>
                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                    {ploader ?
                        <section className='flex justify-center items-center h-[20vh]'>
                            <section className=' '><BarLoader size={23} color='blue' /></section>
                        </section>

                        :

                        <>
                            <section className='flex justify-between'>
                                <section className='flex'>

                                    <AiOutlineDelete onClick={() => delfac(teach._id)} size={23} color='red' className='mx-2' />
                                    <AiOutlineEdit onClick={handleEditClick} size={23} />

                                </section>
                                <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-black" : ""}`}>✕</button>
                            </section>

                            <div className={`${theme == 'dark' ? " focus:outline-none border-none text-white " : "text-black bg-white"}`}>
                                <section className='flex justify-center items-center'>
                                    <CgProfile size={80} color='blue ' />

                                </section>
                                <h1 className='text-center'>Faculty Profile</h1>
                                <hr></hr>
                                <h1 className='font-bold  text-1xl'>Name</h1>
                                <h1 className='font-semibold text-sm my-1'>{teach.name}</h1>
                                <hr></hr>
                                <h1 className='font-bold  text-1xl'>Email</h1>
                                <h1 className='my-2 font-semibold'>{teach.email}</h1>
                                <hr></hr>

                                <h1 className='font-bold  text-1xl'>Mobile</h1>
                                <h1 className='my-2 font-semibold'>{teach.phone}</h1>
                                <hr></hr>
                                <h1 className='font-bold  text-1xl'>Education</h1>
                                <h1 className='my-2 font-semibold'>{teach.education}</h1>
                                <hr></hr>

                            </div>
                        </>

                    }

                </form>


            </dialog>
        </div>
    )
}

export default teacher
