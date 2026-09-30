import styles from "./Equipment.module.css";
import { MACHINES } from "./Machines";


const EQUIPMENT = [
    {
        count: 4,
        name: "Excavatoare pe șenile",
        description: "Săpături mecanizate și terasamente de volum mare.",
        machine: "excavator",
        drive: 32,
    },
    {
        count: 2,
        name: "Excavatoare pe pneuri",
        description: "Deplasare rapidă între fronturile de lucru, inclusiv în zone urbane.",
        machine: "wheeledExcavator",
    },
    {
        count: 2,
        name: "Buldoexcavatoare",
        description: "Săpături și încărcare pe același utilaj.",
        machine: "backhoeLoader",
        drive: 40,
    },
    {
        count: 2,
        name: "Miniexcavatoare",
        description: "Lucrări în spații înguste, șanțuri de cablu și rețele.",
        machine: "miniExcavator",
    },
    {
        count: 1,
        name: "Autogreder cu ghidare GPS",
        description: "Profilarea straturilor la cotele de proiect.",
        machine: "motorGrader",
        drive: 20,
    },
    {
        count: 1,
        name: "Buldozer cu ghidare GPS",
        description: "Decopertări, nivelări și terasamente.",
        machine: "bulldozer",
        drive: 16,
    },
    {
        count: 3,
        name: "Cilindri compactori",
        description: "Compactarea umpluturilor și a straturilor de fundație, până la mare tonaj.",
        machine: "roller",
        drive: 28,
    },
    {
        count: 1,
        name: "Încărcător frontal",
        description: "Încărcarea și manipularea materialelor în șantier.",
        machine: "wheelLoader",
        drive: 36,
    },
    {
        count: 4,
        name: "Autobasculante 8×4",
        description: "Transportul pământului, agregatelor și materialelor.",
        machine: "dumpTruck",
        drive: -12,
    },
    {
        count: 1,
        name: "Cisternă de apă",
        description: "Alimentarea cu apă a lucrărilor din șantier.",
        machine: "waterTanker",
        drive: 24,
    },
    {
        count: 1,
        name: "Autocamion pentru încercări",
        description: "Verificarea capacității portante prin încercarea cu grinda Benkelman.",
        machine: "testTruck",
        drive: 32,
    },
];

export default function Equipment() {
    return(
        <section className={styles.equipment} aria-labelledby="equipment-title">
            <h2 id="equipment-title">Parcul nostru de <strong>utilaje</strong></h2>
            <p className={styles.intro}>
                22 de utilaje și autovehicule proprii, întreținute și operate de echipa noastră.
            </p>
            <div className={styles.container}>
                {EQUIPMENT.map((item) => {
                    const Machine = MACHINES[item.machine];
                    return (
                    <div key={item.name} className={styles.card}>
                        {Machine && (
                            <Machine
                                className={`${styles.image} ${item.drive ? styles.drive : ""}`}
                                style={item.drive ? { "--drive": `${item.drive}px` } : undefined}
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
            </div>
        </section>
    )
}
