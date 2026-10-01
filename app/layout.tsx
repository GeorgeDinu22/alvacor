import type { Metadata } from "next";
import Header from "./Header/header";
import Footer from "./Footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALVACOR – Construcții civile și infrastructură",
  description:
    "Proiectare și execuție în construcții civile și infrastructură: drumuri și poduri, terasamente, rețele de apă și canalizare. Echipă și utilaje proprii, certificări ISO.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
