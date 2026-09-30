import styles from "./Equipment.module.css";

// Ilustrațiile din public/assets, inline, ca părțile mobile să poată fi animate la hover.
// --o = punctul de pivot (în coordonatele viewBox 240×160), --hover = mișcarea la hover.
const part = (origin, hover) => ({ "--o": origin, "--hover": hover });

const DARK = "#1D2125";
const GREY = "#3A4046";
const YELLOW = "#F2B705";
const OCHRE = "#C99700";
const GLASS = "#2E5A78";
const STEEL = "#B9B4AA";

function Wheel({ cx, cy = 128, r = 16, hub = 6 }) {
    return (
        <>
            <circle cx={cx} cy={cy} r={r} fill={DARK} />
            <circle cx={cx} cy={cy} r={hub} fill={STEEL} />
        </>
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

// braț de excavator: braț + balansier + cupă; dy mută totul pe verticală
// braț de excavator pe articulații: braț principal → balansier → cupă
// boom = cât se ridică brațul principal, stick = cât se deschide balansierul (grade, negativ = în sus)
function ExcavatorArm({ dy = 0, boom = -12, stick = 0 }) {
    return (
        <g className={styles.part} style={part(`137px ${102 + dy}px`, `rotate(${boom}deg)`)}>
            <g transform={`translate(0 ${dy})`}>
                <path d="M128 98L176 30L192 38L146 106L128 98Z" fill={YELLOW} />
                <path d="M142 84L172 46" stroke={STEEL} strokeWidth="5" strokeLinecap="round" />
            </g>
            <g className={styles.part} style={part(`185px ${30 + dy}px`, `rotate(${stick}deg)`)}>
                <g transform={`translate(0 ${dy})`}>
                    <path d="M178 30L192 26L222 96L208 100L178 30Z" fill={YELLOW} />
                </g>
                <g className={styles.part} style={part(`214px ${96 + dy}px`, "rotate(-40deg)")}>
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

export function Excavator(props) {
    return (
        <Svg {...props}>
            <path d="M148 116H40C31.2 116 24 123.2 24 132C24 140.8 31.2 148 40 148H148C156.8 148 164 140.8 164 132C164 123.2 156.8 116 148 116Z" fill={DARK} />
            <circle cx="42" cy="132" r="9" fill={GREY} /><circle cx="68" cy="132" r="7" fill={GREY} />
            <circle cx="94" cy="132" r="7" fill={GREY} /><circle cx="120" cy="132" r="7" fill={GREY} />
            <circle cx="146" cy="132" r="9" fill={GREY} />
            <path d="M130 104H60V118H130V104Z" fill={GREY} />
            <ExcavatorBody />
            <ExcavatorArm boom={-10} stick={-32} />
        </Svg>
    );
}

export function WheeledExcavator(props) {
    return (
        <Svg {...props}>
            <path d="M26 104H160V120H26V104Z" fill={DARK} />
            <Wheel cx={44} /><Wheel cx={78} /><Wheel cx={112} /><Wheel cx={146} />
            <path d="M66 92H126V104H66V92Z" fill={GREY} />
            <ExcavatorBody dy={-14} />
            <ExcavatorArm dy={-14} />
        </Svg>
    );
}

export function BackhoeLoader(props) {
    return (
        <Svg {...props}>
            <path d="M40 98H48V142H40V98Z" fill={GREY} /><path d="M34 140H54V146H34V140Z" fill={DARK} />
            {/* brațul de săpare (spate) */}
            <g className={styles.part} style={part("66px 90px", "rotate(14deg)")}>
                <path d="M58 92L34 34L48 28L74 88L58 92Z" fill={YELLOW} />
                <path d="M36 30L48 26L26 98L14 94L36 30Z" fill={YELLOW} />
                <path d="M44 44L62 80" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
                <g className={styles.part} style={part("20px 96px", "rotate(45deg)")}>
                    <path d="M10 92L30 96L28 118C18 120 10 116 6 108L10 92Z" fill={DARK} />
                </g>
            </g>
            <path d="M52 88H186C188.2 88 190 89.8 190 92V114H52V88Z" fill={YELLOW} />
            <path d="M52 110H190V114H52V110Z" fill={OCHRE} />
            <path d="M118 64H172C176 64 180 66 182 70L188 88H118V64Z" fill={YELLOW} />
            <path d="M176 70H184V76H176V70Z" fill={DARK} />
            <path d="M64 30H112C114.2 30 116 31.8 116 34V88H60V34C60 31.8 61.8 30 64 30Z" fill={YELLOW} />
            <path d="M66 36H110V70H66V36Z" fill={GLASS} fillOpacity="0.85" />
            <path d="M58 26H118V32H58V26Z" fill={OCHRE} />
            {/* încărcătorul (față) */}
            <g className={styles.part} style={part("138px 85px", "rotate(-14deg)")}>
                <path d="M140 80L200 104L196 114L136 90L140 80Z" fill={OCHRE} />
                <g className={styles.part} style={part("196px 110px", "rotate(12deg)")}>
                    <path d="M194 96H228L232 140H200C196 140 192 136 192 132V100C192 97.8 193.1 96 194 96Z" fill={GREY} />
                    <path d="M200 140H234V144H200V140Z" fill={DARK} />
                </g>
            </g>
            <Wheel cx={84} cy={122} r={22} hub={9} />
            <Wheel cx={164} />
        </Svg>
    );
}

export function MiniExcavator(props) {
    return (
        <Svg {...props}>
            <path d="M140 122H64C57.4 122 52 127.4 52 134C52 140.6 57.4 146 64 146H140C146.6 146 152 140.6 152 134C152 127.4 146.6 122 140 122Z" fill={DARK} />
            <circle cx="64" cy="134" r="7" fill={GREY} /><circle cx="88" cy="134" r="5" fill={GREY} />
            <circle cx="112" cy="134" r="5" fill={GREY} /><circle cx="140" cy="134" r="7" fill={GREY} />
            <path d="M80 112H124V122H80V112Z" fill={GREY} />
            <path d="M136 88H64C61.8 88 60 89.8 60 92V112C60 114.2 61.8 116 64 116H136C138.2 116 140 114.2 140 112V92C140 89.8 138.2 88 136 88Z" fill={YELLOW} />
            <path d="M140 113H60V116H140V113Z" fill={OCHRE} />
            <path d="M72 50H78V90H72V50ZM112 50H118V90H112V50Z" fill={DARK} />
            <path d="M66 44H124V52H66V44Z" fill={DARK} />
            <path d="M86 74H104V88H86V74Z" fill={GREY} />
            <g className={styles.part} style={part("137px 107px", "rotate(-14deg)")}>
                <path d="M130 104L160 58L172 64L144 110L130 104Z" fill={YELLOW} />
                <path d="M162 58L174 54L196 108L184 112L162 58Z" fill={YELLOW} />
                <g className={styles.part} style={part("190px 108px", "rotate(-40deg)")}>
                    <path d="M180 106L198 104L202 126C194 130 186 129 178 122L180 106Z" fill={DARK} />
                </g>
            </g>
        </Svg>
    );
}

export function MotorGrader(props) {
    return (
        <Svg {...props}>
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
            </g>
            <Wheel cx={30} cy={127} r={17} /><Wheel cx={68} cy={127} r={17} /><Wheel cx={204} cy={127} r={17} />
        </Svg>
    );
}

export function Bulldozer(props) {
    return (
        <Svg {...props}>
            {/* riper (spate), fix */}
            <path d="M22 112H34V140L28 146L22 140V112Z" fill={DARK} />
            <path d="M30 112H52V120H30V112Z" fill={GREY} />
            <path d="M166 112H56C47.2 112 40 119.2 40 128V130C40 138.8 47.2 146 56 146H166C174.8 146 182 138.8 182 130V128C182 119.2 174.8 112 166 112Z" fill={DARK} />
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
            {/* lama (față) se ridică */}
            <g className={styles.part} style={part("158px 104px", "rotate(-9deg)")}>
                <path d="M160 100L194 118L190 126L156 108L160 100Z" fill={OCHRE} />
                <path d="M190 70H202C206 90 206 124 202 146H186C190 124 190 92 190 70Z" fill={YELLOW} />
                <path d="M186 142H206V146H186V142Z" fill={DARK} />
            </g>
        </Svg>
    );
}

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
            {/* valțul vibrează */}
            <g className={styles.vibrate}>
                <rect x="148" y="98" width="64" height="48" rx="24" fill={GREY} />
                <rect x="152" y="102" width="56" height="40" rx="20" fill={STEEL} />
                <path d="M156 110H204M156 122H204M156 134H204" stroke="#9A958C" strokeWidth="2" />
            </g>
            <Wheel cx={66} cy={124} r={22} hub={9} />
        </Svg>
    );
}

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
            {/* brațele ridică cupa, cupa se înclină spre spate */}
            <g className={styles.part} style={part("145px 72px", "rotate(-16deg)")}>
                <path d="M140 74L150 70L200 108L192 118L140 74Z" fill={YELLOW} />
                <path d="M144 92L186 110" stroke={GREY} strokeWidth="5" strokeLinecap="round" />
                <g className={styles.part} style={part("194px 112px", "rotate(10deg)")}>
                    <path d="M188 96H218C222 96 226 99 228 104L236 144H196C191.6 144 188 140.4 188 136V96Z" fill={GREY} />
                    <path d="M196 140H238V144H196V140Z" fill={DARK} />
                </g>
            </g>
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

export function DumpTruck(props) {
    return (
        <Svg {...props}>
            {/* bena se ridică din articulația din spate */}
            <g className={styles.part} style={part("22px 102px", "rotate(-20deg)")}>
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

export function WaterTanker(props) {
    return (
        <Svg {...props}>
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
            <TruckCab />
            <TruckWheels />
        </Svg>
    );
}

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
            <TruckWheels />
        </Svg>
    );
}

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
