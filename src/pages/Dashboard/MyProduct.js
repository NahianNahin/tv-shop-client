import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';

import LoodingSpinner from '../../components/LoadingSpinner'
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
const MyProduct = () => {
    useTitle('My Products');
    const { user } = useContext(AuthContext);
    // Queries
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://my-assignment-12-server.vercel.app/seller_products?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    //Add Advertised
    const handleAddAdvertise = id => {
        fetch(`https://my-assignment-12-server.vercel.app/product/get_advertise/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
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
        fetch(`https://my-assignment-12-server.vercel.app/product/remove_advertise/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
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
    //Sold
    const handleAddSold = id => {
        fetch(`https://my-assignment-12-server.vercel.app/product/sold_status/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Status Change Successfully');
                    refetch();
                }
            })
            .catch(err => console.log(err))
    }
    //Sold
    const handleAddUnsold = id => {
        fetch(`https://my-assignment-12-server.vercel.app/product/unsold_status/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Status Change Successfully');
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
            {
                products.length === 0
                    ?
                    <p className='text-2xl font-bold'>No Product Available.Please Add Products</p>
                    :
                    <div >
                        <p className='text-3xl'>My Products</p>
                        <div className="overflow-x-auto mt-10">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>SL NO.</th>
                                        <th>Avatar</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Change Status</th>
                                        <th> Status</th>
                                        <th><p className='text-center'>Action</p></th>
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
                                        <td>{product.resale_price} TK</td>
                                        <td>
                                            {
                                                product?.sold
                                                    ?
                                                    <button
                                                        onClick={() => handleAddUnsold(product._id)}
                                                        className='btn btn-sm btn-success font-bold btn-outline'>
                                                        Available
                                                    </button>
                                                    :
                                                    <button
                                                        onClick={() => handleAddSold(product._id)}
                                                        className='btn btn-sm btn-error font-bold btn-outline'>
                                                        Sold
                                                    </button>

                                            }
                                        </td>
                                        <td>
                                            {
                                                product?.sold
                                                    ?
                                                    <span className='font-bold'>Sold</span>
                                                    :
                                                    <span>Available</span>
                                            }
                                        </td>
                                        <td>
                                            {
                                                product?.advertised
                                                    ?
                                                    <button
                                                        onClick={() => handleRemoveAdvertise(product._id)}
                                                        className='btn border-0 btn-sm  text-white font-bold'>
                                                        Remove Advertised
                                                    </button>
                                                    :
                                                    <button
                                                        onClick={() => handleAddAdvertise(product._id)}
                                                        className='btn bg-gradient-to-r from-primary to-secondary border-0 btn-sm  text-white font-bold'>
                                                        Add Advertised
                                                    </button>
                                            }
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    );
};

export default MyProduct;