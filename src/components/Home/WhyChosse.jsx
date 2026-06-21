import { FaCrown, FaHeadset } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";

const features = [
    {
        icon: FaTag,
        title: "Best Price Guarantee",
        description:
            "We offer competitive pricing and seasonal discounts to ensure you get the best deal.",
        iconBg: "bg-gradient-to-br from-indigo-500 to-violet-600",
        hoverBorder: "hover:border-indigo-500",
    },
    {
        icon: IoShieldCheckmark,
        title: "Fully Insured Rides",
        description:
            "Drive with peace of mind. All our vehicles come with comprehensive insurance coverage.",
        iconBg: "bg-gradient-to-br from-teal-500 to-emerald-500",
        hoverBorder: "hover:border-teal-500",
    },
    {
        icon: FaHeadset,
        title: "24/7 Customer Support",
        description:
            "Our dedicated support team is available around the clock to assist you anywhere, anytime.",
        iconBg: "bg-gradient-to-br from-[#5F8AEF] to-[#855CEE]",
        hoverBorder: "hover:border-indigo-500",
    },
    {
        icon: FaCrown,
        title: "Premium Collection",
        description:
            "From luxury sedans to rugged SUVs, choose from our wide range of top-tier vehicles.",
        iconBg: "bg-gradient-to-br from-[#FFC000] to-[#FF8C00]",
        hoverBorder: "hover:border-[#FFC000]",
    },
];

export default function WhyChoose() {
    return (
        <section className="bg-[#FBFAFF]">
            <div className="max-w-350 w-11/12 mx-auto py-24">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Why Choose{" "}
                        <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            Smart Deals
                        </span>
                        ?
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
                        We prioritize your comfort and safety. Experience the premium car
                        rental service tailored specifically for your needs.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(({ icon: Icon, title, description, iconBg, hoverBorder }) => (
                        <div
                            key={title}
                            className={`bg-white rounded-2xl p-6 border border-transparent shadow-sm transition-colors duration-500 ${hoverBorder}`}
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${iconBg}`}
                            >
                                <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}