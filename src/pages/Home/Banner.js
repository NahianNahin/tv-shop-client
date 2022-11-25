import React from 'react';
import banner from '../../assets/banner.png'
import PrimaryButton from '../../components/PrimaryButton';
const Banner = () => {
    return (
        <div className="hero" >
            <div className="hero-content flex-col lg:flex-row-reverse my-40">
                <img src={banner} className="lg:w-1/2 rounded-lg shadow-2xl" alt='chair' />
                <div className='mt-10'>
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
                    <p className="py-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;