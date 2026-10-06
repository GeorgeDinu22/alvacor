import type { Metadata } from "next";
import Header from "./Header/header";
import Footer from "./Footer/Footer";
import { companyInfo } from "./data/companyInfo";
import { servicii } from "./data/servicii";
import { SITE_URL, seo, JsonLd } from "./data/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  description: seo.descriere,
  // paginile își dau doar titlul propriu, numele firmei se adaugă din template
  title: { default: seo.titlu, template: `%s – ${companyInfo.nume}` },
  applicationName: companyInfo.nume,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Date structurate despre firmă, prezente pe toate paginile
const firmaJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE_URL}/#firma`,
  name: companyInfo.nume,
  url: SITE_URL,
  image: `${SITE_URL}${seo.imagine.url}`,
  description: seo.descriere,
  telephone: companyInfo.telefon.href.replace("tel:", ""),
  email: companyInfo.email,
  address: { "@type": "PostalAddress", addressLocality: "București", addressCountry: "RO" },
  areaServed: { "@type": "Country", name: "România" },
  knowsAbout: servicii.map((serviciu) => serviciu.titlu),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <JsonLd date={firmaJsonLd} />
      </body>
    </html>
  );
}
