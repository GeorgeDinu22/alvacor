"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Equipment.module.css";

// Rândul de carduri derulabil + butoanele ‹ › (pe touch se poate și cu swipe).
// Un click mută rândul cu exact un card.
export default function Carousel({ className, label, children }) {
    const ref = useRef(null);
    const [margini, setMargini] = useState({ inceput: true, sfarsit: false });

    useEffect(() => {
        const rand = ref.current;
        const actualizeaza = () => {
            setMargini({
                inceput: rand.scrollLeft <= 1,
                sfarsit: rand.scrollLeft + rand.clientWidth >= rand.scrollWidth - 1,
            });
        };

        // Pe touch nu există hover: cardul din centrul rândului primește data-activ
        // și își pornește animația singur.
        let observer;
        if (window.matchMedia("(hover: none)").matches && "IntersectionObserver" in window) {
            observer = new IntersectionObserver(
                (intrari) => {
                    intrari.forEach((intrare) => {
                        intrare.target.toggleAttribute("data-activ", intrare.intersectionRatio >= 0.75);
                    });
                },
                { root: rand, threshold: [0, 0.75, 1] }
            );
            Array.from(rand.children).forEach((card) => observer.observe(card));
        }

        // Cu mouse: hover pornește animația (data-activ), iar la ieșire utilajul
        // termină ciclul început înainte să se oprească (data-ciclu = durata ciclului).
        const timere = new Map();
        const porniri = new Map();
        const intra = (eveniment) => {
            const card = eveniment.currentTarget;
            clearTimeout(timere.get(card));
            if (!card.hasAttribute("data-activ")) {
                porniri.set(card, performance.now());
                card.setAttribute("data-activ", "");
            }
        };
        const iese = (eveniment) => {
            const card = eveniment.currentTarget;
            const ciclu = Number(card.dataset.ciclu) || 2000;
            const trecut = performance.now() - (porniri.get(card) ?? performance.now());
            timere.set(card, setTimeout(() => card.removeAttribute("data-activ"), ciclu - (trecut % ciclu)));
        };
        const cuMouse = window.matchMedia("(hover: hover)").matches;
        const carduri = Array.from(rand.children);
        if (cuMouse) {
            carduri.forEach((card) => {
                card.addEventListener("pointerenter", intra);
                card.addEventListener("pointerleave", iese);
            });
        }

        rand.addEventListener("scroll", actualizeaza, { passive: true });
        window.addEventListener("resize", actualizeaza);
        return () => {
            observer?.disconnect();
            timere.forEach((timer) => clearTimeout(timer));
            if (cuMouse) {
                carduri.forEach((card) => {
                    card.removeEventListener("pointerenter", intra);
                    card.removeEventListener("pointerleave", iese);
                });
            }
            rand.removeEventListener("scroll", actualizeaza);
            window.removeEventListener("resize", actualizeaza);
        };
    }, []);

    const muta = (directie) => {
        const rand = ref.current;
        const card = rand.firstElementChild;
        const pas = card
            ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(rand).columnGap || "0")
            : rand.clientWidth;
        const fluid = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        rand.scrollBy({ left: directie * pas, behavior: fluid ? "smooth" : "auto" });
    };

    return (
        <div className={styles.carousel}>
            <div ref={ref} className={className} role="region" aria-label={label} tabIndex={0}>
                {children}
            </div>

            <div className={styles.controls}>
                <button type="button" onClick={() => muta(-1)} disabled={margini.inceput} aria-label="Utilajul anterior">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M15 6l-6 6 6 6" />
                    </svg>
                </button>
                <button type="button" onClick={() => muta(1)} disabled={margini.sfarsit} aria-label="Utilajul următor">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
