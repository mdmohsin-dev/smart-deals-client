import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDetails = () => {
    const product = useLoaderData()
    const { image, title, _id: productId } = product

    const [bids, setBids] = useState([])

    const { handleSubmit, register } = useForm()

    const bidModalRef = useRef(null)

    const { user } = useAuth()

    useEffect(() => {
        axios.get(`http://localhost:3000/bids/byProduct/${productId}`)
        .then(data => setBids(data.data))
        // fetch(`http://localhost:3000/bids/byProduct/${productId}`)
        //     .then(res => res.json())
        //     .then(data => setBids(data))
    }, [productId])

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

        fetch("http://localhost:3000/bids", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    bidModalRef.current.close()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    newBid._id = data.insertedId
                    setBids([...bids, newBid].sort((a, b) => b.bid_price - a.bid_price))
                }
            })
    }



    return (
        <div className='min-h-screen max-w-350 mx-auto text-black'>
            <div className='pt-44'>
                <div className='flex gap-12 items-start'>
                    <div className='border border-red-500 rounded-lg bg-[#D9D9D9] w-1/2 flex justify-center items-center'><img src={image} alt="" /></div>
                    <div className='w-1/2'>
                        <p className='text-5xl'>{title} For sale</p>
                        <button onClick={handleBidModalOpen}
                            className='btn w-full'>I want to by this product</button>

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
                                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB] cursor-not-allowed"
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
                                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB] cursor-not-allowed"
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
                                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
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
                <div>
                    <h3>Bids for this Product: {bids.length}</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full table-fixed">
                            {/* head */}
                            <thead>
                                <tr className="bg-[#ecf1f5] text-black">
                                    <th>SL No</th>
                                    <th>Buyer</th>
                                    <th>Bid Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bids.map((bid, idx) => <tr>
                                        <th>{idx + 1}</th>
                                        <td><div className='flex gap-2 items-center'><img className='w-14 h-14 rounded-full' src={bid.buyer_image} alt="" />{bid.buyer_name}</div></td>
                                        <td>{bid.bid_price}</td>
                                        <td><div className='flex gap-3'>
                                            <button className='btn btn-outline'>Accept Offer</button>
                                            <button className='btn btn-outline'>Reject Offer</button>
                                        </div></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;