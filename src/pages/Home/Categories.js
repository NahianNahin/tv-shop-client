import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Category from './Category';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/categories`)
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
            
    }, [])
    return (
        <div className='my-10'>
            <h1 className='text-primary text-xl font-bold text-center'>CATEGORIES</h1>
            <h1 className='text-black text-4xl text-center'>Categories We Provide</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-7 m-20'>
                {
                    categories.map(category => <Category key={category._id} category={category}></Category>)
                }
            </div>
        </div>
    );
};

export default Categories;