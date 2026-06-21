import { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useAnimationFrame,
    useReducedMotion,
} from "framer-motion";

import brand1 from "../assets/brands/Wappen_neu1.jpg"
import brand2 from "../assets/brands/lexus.jpg"
import brand3 from "../assets/brands/lamborghini.png"
import brand4 from "../assets/brands/tesla.jpg"
import brand5 from "../assets/brands/marcedes.jpg"
import brand6 from "../assets/brands/toyota.jpg"
import brand7 from "../assets/brands/jaguar.jpg"

const brands = [
    { name: "Brand 1", src: brand1 },
    { name: "Brand 2", src: brand2 },
    { name: "Brand 3", src: brand3 },
    { name: "Brand 4", src: brand4 },
    { name: "Brand 5", src: brand5 },
    { name: "Brand 6", src: brand6 },
    { name: "Brand 6", src: brand7 },
];

const SPEED = 50;

export default function BrandLogoSlider() {
    const prefersReducedMotion = useReducedMotion();
    const trackRef = useRef(null);
    const [setWidth, setSetWidth] = useState(0);
    const x = useMotionValue(0);

    const logos = [...brands, ...brands];
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        const measure = () => setSetWidth(el.scrollWidth / 2);
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useAnimationFrame((_, delta) => {
        if (prefersReducedMotion || !setWidth) return;

        let next = x.get() - (SPEED * delta) / 1000;

        if (next <= -setWidth) {
            next += setWidth;
        }

        x.set(next);
    });

    return (
        <section>
            <div className="relative mx-auto max-w-350">

                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-white to-transparent sm:w-24" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-white to-transparent sm:w-24" />

                <div className="overflow-hidden">
                    <motion.div
                        ref={trackRef}
                        style={{ x }}
                        className="flex w-max items-center gap-12 sm:gap-32"
                    >
                        {logos.map((brand, idx) => (
                            <div
                                key={`${brand.name}-${idx}`}
                                className="flex shrink-0 items-center justify-center"
                            >
                                <img
                                    src={brand.src}
                                    alt={brand.name}
                                    className="object-contain transition duration-300 h-16"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}