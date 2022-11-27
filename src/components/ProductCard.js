import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';



const ProductCard = ({ product, setselectProduct, refetch }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const {
        _id,
        porduct_name,
        productImage,
        details,
        location,
        resale_price,
        orginal_price,
        use_duration,
        seller,
        post_date,
        phone_number,
        product_condition
    } = product;

    //Add Report
    const handleAddReport = id => {
        fetch(`http://localhost:5000/product/add_reported/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('TV_Shop_Token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Add Report Successfully');
                    refetch();
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="hero" >
            <div className="hero-content flex-col lg:flex-row-reverse my-20">
                <div className="avatar">
                    <div className="w-[30rem] rounded shadow-sm">
                        <img src={productImage} alt="Product" />
                    </div>
                </div>
                <div className='mt-10'>
                    <h1 className="text-5xl font-semibold ">{porduct_name}</h1>
                    <p className='my-4'>
                        <span className='mr-2'><span className='font-bold'>Location : </span>{location} </span>
                        <span className='mr-2'><span className='font-bold'>Resale Price : </span>{resale_price} TK </span>
                        <span className='mr-2'><span className='font-bold'>Orginal Price : </span>{orginal_price} TK </span>
                    </p>
                    <p className="py-2">{details}</p>
                    <p className='my-2'>
                        <span className='mr-2'><span className='font-bold'>Seller : </span>{seller}</span>
                        <span className='mr-2'><span className='font-bold'>Contact : </span>{phone_number}</span>
                        <span className='mr-2'><span className='font-bold'>Post Date : </span>{post_date}</span>
                    </p>
                    <p className='my-2'>
                        <span className='mr-2'><span className='font-bold'>Used : </span>{use_duration} </span>
                        <span className='mr-2'><span className='font-bold'>Product Condition : </span>{product_condition}</span>

                    </p>
                    {
                        user?.uid
                            ?
                            <label
                                onClick={() => setselectProduct(product)}
                                htmlFor="booking_modal"
                                className="btn bg-gradient-to-r from-primary to-secondary border-0 text-base-100 rounded-0">
                                Book Now
                            </label>
                            :
                            <label
                                onClick={() => navigate('/login')}
                                className="btn bg-gradient-to-r from-primary to-secondary border-0 text-base-100 rounded-0">
                                Book Now
                            </label>
                    }
                    {
                        product?.reported
                            ?
                            <span className='text-xl ml-10 font-bold italic'>Reported</span>
                            :
                            <button onClick={() => handleAddReport(_id)} className='btn text-accent ml-3' disabled={!user?.uid}>Add Report</button>
                    }
                </div>
            </div>

        </div>
    );
};

export default ProductCard;