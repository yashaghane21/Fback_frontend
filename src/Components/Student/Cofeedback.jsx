import React, { useEffect } from 'react';
import { Button, Select } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { BarLoader } from "react-spinners"
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
const { Option } = Select;

const Cofeedback = () => {
    let values = ['good😃', 'average🙂', 'below average🙂'];
    const navigate = useNavigate()
    const [questions, setquestions] = useState([]);
    const { theme, auth } = useAuth();
    const [fac, setfac] = useState("")
    const [sub, setsub] = useState([]);
    const [sems, setsem] = useState("")
    const [dep, setdep] = useState("")
    const [subject, setsubject] = useState("")

    const [loader, setloader] = useState(false)
    const id = localStorage.getItem("userid")
    const [feedbackData, setFeedbackData] = useState([])
    console.log(id)

    const quesions = async () => {
        try {
            setloader(true);
            const { data } = await axios.get("https://f-backend-7g5y.onrender.com/api/v3/ques");
            console.log(data);

            setquestions(data.questions);
            setloader(false)
        } catch (error) {
            console.error(error);
        }
    };



    const getuser = async () => {
        try {
            console.log(id)
            const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v3/user", {
                id: id
            })
            console.log(data)
            console.log("useert", data.user.sem._id)
            setsem(data.user.sem._id)

            setdep(data.user.department)

        } catch (error) {

        }
    }

    const subjects = async () => {
        try {
            console.log("shyam", sems);
            const response = await axios.post("https://f-backend-7g5y.onrender.com/api/v3/subjects", {
                sem: sems
            });

            console.log("uuuu", response.data)
            setsub(response.data.subjects)

        } catch (error) {
            console.error(error)
        }

    }

    const handlechange = (value) => {
        console.log("subject", value)
        setsubject(value)


    };

    const handleFeedbackChange = (questionId, answer) => {
        console.log("yash", questionId, answer);
        console.log(feedbackData);
        setFeedbackData([...feedbackData, { question: questionId, answer }]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (feedbackData == "") {
            toast.error("Please Provide Answers")
        } else {
            try {
                const { data } = await axios.post('https://f-backend-7g5y.onrender.com/api/v3/feedback', {
                    department: dep,
                    sem: sems,
                    course: subject,
                    student: id,
                    feedback: feedbackData
                });
                if (data?.success) {
                    toast.success("Feedback Submited Succesfully ")
                    navigate("/done")

                }
                else {

                }

            } catch (error) {
                console.error(error);
                alert('Error submitting feedback. Please try again.');
            }
        }

    }

    useEffect(() => {
        quesions();
        getuser();
        console.log("dfdfdfdf", sems)
    }, []);

    useEffect(() => {
        if (sems) {
            subjects()
        }


    }, [sems]);


    return (
        <div className={`h-[91vh] overflow-y-auto w-full ${theme == 'light' ? 'text-black bg-white' : 'bg-[#1d232a]'}`}>
            <h1 className={` text-center font-semibold sm:text-2xl p-5 ${theme == 'light' ? '' : 'text-white'}`}>
                FeedBack Form

            </h1>
            <section className='flex flex-col sm:flex-row items-center  justify-between mb-2 mt-5'>
                <Select className=' w-[50vh] ant-input text-xl  px-2 text-black ' placeholder='Select a subject' onChange={handlechange}>
                    {sub.map((item, index) => (
                        <Option key={index} value={item._id} >
                            <h1 className='font-semibold'>{item.name} ||  {item.teacher.name}</h1>
                        </Option>
                    ))}
                </Select>

            </section>
            <section className={`h-[30vh] mb-5 p-1 sm:p-5 text-left ${theme == 'light' ? '' : 'text-white'}`}>
                <h1 className='text-center'>Welcome to Our Feedback Form:</h1>
                <h1 className='px-1 text-xs my-2'>
                    1) We've prepared guidelines to ensure your comfort while sharing feedback.
                </h1>
                <h1 className='px-2 text-xs my-2'>2) Your privacy is our priority; your information remains confidential</h1>
                <h1 className='px-2 text-xs my-2'>3) Honest opinions are welcome, and anonymity is respected.</h1>
                <h1 className='px-2 text-xs my-2'>4) Please offer feedback respectfully and constructively</h1>
                <h1 className='px-2 text-xs my-2'>5) We've prepared guidelines to ensure your comfort while sharing feedback.</h1>
            </section>
            <hr className='text-black mt-5'></hr>
            {(loader ?
                <section className='flex justify-center items-center h-[50vh]'>
                    <section className=' '><BarLoader size={23} color='blue' className='w-full' /></section>
                </section>
                :
                <form className='p-5 w-full mt-5 mb-5' onSubmit={handleSubmit}>
                    <section className='pb-5 '>
                        {questions.map((qitem, index) => (
                            <section
                                className={`h-[20vh] sm:h-[12vh] shadow-xl w-full flex sm:justify-between sm:mb-5 mb-[10vh] flex-col sm:flex-row rounded-md  ${theme == 'light' ? 'bg-[#f5f1f0]' : 'bg-[#0c131d] text-blue-500'
                                    }`}
                                key={index}
                            >
                                <h1 className='mt-8 px-2 text-center'>
                                    {index + 1}) {qitem.question}
                                </h1>
                                <section className='p-6 w-full sm:w-[50vh] '>
                                    <Select
                                        className='w-full ant-input text-xl rounded-2xl text-black'
                                        placeholder='Select a feedback'
                                        onChange={(value) => handleFeedbackChange(qitem._id, value)}
                                    >
                                        {values.map((item, index) => (
                                            <Option key={index} value={item}>
                                                <h1 className='font-semibold'>{item}</h1>
                                            </Option>
                                        ))}
                                    </Select>
                                </section>
                            </section>
                        ))}
                    </section>
                    <div className="flex justify-center">
                        <button className='bg-blue-700 rounded-md px-3 py-1 text-white'>Submit</button>
                    </div>
                </form>
            )}


        </div>
    );
};

export default Cofeedback;
