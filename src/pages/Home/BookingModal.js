import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ selectProduct, refreshPage }) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const {
        porduct_name, resale_price, } = selectProduct;
    const onSubmit = data => {
        console.log(data);
        refreshPage();
    }
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking_modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking_modal" className="btn btn-outline btn-primary btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
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
                                <input type="email" {...register("orginal_price")} defaultValue={user.email} className="input w-full input-bordered" readOnly />
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