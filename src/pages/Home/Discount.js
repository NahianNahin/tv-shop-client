import React from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import showing from '../../assets/showing.png'
const Discount = () => {
    return (
        <section className='bg-neutral rounded-md'>
                <div className="mx-20 text-white">
                    <div className="flex items-center  flex-col lg:flex-row my-40 gap-20 ">
                        <img src={showing} className=" rounded-lg shadow-2xl -mb-5 hidden lg:block" alt='chair' />
                        <div className='mt-10 mb-5'>
                            <h1 className='text-secondary text-xl font-bold '>DISCOUNT</h1>
                            <h1 className=' text-4xl '>Black Friday Discount</h1>
                            <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                            <PrimaryButton>Get Started</PrimaryButton>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default Discount;