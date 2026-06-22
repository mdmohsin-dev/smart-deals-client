import React from 'react';
import { BiMapPin } from 'react-icons/bi';
import { Link } from 'react-router';

const Product = ({ product }) => {
    const { _id, title, condition, price_min, price_max, category, image, location, description, specialties } = product;

    return (
        <div className="group rounded-2xl border border-transparent hover:border-[#5b8def] transition-all duration-700">
            <div className="bg-white rounded-2xl shadow-md group-hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-sm">
                {/* Image + Badges */}
                <div className="relative w-full h-48">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />

                    <span className="absolute top-3 left-3 bg-linear-to-r from-orange-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {condition}
                    </span>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>

                        {location && (
                            <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                                <BiMapPin size={12} />
                                {location}
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                       {description}
                        {condition?.toLowerCase()} {title}.
                    </p>

                    {/* Specialties */}
                    {specialties?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {specialties.map((specialty, idx) => (
                                <span
                                    key={idx}
                                    className="bg-[#8A50ED]/10 text-[#8A50ED] text-xs font-medium px-2.5 py-1 rounded-full"
                                >
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="border-t border-gray-100 mt-5 pt-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">
                                Price Range
                            </p>

                            <p className="font-bold text-xl pt-1">
                                <span className='text-blue-600'>${price_min}</span> - <span className='text-violet-600'>${price_max}</span>
                            </p>
                        </div>

                        <Link
                            to={`/productDetails/${_id}`}
                            className="items-center gap-2 rounded-md py-1.5 px-4 font-medium text-white bg-linear-to-r from-blue-600 to-violet-600 hover:rounded-3xl transition-all duration-500"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;