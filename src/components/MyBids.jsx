import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const MyBids = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: bids = [] } = useQuery({
        queryKey: ["bids", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bids?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleDeleteBid = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bids/${_id}`).then(() => {
                    queryClient.invalidateQueries(["bids", user?.email]);

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your bid has been removed.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
            }
        });
    };

    return (
        <div className="xl:pt-24 pt-11 min-h-screen max-w-350 mx-auto text-black">
            <div>
                {
                    bids.length<1? <p className="min-h-screen text-3xl font-semibold text-center">You haven't placed any bids yet.</p>:<div>
                <h1 className="text-5xl font-semibold text-center pb-10">
                    My Bids: <span className="text-[#8148EA]">{bids.length}</span>
                </h1>
                <div className="overflow-x-auto text-black">
                    <table className="table w-full table-fixed">
                        <thead>
                            <tr className="bg-[#ecf1f5] text-black">
                                <th>SL No</th>
                                <th>Product</th>
                                <th>Seller</th>
                                <th>Bid Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bids.map((bid, idx) => (
                                <tr key={bid._id}>
                                    <th>{idx + 1}</th>

                                    {/* Product image + title */}
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {bid.productDetails?.image && (
                                                <img
                                                    src={bid.productDetails.image}
                                                    alt={bid.productDetails.name}
                                                    className="w-10 h-10 rounded object-cover"
                                                />
                                            )}
                                            <span>{bid.productDetails?.title || "N/A"}</span>
                                        </div>
                                    </td>

                                    {/* Seller name */}
                                    <td><div className="flex items-center gap-1">
                                        {
                                            bid.productDetails?.seller_image ? (
                                                <img className="w-12 h-12 rounded-full" src={bid.productDetails.seller_image} alt="Seller" />
                                            ) : (
                                                <FaUser />
                                            )
                                        }
                                        <p className="font-medium text-md">{bid.productDetails?.seller_name}</p>
                                    </div></td>

                                    <td>${bid.bid_price}</td>
                                    <td>
                                        <p
                                            className={`badge ${bid.status === "pending"
                                                ? "badge-warning"
                                                : "badge-success"
                                                }`}
                                        >
                                            {bid.status}
                                        </p>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteBid(bid._id)}
                                            className="btn btn-outline text-red-500"
                                        >
                                            Remove Bid
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
                }
            </div>
            
        </div>
    );
};

export default MyBids;