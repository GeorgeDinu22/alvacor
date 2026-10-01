// Proiectele din portofoliu: un obiect per proiect, pagina lui e /portofoliu/[slug].
//
// body = lista de blocuri, randate în ordine:
//   { type: "titlu", text }                 -> <h1> (unul singur, primul bloc)
//   { type: "subtitlu", text }              -> <h3>
//   { type: "paragraf", continut: [...] }   -> <p>; continut = string-uri sau { text, bold: true }
//   { type: "imagine", src, alt }           -> imagine pe toată lățimea
//
// descriere = textul scurt de pe cardul din secțiunea Portofoliu.

// Poze de TEST (aceleași ca în WhyUs), fără licență verificată: de înlocuit cu poze din șantier.
const IMG = {
    team: "https://media.istockphoto.com/id/2117759132/photo/four-construction-workers-having-meeting.jpg?s=612x612&w=0&k=20&c=qLV__HuqWfnV9RWbXgzQDrYxsmQXbDRm4RO-RP9vEIs=",
    excavator: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Construction_site_excavator_and_truck.jpg/960px-Construction_site_excavator_and_truck.jpg",
    worker: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Construction_worker_-_8217.jpg/960px-Construction_worker_-_8217.jpg",
    asphalt: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Roadtec_RP-190_Highway_Class_Asphalt_Pavel.jpg/960px-Roadtec_RP-190_Highway_Class_Asphalt_Pavel.jpg",
    bridge: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Reinforced_Concrete_Bridge_over_the_River_Torrens%2C_on_the_new_Torrens_Gorge_Main_Road%28GN02474%29.jpg/960px-Reinforced_Concrete_Bridge_over_the_River_Torrens%2C_on_the_new_Torrens_Gorge_Main_Road%28GN02474%29.jpg",
    wind: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Wind_Turbines_and_Power_Lines%2C_East_Sussex%2C_England_-_April_2009.jpg/960px-Wind_Turbines_and_Power_Lines%2C_East_Sussex%2C_England_-_April_2009.jpg",
};

// TODO: textele de mai jos sunt orientative, de completat cu detaliile reale ale fiecărei lucrări.
export const proiecte = [
    {
        slug: "reabilitare-dn52-alexandria-turnu-magurele",
        descriere: "46,7 km de drum național reabilitat și modernizat.",
        body: [
            { type: "titlu", text: "Reabilitare DN 52 Alexandria – Turnu Măgurele" },
            {
                type: "paragraf",
                continut: [
                    "Am reabilitat și modernizat ",
                    { text: "46,7 km din DN 52", bold: true },
                    ", tronsonul care leagă Alexandria de Turnu Măgurele, în județul Teleorman.",
                ],
            },
            
            { type: "subtitlu", text: "Lucrări executate" },
            {
                type: "paragraf",
                continut: [
                    "Lucrările au cuprins ",
                    { text: "terasamente", bold: true },
                    ", refacerea structurii rutiere, ",
                    { text: "straturi noi de asfalt", bold: true },
                    " și sisteme de colectare a apelor pluviale.",
                ],
            },
            { type: "imagine", src: IMG.excavator, alt: "Excavator și autobasculantă pe șantier" },
            { type: "subtitlu", text: "Echipă și utilaje proprii" },
            {
                type: "paragraf",
                continut: [
                    "Întreaga lucrare a fost executată cu echipa și parcul nostru de utilaje.",
                ],
            },
            { type: "imagine", src: IMG.worker, alt: "Muncitor pe șantierul DN 52" },
        ],
    },
    {
        slug: "pod-rutier-arges-gostinari",
        descriere: "Pod de 205 m la km 51+290, jud. Giurgiu.",
        body: [
            { type: "titlu", text: "Pod rutier peste Argeș, Gostinari" },
            {
                type: "paragraf",
                continut: [
                    "Am construit un ",
                    { text: "pod rutier de 205 m", bold: true },
                    " peste râul Argeș, la ",
                    { text: "km 51+290", bold: true },
                    ", în localitatea Gostinari, județul Giurgiu.",
                ],
            },
            { type: "imagine", src: IMG.bridge, alt: "Pod rutier din beton armat" },
            { type: "subtitlu", text: "Lucrări executate" },
            {
                type: "paragraf",
                continut: [
                    "Proiectul a inclus infrastructura și suprastructura podului, precum și racordarea la drumul existent.",
                ],
            },
            { type: "imagine", src: IMG.excavator, alt: "Utilaje pe șantierul podului" },
        ],
    },
    {
        slug: "cabluri-110kv-parcuri-eoliene-deleni-bogdanesti",
        descriere: "Rețele de înaltă tensiune în jud. Vaslui și Botoșani, 2025–2026.",
        body: [
            { type: "titlu", text: "Cabluri 110 kV în parcurile eoliene Deleni și Bogdănești" },
            {
                type: "paragraf",
                continut: [
                    "Executăm rețelele de ",
                    { text: "înaltă tensiune (110 kV)", bold: true },
                    " pentru parcurile eoliene Deleni și Bogdănești, în județele Vaslui și Botoșani.",
                ],
            },
            { type: "imagine", src: IMG.wind, alt: "Turbine eoliene și linii electrice" },
            { type: "subtitlu", text: "Perioada de execuție" },
            {
                type: "paragraf",
                continut: [
                    "Lucrările se desfășoară în perioada ",
                    { text: "2025–2026", bold: true },
                    ".",
                ],
            },
            { type: "imagine", src: IMG.team, alt: "Echipa ALVACOR în ședință pe șantier" },
            { type: "imagine", src: IMG.worker, alt: "Muncitor pe șantierul parcului eolian" },
        ],
    },
    // TODO: proiectele de mai jos sunt de TEST, de înlocuit cu lucrări reale.
    {
        slug: "retea-apa-canalizare",
        descriere: "Rețele noi de apă potabilă și canalizare menajeră.",
        body: [
            { type: "titlu", text: "Rețea de alimentare cu apă și canalizare" },
            {
                type: "paragraf",
                continut: ["Am executat ", { text: "rețele noi de apă și canalizare", bold: true }, " pentru gospodăriile din localitate, inclusiv branșamentele individuale."],
            },
            { type: "imagine", src: IMG.excavator, alt: "Excavator la săparea șanțului pentru conducte" },
            { type: "subtitlu", text: "Lucrări executate" },
            { type: "paragraf", continut: ["Săpături, pozare conducte, cămine de vizitare și refacerea carosabilului după lucrări."] },
            { type: "imagine", src: IMG.worker, alt: "Muncitor la montajul conductelor" },
        ],
    },
    {
        slug: "modernizare-drumuri-judetene",
        descriere: "Drumuri județene aduse la standarde moderne.",
        body: [
            { type: "titlu", text: "Modernizare drumuri județene" },
            {
                type: "paragraf",
                continut: ["Am modernizat ", { text: "mai multe tronsoane de drum județean", bold: true }, " cu fundație nouă, îmbrăcăminte asfaltică și semnalizare."],
            },
            { type: "imagine", src: IMG.asphalt, alt: "Așternere de asfalt pe drum județean" },
            { type: "subtitlu", text: "Lucrări executate" },
            { type: "paragraf", continut: ["Scarificare, straturi de fundație, mixturi asfaltice, șanțuri și podețe."] },
            { type: "imagine", src: IMG.excavator, alt: "Utilaje pe șantierul drumului" },
        ],
    },
    {
        slug: "terasamente-platforma-logistica",
        descriere: "Pregătirea terenului pentru un parc logistic.",
        body: [
            { type: "titlu", text: "Terasamente pentru platformă logistică" },
            {
                type: "paragraf",
                continut: ["Am realizat ", { text: "lucrări ample de terasamente", bold: true }, " pentru o platformă logistică: decopertare, umpluturi și compactare."],
            },
            { type: "imagine", src: IMG.excavator, alt: "Excavator și autobasculantă la terasamente" },
            { type: "subtitlu", text: "Echipă și utilaje proprii" },
            { type: "paragraf", continut: ["Lucrarea a fost executată integral cu buldozere, excavatoare și compactoare din parcul propriu."] },
            { type: "imagine", src: IMG.team, alt: "Echipa în ședință pe șantier" },
        ],
    },
    {
        slug: "consolidare-pod-beton-armat",
        descriere: "Reabilitarea structurii unui pod existent.",
        body: [
            { type: "titlu", text: "Consolidare pod din beton armat" },
            {
                type: "paragraf",
                continut: ["Am consolidat ", { text: "structura de rezistență a podului", bold: true }, " și am refăcut calea pe pod, parapetele și racordările cu terasamentele."],
            },
            { type: "imagine", src: IMG.bridge, alt: "Pod din beton armat după consolidare" },
            { type: "subtitlu", text: "Lucrări executate" },
            { type: "paragraf", continut: ["Cămășuirea elementelor din beton, hidroizolație, rosturi de dilatație și îmbrăcăminte nouă."] },
            { type: "imagine", src: IMG.worker, alt: "Muncitor pe șantierul podului" },
        ],
    },
    {
        slug: "sistematizare-verticala-parcari",
        descriere: "Platforme, alei și parcări pentru un ansamblu nou.",
        body: [
            { type: "titlu", text: "Sistematizare verticală și parcări" },
            {
                type: "paragraf",
                continut: ["Am executat ", { text: "sistematizarea verticală și parcările", bold: true }, " pentru un ansamblu nou, cu scurgerea controlată a apelor pluviale."],
            },
            { type: "imagine", src: IMG.asphalt, alt: "Asfaltarea parcării" },
            { type: "subtitlu", text: "Lucrări executate" },
            { type: "paragraf", continut: ["Nivelări, straturi de fundație, borduri, rigole și asfaltare."] },
            { type: "imagine", src: IMG.team, alt: "Echipa pe șantier" },
        ],
    },
    {
        slug: "infrastructura-statie-epurare",
        descriere: "Lucrări de infrastructură pentru o stație de epurare.",
        body: [
            { type: "titlu", text: "Infrastructură pentru stație de epurare" },
            {
                type: "paragraf",
                continut: ["Am realizat ", { text: "lucrările de infrastructură", bold: true }, " pentru o stație de epurare: săpături, fundații și rețele tehnologice."],
            },
            { type: "imagine", src: IMG.excavator, alt: "Excavator la săpăturile pentru stația de epurare" },
            { type: "subtitlu", text: "Lucrări executate" },
            { type: "paragraf", continut: ["Excavații, epuismente, fundații din beton armat și conducte de legătură."] },
            { type: "imagine", src: IMG.worker, alt: "Muncitor la fundații" },
        ],
    },
    {
        slug: "piste-biciclete-trotuare",
        descriere: "Piste de biciclete și trotuare noi în localitate.",
        body: [
            { type: "titlu", text: "Piste de biciclete și trotuare" },
            {
                type: "paragraf",
                continut: ["Am construit ", { text: "piste de biciclete și trotuare", bold: true }, " de-a lungul drumului principal, cu iluminat și marcaje."],
            },
            { type: "imagine", src: IMG.asphalt, alt: "Asfaltarea pistei de biciclete" },
            { type: "subtitlu", text: "Lucrări executate" },
            { type: "paragraf", continut: ["Borduri, fundații, pavaje și asfalt, plus marcaje și indicatoare."] },
            { type: "imagine", src: IMG.team, alt: "Echipa la recepția lucrării" },
        ],
    },
];

export function getProiect(slug) {
    return proiecte.find((proiect) => proiect.slug === slug);
}

export function getTitlu(proiect) {
    return proiect.body.find((bloc) => bloc.type === "titlu")?.text ?? "";
}

export function getImagini(proiect) {
    return proiect.body.filter((bloc) => bloc.type === "imagine");
}
