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
        <title>SunMac Solar | Commercial & Off-Grid Solar Australia</title>
        <meta
          name="description"
          content="Commercial, residential, irrigation and off-grid solar and battery systems engineered and installed across Australia."
        />
      </Head>
      <div className="min-h-screen bg-[#fdfbf7]" data-testid="home-page">
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
