import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useTitle from '../../hooks/useTitle';
import Blog from './Blog';


const Blogs = () => {
    useTitle('Blogs');
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get(`https://my-assignment-12-server.vercel.app/blogs`)
            .then(res => setBlogs(res.data))
            .catch(err => console.log(err))          
    }, [])
    return (
        <div>
            <h1 className='text-primary text-xl font-bold text-center'>BLOGS</h1>
            <h1 className='text-black text-4xl text-center'>Read Our Blogs</h1>
            <div className='my-20 '>
                {
                    blogs.map(blog => <Blog key={blog._id} blog = {blog}></Blog>)
                }
            </div>
        </div>
    );
};

export default Blogs;