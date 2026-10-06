import styles from "./Equipment.module.css";

// Ilustrațiile din public/assets, inline, ca părțile mobile să poată fi animate la hover.
// --o = punctul de pivot (în coordonatele viewBox 240×160), --hover = mișcarea la hover.
// Animațiile în buclă (săpat, descărcat, fum, semnale…) sunt în Equipment.module.css.
const part = (origin, hover) => ({ "--o": origin, "--hover": hover });
const pivot = (origin) => ({ "--o": origin });

const DARK = "#1D2125";
const GREY = "#3A4046";
const YELLOW = "#F2B705";
const OCHRE = "#C99700";
const GLASS = "#2E5A78";
const STEEL = "#B9B4AA";
const EARTH = "#8A6A45";
const GRAVEL = "#A08A68";
const BEACON = "#FF8A00";

// roata are spițe, ca să se vadă când se învârte (la utilajele care se deplasează)
function Wheel({ cx, cy = 128, r = 16, hub = 6 }) {
    return (
        <g className={styles.roata} style={pivot(`${cx}px ${cy}px`)}>
            <circle cx={cx} cy={cy} r={r} fill={DARK} />
            <circle cx={cx} cy={cy} r={hub} fill={STEEL} />
            <path d={`M${cx - hub} ${cy}H${cx + hub}M${cx} ${cy - hub}V${cy + hub}`} stroke={GREY} strokeWidth="2" />
        </g>
    );
}

// zale pe conturul șenilei, „curg” când utilajul se deplasează
function Track({ d }) {
    return (
        <>
            <path d={d} fill={DARK} />
            <path d={d} className={styles.senila} fill="none" stroke={GREY} strokeWidth="3" strokeDasharray="5 6" />
        </>
    );
}

// bucăți de material care cad; flux = clasa care decide când se văd (fereastra din ciclu)
function Falling({ flux, points, color = EARTH, h = 40, dx = 0 }) {
    return (
        <g className={`${styles.flux} ${flux}`}>
            {points.map(([x, y, r], i) => (
                <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={r}
                    fill={color}
                    className={styles.cade}
                    style={{ "--i": i, "--h": `${h}px`, "--dx": `${dx}px` }}
                />
            ))}
        </g>
    );
}

// rotocoale de fum din eșapament
function Smoke({ x, y }) {
    return (
        <g aria-hidden="true">
            {[0, 1, 2].map((i) => (
                <circle key={i} cx={x} cy={y} r="5" fill="#9A958C" className={styles.fum} style={{ "--i": i, ...pivot(`${x}px ${y}px`) }} />
            ))}
        </g>
    );
}

// girofar pe acoperiș: lumina din spate clipește
function Beacon({ x, y }) {
    return (
        <g>
            <circle cx={x} cy={y - 2} r="10" fill={BEACON} className={styles.girofar} />
            <path d={`M${x - 5} ${y}a5 5 0 0 1 10 0z`} fill={BEACON} />
            <path d={`M${x - 7} ${y}H${x + 7}`} stroke={DARK} strokeWidth="2" />
        </g>
    );
}

function Svg({ className, style, label, children }) {
    return (
        <svg
            viewBox="0 0 240 160"
            preserveAspectRatio="xMinYMax meet"
            className={className}
            style={style}
            role="img"
            aria-label={label}
        >
            {children}
        </svg>
    );
}

// braț de excavator pe articulații: braț principal → balansier → cupă; dy mută totul pe verticală
// boom = cât se ridică brațul principal, stick = cât se deschide balansierul (grade, negativ = în sus)
// dig = în loc de mișcarea simplă de la hover, face un ciclu complet de săpare (în buclă)
function ExcavatorArm({ dy = 0, boom = -12, stick = 0, dig = false }) {
    return (
        <g className={`${styles.part} ${dig ? styles.sapaBrat : ""}`} style={part(`137px ${102 + dy}px`, `rotate(${boom}deg)`)}>
            <g transform={`translate(0 ${dy})`}>
                <path d="M128 98L176 30L192 38L146 106L128 98Z" fill={YELLOW} />
                <path d="M142 84L172 46" stroke={STEEL} strokeWidth="5" strokeLinecap="round" />
            </g>
            <g className={`${styles.part} ${dig ? styles.sapaBalansier : ""}`} style={part(`185px ${30 + dy}px`, `rotate(${stick}deg)`)}>
                <g transform={`translate(0 ${dy})`}>
                    <path d="M178 30L192 26L222 96L208 100L178 30Z" fill={YELLOW} />
                </g>
                <g className={`${styles.part} ${dig ? styles.sapaCupa : ""}`} style={part(`214px ${96 + dy}px`, "rotate(-40deg)")}>
                    <g transform={`translate(0 ${dy})`}>
                        <path d="M204 94L226 90L232 118C220 123.3 208.7 122 198 114L204 94Z" fill={DARK} />
                        <path d="M200 116L196 124M208 119L205 127M216 121L214 129" stroke={DARK} strokeWidth="3" />
                    </g>
                </g>
            </g>
        </g>
    );
}

function ExcavatorBody({ dy = 0 }) {
    return (
        <g transform={`translate(0 ${dy})`}>
            <path d="M138 76H34C31.8 76 30 77.8 30 80V104C30 106.2 31.8 108 34 108H138C140.2 108 142 106.2 142 104V80C142 77.8 140.2 76 138 76Z" fill={YELLOW} />
            <path d="M48 80H28C25.8 80 24 81.8 24 84V104C24 106.2 25.8 108 28 108H48C50.2 108 52 106.2 52 104V84C52 81.8 50.2 80 48 80Z" fill={OCHRE} />
            <path d="M142 105H30V108H142V105Z" fill={OCHRE} />
            <path d="M126 34H92C89.8 34 88 35.8 88 38V76C88 78.2 89.8 80 92 80H126C128.2 80 130 78.2 130 76V38C130 35.8 128.2 34 126 34Z" fill={YELLOW} />
            <path d="M122 40H96C94.9 40 94 40.9 94 42V68C94 69.1 94.9 70 96 70H122C123.1 70 124 69.1 124 68V42C124 40.9 123.1 40 122 40Z" fill={GLASS} fillOpacity="0.85" />
        </g>
    );
}

// Excavator pe șenile: ciclu complet de săpare, pământul cade din cupă la descărcare
export function Excavator(props) {
    return (
        <Svg {...props}>
            <Track d="M148 116H40C31.2 116 24 123.2 24 132C24 140.8 31.2 148 40 148H148C156.8 148 164 140.8 164 132C164 123.2 156.8 116 148 116Z" />
            <circle cx="42" cy="132" r="9" fill={GREY} /><circle cx="68" cy="132" r="7" fill={GREY} />
            <circle cx="94" cy="132" r="7" fill={GREY} /><circle cx="120" cy="132" r="7" fill={GREY} />
            <circle cx="146" cy="132" r="9" fill={GREY} />
            <path d="M130 104H60V118H130V104Z" fill={GREY} />
            <ExcavatorBody />
            <ExcavatorArm dig />
            <Falling flux={styles.fluxExcavator} points={[[216, 92, 3.5], [222, 90, 3], [228, 94, 4], [220, 96, 2.5]]} h={50} />
        </Svg>
    );
}

// Excavator pe pneuri: partea de sus se rotește pe platforma ei (o jumătate de tură și înapoi),
// girofarul clipește. Desenul e mutat 40 la dreapta ca brațul rotit să rămână în card.
export function WheeledExcavator(props) {
    return (
        <Svg {...props}>
            <g transform="translate(40 0)">
                <path d="M26 104H160V120H26V104Z" fill={DARK} />
                <Wheel cx={44} /><Wheel cx={78} /><Wheel cx={112} /><Wheel cx={146} />
                <path d="M66 92H126V104H66V92Z" fill={GREY} />
                {/* pivotul = centrul platformei rotative (x = 96); originea e în coordonatele
                    grupului, deja mutat cu translate(40 0), deci nu se adună cei 40 */}
                <g className={styles.pivotare} style={pivot("96px 90px")}>
                    <ExcavatorBody dy={-14} />
                    <ExcavatorArm dy={-14} />
                    <Beacon x={120} y={20} />
                </g>
            </g>
        </Svg>
    );
}

// Buldoexcavator: întâi ridică încărcătorul din față, apoi sapă cu brațul din spate
export function BackhoeLoader(props) {
    return (
        <Svg {...props}>
            <path d="M40 98H48V142H40V98Z" fill={GREY} /><path d="M34 140H54V146H34V140Z" fill={DARK} />
            {/* brațul de săpare (spate) */}
            <g className={`${styles.part} ${styles.bkBrat}`} style={part("66px 90px", "rotate(14deg)")}>
                <path d="M58 92L34 34L48 28L74 88L58 92Z" fill={YELLOW} />
                <path d="M36 30L48 26L26 98L14 94L36 30Z" fill={YELLOW} />
                <path d="M44 44L62 80" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
                <g className={`${styles.part} ${styles.bkCupa}`} style={part("20px 96px", "rotate(45deg)")}>
                    <path d="M10 92L30 96L28 118C18 120 10 116 6 108L10 92Z" fill={DARK} />
                </g>
            </g>
            <Falling flux={styles.fluxBuldoexcavator} points={[[10, 108, 3], [16, 112, 3.5], [6, 114, 2.5]]} h={30} />
            <path d="M52 88H186C188.2 88 190 89.8 190 92V114H52V88Z" fill={YELLOW} />
            <path d="M52 110H190V114H52V110Z" fill={OCHRE} />
            <path d="M118 64H172C176 64 180 66 182 70L188 88H118V64Z" fill={YELLOW} />
            <path d="M176 70H184V76H176V70Z" fill={DARK} />
            <path d="M64 30H112C114.2 30 116 31.8 116 34V88H60V34C60 31.8 61.8 30 64 30Z" fill={YELLOW} />
            <path d="M66 36H110V70H66V36Z" fill={GLASS} fillOpacity="0.85" />
            <path d="M58 26H118V32H58V26Z" fill={OCHRE} />
            {/* încărcătorul (față) */}
            <g className={`${styles.part} ${styles.bkIncarcator}`} style={part("138px 85px", "rotate(-14deg)")}>
                <path d="M140 80L200 104L196 114L136 90L140 80Z" fill={OCHRE} />
                <g className={`${styles.part} ${styles.bkCupaFata}`} style={part("196px 110px", "rotate(12deg)")}>
                    <path d="M194 96H228L232 140H200C196 140 192 136 192 132V100C192 97.8 193.1 96 194 96Z" fill={GREY} />
                    <path d="M200 140H234V144H200V140Z" fill={DARK} />
                </g>
            </g>
            <Wheel cx={84} cy={122} r={22} hub={9} />
            <Wheel cx={164} />
        </Svg>
    );
}

// Miniexcavator: sapă repede, stropește cu pământ și „țopăie” de energie
export function MiniExcavator(props) {
    return (
        <Svg {...props}>
            <g className={styles.saltaret}>
                <path d="M140 122H64C57.4 122 52 127.4 52 134C52 140.6 57.4 146 64 146H140C146.6 146 152 140.6 152 134C152 127.4 146.6 122 140 122Z" fill={DARK} />
                <circle cx="64" cy="134" r="7" fill={GREY} /><circle cx="88" cy="134" r="5" fill={GREY} />
                <circle cx="112" cy="134" r="5" fill={GREY} /><circle cx="140" cy="134" r="7" fill={GREY} />
                <path d="M80 112H124V122H80V112Z" fill={GREY} />
                <path d="M136 88H64C61.8 88 60 89.8 60 92V112C60 114.2 61.8 116 64 116H136C138.2 116 140 114.2 140 112V92C140 89.8 138.2 88 136 88Z" fill={YELLOW} />
                <path d="M140 113H60V116H140V113Z" fill={OCHRE} />
                <path d="M72 50H78V90H72V50ZM112 50H118V90H112V50Z" fill={DARK} />
                <path d="M66 44H124V52H66V44Z" fill={DARK} />
                <path d="M86 74H104V88H86V74Z" fill={GREY} />
                <g className={`${styles.part} ${styles.miniBrat}`} style={part("137px 107px", "rotate(-14deg)")}>
                    <path d="M130 104L160 58L172 64L144 110L130 104Z" fill={YELLOW} />
                    <path d="M162 58L174 54L196 108L184 112L162 58Z" fill={YELLOW} />
                    <g className={`${styles.part} ${styles.miniCupa}`} style={part("190px 108px", "rotate(-40deg)")}>
                        <path d="M180 106L198 104L202 126C194 130 186 129 178 122L180 106Z" fill={DARK} />
                    </g>
                </g>
            </g>
            {/* stropi de pământ din cupă */}
            {[8, 14, 20].map((dx, i) => (
                <circle key={dx} cx="196" cy="126" r={2.5 + (i % 2)} fill={EARTH} className={styles.strop} style={{ "--dx": `${dx}px`, "--i": i }} />
            ))}
        </Svg>
    );
}

// undele de semnal de deasupra unui catarg GPS
function GpsSignal({ x, y }) {
    return (
        <>
            {[0, 1].map((i) => (
                <path
                    key={i}
                    d={i === 0 ? `M${x - 8} ${y - 8}Q${x} ${y - 16} ${x + 8} ${y - 8}` : `M${x - 13} ${y - 13}Q${x} ${y - 26} ${x + 13} ${y - 13}`}
                    fill="none"
                    stroke={GLASS}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className={styles.semnal}
                    style={{ "--i": i, ...pivot(`${x}px ${y}px`) }}
                />
            ))}
        </>
    );
}

// Autogreder: catargele GPS emit semnal, lama coboară, fum din eșapament
export function MotorGrader(props) {
    return (
        <Svg {...props}>
            <Smoke x={54} y={60} />
            {/* motor (spate) */}
            <path d="M10 80H60V114H10V80Z" fill={YELLOW} />
            <path d="M10 110H60V114H10V110Z" fill={OCHRE} />
            <path d="M16 86H40M16 92H40M16 98H40" stroke={GREY} strokeWidth="3" />
            <path d="M50 64H58V80H50V64Z" fill={DARK} />
            {/* cabina vitrată */}
            <path d="M60 28H100C102.2 28 104 29.8 104 32V104H58V32C58 29.8 59.8 28 60 28Z" fill={YELLOW} />
            <path d="M64 34H98V74H64V34Z" fill={GLASS} fillOpacity="0.85" />
            <path d="M80 34V74" stroke={YELLOW} strokeWidth="3" />
            <path d="M56 24H106V30H56V24Z" fill={OCHRE} />
            {/* cadrul lung, arcuit, până la puntea din față */}
            <path d="M100 74C130 62 176 62 200 70C206 72 210 78 210 86V112H198V88C198 84 196 82 192 81C168 76 132 78 104 92Z" fill={YELLOW} />
            <path d="M104 88C132 76 168 74 192 79" stroke={OCHRE} strokeWidth="3" />
            <path d="M208 94H222V110H208V94Z" fill={GREY} />
            {/* cilindri de ridicare, tiranți și coroana lamei */}
            <path d="M120 84L122 112M160 80L162 110" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
            <path d="M196 100L142 112" stroke={GREY} strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="140" cy="113" rx="28" ry="4" fill={GREY} />
            {/* lama cu catargele GPS: coboară și alunecă lateral */}
            <g className={styles.part} style={part("141px 124px", "translate(-8px, 4px) rotate(3deg)")}>
                <path d="M102 118L180 112L182 124C162 132 124 136 100 132Z" fill={DARK} />
                <path d="M100 132C124 136 162 132 182 124L183 128C162 137 124 140 99 136Z" fill={STEEL} />
                <path d="M104 70H108V120H104V70ZM175 64H179V114H175V64Z" fill={GREY} />
                <ellipse cx="106" cy="68" rx="8" ry="4" fill="#F3F0E9" stroke={DARK} strokeWidth="2" />
                <ellipse cx="177" cy="62" rx="8" ry="4" fill="#F3F0E9" stroke={DARK} strokeWidth="2" />
                <GpsSignal x={106} y={64} />
                <GpsSignal x={177} y={58} />
            </g>
            <Wheel cx={30} cy={127} r={17} /><Wheel cx={68} cy={127} r={17} /><Wheel cx={204} cy={127} r={17} />
        </Svg>
    );
}

// Buldozer: împinge o grămadă de pământ care crește în fața lamei, fum din eșapament
export function Bulldozer(props) {
    return (
        <Svg {...props}>
            <Smoke x={80} y={46} />
            {/* riper (spate), fix */}
            <path d="M22 112H34V140L28 146L22 140V112Z" fill={DARK} />
            <path d="M30 112H52V120H30V112Z" fill={GREY} />
            <Track d="M166 112H56C47.2 112 40 119.2 40 128V130C40 138.8 47.2 146 56 146H166C174.8 146 182 138.8 182 130V128C182 119.2 174.8 112 166 112Z" />
            <circle cx="58" cy="129" r="10" fill={GREY} /><circle cx="88" cy="132" r="6" fill={GREY} />
            <circle cx="112" cy="132" r="6" fill={GREY} /><circle cx="136" cy="132" r="6" fill={GREY} />
            <circle cx="164" cy="129" r="10" fill={GREY} />
            <path d="M52 76H162C164.2 76 166 77.8 166 80V112H52V76Z" fill={YELLOW} />
            <path d="M52 108H166V112H52V108Z" fill={OCHRE} />
            <path d="M62 84H100V100H62V84Z" fill={OCHRE} />
            <path d="M76 50H84V76H76V50Z" fill={DARK} />
            <path d="M112 36H148C150.2 36 152 37.8 152 40V76H112V36Z" fill={YELLOW} />
            <path d="M118 42H146V70H118V42Z" fill={GLASS} fillOpacity="0.85" />
            <path d="M108 32H156V38H108V32Z" fill={OCHRE} />
            {/* grămada de pământ împinsă de lamă */}
            <g className={styles.gramada} style={pivot("204px 146px")}>
                <path d="M200 146C203 130 214 120 226 124C234 127 238 138 240 146Z" fill={EARTH} />
                <circle cx="214" cy="132" r="3" fill="#6E5236" /><circle cx="226" cy="136" r="2.5" fill="#6E5236" />
            </g>
            {/* lama (față) coboară puțin, să împingă */}
            <g className={styles.part} style={part("158px 104px", "rotate(2deg)")}>
                <path d="M160 100L194 118L190 126L156 108L160 100Z" fill={OCHRE} />
                <path d="M190 70H202C206 90 206 124 202 146H186C190 124 190 92 190 70Z" fill={YELLOW} />
                <path d="M186 142H206V146H186V142Z" fill={DARK} />
            </g>
        </Svg>
    );
}

// Cilindru compactor: valțul vibrează și trimite unde de compactare în asfalt
export function Roller(props) {
    return (
        <Svg {...props}>
            <path d="M28 76H132V112H28V76Z" fill={YELLOW} />
            <path d="M28 108H132V112H28V108Z" fill={OCHRE} />
            <path d="M36 84H70V98H36V84Z" fill={GREY} />
            <path d="M76 34H82V78H76V34ZM118 34H124V78H118V34Z" fill={DARK} />
            <path d="M70 28H130V36H70V28Z" fill={DARK} />
            <path d="M88 60H112V76H88V60Z" fill={GREY} />
            <path d="M130 90H150V108H130V90Z" fill={GREY} />
            <path d="M146 80H210C212.2 80 214 81.8 214 84V104H146V80Z" fill={YELLOW} />
            <path d="M146 100H214V104H146V100Z" fill={OCHRE} />
            {/* unde de compactare sub valț */}
            {[0, 1, 2].map((i) => (
                <ellipse key={i} cx="180" cy="147" rx="12" ry="2.5" fill="none" stroke="#F3F0E9" strokeWidth="1.5" className={styles.unda} style={{ "--i": i, ...pivot("180px 147px") }} />
            ))}
            {/* valțul vibrează */}
            <g className={styles.vibrate}>
                <rect x="148" y="98" width="64" height="48" rx="24" fill={GREY} />
                <rect x="152" y="102" width="56" height="40" rx="20" fill={STEEL} />
                <path d="M156 110H204M156 122H204M156 134H204" stroke="#9A958C" strokeWidth="2" />
            </g>
            {/* liniuțe de vibrație lângă valț */}
            <path d="M218 108q4 8 0 16M224 104q5 12 0 24" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" className={styles.vibratie} />
            <Wheel cx={66} cy={124} r={22} hub={9} />
        </Svg>
    );
}

// Încărcător frontal: ridică cupa plină și descarcă pietrișul
export function WheelLoader(props) {
    return (
        <Svg {...props}>
            <path d="M18 70H88V104H18V70Z" fill={YELLOW} />
            <path d="M26 78H66V92H26V78Z" fill={GREY} />
            <path d="M18 100H176V116H18V100Z" fill={YELLOW} />
            <path d="M18 112H176V116H18V112Z" fill={OCHRE} />
            <path d="M92 32H134C136.2 32 138 33.8 138 36V100H88V36C88 33.8 89.8 32 92 32Z" fill={YELLOW} />
            <path d="M94 38H132V74H94V38Z" fill={GLASS} fillOpacity="0.85" />
            <path d="M86 28H140V34H86V28Z" fill={OCHRE} />
            {/* brațele ridică cupa, cupa se înclină și descarcă */}
            <g className={`${styles.part} ${styles.incBrat}`} style={part("145px 72px", "rotate(-16deg)")}>
                <path d="M140 74L150 70L200 108L192 118L140 74Z" fill={YELLOW} />
                <path d="M144 92L186 110" stroke={GREY} strokeWidth="5" strokeLinecap="round" />
                <g className={`${styles.part} ${styles.incCupa}`} style={part("194px 112px", "rotate(10deg)")}>
                    <path d="M188 96H218C222 96 226 99 228 104L236 144H196C191.6 144 188 140.4 188 136V96Z" fill={GREY} />
                    <path d="M196 140H238V144H196V140Z" fill={DARK} />
                    {/* pietrișul din cupă */}
                    <path className={styles.incIncarcatura} d="M189 99C194 84 214 80 227 101Z" fill={GRAVEL} />
                </g>
            </g>
            <Falling flux={styles.fluxIncarcator} points={[[230, 94, 3.5], [236, 92, 3], [226, 98, 3], [240, 96, 2.5], [233, 100, 3]]} color={GRAVEL} h={46} />
            <Wheel cx={62} cy={122} r={22} hub={9} />
            <Wheel cx={156} cy={122} r={22} hub={9} />
        </Svg>
    );
}

function TruckCab() {
    return (
        <>
            <path d="M166 56H204C210.7 56 214.7 59.3 216 66L224 104H166V56Z" fill={YELLOW} />
            <path d="M174 62H202C206 62 208.3 64 209 68L213 86H174V62Z" fill={GLASS} fillOpacity="0.85" />
            <path d="M228 96H220V108H228V96Z" fill={DARK} />
        </>
    );
}

function TruckWheels() {
    return <><Wheel cx={40} /><Wheel cx={76} /><Wheel cx={176} /><Wheel cx={208} /></>;
}

// Autobasculantă: bena se ridică și pământul curge pe la spate
export function DumpTruck(props) {
    return (
        <Svg {...props}>
            <Falling flux={styles.fluxBasculanta} points={[[10, 96, 4.5], [16, 100, 4], [6, 102, 3.5], [13, 94, 3], [19, 98, 4], [8, 99, 3], [15, 104, 3.5]]} h={46} dx={-4} />
            <g className={`${styles.part} ${styles.bena}`} style={part("22px 102px", "rotate(-20deg)")}>
                <path d="M16 50H158V102H26L16 50Z" fill={YELLOW} />
                <path d="M44 52V100M72 52V100M100 52V100M128 52V100" stroke={OCHRE} strokeWidth="3" />
                <path d="M160 46H14V52H160V46Z" fill={OCHRE} />
            </g>
            <path d="M226 104H12V116H226V104Z" fill={DARK} />
            <TruckCab />
            <TruckWheels />
        </Svg>
    );
}

// Cisternă: stropește apă pe drum, rămâne o pată udă
export function WaterTanker(props) {
    return (
        <Svg {...props}>
            <ellipse cx="22" cy="146" rx="20" ry="3" fill={GLASS} className={styles.balta} />
            <g className={styles.bob}>
                <rect x="16" y="50" width="142" height="54" rx="27" fill={STEEL} />
                <path d="M60 50V104M114 50V104" stroke="#9A958C" strokeWidth="3" />
                <path d="M74 40H100V50H74V40Z" fill={GREY} />
            </g>
            {/* picătura sare */}
            <g className={styles.drop}>
                <path d="M87 62C87 62 78 73 78 79C78 84 82 88 87 88C92 88 96 84 96 79C96 73 87 62 87 62Z" fill={GLASS} />
            </g>
            <path d="M226 104H12V116H226V104Z" fill={DARK} />
            <path d="M8 96H18V110H8V96Z" fill={GREY} />
            <Falling flux={styles.fluxApa} points={[[10, 112, 2], [14, 112, 2.5], [18, 112, 2], [12, 114, 1.8], [16, 113, 2.2], [8, 113, 1.8]]} color="#5B9BD5" h={32} dx={-6} />
            <TruckCab />
            <TruckWheels />
        </Svg>
    );
}

// Autocamion pentru încercări: grinda Benkelman pe sol, acul ceasului comparator oscilează
export function TestTruck(props) {
    return (
        <Svg {...props}>
            {/* balastul apasă pe suspensie */}
            <g className={styles.bob}>
                <path d="M14 92H160V104H14V92Z" fill={OCHRE} />
                <path d="M22 62H66V92H22V62ZM70 62H114V92H70V62ZM118 62H156V92H118V62Z" fill={STEEL} />
                <path d="M44 38H90V62H44V38ZM94 38H140V62H94V38Z" fill="#9A958C" />
            </g>
            <path d="M226 104H12V116H226V104Z" fill={DARK} />
            <TruckCab />
            <Beacon x={192} y={56} />
            <TruckWheels />
            {/* grinda Benkelman între roțile din spate și ceasul comparator */}
            <g className={styles.grinda} style={pivot("150px 142px")}>
                <path d="M56 142H150" stroke={STEEL} strokeWidth="3" strokeLinecap="round" />
                <path d="M56 142V146" stroke={STEEL} strokeWidth="3" strokeLinecap="round" />
            </g>
            <path d="M150 142L156 146H144Z" fill={GREY} />
            <circle cx="156" cy="130" r="9" fill="#F3F0E9" stroke={DARK} strokeWidth="2" />
            <path d="M156 130V123" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" className={styles.ac} style={pivot("156px 130px")} />
            <circle cx="156" cy="130" r="1.5" fill={DARK} />
        </Svg>
    );
}

// Durata unui ciclu de animație (ms), aceeași ca în Equipment.module.css.
// După ce mouse-ul pleacă, Carousel.jsx lasă utilajul să termine ciclul curent.
export const CYCLES = {
    excavator: 2400,
    wheeledExcavator: 3200,
    backhoeLoader: 3200,
    miniExcavator: 1000,
    motorGrader: 1400,
    bulldozer: 1200,
    roller: 900,
    wheelLoader: 2800,
    dumpTruck: 3200,
    waterTanker: 1800,
    testTruck: 1200,
};

export const MACHINES = {
    excavator: Excavator,
    wheeledExcavator: WheeledExcavator,
    backhoeLoader: BackhoeLoader,
    miniExcavator: MiniExcavator,
    motorGrader: MotorGrader,
    bulldozer: Bulldozer,
    roller: Roller,
    wheelLoader: WheelLoader,
    dumpTruck: DumpTruck,
    waterTanker: WaterTanker,
    testTruck: TestTruck,
};
