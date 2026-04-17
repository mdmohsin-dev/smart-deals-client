import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";


const MyBids = () => {

    const { user } = useAuth()

    const [bids, setBids] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user?.email}`)
                .then(res => res.json())
                .then(data => setBids(data))
        }
    }, [user?.email])


    const handleDeleteBid = (_id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/bids/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });

                const remaining = bids.filter(bid => bid._id !== _id)
                setBids(remaining)
            }
        })

    }


    return (
        <div className="pt-44 min-h-screen max-w-350 mx-auto text-black">
            <h1 className="text-5xl font-semibold text-center pb-10">My Bids: <span className="text-[#8148EA]">{bids.length}</span></h1>
            <div className="overflow-x-auto text-black">
                <table className="table w-full table-fixed">
                    {/* head */}
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
                        {
                            bids.map((bid, idx) => <tr>
                                <th>{idx + 1}</th>
                                <td></td>
                                <td><div className='flex gap-2 items-center'></div></td>
                                <td>{bid.bid_price}</td>
                                <td><p className={`badge ${bid.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>{bid.status}</p>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteBid(bid._id)}
                                        className='btn btn-outline text-red-500'>Remove Bid</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;