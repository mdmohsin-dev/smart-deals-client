import { Link } from "react-router";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#001931] text-white lg:pt-20 md:pt-14 pt-10 pb-10 px-6">
            <div className="max-w-350 mx-auto">
                <div className="flex flex-col lg:flex-row justify-between xl:gap-28 lg:gap-20 gap-14 items-start">
                    <div className="lg:w-1/3 md:w-full">
                        <h3 className="text-white text-3xl font-bold">Smart<span className="text-[#8E53EE]">Deals</span></h3>
                        <p className="text-gray-400 pt-4">Your trusted marketplace for authentic local products. Discover the best deals from across Bangladesh.</p>
                    </div>
                    <div className="lg:w-2/3 md:w-full flex flex-col md:flex-row gap-10 md:gap-0 justify-between">
                        <div className="font-inter">
                            <h3 className="text-2xl text-white font-semibold">Quick Links</h3>
                            <ul className="text-gray-400 pt-1">
                                <li className="text-sm pt-2"><Link>All Products</Link></li>
                                <li className="text-sm pt-2"><Link>Dashboard</Link></li>
                                <li className="text-sm pt-2"><Link>Login</Link></li>
                                <li className="text-sm pt-2"><Link>Register</Link></li>
                            </ul>
                        </div>
                        <div className="font-inter">
                            <h3 className="text-2xl text-white font-semibold">Contatcs</h3>
                            <ul className="text-gray-400 pt-1">
                                <li className="text-sm pt-2"><span className="text-[16px] font-semibold">Phone</span>: <a href="tel:0123654789">+880 123 456 789</a></li>
                                <li className="text-sm pt-2"><span className="text-[16px] font-semibold">Email</span>: <a href="mailto:info@elitearena.com">support@Smartdeals.com</a></li>
                                <li className="text-sm pt-2"><span className="text-[16px] font-semibold">Address</span>: 123 Commerce Street, Dhaka, Bangladesh</li>
                            </ul>
                        </div>
                        <div className="font-inter">
                            <h3 className="text-2xl text-white font-semibold">Social</h3>
                            <div className="pt-4 flex items-center gap-4">
                                <FaFacebook size={34} color="white"></FaFacebook>
                                <FaXTwitter size={34} color="white"></FaXTwitter>
                                <FaLinkedin size={34} color="white"></FaLinkedin>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full h-px bg-white my-8"></div>
                <h3 className="text-center text-white font-inter">©2022 <span className=" font-bold">Smart<span className="text-[#8E53EE]">Deals</span></span> All rights reserved.</h3>
            </div>
        </footer>
    );
};

export default Footer;