import { use } from "react";
import Product from "./Product";


const LatestProducts = ({ latestProductsPromise }) => {
    const latestProducts = use(latestProductsPromise)
    return (
        <div className="pt-40 max-w-350 mx-auto">
            <h3 className="text-4xl text-center">Recent Products</h3>
            <div className="pt-4 grid grid-cols-3 gap-6 border border-red-500">
                {
                    latestProducts.map(latestProduct => <Product product={latestProduct}></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;