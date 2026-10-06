import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { proiecte, getProiect, getTitlu, getImagini, getDescriereSeo } from "../../data/portofoliu";
import { SITE_URL, creeazaMetadata, JsonLd } from "../../data/seo";
import CtaFinal from "../../CtaFinal/CtaFinal";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
    return proiecte.map((proiect) => ({ slug: proiect.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const proiect = getProiect(slug);
    if (!proiect) return {};

    const [imagine] = getImagini(proiect);

    return creeazaMetadata({
        titlu: getTitlu(proiect),
        descriere: getDescriereSeo(proiect),
        cale: `/portofoliu/${proiect.slug}`,
        imagine: imagine && { url: imagine.src, alt: imagine.alt },
        tip: "article",
    });
}

// Date structurate: pagina proiectului + firul Acasă › Portofoliu › proiect
function proiectJsonLd(proiect) {
    const url = `${SITE_URL}/portofoliu/${proiect.slug}`;
    const titlu = getTitlu(proiect);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                headline: titlu,
                description: getDescriereSeo(proiect),
                image: getImagini(proiect).map((imagine) => imagine.src),
                mainEntityOfPage: url,
                inLanguage: "ro",
                author: { "@id": `${SITE_URL}/#firma` },
                publisher: { "@id": `${SITE_URL}/#firma` },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Acasă", item: SITE_URL },
                    { "@type": "ListItem", position: 2, name: "Portofoliu", item: `${SITE_URL}/portofoliu` },
                    { "@type": "ListItem", position: 3, name: titlu, item: url },
                ],
            },
        ],
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
                    <Image src={bloc.src} alt={bloc.alt} fill sizes="(min-width: 600px) 550px, 94vw" />
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

            <CtaFinal />
            <JsonLd date={proiectJsonLd(proiect)} />
        </>
    );
}
