import { Link } from "react-router";

const Banner = () => {
    return (
        <div className="min-h-screen bg-linear-to-r from-[#f4ddf4] to-[#c3ecec] flex flex-col gap-10 justify-center items-center text-black">
            <h3 className="text-7xl font-bold w-1/2 text-center">Deal your <span className="text-[#7039E6]">Products</span> in a <span className="text-[#7039E6]">Smart</span> way !</h3>
            <p>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
            <div className="flex gap-5">
                <Link className="btn bg-[#8D53ED] border-none">Watch All Products</Link>
                <Link className="btn btn-outline text-[#8D53ED] hover:bg-[#8D53ED] hover:text-white border border-[#8D53ED]">Post An Product</Link>
            </div>
        </div>
    );
};

export default Banner;