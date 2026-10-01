import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { proiecte, getProiect, getTitlu } from "../../data/portofoliu";
import { companyInfo } from "../../data/companyInfo";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
    return proiecte.map((proiect) => ({ slug: proiect.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const proiect = getProiect(slug);
    if (!proiect) return {};

    return {
        title: `${getTitlu(proiect)} – ALVACOR`,
        description: proiect.descriere,
    };
}

function Paragraf({ continut }) {
    return (
        <p>
            {continut.map((bucata, i) =>
                typeof bucata === "string"
                    ? bucata
                    : bucata.bold
                        ? <strong key={i}>{bucata.text}</strong>
                        : bucata.text
            )}
        </p>
    );
}

function Bloc({ bloc }) {
    switch (bloc.type) {
        case "titlu":
            return <h1>{bloc.text}</h1>;
        case "subtitlu":
            return <h3>{bloc.text}</h3>;
        case "paragraf":
            return <Paragraf continut={bloc.continut} />;
        case "imagine":
            return (
                <figure className={styles.imagine}>
                    <Image src={bloc.src} alt={bloc.alt} fill sizes="(min-width: 900px) 800px, 94vw" />
                </figure>
            );
        default:
            return null;
    }
}

export default async function ProiectPage({ params }) {
    const { slug } = await params;
    const proiect = getProiect(slug);
    if (!proiect) notFound();

    return (
        <>
            <article className={styles.proiect}>
                <Link href="/portofoliu" className={styles.inapoi}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 12H5M11 18l-6-6 6-6" />
                    </svg>
                    Înapoi la portofoliu
                </Link>

                {proiect.body.map((bloc, i) => (
                    <Bloc key={i} bloc={bloc} />
                ))}
            </article>

            <aside className={styles.cta} aria-labelledby="cta-title">
                <p id="cta-title">Ți se pare că ne potrivim proiectului tău?</p>
                <a href={companyInfo.telefon.href} className={styles.ctaButton}>
                    Contactează-ne acum
                </a>
            </aside>
        </>
    );
}
