
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductCard from '../../components/ProductCard';
import BookingModal from './BookingModal';

const ProductsEachCategory = () => {
    const [selectProduct, setselectProduct] = useState(null)
    const id = useLoaderData();
    // Queries
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/${id}`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <h1 className='text-blue-700 text-xl font-bold text-center'>PRODUCTS</h1>
            <h1 className='text-black text-4xl text-center'>Products We Resale</h1>
            <div>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                        setselectProduct={setselectProduct}
                        refetch={refetch}
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
        </div>
    );
};

export default ProductsEachCategory;