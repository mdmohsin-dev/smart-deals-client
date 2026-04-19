import { use } from "react";
import Product from "./Product";


const LatestProducts = ({ latestProductsPromise }) => {
    const latestProducts = use(latestProductsPromise)
    return (
        <div className="mt-28 max-w-350 mx-auto text-black">
            <h3 className="text-5xl font-bold text-center pb-10">Recent<span className="text-[#8E53EE]">Products</span></h3>
            <div className="pt-4 grid grid-cols-3 gap-6">
                {
                    latestProducts.map(latestProduct => <Product key={latestProduct._id} product={latestProduct}></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;