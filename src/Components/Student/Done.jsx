import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useAuth } from '../Auth/AuthContext';

const Done = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/';
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    const { theme } = useAuth()
    return (
        <div className={`p-2 h-[91vh] flex justify-center items-center overflow-y-auto sm:p-5 ${theme == "light" ? "bg-white " : "bg-[#1d232a]"}`}>
            <h1 className='text-xl sm:text-4xl font-bold'> Feedback Submitted Succesfully🙌</h1>
            <Confetti />
        </div>
    );
};

export default Done;
