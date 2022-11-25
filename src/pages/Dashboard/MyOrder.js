import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../contexts/AuthProvider';

const MyOrder = () => {
    const { user } = useContext(AuthContext);
    // Queries
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    console.log(bookings);
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className='p-20'>
            <p className='text-3xl'>My Appointment</p>
            <div className="overflow-x-auto mt-10">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL NO.</th>
                            <th>Name</th>
                            <th>Items</th>
                            <th>Meeting Location</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>

                        {bookings.map((booking, i) => <tr>
                            <th>{i + 1}</th>
                            <td>{booking.username}</td>
                            <td>{booking.porduct_name}</td>
                            <td>{booking.meeting_location}</td>
                            <td>{booking.price} TK</td>
                            <td>{booking?.paid
                                ?
                                <p className='font-bold'>Paid</p>
                                :
                                <Link>
                                    <button
                                        className='btn bg-gradient-to-r from-primary to-secondary border-0 btn-sm m-4 text-white font-bold'>
                                        Pay
                                    </button>
                                </Link>}
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrder;