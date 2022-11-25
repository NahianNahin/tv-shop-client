import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

import LoodingSpinner from '../../components/LoadingSpinner'
import { AuthContext } from '../../contexts/AuthProvider';
const MyProduct = () => {
    const { user } = useContext(AuthContext);
    // Queries
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoodingSpinner></LoodingSpinner>
    }
    return (
        <div className='p-20'>
            <p className='text-3xl'>My Products</p>
            <div className="overflow-x-auto mt-10">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL NO.</th>
                            <th>Avatar</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>


                        </tr>
                    </thead>
                    <tbody>

                        {products.map((product, i) => <tr>
                            <th>{i + 1}</th>
                            <td>
                                <div className="avatar">
                                    <div className="w-20 rounded">
                                        <img src={product.productImage} alt="Product" />
                                    </div>
                                </div>
                            </td>
                            <td><span className='font-bold'>{product.porduct_name}</span></td>
                            <td>{product.resale_price}</td>
                            <td>Available</td>
                            <td><button className='btn bg-gradient-to-r from-primary to-secondary border-0 btn-sm m-4 text-white font-bold'>Advertised</button></td>

                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;