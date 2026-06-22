import React from 'react';
import Product from './Product';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

const AllProducts = () => {
    const publicUrl = useAxios()

    const { data: products = [], isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await publicUrl.get('/products');
            return res.data;
        }
    });

    console.log(products)

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
        <div className="max-w-360 mx-auto px-4 lg:py-10 text-black mb-10">
            <h2 className="text-3xl font-semibold mb-8 text-center mt-4">All Products</h2>

            {products.length === 0 ? (
                <p className="text-center text-gray-500 mt-6">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                    {products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProducts;