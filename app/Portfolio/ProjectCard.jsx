import Image from "next/image";
import Link from "next/link";
import styles from "./Portfolio.module.css";
import { getTitlu, getImagini } from "../data/portofoliu";

// Cardul unui proiect: pe pagina principală și pe /portofoliu
export default function ProjectCard({ proiect }) {
    return (
        <article className={styles.card}>
            <div className={styles.gallery}>
                {getImagini(proiect).slice(0, 3).map((imagine) => (
                    <div key={imagine.src} className={styles.slice}>
                        <Image src={imagine.src} alt="" fill sizes="(min-width: 1024px) 15vw, 34vw" />
                    </div>
                ))}
            </div>

            <div className={styles.text}>
                <h3>{getTitlu(proiect)}</h3>
                <p>{proiect.descriere}</p>
            </div>

            <Link href={`/portofoliu/${proiect.slug}`} className={styles.more}>
                Citește mai mult
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            </Link>
        </article>
    );
}
