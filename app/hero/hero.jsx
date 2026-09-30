import Image from "next/image";
import Link from "next/link";
import styles from "./hero.module.css";

export default function Hero(){
    return(
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.containerHero}>
                <h1 id="hero-title">
                    Proiectare și execuție în construcții civile și infrastructură
                </h1>
                <p>
                   Drumuri și poduri, terasamente, rețele de apă și canalizare, reabilitări și
                    consolidări de clădiri. 
                    Echipă și utilaje proprii, lucrări certificate ISO.
                </p>
                <Link href="tel:+40744638370">
                    Solicită o ofertă
                </Link>
            </div>
            <Image
                src={"https://media.istockphoto.com/id/2117759132/photo/four-construction-workers-having-meeting.jpg?s=612x612&w=0&k=20&c=qLV__HuqWfnV9RWbXgzQDrYxsmQXbDRm4RO-RP9vEIs="}
                alt="Echipă de construcții la o ședință de coordonare pe șantier"
                height={800}
                width={1000}
                preload
                className={styles.bg}
            />
            <div className={styles.machines} aria-hidden="true">
                <Image src="/assets/excavator.svg" alt="" width={240} height={160} className={styles.machine} />
                <Image src="/assets/bascula.svg" alt="" width={240} height={160} className={styles.machine} />
            </div>
        </section>
    )
}