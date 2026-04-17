import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const RootLayout = () => {
    return (
        <div className="bg-[#F5F5F5]">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;