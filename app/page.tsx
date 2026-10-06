import Image from "next/image";
import Hero from './hero/hero';
import WhyUs from './WhyUs/WhyUs';
import Equipment from './Equipment/Equipment';
import Gallery from './Gallery/Gallery';
import MapSection from './Map/Map';
import Portfolio from './Portfolio/Portfolio';
import Services from './Services/Services';
import Process from './Process/Process';
import Observer from './Observer/observer';
import CtaFinal from './CtaFinal/CtaFinal';
import { seo, creeazaMetadata } from './data/seo';

export const metadata = creeazaMetadata({ descriere: seo.descriere, cale: "/" });

export default function Home() {
  return (
      <div data-smooth-scroll>
      <Hero/>
      <Services/>
      <Process/>
      <WhyUs/>
      <Equipment/>
      <Gallery/>
      <MapSection/>
      <Portfolio/>
      <CtaFinal/>
      <Observer/>
      </div>
  );
}
