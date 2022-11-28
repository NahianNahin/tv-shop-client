import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import LoodingSpinner from '../../components/LoadingSpinner'
import useTitle from '../../hooks/useTitle';
const AllSeller = () => {
    useTitle('All Sellers');
    // Queries
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['Seller'],
        queryFn: async () => {
            const res = await fetch(`https://my-assignment-12-server.vercel.app/users_role?role=Seller`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    //Seller Verified
    const handleSellerVerified = id => {
        fetch(`https://my-assignment-12-server.vercel.app/user/seller_verified/${id}`, {
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
    // DELETED
    const handleDeleteUser = id => {
        fetch(`https://my-assignment-12-server.vercel.app/users/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Successfully Delete User');
                    refetch();
                }

            })
    }
    if (isLoading) {
        return <LoodingSpinner></LoodingSpinner>
    }
    return (
        <div className='p-20'>
            {
                users.length === 0
                    ?
                    <p className='text-2xl lg:text-3xl text-error'>No Seller Available</p>
                    :
                    <div >
                        <p className='text-3xl'>All Sellers</p>
                        <div className="overflow-x-auto mt-10">
                            <table className="table w-full">

                                <thead>
                                    <tr>
                                        <th>SL NO.</th>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Approve</th>
                                        <th>Status</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {users.map((user, i) => <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-16 rounded-full">
                                                    <img src={user.photoURL} alt="Product" />
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className='font-bold'>{user.name}</span></td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user?.verified
                                                    ?
                                                    <p className='font-bold'>Approved</p>
                                                    :
                                                    <button
                                                        onClick={() => handleSellerVerified(user._id)}
                                                        className='btn btn-sm text-accent font-bold'>
                                                        verify
                                                    </button>
                                            }
                                        </td>
                                        <td>{
                                            user?.verified
                                                ?
                                                <p className='font-bold'>Verified</p>
                                                :
                                                <p>Pending...</p>
                                        }</td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-error">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
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

export default AllSeller;