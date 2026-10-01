import Image from "next/image";
import Hero from './hero/hero';
import WhyUs from './WhyUs/WhyUs';
import Equipment from './Equipment/Equipment';
import Gallery from './Gallery/Gallery';
import MapSection from './Map/Map';
import Portfolio from './Portfolio/Portfolio';

export default function Home() {
  return (
      <div data-smooth-scroll>
      <Hero/>
      <WhyUs/>
      <Equipment/>
      <Gallery/>
      <MapSection/>
      <Portfolio/>
      </div>
  );
}
