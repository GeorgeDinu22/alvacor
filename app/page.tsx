import Image from "next/image";
import Hero from './hero/hero';
import WhyUs from './WhyUs/WhyUs';
import Equipment from './Equipment/Equipment';
import MapSection from './Map/Map';

export default function Home() {
  return (
      <>
      <Hero/>
      <WhyUs/>
      <Equipment/>
      <MapSection/>
      </>
  );
}
