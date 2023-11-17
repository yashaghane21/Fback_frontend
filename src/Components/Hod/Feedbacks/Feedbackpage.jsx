import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import axios from 'axios'
import { AiOutlineEye } from "react-icons/ai"
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import Bar from "../Charts/Bar"
import { CgProfile } from "react-icons/cg"
import { AiOutlineScan } from "react-icons/ai"
import toast from "react-hot-toast"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import lottie from 'lottie-web';
import animationData from "./hh.json"

const Feedbackpage = () => {

    const { theme } = useAuth()
    const id = useParams()
    const [s, sets] = useState("")
    const [sshifts, setshifts] = useState([])
    const [fback, setfback] = useState([])
    const [sub, setsub] = useState([])
    const [subid, setsubid] = useState("")
    const [loader, setloader] = useState(false)
    const [ploader, setploader] = useState(false)
    const [student, setstudent] = useState([])
    const [alert, setalert] = useState(false)
    const uid = localStorage.getItem("userid")
    const [sem, setsem] = useState()
    const [search, setsearch] = useState("")
    const [sid, setsid] = useState("")
    const [enable, setenable] = useState("")
    const currentYear = new Date().getFullYear();
    const pastYears = 3;
    const futureYears = 10;
    const years = [];
    const [cdat, setcdata] = useState([])

    for (let i = -pastYears; i <= futureYears; i++) {
        years.push(String(currentYear + i));
    }
    const navigate = useNavigate();
    const [year, setyear] = useState(currentYear)
    const [enabled, setEnabled] = useState(false);
    const [content, setContent] = useState('');

    const handleToggle = () => {
        setEnabled(!enabled);
    };

    const exportdata = {

    }
    const feedbacks = async () => {

        try {
            setloader(true)
            const { data } = await axios.get(`https://vercel-zpzg.vercel.app/api/v2/feedback/${id.id}`)
            const course = data.feedback.map(feedback => feedback.student.name);

            const studentNames = data.feedback.map(feedback => feedback.course.name);
            const answers = data.feedback.flatMap(feedback => feedback.feedback.map(item => item.answer));
            console.log(answers)
            console.log(studentNames)
            setfback(data.feedback)
            console.log("dd", data.feedback[0].student.name)
            console.log(data, data.feedback[0].sem.enabled)
            const cde = data.feedback.map(feedback => feedback.department.name);
            setsid(cde)
            const exportdata = [
                { name: studentNames },
                { course: course }
            ]
            if (data.feedback[0].sem.enabled) {
                setenable("Semester Enabled For Feedback")

            } else {
                setenable("Semester disabled For Feedback")
            }
            setcdata(exportdata)
            setfback(data.feedback)
            setsem(id.id)
            setloader(false)

        } catch (error) {
            setloader(false)
        }

    }


    const jsonToExcel = () => {
        toast.success("Data exported succesfully")
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

        const ws_data = fback.map(item => {
            const feedbackData = {};
            feedbackData['Feedback ID'] = item._id;
            feedbackData['Department'] = item.department.name;
            feedbackData['Semester Name'] = item.sem.name;
            feedbackData['Course Name'] = item.course.name;
            feedbackData['Student Name'] = item.student.name;
            feedbackData['Email'] = item.student.email;
            feedbackData['Enrollment'] = item.student.Enroll;
            feedbackData['Year'] = item.year;
            feedbackData['Timestamp'] = item.timestamp;

            item.feedback.forEach((feedback, index) => {
                feedbackData[`Question ${index + 1}`] = feedback.question.question;
                feedbackData[`Answer ${index + 1}`] = feedback.answer;
            });

            return feedbackData;
        });

        const ws = XLSX.utils.json_to_sheet(ws_data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Feedback Data');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, `${sid}.xlsx`);
    }


    console.log(fback[0])
    const getbyyear = async (year) => {
        setloader(true)


        const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/fbacksemyr", {
            sem: id.id,
            year: year
        })
        console.log(data)
        setfback(data.feedback)
        setloader(false);

    }

    const getyshift = async (s) => {
        setloader(true)

        console.log(s)
        const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/feedbackshift", {
            shift: s, sem: id.id

        })
        console.log(data)
        setfback(data.feedback)
        setloader(false);

    }





    const getbysub = async (subject) => {
        setloader(true)
        setsubid(subject)
        console.log(subject);

        const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/feedbacksub", {
            sub: subject
        })
        console.log(data)
        setfback(data.feedback)
        setloader(false)
            ;
    }


    const subjects = async () => {
        try {
            console.log(id)
            const response = await axios.post("https://vercel-zpzg.vercel.app/api/v3/subjectsq", {
                sem: id.id
            })

            console.log("uuuu", response.data.subjects)
            setsub(response.data.subjects)

        } catch (error) {
            console.error(error)
        }

    }

    // const getsearch = async (e) => {
    //     e.preventDefault()
    //     console.log("hii")
    //     setploader(true)
    //     try {
    //         const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/searchfback", {
    //             search: search
    //         });
    //         if (data.success) {
    //             console.log(data)
    //             setfback(data.result)

    //         } else {

    //         }

    //         setploader(false)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    console.log(fback[0])

    const getuser = async (sid) => {
        try {
            setploader(true);
            window.my_modal_1.showModal()
            // console.log("ghfjhvjh", sid);
            const { data } = await axios.post(`https://vercel-zpzg.vercel.app/api/v3/user`, {
                id: sid
            });
            window.my_modal_1.showModal()
            setstudent(data.user);
            setploader(false);
            console.log(data);
        } catch (error) {

        }
    }
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`https://vercel-zpzg.vercel.app/api/v2/semesters/${enabled ? 'disable' : 'enable'}`, {
                id: id.id
            });
            console.log(response.data);
            setalert(response.data.sem.enabled ? true : false)
            toast.success(`Semster ${enabled ? "disabled" : "enabled"} succesfully`)
            feedbacks();
        } catch (error) {
            console.error(error);
        }
    };
    const shifts = async () => {
        const { data } = await axios.get("https://vercel-zpzg.vercel.app/api/v1/shifts")
        console.log(data)
        setshifts(data.shifts)
    }

    const handlechange = (e) => {
        setsearch(e.target.value)
    }
    useEffect(() => {
        feedbacks()

        console.log("sss", fback[0])
        subjects()
        shifts()
        console.log(id)
        const anim = lottie.loadAnimation({
            container: document.getElementById('lottie-container'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData, // Your animation data
        });
        return () => anim.destroy();
    }, [uid])
    return (
        <div className={`${theme == "light" ? "bg-white" : "bg-[#1d232a]"} h-[91vh] overflow-y-auto p-5 w-full`}>

            <div className='flex flex-col  sm:flex-row sm:justify-between w-full'>

                <div className=' overflow-x-auto  w-[100%] sm:w-[70%] '>
                    <ul className='flex    cursor-pointer select-none'>
                        <li className={`px-5 mx-2 rounded-md text-left'  ${theme == "light" ? " bg-[#f5f1f0] text-black" : "bg-[#0c131d]  text-white"}`} onClick={feedbacks}>All </li>

                        <select onChange={(e) => getbysub(e.target.value)} className={`px-5 mx-2 rounded-md text-left'  ${theme == "light" ? " bg-[#f5f1f0] text-black" : "bg-[#0c131d]  text-white"}`}>
                            {sub.map((item, index) => (
                                // <li className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-bold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} value={item._id} onClick={() => getbysub(item._id)}
                                //     key={index}>{item.name}</li>]
                                <option value={item._id} className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-semibold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} >{item.name} </option>
                            ))}
                        </select>

                        <select placeholder='select a year' className={`px-5 mx-2 rounded-md text-left'  ${theme == "light" ? " bg-[#f5f1f0] text-black" : "bg-[#0c131d]  text-white"}`} onChange={(e) => getbyyear(e.target.value)}>
                            <option>Select Year</option>
                            {years.map((item, index) => (
                                // <li className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-bold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} value={item._id} onClick={() => getbysub(item._id)}
                                //     key={index}>{item.name}</li>]
                                <option value={item} className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-semibold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} >{item} </option>
                            ))}
                        </select>
                        <select placeholder='select a year' className={`px-5 mx-2 rounded-md text-left'  ${theme == "light" ? " bg-[#f5f1f0] text-black" : "bg-[#0c131d]  text-white"}`} onChange={(e) => getyshift(e.target.value)}>
                            <option>Shift</option>
                            {sshifts.map((item, index) => (
                                // <li className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-bold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} value={item._id} onClick={() => getbysub(item._id)}
                                //     key={index}>{item.name}</li>]
                                <option value={item._id} className={`mx-1 shadow-black border-[1px] border-black bg-white max-w-full select-none font-semibold text-black rounded-md  px-2  ${item._id == subid ? "border-b-4 border-blue-700" : "border-b-0"} `} >{item.name} </option>
                            ))}
                        </select>

                    </ul>


                </div>
                <div className='sm:w-[35%] w-[100%] mt-2  sm:mt-0 flex justify-center'>
                    <span data-tooltip-id="my-tooltip" data-tooltip-content="Red for Disabel ,green for Enable" className={` ${alert ? "bg-green-700" : "bg-red-700"} px-4   py-[1px] rounded-lg font-bold text-white`}>{enable} </span>
                </div>
            </div>

            {<section className='p-2 flex sm:justify-end sm:mr-[15vh] mt-5 justify-center'>
                <div className='flex'>
                    <h1 className={` ${theme == "light" ? "text-black" : "text-white "} font-bold text-xl px-2 flex  `} data-tooltip-id="my-tooltip" data-tooltip-content="Check box for disable" >Action</h1>

                    <label className="switch">
                        <input className=' mt-3 ' type="checkbox" checked={enabled} onChange={handleToggle} />
                        <span className="slider"></span>
                    </label>
                </div>
                <button onClick={handleSubmit} className='px-4 mx-2 bg-blue-700 rounded-xl text-white' >Submit </button>
            </section>}
            <div className='flex flex-col  sm:flex-row '>
                <div className={` ${theme == "light" ? "bg-[#f5f1f0]" : "bg-[#0c131d]"}  h-[70vh] mt-5 overflow-y-auto w-[100%] pb-2 rounded-lg `}>


                    <table className='border-collapse w-[100%] '>
                        <thead>
                            <tr className=' bg-blue-600 '>
                                <th className='p-2 py-2 text-left text-white text-lg hidden sm:block'></th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Course</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Enroll</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Student</th>
                                <th className='p-2 text-left py-2 text-white text-lg'>Status</th>
                            </tr>
                        </thead>
                        {loader ? (
                            <tr className=' h-[60vh]'>
                                <td></td>
                                <td></td>
                                <td className='flex justify-center items-center h-[70vh]'>
                                    <BarLoader color='blue' />
                                </td>
                                <td></td>
                            </tr>
                        ) : fback.length === 0 ? (
                            <tr className=' h-[50vh] w-full'>
                                <td className=' w-24'></td>
                                <td className=' w-70'></td>
                                <td className={`w-48 font-bold text-center ${theme == "light" ? "text-black" : "text-white"}`}>No Feedbacks found</td>
                                <td className=' w-44'></td>
                            </tr>
                        ) : (
                            fback.map((item, index) => (
                                <tr
                                    className={`${theme == "light" ? "hover:bg-gray-300 text-black " : "hover:bg-slate-950 text-white"}`}
                                    key={index}
                                >
                                    <td className='p-2 font-semibold text-left hidden sm:block text-sm'>
                                        {index + 1}
                                    </td>
                                    <td className='p-2 font-semibold text-left text-blue-600'>
                                        {item.course?.name}
                                    </td>
                                    <td
                                        className='p-2 font-semibold text-left cursor-pointer'
                                        onClick={() => getuser(item.student._id)}
                                    >
                                        {item.student?.Enroll}
                                    </td>
                                    <td
                                        className='p-2 font-semibold text-left cursor-pointer'
                                        onClick={() => getuser(item.student._id)}
                                    >
                                        {item.student?.name}
                                    </td>



                                    <td
                                        className=' font-semibold text-left  flex cursor-pointer'
                                        onClick={() => navigate(`/hod/mainf/${item._id}`)}
                                    >
                                        View<AiOutlineEye size={23} className='ml-2' />
                                    </td>
                                    {/* <td
                                        className=' font-semibold cursor-pointer text-left'
                                    >
                                        {item.sem.enabled.toString() === 'true' ? (
                                            // Render content when item.sem.enabled is true

                                            <span className={`absolute right-[18vh] hidden sm:block sm:top-[85px] bg-green-700 px-4 py-[1px] rounded-lg text-white`}>Semster Enabled For Feedback</span>
                                        ) : (
                                            // Render content when item.sem.enabled is false
                                            <span className='absolute right-[18vh] hidden sm:block sm:top-[85px] text-white bg-red-500 px-4 py-[1px] rounded-lg'>Semester Disabled For Feedback</span>
                                        )}
                                    </td> */}
                                </tr>
                            ))
                        )}



                    </table>


                    <dialog id="my_modal_1" className="modal">
                        <form method='dialog' className={`modal-box ${theme == "dark" ? " text-white bg-[#1d232a]" : " bg-white text-black "}`}>
                            <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                            {ploader ?
                                <section className='flex justify-center items-center h-[20vh]'>
                                    <section className=' '><BarLoader size={23} color='blue' /></section>
                                </section>

                                : <>
                                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-black" : ""}`}>✕</button>
                                    <div className={`${theme == "dark" ? " focus:outline-none border-none text-white " : ""}`}>
                                        <section className='flex justify-center items-center'>
                                            <CgProfile size={80} color='blue ' />

                                        </section>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Name</h1>
                                        <h1 className='font-semibold text-sm my-1'>{student.name}</h1>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Email</h1>
                                        <h1 className='my-2 font-semibold'>{student.email}</h1>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Enroll</h1>
                                        <h1 className='my-2 font-semibold'>{student.Enroll}</h1>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Mobile</h1>
                                        <h1 className='my-2 font-semibold'>{student.phone}</h1>
                                        <hr></hr>
                                        <h1 className='font-bold  text-1xl'>Semester</h1>
                                        <h1 className='my-2 font-semibold'>{student.sem?.name}</h1>
                                        <hr></hr>
                                    </div>
                                </>

                            }

                        </form>


                    </dialog>
                </div>
                <div>
                    <div className='w-[100%] px-5   flex flex-col justify-center items-center  sm:my-0 sm:w-[100%] pl-5 ' >
                        <div className={`h-[50vh]  pb-5 flex flex-col justify-center items-center w-[55vh] mt-5 rounded-2xl ${theme == "light" ? " bg-[#f5f1f0] shadow-lg" : "bg-[#0c131d] shadow-xl text-white"} `} >
                            <select onChange={(e) => setyear(e.target.value)} className={`px-5 rounded-2xl text-left'  ${theme == "light" ? " bg-[#f5f1f0]" : "bg-[#0c131d] border-[1px]  text-white"}`}>
                                <option>{year}</option>
                                {years.map((y) => (

                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                            <Bar sem={sem} year={year} />
                        </div>

                        <section className='mt-5 w-[100%] px-2'>
                            <button onClick={jsonToExcel} className={` ${theme == "light" ? "text-blue-700" : "text-white"} text-sm sm:text-xl pl-[2vh] items-center justify-center text-center w-[100%] font-bold py-2 border-[0.5px] border-blue-700 shadow-blue-700 shadow-md flex rounded-2xl `}>Export To Excel Sheet           <div id="lottie-container" style={{ width: '140px', height: '90px' }} /></button>
                        </section>



                    </div>
                </div>
            </div>
            <ReactTooltip
                id="my-tooltip"
                place='top'
            />
        </div >
    )
}

export default Feedbackpage
