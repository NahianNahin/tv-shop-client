import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LoodingSpinner from '../../components/LoadingSpinner'
import ProductCard from '../../components/ProductCard';
import BookingModal from './BookingModal';
const Advertisement = () => {
    const [selectProduct, setselectProduct] = useState(null);
    const { data: advertise_products = [], isLoading ,refetch} = useQuery({
        queryKey: ['advertise_products'],
        queryFn: async () => {
            const res = await fetch(`https://my-assignment-12-server.vercel.app/advertise_products`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
                },
            });
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
                advertise_products.length !== 0 
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
                            refetch={refetch}
                        ></BookingModal>
                    }
                </>
            }
        </div>
    );
};

export default Advertisement;