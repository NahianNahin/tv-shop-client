
import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import BookingModal from './BookingModal';

const ProductsEachCategory = () => {
    const navigate = useNavigate();

    const refreshPage = () => {
        navigate(0);
    }
    const [selectProduct, setselectProduct] = useState(null)
    const products = useLoaderData();
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
                        ></ProductCard>)
                }
            </div>
            {
                selectProduct &&
                <BookingModal
                    selectProduct={selectProduct}
                    action={refreshPage}
                ></BookingModal>
            }
        </div>
    );
};

export default ProductsEachCategory;