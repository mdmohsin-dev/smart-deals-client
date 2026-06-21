import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

// TODO: replace these with your real brand logos (name + src)
const brands = [
  { name: "Brand 1", src: "https://placehold.co/120x48?text=Brand+1" },
  { name: "Brand 2", src: "https://placehold.co/120x48?text=Brand+2" },
  { name: "Brand 3", src: "https://placehold.co/120x48?text=Brand+3" },
  { name: "Brand 4", src: "https://placehold.co/120x48?text=Brand+4" },
  { name: "Brand 5", src: "https://placehold.co/120x48?text=Brand+5" },
  { name: "Brand 6", src: "https://placehold.co/120x48?text=Brand+6" },
];

const SPEED = 50; // pixels per second, increase/decrease to change speed

export default function BrandLogoSlider() {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef(null);
  const [setWidth, setSetWidth] = useState(0);
  const x = useMotionValue(0);

  // duplicate the list so the track can wrap seamlessly with no gap
  const logos = [...brands, ...brands];

  // measure the width of ONE full set (half of the doubled track),
  // and keep it updated once images finish loading / on resize
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
            className="flex w-max items-center gap-12 sm:gap-16"
          >
            {logos.map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex shrink-0 items-center justify-center"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="h-10 w-auto object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}