import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const cardVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm ' +
    'focus:outline-none focus:border-[#FF02CB] focus:ring-2 focus:ring-[#FF02CB]/10 focus:bg-white ' +
    'transition-all duration-200 placeholder:text-gray-400';

const CreateAProduct = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { handleSubmit, register } = useForm();

    const onSubmit = (data) => {
        const { name, image, min_price, max_price } = data;
        const newProduct = {
            title: name,
            image,
            price_min: min_price,
            price_max: max_price,
            email: user.email,
            seller_name: user.displayName,
            seller_image: user.photoURL,
            status: 'pending',
            category: 'Vehicles'
        };
        axiosSecure.post('/products', newProduct).then(data => console.log(data));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className=" flex items-center justify-center my-14"
        >
            <div className="max-w-2xl w-11/12 p-[1.5px] rounded-[22px]"
                style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>

                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-[21px] p-8 md:p-10 w-full"
                >
                    {/* Header */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <span className="inline-block bg-pink-50 text-pink-600 text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-3">
                            ✦ New Listing
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 font-exo">Create a Product</h2>
                        <p className="text-sm text-gray-400 mt-1">Fill in the details to list your product for sale</p>
                    </motion.div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Info</p>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-600">Product Name</label>
                            <input type="text" {...register('name')} className={inputClass} placeholder="e.g. Honda CB 150R — 2022 Model" required />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-600">Image URL</label>
                            <input type="text" {...register('image')} className={inputClass} placeholder="https://example.com/image.jpg" required />
                        </div>

                        <div className="border-t border-gray-100" />

                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pricing</p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-600">Min Price (৳)</label>
                                <input type="number" {...register('min_price')} className={inputClass} placeholder="e.g. 80,000" required />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-600">Max Price (৳)</label>
                                <input type="number" {...register('max_price')} className={inputClass} placeholder="e.g. 1,20,000" required />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-xl text-white bg-linear-to-r from-blue-600 to-violet-600 hover:rounded-3xl transition-all duration-300 font-bold text-base tracking-wide cursor-pointer mt-2">
                            + Add Product
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CreateAProduct;