import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ item }) => {
    const { price, username, email, _id } = item;
    const [cardError, setCardError] = useState('');
    const [cardSuccess, setCardSuccess] = useState('');
    const [cardTransation, setCardTransation] = useState('');
    const [cardLoading, setCardLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log(error.message);
            setCardError(error.message);
        }
        else {
            setCardError('')
        }
        setCardSuccess('');
        setCardLoading(true);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn mt-5 btn-sm bg-gradient-to-r from-primary to-secondary border-0 text-base-100 rounded-0'
                    type="submit"
                    disabled={!stripe}>
                    Pay
                </button>
            </form>
            <p className='text-error p-3'>{cardError}</p>
            <p className='text-primary p-3'>{cardSuccess}</p>
            {
                cardSuccess && <p>Transation Id : {cardTransation}</p>
            }
        </>
    );
};

export default CheckoutForm;