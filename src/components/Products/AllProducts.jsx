import React from 'react';
import Product from './Product';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllProducts = () => {
    const axiosSecure = useAxiosSecure()

    const { data: products = [], isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-10">
                {error?.message || "Something went wrong while fetching products"}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 text-black">
            <h2 className="text-2xl font-semibold mb-6">All Products</h2>

            {products.length === 0 ? (
                <p className="text-center text-gray-500 mt-6">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProducts;