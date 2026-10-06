"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { companyInfo } from "../data/companyInfo";
import { navigare } from "../data/navigare";
import styles from "./header.module.css";

// Trebuie să fie identic cu breakpoint-ul din header.module.css
const DESKTOP_QUERY = "(min-width: 768px)";

const links = [
    { href: "/", label: "Acasă" },
    { href: "/#servicii", label: "Servicii" },
    { href: "/#de-ce-noi", label: "De ce noi" },
    { href: "/portofoliu", label: "Portofoliu" },
];



export default function Header(){
    const [open, setOpen] = useState(false);
    const inchide = () => setOpen(false);
    const headerRef = useRef(null);

    useEffect(() => {
        if(!open) return;

        // click oriunde în afara header-ului închide dropdown-ul
        const inchideLaClickAfara = (eveniment) => {
            if(!headerRef.current?.contains(eveniment.target)) setOpen(false);
        }

        const inchideCuEscape = (eveniment) => {
            if(eveniment.key === "Escape") setOpen(false);
        }

        const query = window.matchMedia(DESKTOP_QUERY);
        const laSchimbare = (eveniment) => {
            if(eveniment.matches) setOpen(false);
        }

        document.addEventListener("pointerdown", inchideLaClickAfara);
        window.addEventListener("keydown", inchideCuEscape);
        query.addEventListener("change", laSchimbare);

        return () => {
            document.removeEventListener("pointerdown", inchideLaClickAfara);
            window.removeEventListener("keydown", inchideCuEscape);
            query.removeEventListener("change", laSchimbare);
        }
    },[open]);

    return(
        <>
            <header ref={headerRef} className={`${styles.header} ${open ? styles.headerOpen : ""}`}>
                <Link href="/" className={styles.logo} onClick={inchide} aria-label={`${companyInfo.nume} – pagina principală`}>
                    {companyInfo.nume}
                </Link>

                <nav className={styles.navDesktop} aria-label="Navigare principală">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actiuni}>
                    <button
                        type="button"
                        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
                        onClick={() => setOpen((valoare) => !valoare)}
                        aria-label={open ? "Închide meniul" : "Deschide meniul"}
                        aria-expanded={open}
                        aria-controls="meniu-navigare"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* meniul pe mobil: header-ul se extinde în jos, cu linkurile din footer (secțiunea Navigare) */}
                <nav
                    id="meniu-navigare"
                    className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
                    aria-label="Navigare"
                >
                    <ul>
                        {navigare.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} onClick={inchide}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </>
    )
}
