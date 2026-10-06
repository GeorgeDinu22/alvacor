import Image from "next/image";
import styles from "./Services.module.css";
import SplitText from "../SplitText/SplitText";
import { servicii } from "../data/servicii";

export default function Services() {
    return (
        <section id="servicii" className={styles.services} aria-labelledby="services-title">
            <SplitText
                tag="h2"
                id="services-title"
                delay={44}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
            >
                Ce <strong>construim</strong>
            </SplitText>

            <div className={styles.grid}>
                {servicii.map((serviciu) => (
                    <div
                        key={serviciu.slug}
                        className={`${styles.card} ${serviciu.mare ? styles.mare : ""}`}
                        data-reveal
                    >
                        <Image
                            src={serviciu.imagine.src}
                            alt={serviciu.imagine.alt}
                            fill
                            sizes={serviciu.mare ? "(min-width: 1024px) 47vw, 94vw" : "(min-width: 1024px) 24vw, (min-width: 640px) 47vw, 94vw"}
                            className={styles.poza}
                        />

                        <div className={styles.text}>
                            <h3>
                                {serviciu.titlu}
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </h3>
                            <p>{serviciu.descriere}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
