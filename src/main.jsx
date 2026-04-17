import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layouts/RootLayout.jsx'
import Home from './components/Home/Home.jsx'
import AllProducts from './components/Products/AllProducts.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import Register from './components/Authentication/Register.jsx'
import MyProducts from './components/Products/MyProducts.jsx'
import MyBids from './components/MyBids.jsx'
import ProductDetails from './components/Products/ProductDetails.jsx'

const router = createBrowserRouter([
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
        element: <MyBids></MyBids>
      },
      {
        path: "productDetails/:id",
        loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
        element: <ProductDetails></ProductDetails>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
