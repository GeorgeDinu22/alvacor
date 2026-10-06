import styles from "./Equipment.module.css";
import { MACHINES, CYCLES } from "./Machines";
import Carousel from "./Carousel";


const EQUIPMENT = [
    {
        count: 4,
        name: "Excavatoare pe șenile",
        description: "Pentru săpăturile mari. Mută munți de pământ fără să clipească.",
        machine: "excavator",
        drive: 32,
    },
    {
        count: 2,
        name: "Excavatoare pe pneuri",
        description: "Ajung repede de la un șantier la altul, chiar și prin oraș.",
        machine: "wheeledExcavator",
    },
    {
        count: 2,
        name: "Buldoexcavatoare",
        description: "Sapă în spate, încarcă în față. Două utilaje într-unul.",
        machine: "backhoeLoader",
        drive: 40,
    },
    {
        count: 2,
        name: "Miniexcavatoare",
        description: "Mici, dar harnice. Intră acolo unde altele nu încap.",
        machine: "miniExcavator",
    },
    {
        count: 1,
        name: "Autogreder cu ghidare GPS",
        description: "Nivelează la milimetru, ghidat de GPS.",
        machine: "motorGrader",
        drive: 20,
    },
    {
        count: 1,
        name: "Buldozer cu ghidare GPS",
        description: "Forță brută, precizie de GPS. Pregătește terenul pentru tot ce urmează.",
        machine: "bulldozer",
        drive: 16,
    },
    {
        count: 3,
        name: "Cilindri compactori",
        description: "Bat pământul bine, ca drumul să țină ani buni.",
        machine: "roller",
        drive: 28,
    },
    {
        count: 1,
        name: "Încărcător frontal",
        description: "Ridică, mută, încarcă. Ține șantierul în mișcare.",
        machine: "wheelLoader",
        drive: 36,
    },
    {
        count: 4,
        name: "Autobasculante 8×4",
        description: "Duc pământul și materialele exact unde e nevoie.",
        machine: "dumpTruck",
        drive: 16,
    },
    {
        count: 1,
        name: "Cisternă de apă",
        description: "Udă drumul ca să nu se ridice praful. Și ca betonul să prindă bine.",
        machine: "waterTanker",
        drive: 24,
    },
    {
        count: 1,
        name: "Autocamion pentru încercări",
        description: "Verifică dacă drumul e destul de solid înainte să-l predăm.",
        machine: "testTruck",
        drive: 32,
    },
];

export default function Equipment() {
    return(
        <section id="utilaje" className={styles.equipment} aria-labelledby="equipment-title">
            <h2 id="equipment-title">Parcul nostru de <strong>utilaje</strong></h2>
            <p className={styles.intro}>
                22 de utilaje proprii, gata de lucru oricând. Fără închirieri, fără așteptări: doar treabă făcută.
            </p>
            <Carousel className={styles.container} label="Lista utilajelor">
                {EQUIPMENT.map((item) => {
                    const Machine = MACHINES[item.machine];
                    return (
                    <div key={item.name} className={styles.card} data-ciclu={CYCLES[item.machine]}>
                        {Machine && (
                            <Machine
                                className={`${styles.image} ${item.drive ? styles.drive : ""}`}
                                style={item.drive ? {
                                    "--drive": `${item.drive}px`,
                                    // roata (r = 16) se învârte cât e distanța parcursă: drive / (2π·16) ture
                                    "--rotire": `${Math.round((item.drive / (2 * Math.PI * 16)) * 360)}deg`,
                                } : undefined}
                                label={item.name}
                            />
                        )}
                        <h3>
                            {item.name}
                        </h3>
                        <p>{item.description}</p>
                    </div>
                    );
                })}
            </Carousel>
        </section>
    )
}
