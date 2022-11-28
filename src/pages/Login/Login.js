import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import useToken from '../../hooks/useToken';


const Login = () => {
    useTitle('Login');
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const [loginEmail, setLoginEmail] = useState('');
    const [token] = useToken(loginEmail)
    let from = location.state?.from?.pathname || "/";
    if (token) {
        navigate(from, { replace: true });

    }
    const onSubmit = data => {
        const { email, password } = data;
        console.log(email, password);
        // SignIn  with Email & Password
        signIn(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                toast.success('Succusfully SignIn');
                setLoginEmail(user.email);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

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
                    setLoginEmail(email)
                    console.log('Post Successfully');
                }
            })
    }
    // Google SignIn
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
                saveUserDetails(detail, user.email)
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
            <div className='flex justify-center items-center my-[150px]'>
                <div className='shadow-xl p-7 rounded-2xl w-[400px] border-t-2 border-primary'>
                    <div className='flex items-center justify-center my-4 animate-bounce'>
                        <p className='text-7xl'>L</p>
                        <div className='h-10 w-10 border-8 border-dashed animate-spin border-primary rounded-full mt-5'></div>
                        <p className='text-7xl'>gin</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-control p-2'>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email")} className="input w-full input-bordered" />
                        </div>
                        <div className='form-control p-2'>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password")} className="input w-full input-bordered" />
                            <p className='text-xs my-2'>Forgot Password ?</p>
                        </div>

                        <button className='btn bg-gradient-to-r from-primary to-secondary w-full text-[16px] mb-2 text-white font-bold'>login</button>
                        <p className='text-xs text-center'>New to TV Shop? <span className='text-secondary font-bold'><Link to='/signup'>Create new account</Link></span></p>
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

export default Login;