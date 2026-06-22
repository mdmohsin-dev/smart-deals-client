import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { BiMapPin } from 'react-icons/bi';
import { FaUserCircle } from "react-icons/fa";

const ProductDetails = () => {
    const { id: productId } = useParams()

    const axiosSecure = useAxiosSecure()

    const { handleSubmit, register } = useForm()

    const bidModalRef = useRef(null)

    const { user } = useAuth()


    const { data: product, isLoading: isProductLoading, isError: isProductError, error: productError } = useQuery({
        queryKey: ['product', productId],
        enabled: !!productId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${productId}`);
            return res.data
        }
    })

    console.log(product)


    const {
        data: bids = [],
        refetch: bidsRefetch,
        isLoading: isBidsLoading,
        isError: isBidsError,
        error: bidsError
    } = useQuery({
        queryKey: ['bids', productId],
        enabled: !!productId,
        queryFn: async () => {
            const bidsRes = await axiosSecure.get(`/bids/${productId}`)
            return bidsRes.data
        },
    })

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal()
    }

    const onSubmit = (data) => {
        const { name, email, bid } = data

        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: 'pending'
        }

        axiosSecure.post("/bids", newBid)
            .then(res => {
                if (res.data.insertedId) {
                    bidModalRef.current.close()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    bidsRefetch()
                }
            })

    }

    if (isProductLoading || isBidsLoading) {
        return <p className='text-center py-10'>Loading...</p>
    }

    if (isProductError) {
        return <p className='text-center py-10 text-red-500'>Error: {productError.message}</p>
    }

    if (isBidsError) {
        return <p className='text-center py-10 text-red-500'>Error: {bidsError.message}</p>
    }

    const { image, location, title, description, seller_name, seller_image, email, price_min, price_max, condition } = product

    return (
        <div className='min-h-screen max-w-360 w-11/12 mx-auto text-black'>
            <div className='lg:py-24 py-14 flex flex-col lg:flex-row gap-8'>

                {/* Product Details */}
                <div className='lg:w-1/2'>
                    <div className='flex justify-center items-center'>
                        <img src={image} className='rounded-lg w-full' alt="" />
                    </div>
                    <div className='flex flex-col gap-6 mt-8'>
                        <p className='text-5xl'>{title} <span className='text-2xl'>(For sale)</span></p>
                        <p>{description}</p>

                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xl'>Price range</p>
                                <p className='text-red-500 text-2xl font-semibold'>${price_min} - ${price_max}</p>
                            </div>
                            <div className='flex flex-col items-end gap-2'>
                                <span className="bg-linear-to-r from-orange-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                    {condition}
                                </span>
                                <p className='flex gap-2 text-xl font-semibold'><BiMapPin size={24}/>{location}</p>
                            </div>
                        </div>

                        <div className='flex flex-col xl:flex-row justify-between gap-5 xl:gap-0 xl:items-center border-t border-dashed border-gray-300 pt-4'>
                            <div>
                                <div className='flex gap-2'>
                                    {user ? <img src={seller_image} className='w-14 rounded-full' alt="" />: <FaUserCircle color /> }
                                    <div>
                                        <p className='text-2xl'>{seller_name}</p>
                                        <p>{email}</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleBidModalOpen}
                                className='btn border-none rounded-md py-1.5 px-4 font-medium text-white bg-linear-to-r from-blue-600 to-violet-600 hover:rounded-3xl transition-all duration-500'>I want to by this product</button>
                        </div>

                        <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box bg-white">
                                <h3 className="font-bold text-lg text-center">Give Seller Your Offered Price</h3>

                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-4">
                                        <div className='w-full'>
                                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register('name')}
                                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-not-allowed"
                                                readOnly
                                                defaultValue={user?.displayName}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                {...register('email')}
                                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-not-allowed"
                                                defaultValue={user?.email}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                                Bid
                                            </label>
                                            <input
                                                type="number"
                                                {...register('bid')}
                                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                required
                                            />
                                        </div>
                                        <div className='flex items-center justify-end gap-4'>
                                            <button type='button' className='btn' onClick={() => bidModalRef.current.close()}>
                                                Cancle
                                            </button>
                                            <button className='btn'>Submit Bid</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>

                {/* bid for tis product */}
                <div className='lg:w-1/2'>
                    <h3 className='text-3xl font-semibold'>Bids for this Product: {bids.length}</h3>
                    <div>
                        {
                            bids.length < 1 ? <p className="text-gray-500 text-center mt-28 text-3xl">
                                Be the first person to place a bid on this product.
                            </p>
                                : <div className="overflow-x-auto mt-8">
                                    <table className="table w-full table-fixed">
                                        {/* head */}
                                        <thead>
                                            <tr className="bg-[#ecf1f5] text-black">
                                                <th>SL No</th>
                                                <th>Buyer</th>
                                                <th>Bid Price</th>
                                                {/* <th>Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bids.map((bid, idx) => <tr key={bid._id ?? idx}>
                                                    <th>{idx + 1}</th>
                                                    <td><div className='flex gap-2 items-center'><img className='w-14 h-14 rounded-full' src={bid.buyer_image} alt="" />{bid.buyer_name}</div></td>
                                                    <td>${bid.bid_price}</td>
                                                    {/* <td><div className='flex gap-3'>
                                            <button className='btn btn-outline'>Accept Offer</button>
                                            <button className='btn btn-outline'>Reject Offer</button>
                                        </div></td> */}
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>

                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;