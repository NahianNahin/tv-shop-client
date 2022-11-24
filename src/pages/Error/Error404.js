import React from 'react';
import error from '../../assets/404.png'

const Error404 = () => {
    return (
        <div className='flex justify-center items-center h-full my-64'>
            <div className='animate-ping'>
                <img src={error} alt="" />
            </div>
        </div>
    );
};

export default Error404;