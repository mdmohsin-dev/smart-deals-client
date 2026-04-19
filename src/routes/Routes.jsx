import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../components/Home/Home";
import AllProducts from "../components/Products/AllProducts";
import Register from "../components/Authentication/Register";
import MyProducts from "../components/Products/MyProducts";
import MyBids from "../components/MyBids";
import ProductDetails from "../components/Products/ProductDetails";
import PrivetRoute from "./PrivetRoute";
import CreateAProduct from "../components/CreateAProduct";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "allProducts",
                Component: AllProducts
            },
            {
                path: "register",
                Component: Register
            },
            {
                path: "myProducts",
                element: <MyProducts></MyProducts>
            },
            {
                path: "myBids",
                element: <PrivetRoute><MyBids></MyBids></PrivetRoute>
            },
            {
                path: "productDetails/:id",
                loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
                element: <PrivetRoute><ProductDetails></ProductDetails></PrivetRoute>
            },
            {
                path:"createProduct",
                element:<PrivetRoute><CreateAProduct></CreateAProduct></PrivetRoute>
            }
        ]
    },
]);