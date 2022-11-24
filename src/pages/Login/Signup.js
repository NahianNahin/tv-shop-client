import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const { email, password, image, role, name } = data;
        const user = {
            name,
            password,
            email,
            role,
            image
        }
        console.log(user);
        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };
    return (
        <div>
            <div className='flex justify-center items-center my-[50px]'>
                <div className='shadow-xl p-7 rounded-2xl w-[450px] lg:w-[700px] border-t-2 border-primary'>
                    <div className='flex items-center justify-center my-4 animate-bounce'>
                        <p className='text-7xl'>Sign Up</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex flex-col lg:flex-row'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name")} className="input w-full input-bordered" />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} className="input w-full input-bordered" />
                            </div>

                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password")} className="input w-full input-bordered" />

                            </div>
                            <div className="form-control p-2 w-full">
                                <label className="label">
                                    <span className="label-text">Role in the Shop</span>
                                </label>
                                <select {...register("role")} className="input w-full input-bordered">
                                    <option value='Buyer'>Buyer</option>
                                    <option value='Seller'>Seller</option>

                                </select>
                            </div>
                        </div>

                        <input {...register("image")} type="file" className="file-input file-input-bordered file-input-primary w-full text-[16px]  my-4  font-bold" accept='image/*' /> <br />

                        <button className='btn bg-gradient-to-r from-primary to-secondary w-full text-[16px] mb-2 text-white font-bold'>Sign Up</button>
                        <p className='text-xs text-center'>Already Have An Account ? <span className='text-secondary font-bold'><Link to='/login'>Go To Login</Link></span></p>
                    </form>
                    <div className='flex  gap-3 items-center my-5'><hr className='border-[1px] w-1/2' /> <span className='font-bold'>OR</span> <hr className='border-[1px] w-1/2' /></div>
                    <button className='btn btn-outline w-full btn-primary font-bold'>
                        CONTINUE WITH GOOGLE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;