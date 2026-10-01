import Link from "next/link";
import styles from "./Portfolio.module.css";
import ProjectCard from "./ProjectCard";
import { proiecte } from "../data/portofoliu";

// Pe pagina principală arătăm doar primele 3, restul sunt pe /portofoliu
const PE_PAGINA_PRINCIPALA = 3;

export default function Portfolio() {
    return (
        <section id="portofoliu" className={styles.portfolio} aria-labelledby="portfolio-title">
            <h2 id="portfolio-title">Portofoliu <strong>lucrări</strong></h2>
            <div className={styles.container}>
                {proiecte.slice(0, PE_PAGINA_PRINCIPALA).map((proiect) => (
                    <ProjectCard key={proiect.slug} proiect={proiect} />
                ))}
            </div>

            <Link href="/portofoliu" className={styles.all}>
                Vezi portofoliul întreg
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            </Link>
        </section>
    );
}
