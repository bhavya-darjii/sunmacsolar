import Head from "next/head";
import HomeHero from "@/components/home/HomeHero";
import MissionSection from "@/components/home/MissionSection";
import DiscoverySection from "@/components/home/DiscoverySection";
import StatsStrip from "@/components/home/StatsStrip";
import ServicesAccordion from "@/components/home/ServicesAccordion";
import PackageShowcase from "@/components/home/PackageShowcase";
import EnergyTransition from "@/components/home/EnergyTransition";
import BrandLogos from "@/components/home/BrandLogos";
import GrowersGallery from "@/components/home/GrowersGallery";
import CertBadges from "@/components/home/CertBadges";
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
      <div className="min-h-screen overflow-x-clip bg-white" data-testid="home-page">
        <HomeHero />
        <MissionSection />
        <BrandLogos />
        <DiscoverySection />
        <StatsStrip />
        <ServicesAccordion />
        <PackageShowcase />
        <EnergyTransition />
        <GrowersGallery />
        <CertBadges />
        <HomeFooter />
      </div>
    </>
  );
}
