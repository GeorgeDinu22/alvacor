"use client";

import { useState } from "react";
import SplitText from "../SplitText/SplitText";
import { companyInfo } from "../data/companyInfo";
import styles from "./CtaFinal.module.css";
import Link from "next/link";

// Blocul de final: textul apare literă cu literă, iar butonul apare imediat după ce pornește textul.
// Folosit la finalul paginii principale și al fiecărui proiect.
export default function CtaFinal() {
    const [textPornit, setTextPornit] = useState(false);

    return (
        <aside className={styles.cta} aria-labelledby="cta-title">
            <SplitText
                id="cta-title"
                text="Ți se pare că ne potrivim proiectului tău?"
                delay={28}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationStart={() => setTextPornit(true)}
            />
            <Link
                href={companyInfo.telefon.href}
                className={`${styles.ctaButton} ${styles.apare} ${textPornit ? styles.apareVizibil : ""}`}
            >
                Contactează-ne acum
            </Link>
        </aside>
    );
}
