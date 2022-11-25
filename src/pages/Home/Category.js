import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { bgColor, color, name, _id } = category;
    return (
        <div className={`card lg:card-side  shadow-xl ${bgColor} ${color}`}>

            <div className="card-body lg:text-left text-center">
                <h2 className=" text-center text-6xl font-bold text-white">{name}</h2>
                <div className='flex justify-center items-center'>
                    <Link to={`/catagories/${_id}`}>
                        <button
                            className='text-xl flex items-center gap-2 font-bold text-white'>
                            <span>Show Products</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Category;