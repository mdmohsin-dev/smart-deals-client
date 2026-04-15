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
        path:"register",
        Component:Register
      },
      // priver route rakhte gele component noy element diba and ekta priver router viote elment diye tarpor ei comment kathba vulew age keto na.
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
