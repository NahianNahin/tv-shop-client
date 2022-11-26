import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoodingSpinner from '../../components/LoadingSpinner'
import ProductCard from '../../components/ProductCard';
import { AuthContext } from '../../contexts/AuthProvider';
import BookingModal from './BookingModal';
const Advertisement = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    const refreshPage = () => {
        navigate(0);
    }
    const [selectProduct, setselectProduct] = useState(null);
    const { data: advertise_products = [], isLoading } = useQuery({
        queryKey: ['advertise_products'],

        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/advertise_products`);
            const data = await res.json();
            return data;
        }

    })
    if (isLoading) {
        return <LoodingSpinner></LoodingSpinner>
    }
    return (
        <div>
            {
                advertise_products.length !== 0 && user?.uid
                &&
                <>
                    <h1 className='text-primary text-xl font-bold text-center'>ADVERTISEMENT</h1>
                    <h1 className='text-black text-4xl text-center'>Advertised Items</h1>
                    <div>
                        {
                            advertise_products.map(product => <ProductCard
                                key={product._id}
                                product={product}
                                setselectProduct={setselectProduct}
                            ></ProductCard>)
                        }
                    </div>
                    {
                        selectProduct &&
                        <BookingModal
                            selectProduct={selectProduct}
                            setselectProduct={setselectProduct}
                            action={refreshPage}
                        ></BookingModal>
                    }
                </>
            }
        </div>
    );
};

export default Advertisement;