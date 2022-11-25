import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';

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
    //Add Advertised
    const handleAddAdvertise = id => {
        fetch(`http://localhost:5000/product/get_advertise/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Add Advertised Successfully');
                    refetch();
                }
            })
            .catch(err => console.log(err))
    }
    //Remove Advertised
    const handleRemoveAdvertise = id => {
        fetch(`http://localhost:5000/product/remove_advertise/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Remove Advertised Successfully');
                    refetch();
                }
            })
            .catch(err => console.log(err))
    }
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

                        {products.map((product, i) => <tr key={i}>
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
                            <td>
                                {
                                    product?.advertised
                                        ?
                                        <button
                                            onClick={() => handleRemoveAdvertise(product._id)}
                                            className='btn border-0 btn-sm m-4 text-white font-bold'>
                                            Remove Advertised
                                        </button>
                                        :
                                        <button
                                            onClick={() => handleAddAdvertise(product._id)}
                                            className='btn bg-gradient-to-r from-primary to-secondary border-0 btn-sm m-4 text-white font-bold'>
                                            Add Advertised
                                        </button>
                                }
                            </td>

                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;