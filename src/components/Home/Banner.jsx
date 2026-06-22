import { motion, useReducedMotion } from "framer-motion";
import car from "../../assets/red-car-3.png"
import BrandLogoSlider from "../Brandlogoslider";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

export default function CarRentalBanner() {
    const prefersReducedMotion = useReducedMotion();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.15,
                delayChildren: prefersReducedMotion ? 0 : 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 36 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const carVariants = {
        hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 160 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
        },
    };

    return (
        <section className="relative w-full overflow-hidden bg-white">
            <div className="lg:my-20">
                <div className="mx-auto flex max-w-360 flex-col-reverse items-center gap-10 py-12 w-11/12 lg:flex-row lg:gap-6">
                    {/* Left: text content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="z-10 w-full max-w-xl text-center lg:w-1/2 lg:text-left"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                        >
                            Buy, sell &amp; rent
                            <br />
                            <span className="text-red-600">reputable cars</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mx-auto mt-5 max-w-md text-base text-gray-500 lg:mx-0"
                        >
                            Buy and sell reputable cars. Renting a car is easy and fast with
                            Topcar
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex items-center justify-center gap-6 lg:justify-start"
                        >
                            <div>
                                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                    50+
                                </p>
                                <p className="mt-1 text-sm text-gray-500">Car brands</p>
                            </div>

                            <div className="h-10 w-px bg-gray-300" />

                            <div>
                                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                    10k+
                                </p>
                                <p className="mt-1 text-sm text-gray-500">Clients</p>
                            </div>

                            <Link
                                to="/all-products"
                                className="group items-center flex gap-2 rounded-md py-3 px-5 font-medium text-white bg-linear-to-r from-blue-600 to-violet-600 hover:rounded-3xl transition-all duration-500 overflow-hidden"
                            >
                                Explore Cars
                                <FaArrowRight className="hidden md:flex transition-all duration-700 group-hover:rotate-[360deg] group-hover:translate-x-6 group-hover:opacity-0" />
                            </Link>

                        </motion.div>
                    </motion.div>

                    {/* Right: car image */}
                    <motion.div
                        variants={carVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative w-full lg:w-1/2 lg:translate-x-6 xl:translate-x-12"
                    >
                        {/* TODO: replace src below with your real car image */}
                        <img
                            src={car}
                            alt="Car"
                            className="h-auto w-full"
                        />
                    </motion.div>
                </div>
                <div className="mt-10">
                    <BrandLogoSlider />
                </div>
            </div>
        </section>
    );
}