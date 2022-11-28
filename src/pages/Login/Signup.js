import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import useToken from '../../hooks/useToken';

const Signup = () => {
    useTitle('Signup');
    const navigate = useNavigate();
    const { createUser, googleSignIn, handleUpdateProfile } = useContext(AuthContext);
    const [signupEmail,setSignupEmail] = useState('');
    const [token] = useToken(signupEmail);
    if(token){
        navigate('/')
    }
    const { register, handleSubmit } = useForm();
    const imgbbKey = process.env.REACT_APP_imgbb_key;
    const onSubmit = data => {
        const { email, password, role, name } = data;
        // Upload image in IMGBB 
        const img = data.image[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(dataImg => {
                console.log(dataImg);
                if (dataImg.success) {
                    const imageUrl = dataImg.data.url;
                    const userDetails = {
                        name,
                        email,
                        role,
                        photoURL: imageUrl
                    }
                    const profile = {
                        displayName: name,
                        photoURL: imageUrl
                    }
                    // Sign Up with Email & Password
                    createUser(email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            console.log(user);
                            handleUpdateProfile(profile)
                                .then(() => {
                                    console.log('Profile updated!');
                                }).catch((error) => {
                                    console.log(error);
                                });
                            saveUserDetails(userDetails, user.email)
                            toast.success('Succusfully SignUp');
                            
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode, errorMessage);
                        });
                }
            })
            .catch(error => console.log(error));

    };
    // Save user details to DB
    const saveUserDetails = (details, email) => {
        fetch(`https://my-assignment-12-server-nahiannahin.vercel.app/users?email=${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
            },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setSignupEmail(email);
                    console.log('Post Successfully');
                }
            })
    }

    // Google Signin
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const detail = {
                    name: user.displayName,
                    email: user.email,
                    role: 'Buyer',
                    photoURL: user.photoURL
                }
                saveUserDetails(detail, user.email);
                toast.success('Succusfully SignIn');
                


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

    }
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
                    <button
                        onClick={handleGoogleSignIn}
                        className='btn btn-outline w-full btn-primary font-bold'>
                        CONTINUE WITH GOOGLE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;