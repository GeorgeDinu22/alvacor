import { proiecte } from "./data/portofoliu";
import { SITE_URL } from "./data/seo";

export default function sitemap() {
    return [
        { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/portofoliu`, changeFrequency: "monthly", priority: 0.8 },
        ...proiecte.map((proiect) => ({
            url: `${SITE_URL}/portofoliu/${proiect.slug}`,
            changeFrequency: "yearly",
            priority: 0.6,
        })),
    ];
}
