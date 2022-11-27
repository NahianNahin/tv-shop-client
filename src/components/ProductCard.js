import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useBuyer from '../hooks/useBuyer';



const ProductCard = ({ product, setselectProduct, refetch }) => {
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    const navigate = useNavigate();
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

    // Queries
    const { data: sellerDetail = [] } = useQuery({
        queryKey: ['seller', seller],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users_by_seller?seller=${seller}`);
            const data = await res.json();
            return data;
        }
    })
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
                    <div className='my-2'>
                        <div
                            className='mr-2 flex gap-1 items-center'>
                            <span className='font-bold'>Seller : </span>
                            <div className='flex gap-1 items-center'>
                                <div>
                                    {sellerDetail?.verified
                                        &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 inline-block p-0 text-green-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                    }
                                </div>
                                <div>
                                    {seller}
                                </div>
                            </div>
                        </div>
                        <span className='mr-2'><span className='font-bold'>Contact : </span>{phone_number}</span>
                        <span className='mr-2'><span className='font-bold'>Post Date : </span>{post_date}</span>
                    </div>
                    <p className='my-2'>
                        <span className='mr-2'><span className='font-bold'>Used : </span>{use_duration} </span>
                        <span className='mr-2'><span className='font-bold'>Product Condition : </span>{product_condition}</span>
                        <span className='mr-2'>
                            <span className='font-bold mr-2'>
                                Product Status :
                            </span>
                            {
                                product?.sold
                                    ?
                                    <span className='badge badge-ghost p-2 font-bold'>Sold</span>
                                    :
                                    <span className='badge badge-ghost p-2 font-bold'>Available</span>
                            }
                        </span>
                    </p>
                    {
                        user?.uid
                            ?
                            <>
                                {
                                    isBuyer
                                    &&
                                    <label
                                        onClick={() => setselectProduct(product)}
                                        htmlFor="booking_modal"
                                        className="btn bg-gradient-to-r from-primary to-secondary border-0 text-base-100 rounded-0">
                                        Book Now
                                    </label>
                                }
                            </>
                            :
                            <label
                                onClick={() => navigate('/login')}
                                className="btn bg-gradient-to-r from-primary to-secondary border-0 text-base-100 rounded-0 my-2">
                                Book Now
                            </label>
                    }
                    {
                        product?.reported
                            ?
                            <>
                                {isBuyer && <span className='text-xl ml-10 font-bold italic'>Reported</span>}
                            </>
                            :
                            <>
                                {user?.uid && isBuyer && <button onClick={() => handleAddReport(_id)} className='btn text-accent ml-3' >Add Report</button>}
                            </>
                    }
                </div>
            </div>

        </div>
    );
};

export default ProductCard;


