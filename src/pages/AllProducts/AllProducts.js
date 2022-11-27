import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import BookingModal from '../Home/BookingModal';
import LoodingSpinner from '../../components/LoadingSpinner'
import useTitle from '../../hooks/useTitle';
const AllProducts = () => {
    useTitle('All Products')
    const [selectProduct, setselectProduct] = useState(null);
    const { data: all_products = [], isLoading ,refetch} = useQuery({
        queryKey: ['all_products'],
        queryFn: async () => {
            const res = await fetch(`https://my-assignment-12-server.vercel.app/all_products`,{
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
                all_products.length === 0 ? 
                <h1 className='text-black text-4xl text-center'>No Items Available</h1>
                :
                <>
                    <h1 className='text-primary text-xl font-bold text-center'>All PRODUCTS</h1>
                    <h1 className='text-black text-4xl text-center'>All Our Resale Products</h1>
                    <div>
                        {
                            all_products.map(product => <ProductCard
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

export default AllProducts;