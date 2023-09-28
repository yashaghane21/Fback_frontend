import React, { useEffect } from 'react';
import Confetti from 'react-confetti';

const Done = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/student/home';
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='flex justify-center h-[91vh] items-center'>
            <h1 className='text-4xl font-bold'> Feedback Succesfully submitted🙌</h1>
            <Confetti />
        </div>
    );
};

export default Done;
