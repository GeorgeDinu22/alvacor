import Observer from "../Observer/observer";
import ProjectCard from "../Portfolio/ProjectCard";
import portfolioStyles from "../Portfolio/Portfolio.module.css";
import { proiecte } from "../data/portofoliu";
import styles from "./page.module.css";

export const metadata = {
    title: "Portofoliu lucrări – ALVACOR",
    description:
        "Lucrările ALVACOR: drumuri și poduri, terasamente, rețele de apă și canalizare, rețele electrice de înaltă tensiune.",
};

export default function PortofoliuPage() {
    return (
        <section className={styles.portofoliu} aria-labelledby="portofoliu-title">
            {/* fără JavaScript cardurile rămân vizibile */}
            <noscript>
                <style>{"[data-reveal]{opacity:1;transform:none}"}</style>
            </noscript>

            <header className={styles.intro}>
                <h1 id="portofoliu-title">Portofoliu <strong>lucrări</strong></h1>
                <p>
                    Drumuri, poduri, terasamente și rețele: o parte din lucrările executate cu echipa și utilajele noastre.
                </p>
            </header>

            <div className={portfolioStyles.container}>
                {proiecte.map((proiect) => (
                    <div key={proiect.slug} className={portfolioStyles.item} data-reveal>
                        <ProjectCard proiect={proiect} />
                    </div>
                ))}
            </div>

            <Observer />
        </section>
    );
}
