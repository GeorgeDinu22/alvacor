"use client";

import { useEffect, useRef, useState } from "react";

const format = (n, decimals) =>
    n.toLocaleString("ro-RO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Numără de la 0 la `value` când cifra intră în ecran.
// HTML-ul de pe server conține deja valoarea finală (SEO, fără JS).
export default function CountUp({ value, decimals = 0, duration = 1400 }) {
    const ref = useRef(null);
    const [current, setCurrent] = useState(value);

    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let frame;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                const start = performance.now();
                const tick = (now) => {
                    const t = Math.min((now - start) / duration, 1);
                    setCurrent(value * (1 - Math.pow(1 - t, 3))); // ease-out
                    if (t < 1) frame = requestAnimationFrame(tick);
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.4 }
        );
        observer.observe(el);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value, duration]);

    return <span ref={ref}>{format(current, decimals)}</span>;
}
