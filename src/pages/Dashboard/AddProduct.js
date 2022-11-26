import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    // Queries
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/categories`);
            const data = await res.json();
            return data;
        }
    })
    const imgbbKey = process.env.REACT_APP_imgbb_key;

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const {
            porduct_name,
            location,
            resale_price,
            orginal_price, use_duration,
            category,
            phone_number,
            product_condition,
            details
        } = data;
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let currentDate = `${day}-${month}-${year}`;
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
                if (dataImg.success || !isLoading) {
                    const productImage = dataImg.data.url;
                    const product = {
                        porduct_name,
                        seller: user.displayName,
                        post_date: currentDate,
                        location,
                        resale_price,
                        orginal_price,
                        use_duration,
                        category_id: category.split(' ')[0],
                        category_name: category.split(' ')[1],
                        productImage,
                        phone_number,
                        product_condition,
                        details,
                        sellerEmail: user.email,

                    }
                    console.log(product);
                    // POST
                    fetch(`http://localhost:5000/products`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                console.log('Post Successfully');
                                toast.success('Product Add successfully');
                                navigate('/dashboard/my_product');
                            }
                        })

                }
            })
            .catch(error => console.log(error));



    }
    return (
        <div>
            <div className='flex justify-center items-center my-[50px]'>
                <div className='shadow-xl p-7 rounded-2xl w-[450px] lg:w-[700px] border-t-2 border-primary'>
                    <div className='flex items-center justify-center my-7 animate-bounce'>
                        <p className='text-7xl'>Pr</p>
                        <div className='h-10 w-10 border-8 border-dashed animate-spin border-primary rounded-full mt-5'></div>
                        <p className='text-7xl'>duct</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex flex-col lg:flex-row'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" {...register("porduct_name")} className="input w-full input-bordered" required />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input type="text" {...register("location")} className="input w-full input-bordered" required />
                            </div>

                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Resale Price</span>
                                </label>
                                <input type="number" {...register("resale_price")} className="input w-full input-bordered" required />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Orginal Price</span>
                                </label>
                                <input type="number" {...register("orginal_price")} className="input w-full input-bordered" required />
                            </div>

                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Phone Nomber</span>
                                </label>
                                <input type="text" {...register("phone_number")} className="input w-full input-bordered" required />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Product_Condition</span>
                                </label>
                                <select {...register("product_condition")} className="input w-full input-bordered">
                                    <option value='Excellent'>Excellent</option>
                                    <option value='Good'>Good</option>
                                    <option value='Fair'>Fair</option>
                                </select>
                            </div>

                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <div className="form-control p-2 w-full">
                                <label className="label">
                                    <span className="label-text">Years of Use</span>
                                </label>
                                <select {...register("use_duration")} className="input w-full input-bordered">
                                    {[...Array(10).keys()].map(number => <option key={number + 1} value={`${number + 1} ${(number + 1 === 1) ? `year` : `years`}`}>{number + 1} {(number + 1 === 1) ? `year` : `years`}</option>)}
                                </select>
                            </div>
                            <div className="form-control p-2 w-full">
                                <label className="label">
                                    <span className="label-text">Catagory</span>
                                </label>
                                <select {...register("category")} className="input w-full input-bordered">

                                    {
                                        categories.map(category => <option key={category._id} value={`${category._id} ${category.category_name}`}>{category.name}</option>)
                                    }

                                </select>
                            </div>
                        </div>

                        <input
                            {...register("image")}
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full text-[16px]  my-4 font-bold"
                            accept='image/*'
                            required /> <br />
                        <textarea
                            {...register("details")}
                            className="textarea textarea-primary w-full mb-3"
                            placeholder="Details"
                            required>
                        </textarea>
                        <button
                            className='btn bg-gradient-to-r from-primary to-secondary w-full text-[16px] mb-2 text-white font-bold'>
                            ADD product
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddProduct;