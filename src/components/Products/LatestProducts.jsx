import { use } from "react";
import Product from "./Product";


const LatestProducts = ({ latestProductsPromise }) => { 
    const latestProducts = use(latestProductsPromise)
    return (
        <div className="mt-28 mb-10 max-w-360 w-11/12 mx-auto text-black">
            <h3 className="text-5xl font-bold text-center pb-10">Recent Products</h3>
            <div className="pt-4 grid xl:grid-cols-4 md:grid-cols-2 gap-7">
                {
                    latestProducts.map(latestProduct => <Product key={latestProduct._id} product={latestProduct}></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;