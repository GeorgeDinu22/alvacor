import styles from "./Gallery.module.css";
import GalleryCarousel from "./GalleryCarousel";

// Poze de TEST (aceleași ca în WhyUs / Portofoliu), fără licență verificată: de înlocuit cu poze din șantier.
const PHOTOS = [
    {
        src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Roadtec_RP-190_Highway_Class_Asphalt_Pavel.jpg/960px-Roadtec_RP-190_Highway_Class_Asphalt_Pavel.jpg",
        alt: "Finisor de asfalt pe un drum în lucru",
        title: "Asfaltare",
        subtitle: "Drumuri",
    },
    {
        src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Construction_site_excavator_and_truck.jpg/960px-Construction_site_excavator_and_truck.jpg",
        alt: "Excavator încărcând un camion pe șantier",
        title: "Terasamente",
        subtitle: "Utilaje proprii",
    },
    {
        src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Reinforced_Concrete_Bridge_over_the_River_Torrens%2C_on_the_new_Torrens_Gorge_Main_Road%28GN02474%29.jpg/960px-Reinforced_Concrete_Bridge_over_the_River_Torrens%2C_on_the_new_Torrens_Gorge_Main_Road%28GN02474%29.jpg",
        alt: "Pod rutier din beton armat peste un râu",
        title: "Poduri",
        subtitle: "Lucrări de artă",
    },
    {
        src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Construction_worker_-_8217.jpg/960px-Construction_worker_-_8217.jpg",
        alt: "Muncitor cu cască de protecție pe șantier",
        title: "Echipa",
        subtitle: "Personal calificat",
    },
    {
        src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Wind_Turbines_and_Power_Lines%2C_East_Sussex%2C_England_-_April_2009.jpg/960px-Wind_Turbines_and_Power_Lines%2C_East_Sussex%2C_England_-_April_2009.jpg",
        alt: "Turbine eoliene și linii de înaltă tensiune",
        title: "Rețele 110 kV",
        subtitle: "Energie",
    },
    {
        src: "https://media.istockphoto.com/id/2117759132/photo/four-construction-workers-having-meeting.jpg?s=612x612&w=0&k=20&c=qLV__HuqWfnV9RWbXgzQDrYxsmQXbDRm4RO-RP9vEIs=",
        alt: "Patru muncitori discutând pe șantier",
        title: "Coordonare",
        subtitle: "Conducerea lucrărilor",
    },
];

export default function Gallery() {
    return (
        <section className={styles.gallery} aria-labelledby="gallery-title">

            <div className={styles.stage}>
                {/* numărul de poze din inel se adaptează la lățimea ecranului */}
                <GalleryCarousel photos={PHOTOS} />
            </div>
        </section>
    );
}
