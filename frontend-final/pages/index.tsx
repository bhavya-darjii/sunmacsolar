import Head from "next/head";
import HomeHero from "@/components/home/HomeHero";
import MissionSection from "@/components/home/MissionSection";
import MetricsBento from "@/components/home/MetricsBento";
import DiscoverySection from "@/components/home/DiscoverySection";
import ServicesAccordion from "@/components/home/ServicesAccordion";
import EnergyTransition from "@/components/home/EnergyTransition";
import GrowersGallery from "@/components/home/GrowersGallery";
import HomeFooter from "@/components/home/HomeFooter";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>SunMac | Precision agriculture & sustainable energy</title>
        <meta
          name="description"
          content="SunMac delivers precision irrigation, crop health monitoring, and sustainable energy insights for modern growers."
        />
      </Head>
      <div className="min-h-screen bg-[#fdfbf7]">
        <HomeHero />
        <MissionSection />
        <MetricsBento />
        <DiscoverySection />
        <ServicesAccordion />
        <EnergyTransition />
        <GrowersGallery />
        <HomeFooter />
      </div>
    </>
  );
}
