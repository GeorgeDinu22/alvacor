// Serviciile din secțiunea „Ce construim” (grila bento de pe pagina principală).
// mare: true = cardul mare (2×2 pe desktop), unul singur, primul în listă.
import { IMG } from "./imagini";

// TODO: descrierile sunt orientative, de verificat.
export const servicii = [
    {
        slug: "drumuri-poduri",
        titlu: "Drumuri și poduri",
        descriere: "Construcție, reabilitare și modernizare de drumuri naționale, județene și locale, poduri și podețe.",
        imagine: { src: IMG.asphalt, alt: "Finisor de asfalt pe un drum în lucru" },
        mare: true,
    },
    {
        slug: "terasamente",
        titlu: "Terasamente",
        descriere: "Săpături, umpluturi și compactări cu utilaje proprii.",
        imagine: { src: IMG.excavator, alt: "Excavator încărcând o autobasculantă" },
    },
    {
        slug: "apa-canalizare",
        titlu: "Rețele de apă și canalizare",
        descriere: "Alimentare cu apă, canalizare menajeră și pluvială, branșamente.",
        imagine: { src: IMG.worker, alt: "Muncitor pe un șantier de rețele" },
    },
    {
        slug: "retele-electrice",
        titlu: "Rețele electrice",
        descriere: "Cabluri de înaltă tensiune (110 kV) pentru parcuri eoliene și fotovoltaice.",
        imagine: { src: IMG.wind, alt: "Turbine eoliene și linii electrice" },
    },
    {
        slug: "reabilitari-cladiri",
        titlu: "Reabilitări și consolidări",
        descriere: "Consolidarea și reabilitarea clădirilor și a structurilor din beton armat.",
        imagine: { src: IMG.bridge, alt: "Structură din beton armat" },
    },
];
