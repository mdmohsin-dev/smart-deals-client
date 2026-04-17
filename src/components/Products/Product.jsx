import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {
    const {_id, image, title, condition, price_min, price_max } = product
    return (
        <div>
            <div className='text-black flex flex-col justify-between bg-white h-125 p-4 rounded-lg border border-red-500'>
                <div className='bg-[#D9D9D9] rounded-lg w-full h-2/3'>
                    <img src={image} className='w-full h-full' alt="" />
                </div>
                <h3 className='text-2xl font-medium'>{title} - [{condition}]</h3>
                <p className='text-[#8A50ED] font-medium'>${price_min} - {price_max}</p>
                <Link to={`/productDetails/${_id}`}
                className='btn btn-outline text-[#8A50ED] hover:text-white hover:bg-[#8A50ED]'>View Details</Link>
            </div>
        </div>
    );
};

export default Product;