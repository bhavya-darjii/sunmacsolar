import Reveal from "@/components/Reveal";
import { MASCOT } from "@/data/site";

export default function DiscoverySection() {
  return (
    <section className="home-discovery-joey" data-testid="home-discovery-joey">
      <div className="home-discovery-joey__overlay" aria-hidden />
      <div className="container-final home-discovery-joey__inner pt-6 md:py-28">
        <Reveal variant="rise">
          <div className="home-discovery-joey__content max-w-4xl">
            <div className="glass-surface-light home-discovery-joey__panel w-fit max-w-full text-left">
              <p className="text-xs font-bold">Meet {MASCOT.name}</p>
              <h2 className="display-lead mt-2">
                {MASCOT.name}, our off-grid mate.{" "}
                <span className="font-semibold">
                  {/* Hand-set breaks suit the wide layout; on phones they leave orphaned words */}
                  Rugged, friendly
                  <br className="max-md:hidden" />{" "}
                  solar guidance from Camellia rooftops to
                  <br className="max-md:hidden" />{" "}
                  outback stations.
                </span>
              </h2>
            </div>
          </div>
        </Reveal>
        {/* Phones: the card sits over the sky and Joey stands below it, head to boots */}
        <div className="home-discovery-joey__window md:hidden" aria-hidden />
      </div>
    </section>
  );
}
