"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { companyInfo } from "../data/companyInfo";
import styles from "./header.module.css";

// Trebuie să fie identic cu breakpoint-ul din header.module.css
const DESKTOP_QUERY = "(min-width: 768px)";

const links = [
    { href: "/", label: "Acasă" },
    { href: "/#de-ce-noi", label: "De ce noi" },
];



export default function Header(){
    const [open, setOpen] = useState(false);
    const inchide = () => setOpen(false);

    useEffect(() => {
        if(!open) return;

        const anterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const inchideCuEscape = (eveniment) => {
            if(eveniment.key === "Escape") setOpen(false);
        }

        const query = window.matchMedia(DESKTOP_QUERY);
        const laSchimbare = (eveniment) => {
            if(eveniment.matches) setOpen(false);
        }

        window.addEventListener("keydown", inchideCuEscape);
        query.addEventListener("change", laSchimbare);

        return () => {
            document.body.style.overflow = anterior;
            window.removeEventListener("keydown", inchideCuEscape);
            query.removeEventListener("change", laSchimbare);
        }
    },[open]);

    return(
        <>
            <header className={styles.header}>
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
                        aria-controls="sidebar-meniu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>
        </>
    )
}
