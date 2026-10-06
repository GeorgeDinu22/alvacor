"use client";

import { useEffect, useRef, useState } from "react";
import CircularCarousel from "./CircularCarousel";

// Panorama e privită din centrul inelului, iar raza inelului crește cu numărul de poze.
// Pe ecrane late, cu puține poze, marginile sunt văzute sub un unghi mare și se deformează.
// De aceea repetăm lista de poze în funcție de lățime: ~450px de ecran pentru fiecare copie
// țin unghiul de la margini în jur de 36°, la orice lățime.
const LATIME_PE_COPIE = 450;
const VITEZA = 12; // grade/secundă împărțite la numărul de copii, ca pozele să treacă la fel de repede

export default function GalleryCarousel({ photos }) {
    const ref = useRef(null);
    const [copii, setCopii] = useState(null);

    useEffect(() => {
        const element = ref.current;
        const observer = new ResizeObserver(([intrare]) => {
            const latime = intrare.contentRect.width;
            setCopii(Math.min(6, Math.max(2, Math.round(latime / LATIME_PE_COPIE))));
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ width: "100%", height: "100%" }}>
            {/* caruselul apare după ce știm lățimea, ca să nu se reconstruiască în timpul intrării */}
            {copii && (
                <CircularCarousel
                    key={copii}
                    items={Array.from({ length: copii }, () => photos).flat()}
                    preset="panorama"
                    intro="rise"
                    cardWidth={300}
                    aspectRatio={0.7}
                    speed={VITEZA / copii}
                    captions
                    tilt={0}
                    fadeColor="#f3f0e9"
                    // la click nu mai rotește inelul spre poză și nu se mai „umflă” la viteză mare
                    focusOnClick={false}
                    stretch={0}
                />
            )}
        </div>
    );
}
