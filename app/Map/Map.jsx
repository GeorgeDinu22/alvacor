import Link from "next/link";
import styles from "./Map.module.css";
import { companyInfo } from "../data/companyInfo";

// Contur România: Natural Earth 1:50m (domeniu public), proiecție echirectangulară la 46°N.
const ROMANIA_PATH = "M515.3 266.7 L522.0 276.2 L530.5 281.2 L550.1 286.5 L551.8 285.8 L552.0 284.9 L550.7 283.5 L550.5 281.7 L551.4 279.6 L554.1 279.4 L558.6 281.4 L567.0 278.6 L579.4 271.1 L590.8 269.5 L601.2 274.0 L606.6 279.2 L610.0 284.1 L608.9 290.2 L608.3 294.0 L605.5 309.7 L603.6 315.6 L600.6 322.1 L568.3 330.0 L570.4 326.2 L569.6 319.6 L568.3 314.6 L571.3 310.1 L564.0 308.5 L560.8 311.0 L558.4 315.3 L560.6 325.2 L557.0 330.7 L555.7 333.7 L555.5 341.0 L553.4 344.1 L553.0 347.5 L558.2 346.6 L555.9 352.9 L546.2 365.0 L542.8 372.1 L543.6 400.6 L539.3 417.6 L539.0 422.6 L528.7 422.8 L525.6 422.4 L515.9 419.8 L505.0 415.3 L498.6 406.5 L494.5 400.3 L485.3 403.1 L483.5 402.3 L481.0 399.3 L474.0 397.3 L465.4 397.2 L446.1 385.8 L444.0 383.8 L428.8 385.8 L406.1 391.4 L388.7 398.4 L370.8 410.9 L363.6 420.4 L355.2 425.4 L343.2 429.1 L321.8 427.7 L299.5 423.0 L275.6 417.9 L262.6 420.7 L245.1 418.6 L218.8 412.5 L199.1 410.6 L179.7 414.2 L176.5 411.5 L175.8 408.3 L176.5 403.9 L179.2 400.3 L183.9 397.6 L186.4 394.8 L186.7 392.0 L181.4 387.5 L170.6 381.3 L166.2 377.4 L165.1 376.4 L164.8 373.0 L162.5 370.2 L158.4 368.2 L155.1 364.6 L152.8 359.4 L153.3 354.4 L156.6 349.8 L160.8 347.8 L165.9 348.4 L168.0 347.1 L167.2 343.8 L162.2 339.7 L153.0 334.6 L143.7 337.4 L134.2 347.9 L127.4 349.6 L123.2 342.5 L115.7 338.3 L105.0 337.0 L98.4 334.3 L95.9 330.2 L91.2 327.0 L80.9 323.7 L80.8 320.5 L82.4 319.7 L86.1 319.4 L91.0 318.7 L91.8 316.9 L91.9 315.2 L88.0 313.1 L84.1 311.7 L82.0 310.3 L80.7 308.7 L80.4 307.0 L81.6 305.9 L83.2 305.8 L84.7 304.8 L85.6 301.0 L87.7 297.8 L89.2 296.7 L89.1 294.3 L87.6 292.2 L85.4 290.3 L82.3 289.1 L72.4 285.8 L67.4 281.2 L64.4 281.0 L59.6 278.5 L54.4 274.5 L49.9 268.8 L45.0 265.1 L43.8 263.6 L43.6 262.2 L44.5 260.6 L44.5 258.9 L43.2 253.3 L44.1 247.4 L43.9 241.9 L43.8 239.4 L42.9 238.7 L42.0 239.5 L40.8 240.5 L39.6 240.7 L36.1 236.7 L31.5 228.5 L28.4 225.7 L22.4 222.0 L17.4 218.8 L13.8 211.9 L10.0 206.7 L12.5 204.4 L26.9 201.3 L33.6 204.4 L36.6 203.3 L39.5 200.8 L41.1 198.8 L41.4 196.7 L42.9 194.1 L47.7 192.9 L60.6 194.5 L65.8 190.8 L67.7 188.8 L68.9 184.4 L70.2 180.8 L74.8 178.9 L74.8 175.7 L74.1 172.2 L76.7 164.3 L78.4 161.1 L81.0 159.9 L84.1 157.4 L89.6 152.3 L88.3 147.8 L89.4 144.5 L95.1 136.4 L99.4 128.6 L99.4 124.7 L100.0 121.3 L103.8 117.6 L107.9 112.7 L113.2 97.5 L115.1 95.0 L118.6 92.1 L121.2 89.2 L121.4 79.2 L123.9 76.3 L128.6 73.1 L133.2 67.9 L137.0 61.8 L139.9 58.9 L143.7 58.1 L147.9 55.7 L152.6 54.8 L157.2 56.0 L160.0 55.4 L164.4 52.4 L175.5 41.1 L177.0 38.9 L179.3 37.3 L188.3 33.4 L190.6 29.6 L193.7 26.1 L197.7 26.3 L210.7 35.0 L224.7 34.4 L227.3 34.7 L228.1 34.9 L229.8 35.6 L248.4 39.9 L251.3 39.4 L252.1 39.1 L259.5 42.6 L266.1 42.2 L272.4 39.7 L279.0 38.9 L285.0 40.3 L289.5 45.3 L301.4 55.9 L304.9 59.8 L310.3 59.2 L316.3 57.3 L322.4 50.2 L341.1 42.2 L355.4 40.2 L369.3 37.0 L385.4 34.7 L390.0 28.2 L392.6 23.7 L394.4 15.5 L403.1 13.1 L411.3 11.4 L414.3 10.3 L420.3 10.0 L425.0 10.7 L432.2 14.8 L437.2 19.9 L439.2 24.0 L443.6 29.7 L448.1 37.8 L453.1 48.5 L454.2 53.9 L456.1 59.8 L459.8 66.9 L466.9 74.8 L467.9 76.3 L471.2 81.9 L477.4 94.2 L482.6 99.2 L487.1 104.5 L489.3 109.9 L492.6 114.9 L500.2 121.4 L506.4 127.3 L511.4 144.3 L514.8 152.1 L517.0 158.1 L516.0 170.2 L517.3 175.4 L514.5 184.9 L509.4 203.9 L508.2 219.1 L509.1 227.2 L509.2 232.5 L510.4 235.8 L511.8 242.8 L512.0 248.8 L510.1 250.5 L507.6 251.9 L506.6 253.2 L508.9 255.9 L512.2 261.0 L515.3 266.7Z";

// x, y în coordonatele viewBox-ului; labelX/labelY/anchor = unde stă numele față de marker
// Județele sunt marcate în reședința de județ (Ilfov: Buftea). Proiecția hărții:
// x ≈ 63.41 · longitudine − 1273.6, y ≈ 4415.5 − 91.28 · latitudine.
// Etichetele din sud sunt puse stânga / dreapta / sus ca să nu se suprapună.
const CITIES = [
    { name: "Ilfov", x: 371.7, y: 347.9, labelX: -12, labelY: -6, anchor: "end" },
    { name: "Argeș", x: 303.4, y: 313.0, labelX: -14, anchor: "end" },
    { name: "Giurgiu", x: 373.2, y: 408.0, labelX: 14, anchor: "start" },
    { name: "Teleorman", x: 332.7, y: 402.0, labelX: -14, anchor: "end" },
    { name: "Călărași", x: 459.6, y: 380.9, labelX: 0, labelY: -14, anchor: "middle" },
    { name: "Mehedinți", x: 163.3, y: 341.0, labelX: 14, anchor: "start" },
    { name: "Galați", x: 502.4, y: 268.2, labelX: 14, anchor: "start" },
    { name: "Neamț", x: 398.6, y: 131.9, labelX: 0, labelY: -14, anchor: "middle" },
    { name: "Vaslui", x: 484.6, y: 158.1, labelX: 14, anchor: "start" },
    { name: "Botoșani", x: 417.5, y: 57.0, labelX: 14, anchor: "start" },
];

export default function MapSection() {
    return (
        <section id="acoperire" className={styles.map} aria-labelledby="map-title">
            <div className={styles.text}>
                <h2 id="map-title">Suntem prezenți <strong>peste tot</strong></h2>
                <p>
                    Din București, direct oriunde în țară. Cu echipe și utilaje proprii, ajungem rapid pe orice șantier și transformăm proiectele în lucrări finalizate. De la Argeș și Giurgiu până la Vaslui, Galați sau Mehedinți, distanța nu ne oprește.
                </p>
            </div>

            <svg
                viewBox="0 0 620 439"
                className={styles.svg}
                role="img"
                aria-label={`Harta României cu ${CITIES.map((c) => c.name).join(", ")}`}
            >
                <defs>
                    <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M24 0H0V24" fill="none" stroke="#fff" strokeOpacity="0.07" />
                    </pattern>
                </defs>
                <path d={ROMANIA_PATH} className={styles.country} />
                <path d={ROMANIA_PATH} fill="url(#map-grid)" />

                {CITIES.map((city, i) => (
                    <g key={city.name} transform={`translate(${city.x} ${city.y})`}>
                        <circle r="8" className={styles.pulse} style={{ animationDelay: `${(i % 4) * 0.5}s` }} />
                        <circle r="7" className={styles.marker} />
                        <text x={city.labelX} y={city.labelY ?? 5} textAnchor={city.anchor} className={styles.label}>
                            {city.name}
                        </text>
                    </g>
                ))}
            </svg>

            <div className={styles.cta}>
                <Link href={companyInfo.telefon.href} className={styles.ctaButton}>
                    <svg viewBox="0 0 24 24" strokeLinecap="round" aria-hidden="true">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    Hai să creștem harta împreună
                </Link>
            </div>
        </section>
    );
}
