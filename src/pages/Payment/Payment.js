import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_PK_TEST_KEY);
const Payment = () => {
    useTitle('Payment');
    const item = useLoaderData();
    console.log(item);
    return (
        <div className='m-20'>
            <p className='text-5xl mb-5'>Payment</p>
            <p className='text-2xl mb-3'>Hello <span className='font-bold'>{item.username}</span></p>
            <p>Please, pay <span className='font-bold'>{item.price} TK</span> for your Selected Items <span className='font-bold'>{item.porduct_name}</span></p>
            <div className='w-96 m-5 p-10 shadow-md bg-base-100 rounded-md'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        item={item}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;