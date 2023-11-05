import React, { useEffect } from 'react'
import { useAuth } from '../Auth/AuthContext'
import { AiOutlineDelete } from "react-icons/ai"
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-hot-toast'
import { BarLoader } from 'react-spinners'
const Cform = () => {
    const { theme } = useAuth()
    const [questions, setquestions] = useState([]);
    const [text, settext] = useState("")
    const [total, settotal] = useState("")
    const [loader, setloader] = useState(false)

    const quesions = async () => {
        try {
            setloader(true);
            const { data } = await axios.get("https://vercel-zpzg.vercel.app/api/v3/ques");
            console.log(data);

            setquestions(data.questions);
            settotal(data.t)
            setloader(false)
        } catch (error) {
            console.error(error);
        }
    };

    const addq = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/question", {
            question: text
        });
        if (data.success) {
            toast.success("Question Added Succesfully")
            quesions();
        }
    }

    const deleq = async (id) => {
        const confirmed = window.confirm("Are you sure?");

        if (confirmed) {
            console.log(id);
            try {
                const { data } = await axios.delete(`https://vercel-zpzg.vercel.app//api/v2/qdel/${id}`)

                if (data.success) {
                    toast.success("Question deleted successfully");
                    quesions();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        quesions()
    }, [])

    return (
        <div className={`p-2 h-[91vh] overflow-y-auto  sm:p-5 ${theme == "light" ? "bg-white " : "bg-[#1d232a]"}`}>
            <h1 className={` font-bold sm:text-2xl ${theme == "light" ? "text-black" : "text-white"}`}> Course Form </h1>
            {loader ? <section className='flex justify-center items-center h-[70vh]'>
                <BarLoader size={23} color='blue' />
            </section> : <>
                <div className='flex sm:flex-row px-2 w-full '>

                    <div className='w-[100%] sm:w-[80%] h-[82vh] mb-0 overflow-y-auto'>
                        {questions.map((item, index) => {
                            return (
                                <section key={index} className={`h-[12vh] flex justify-between items-center mx-2 my-4 rounded-lg ${theme == "light" ? "text-black bg-[#f5f1f0]" : "bg-[#0c131d] text-white"}`}>
                                    <section>

                                        <h1 className='px-2 font-bold text-xl'> {index + 1}) {item.question}</h1>
                                    </section>
                                    <section className='px-4'>
                                        <AiOutlineDelete onClick={() => deleq(item._id)} size={23} color='red' />
                                    </section>
                                </section>
                            );
                        })}
                    </div>



                    <div className='hidden ml-5 sm:block sm:w-[30%]'>
                        <section className='flex flex-col justify-center items-center mt-5'>
                            <button onClick={() => window.my_modal_1.showModal()} className='px-7 py-1 shadow-blue-700  bg-blue-700 rounded-md text-white font-bold '>Add Questions</button>
                            <h1 className='mt-5  font-bold text-2xl'>Total Questions</h1>
                            <h1 className=' font-bold text-xl'>{total}</h1>
                        </section>
                    </div>

                </div>
            </>}

            <button onClick={() => window.my_modal_1.showModal()} className='px-3 py-1 sm:hidden absolute bottom-1 right-2  text-white font-semibold bg-blue-700 rounded-full'> Add Questions +</button>
            <dialog id="my_modal_1" className="modal">
                <form method='dialog' className={`modal-box ${theme == 'dark' ? " text-white bg-[#1d232a]" : "text-black bg-white"}`}>
                    <button className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${theme == 'dark' ? " text-white bg-black" : ""}`}>✕</button>
                    <h1 className='text-blue-700 font-bold'>Add Question</h1>
                    <div className='w-full mt-2'>
                        <form className='w-[1005]' >


                            <input type='text' placeholder='question' className=
                                {`p-2 border-2 my-2 w-full rounded-full ${theme == "light" ? "bg-[#f5f1f0]   " : "focus:outline-none bg-[#0c131d] border-none"}' `}
                                value={text} onChange={(e) => settext(e.target.value)}
                            />

                            <button onClick={addq} className='hover:bg-blue-700 border-2 text-white px-8 py-1 mt-3 rounded-full'>Add</button>
                        </form>
                    </div>



                </form>


            </dialog>
        </div>
    )
}

export default Cform
