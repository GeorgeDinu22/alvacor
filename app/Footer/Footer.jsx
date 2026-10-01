import Link from "next/link";
import { companyInfo } from "../data/companyInfo";
import styles from "./Footer.module.css";

const links = [
    { href: "/", label: "Acasă" },
    { href: "/#utilaje", label: "Utilaje" },
    { href: "/portofoliu", label: "Portofoliu" },
];

export default function Footer() {
    const an = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo} aria-label={`${companyInfo.nume} – pagina principală`}>
                        {companyInfo.nume}
                    </Link>
                    <p>Construcții civile și infrastructură, cu echipă și utilaje proprii.</p>
                </div>

                <nav className={styles.column} aria-labelledby="footer-nav-title">
                    <h3 id="footer-nav-title">Navigare</h3>
                    <ul>
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.column}>
                    <h3>Contact</h3>
                    <ul>
                        <li>
                            <a href={companyInfo.telefon.href}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                {companyInfo.telefon.afisare}
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${companyInfo.email}`}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-10 6L2 7" />
                                </svg>
                                {companyInfo.email}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>© {an} {companyInfo.nume}. Toate drepturile rezervate.</p>
                <p>
                    Dezvoltat de{" "}
                    <a href="https://georgeweb-design.ro" target="_blank" rel="noopener">
                        George Web Design
                    </a>
                </p>
            </div>
        </footer>
    );
}
