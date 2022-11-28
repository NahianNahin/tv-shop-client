import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import PrimaryButton from '../../components/PrimaryButton';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
const Profile = () => {
    useTitle('Profile -- Dashboard');
    const { user } = useContext(AuthContext);
    // Queries
    const { data: profileUser = [], isLoading } = useQuery({
        queryKey: ['profileUser', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://my-assignment-12-server-nahiannahin.vercel.app/users?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    console.log(profileUser);
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className='m-20'>
            <h1 className='text-primary text-xl font-bold text-center'>PROFILE</h1>
            <h1 className='text-black text-4xl text-center'>Welcome To Dashboard.</h1>
            <div className="hero" >
                <div className="hero-content flex-col lg:flex-row-reverse my-40">
                    <div className="avatar">
                        <div className="w-96 rounded shadow-2xl">
                            <img src={user.photoURL} alt="User"/>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <h1 className="text-5xl font-bold my-5">Dear, {profileUser.role}</h1>
                        <h1 className="text-2xl font-semibold"> Name : {user.displayName}</h1>
                        <h1 className="text-2xl font-semibold"> Email : {user.email}</h1>
                        <p className="py-6">Hello there, Welcome to our store. We are providing Resale Products basically TV set with a very low cost. Seller are aslo welcome to sell there products.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;