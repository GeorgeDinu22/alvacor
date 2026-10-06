// SEO: adresa site-ului, textele implicite și helper-ele pentru metadata / date structurate.
import { companyInfo } from "./companyInfo";

// TODO: domeniul real al site-ului. Se poate suprascrie din NEXT_PUBLIC_SITE_URL (ex. în Vercel).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://alvacor.ro").replace(/\/$/, "");

export const seo = {
    titlu: `${companyInfo.nume} – Construcții drumuri, poduri și infrastructură`,
    descriere:
        "Firmă de construcții civile și infrastructură din București: drumuri și poduri, terasamente, rețele de apă și canalizare, rețele electrice. Echipă și utilaje proprii, lucrări în toată țara.",
    // imaginea de share, definită în companyInfo.js
    imagine: companyInfo.ogImage,
};

// Metadata unei pagini: titlu, descriere, canonical și cardurile de share (Open Graph / Twitter).
// openGraph și twitter NU se moștenesc câmp cu câmp din layout, de aceea sunt construite complet aici.
// Canonical-ul e pus tot aici, per pagină: moștenit din layout ar arăta peste tot spre „/”.
export function creeazaMetadata({ titlu = "", descriere, cale, imagine = seo.imagine, tip = "website" }) {
    // titlu lipsă = pagina principală, care folosește titlul implicit din layout
    const titluShare = titlu ? `${titlu} – ${companyInfo.nume}` : seo.titlu;

    return {
        ...(titlu && { title: titlu }),
        description: descriere,
        alternates: { canonical: cale },
        openGraph: {
            type: tip,
            locale: "ro_RO",
            siteName: companyInfo.nume,
            url: cale,
            title: titluShare,
            description: descriere,
            images: [imagine],
        },
        twitter: {
            card: "summary_large_image",
            title: titluShare,
            description: descriere,
            images: [imagine],
        },
    };
}

// Taie textul la ultimul cuvânt întreg care încape în limită (Google afișează ~155 de caractere).
export function scurteaza(text, limita = 155) {
    if (text.length <= limita) return text;
    const taiat = text.slice(0, limita - 1);
    return `${taiat.slice(0, taiat.lastIndexOf(" ")).replace(/[.,;:–-]+$/, "")}…`;
}

// <script type="application/ld+json"> cu date structurate (schema.org)
export function JsonLd({ date }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(date).replace(/</g, "\\u003c") }}
        />
    );
}
