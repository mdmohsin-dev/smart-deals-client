import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
// import useAxios from '../hooks/useAxios';

const CreateAProduct = () => {

    const { user } = useAuth()
    // const axiosInstance = useAxios()
    const axiosSecure = useAxiosSecure()
    const { handleSubmit, register, watch } = useForm()

    const onSubmit = (data) => {
        const { name, image, min_price, max_price } = data

        const newProduct = {
            title: name,
            image: image,
            price_min: min_price,
            price_max: max_price,
            email: user.email,
            seller_name: user.displayName,
            seller_image: user.photoURL,
            status: 'pending'
        }

        axiosSecure.post("/products", newProduct)
            .then(data => console.log(data))

    }

    return (
        <div className="min-h-screen text-white flex items-center justify-center">
            <div className="w-[90%] md:w-[70%] max-w-md">
                <div className="bg-white text-black rounded-2xl shadow-xl p-10">
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 pt-4 font-exo">Register Now</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">

                                Name
                            </label>
                            <input
                                type="text"
                                {...register('name')}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                Image
                            </label>
                            <input
                                type="text"
                                {...register('image')}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                Min price
                            </label>
                            <input
                                type="text"
                                {...register('min_price')}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                Max price
                            </label>
                            <input
                                type="text"
                                {...register('max_price')}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full hover:scale-105 btn-gradient text-white md:text-xl font-bold py-3 rounded-xl transition duration-300 cursor-pointer"
                        >
                            Add a product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAProduct;