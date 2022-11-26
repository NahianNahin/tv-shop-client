import React from 'react';

const Blog = ({ blog }) => {
    const { 
        ques,
        para1,
        para2,
        para3,
        para4,
        para5,

    } = blog;
    return (
        <div className='flex items-center justify-center'>
            <div className="card w-11/12 shadow-xl mb-10 bg-slate-100">
                <div className="card-body">
                    <h2 className="card-title"> {ques}</h2>
                    <p>{para1}</p>
                    <p>{para2}</p>
                    <p>{para3}</p>
                    <p>{para4}</p>
                    <p>{para5}</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;