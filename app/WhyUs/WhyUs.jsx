import Image from "next/image";
import styles from "./WhyUs.module.css";
import CountUp from "./CountUp";

// Iconițe liniare, 32×32, în culoarea textului (currentColor)
const ICONS = {
    // Lucide „user-group” (licență ISC), desenată pe 24×24: scalată la 32×32, cu linie 1.5 ≈ 2 la scară
    team: (
        <g transform="scale(1.3333)" strokeWidth="1.5">
            <path d="M17 21v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1" />
            <path d="M19 10h1a2 2 0 012 2v1" />
            <path d="M5 10H4a2 2 0 00-2 2v1" />
            <circle cx="12" cy="11" r="3" />
            <circle cx="18" cy="4" r="2" />
            <circle cx="6" cy="4" r="2" />
        </g>
    ),
    excavator: (
        <>
            <rect x="3" y="21" width="16" height="6" rx="3" />
            <path d="M5 21v-6h7v-4h4v10" />
            <path d="M16 13l6-7 5 10" />
            <path d="M27 16l-4 4h5z" />
        </>
    ),
    shield: (
        <>
            <path d="M16 3l10 4v7c0 7-4.5 11.5-10 14C10.5 25.5 6 21 6 14V7z" />
            <path d="M11.5 15.5l3 3 6-6" />
        </>
    ),
    road: (
        <>
            <path d="M11 4L5 28M21 4l6 24" />
            <path d="M16 6v3M16 14v4M16 23v4" />
        </>
    ),
    bridge: (
        <>
            <path d="M2 14h28" />
            <path d="M6 14v12M26 14v12" />
            <path d="M6 26c0-7 4.5-12 10-12s10 5 10 12" />
        </>
    ),
    bolt: <path d="M18 3L7 18h8l-2 11 12-16h-8z" />,
};

// Poze de TEST (iStock + Wikimedia Commons), fără licență verificată: de înlocuit cu poze proprii.
const DEMO_IMAGE = "https://media.istockphoto.com/id/2117759132/photo/four-construction-workers-having-meeting.jpg?s=612x612&w=0&k=20&c=qLV__HuqWfnV9RWbXgzQDrYxsmQXbDRm4RO-RP9vEIs=";

// Cifre din portofoliul ALVACOR (PDF). featured = card lat, închis la culoare.
const STATS = [
    {
        value: 32,
        title: "de angajați",
        description: "Operatori de utilaje, conducători auto, muncitori calificați și personal de conducere a lucrărilor.",
        icon: "team",
        image: DEMO_IMAGE,
        featured: true,
    },
    {
        value: 22,
        title: "de utilaje proprii",
        description: "De la miniexcavatoare pentru spații înguste la autogreder și buldozer cu ghidare GPS.",
        icon: "excavator",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Construction_site_excavator_and_truck.jpg/960px-Construction_site_excavator_and_truck.jpg",
    },
    {
        value: 3,
        title: "certificări ISO",
        description: "SR EN ISO 9001, 14001 și 45001: calitate, mediu, sănătate și securitate în muncă.",
        icon: "shield",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Construction_worker_-_8217.jpg/960px-Construction_worker_-_8217.jpg",
    },
    {
        value: 46.7,
        decimals: 1,
        unit: "km",
        title: "de drum național",
        description: "Reabilitare și modernizare DN 52 Alexandria – Turnu Măgurele.",
        icon: "road",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Roadtec_RP-190_Highway_Class_Asphalt_Pavel.jpg/960px-Roadtec_RP-190_Highway_Class_Asphalt_Pavel.jpg",
    },
    {
        value: 205,
        unit: "m",
        title: "pod peste Argeș",
        description: "Pod rutier la km 51+290, comuna Gostinari, jud. Giurgiu.",
        icon: "bridge",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Reinforced_Concrete_Bridge_over_the_River_Torrens%2C_on_the_new_Torrens_Gorge_Main_Road%28GN02474%29.jpg/960px-Reinforced_Concrete_Bridge_over_the_River_Torrens%2C_on_the_new_Torrens_Gorge_Main_Road%28GN02474%29.jpg",
    },
    {
        value: 110,
        unit: "kV",
        title: "cabluri în parcuri eoliene",
        description: "Deleni și Prowind Bogdănești, jud. Vaslui și Botoșani, 2025–2026.",
        icon: "bolt",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Wind_Turbines_and_Power_Lines%2C_East_Sussex%2C_England_-_April_2009.jpg/960px-Wind_Turbines_and_Power_Lines%2C_East_Sussex%2C_England_-_April_2009.jpg",
        featured: true,
    },
];

export default function WhyUs() {
    return(
        <section id="de-ce-noi" className={styles.whyUs} aria-labelledby="why-us-title">
            <h2 id="why-us-title">De ce să <strong>lucrăm împreună?</strong></h2>
            <div className={styles.container}>
                {STATS.map((stat) => (
                    <div
                        key={stat.title}
                        className={`${styles.card} ${stat.featured ? styles.featured : ""}`}
                    >
                        {stat.image ? (
                            <div className={styles.photo} aria-hidden="true">
                                <Image src={stat.image} alt="" fill sizes="(min-width: 1024px) 25vw, 60vw" />
                            </div>
                        ) : (
                            <svg
                                viewBox="0 0 32 32"
                                className={styles.icon}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                {ICONS[stat.icon]}
                            </svg>
                        )}
                        <span className={styles.value}>
                            <CountUp value={stat.value} decimals={stat.decimals} />
                            {stat.unit && <small>{stat.unit}</small>}
                        </span>

                        <h3>{stat.title}</h3>
                        <p>{stat.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
