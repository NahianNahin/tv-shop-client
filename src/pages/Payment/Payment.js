import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const item = useLoaderData();
    console.log(item);
    return (
        <div className='m-20'>
            <p className='text-3xl mb-5'>Payment</p>
            <p>Hello <span className='font-bold'>{item.username}</span></p>
            <p>Please, pay <span className='font-bold'>{item.price} TK</span> for your Selected Items <span className='font-bold'>{item.porduct_name}</span></p>
        </div>
    );
};

export default Payment;