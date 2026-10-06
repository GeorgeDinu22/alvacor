import Image from "next/image";
import styles from "./Process.module.css";

// TODO: textele pașilor sunt orientative, de verificat.
const PASI = [
    {
        titlu: "Consultanță și ofertă",
        text: "Analizăm amplasamentul și cerințele tale și îți trimitem o ofertă clară.",
    },
    {
        titlu: "Proiectare",
        text: "Pregătim proiectul tehnic și documentația necesară autorizării.",
    },
    {
        titlu: "Execuție",
        text: "Lucrăm cu echipă și utilaje proprii, cu termene respectate.",
    },
    {
        titlu: "Recepție și garanție",
        text: "Predăm lucrarea la recepție și rămânem alături de tine în perioada de garanție.",
    },
];

// Fiecare pas stă în centrul coloanei lui: 12.5%, 37.5%, 62.5%, 87.5% din lungimea drumului.
// Același procent e și momentul din scroll în care camionul ajunge la bornă.
const start = (i) => `${(i + 0.5) * (100 / PASI.length)}%`;

export default function Process() {
    return (
        <section id="proces" className={styles.proces} aria-labelledby="process-title">
            <div className={styles.sticky}>

                <div className={styles.scena}>
                    {PASI.map((pas, i) => (
                        <article
                            key={pas.titlu}
                            className={styles.pas}
                            style={{ "--start": start(i), "--nr": i + 1 }}
                        >
                            <span className={styles.numar}>{String(i + 1).padStart(2, "0")}</span>
                            <h3>{pas.titlu}</h3>
                            <p>{pas.text}</p>
                        </article>
                    ))}

                    <div className={styles.drum} aria-hidden="true">
                        <div className={styles.banda}>
                            <div className={styles.asfalt} />
                            {PASI.map((pas, i) => (
                                <span key={pas.titlu} className={styles.borna} style={{ "--start": start(i) }} />
                            ))}
                        </div>
                        <div className={styles.pista}>
                            {/* văzută de sus pe mobil (drum vertical), din lateral pe desktop */}
                            <Image src="/assets/basculanta-sus.svg" alt="" width={48} height={100} className={`${styles.camion} ${styles.camionSus}`} />
                            <Image src="/assets/bascula.svg" alt="" width={240} height={160} className={`${styles.camion} ${styles.camionLateral}`} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
