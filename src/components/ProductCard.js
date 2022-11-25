import React from 'react';



const ProductCard = ({ product, setselectProduct }) => {
    const {
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
    return (
        <div className="hero" >
            <div className="hero-content flex-col lg:flex-row-reverse my-20">
                <img src={productImage} className="lg:w-1/2 rounded-lg shadow-2xl" alt='chair' />
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
                    <label
                        onClick={() => { setselectProduct(product) }}
                        htmlFor="booking_modal"
                        className="btn bg-gradient-to-r from-primary to-secondary border-0 text-base-100 rounded-0">
                        Book Now
                    </label>
                    <button className='btn text-accent ml-3'>Add to Wishlist</button>
                </div>
            </div>

        </div>
    );
};

export default ProductCard;