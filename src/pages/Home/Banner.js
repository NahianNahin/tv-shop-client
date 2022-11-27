import React from 'react';
import banner from '../../assets/banner.png'
import PrimaryButton from '../../components/PrimaryButton';
const Banner = () => {
    return (
        <div className="hero" >
            <div className="hero-content flex-col lg:flex-row-reverse my-40">
                <img src={banner} className="lg:w-1/2 rounded-lg shadow-2xl" alt='chair' />
                <div className='mt-10'>
                    <h1 className="text-5xl font-bold">Welcome To Our <br /> Resale TV Shop.</h1>
                    <p className="py-6">Hello there, Welcome to our store. We are providing Resale Products basically TV set with a very low cost. Seller are aslo welcome to sell there products.</p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;