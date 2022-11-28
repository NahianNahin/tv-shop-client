import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ selectProduct, refetch, setselectProduct }) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const {
        porduct_name, resale_price, productImage, _id } = selectProduct;
    const onSubmit = data => {
        const newData = { ...data, productImage, product_id : _id }
        fetch(`https://my-assignment-12-server-nahiannahin.vercel.app/bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
            },
            body: JSON.stringify(newData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    console.log('Post Successfully');
                    toast.success('Booking successfully');
                    setselectProduct(null)
                    refetch();
                }
            })

    }
    const handleClose = () => {
        setselectProduct(null);
        refetch();
    }
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking_modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={handleClose} htmlFor="booking_modal" className="btn btn-outline btn-primary btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Welcome to book our products</h3>
                    <p className="py-4">We are providing Resale Products basically TV set with a very low cost.</p>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex flex-col '>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Item Name</span>
                                </label>
                                <input type="text" {...register("porduct_name")} defaultValue={porduct_name} className="input w-full input-bordered" readOnly />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" {...register("price")} defaultValue={resale_price} className="input w-full input-bordered" readOnly />
                            </div>

                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">User</span>
                                </label>
                                <input type="text" {...register("username")} defaultValue={user.displayName} className="input w-full input-bordered" readOnly />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">User Email</span>
                                </label>
                                <input type="email" {...register("email")} defaultValue={user.email} className="input w-full input-bordered" readOnly />
                            </div>

                        </div>
                        <div className='flex flex-col lg:flex-row mb-5'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Phone Nomber</span>
                                </label>
                                <input type="text" {...register("phone_number")} className="input w-full input-bordered" required />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Meeting location</span>
                                </label>
                                <input type="text" {...register("meeting_location")} className="input w-full input-bordered" required />
                            </div>
                        </div>
                        <button
                            className='btn bg-gradient-to-r from-primary to-secondary w-full text-[16px] mb-2 text-white font-bold'>
                            BOOK
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;