import React, { useEffect } from 'react'
import { useAuth } from './Auth/AuthContext'
import lottie from 'lottie-web';
import ll from "../assets/dh.json"
import pp from "./ll.json"

const Excel = () => {
    const { theme } = useAuth();


    useEffect(() => {
        const anim1 = lottie.loadAnimation({
            container: document.getElementById('dh1'), // Use a different container id for the first animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: ll,
        });

        const anim2 = lottie.loadAnimation({
            container: document.getElementById('dh2'), // Use a different container id for the second animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: pp,
        });

        return () => {
            anim1.destroy();
            anim2.destroy();
        };
    }, []);
    return (
        <div className={` ${theme == "light" ? "bg-[#f5f1f0]" : " bg-[#0c131d]"} flex sm:h-[100vh] h-[110vh]  p-5`}>
            <div className='flex flex-col-reverse sm:flex-row w-full'>
            <div className='w-[100%] m-0 flex flex-col sm:flex-row sm:w-[50%]'>
                    <div id="dh1" className=' w-[100%]  sm:w-[100%] sm:h-[100vh]' />


                </div>
                <div className='w-[100%] flex flex-col justify-center items-center sm:w-[50%]'>
                    <h1 className={`font-bold text-md text-blue-500 sm:text-2xl`}>Feedback Data Made Easy: HoD-Enabled Excel Downloads.</h1>
                    <p className={`font-bold mt-3 px-3 justify-center`}>The "Feedback Data Export to Excel" feature is a powerful tool tailored for the
                     Head of Department (HoD) role within the web application. It simplifies the process of extracting valuable feedback data, enabling seamless integration with Excel spreadsheets for further analysis and record-keepin</p>
                        <div id="dh2" className=' w-[100%] hidden sm:block sm:w-[100%] sm:h-[20vh]' />

                </div>
              =
            </div>

        </div>
    )
}

export default Excel
