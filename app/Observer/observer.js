"use client";

import { useEffect } from "react";

// Un singur IntersectionObserver pentru toate elementele cu [data-reveal] din pagină.
// Când un element intră în ecran primește data-visible, iar animația (opacity, translate,
// scale) e în globals.css. Se pune o dată pe pagină: <Observer />.
export default function Observer() {
    useEffect(() => {
        const elemente = document.querySelectorAll("[data-reveal]:not([data-visible])");

        if (!("IntersectionObserver" in window)) {
            elemente.forEach((element) => element.setAttribute("data-visible", ""));
            return;
        }

        const observer = new IntersectionObserver(
            (intrari) => {
                // elementele care apar în același timp (ex. un rând din grilă) vin unul după altul
                let ordine = 0;
                intrari.forEach((intrare) => {
                    if (!intrare.isIntersecting) return;
                    const element = intrare.target;
                    element.style.transitionDelay = `${ordine++ * 100}ms`;
                    element.setAttribute("data-visible", "");
                    observer.unobserve(element);
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        elemente.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    return null;
}
