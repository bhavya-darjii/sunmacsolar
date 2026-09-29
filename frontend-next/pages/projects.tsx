import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import { PROJECTS, Project } from "@/data/site";
import { MapPin, Zap, ArrowRight, Volume2 } from "lucide-react";

const CATEGORIES = ["All", "Commercial", "Residential", "Irrigation", "Off-Grid"];

function projectHref(p: Project) {
  return `/projects/${p.slug || p.id}`;
}

export default function Projects() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const featured = filtered.filter((p) => p.video);
  const regular = filtered.filter((p) => !p.video);

  return (
    <>
      <Head>
        <title>Projects | SunMac Solar</title>
        <meta
          name="description"
          content="Commercial, agricultural, off-grid and residential solar installations across Australia."
        />
      </Head>
      <div data-testid="projects-page">
        <section className="container-page pt-20 md:pt-28 pb-12">
          <Reveal>
            <div className="overline text-[#D97706]">Our projects</div>
            <h1 className="font-display font-light text-5xl sm:text-6xl tracking-tight mt-4 max-w-4xl">
              Systems engineered and delivered across Australia.
            </h1>
            <p className="mt-6 text-[#57534E] text-lg max-w-2xl">
              From rooftop arrays in industrial parks to off-grid homesteads in the outback, every project is designed for the conditions and the people who use it.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-2" data-testid="projects-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                data-testid={`filter-${c.toLowerCase().replace(/[^a-z]/g, "")}`}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  active === c
                    ? "bg-[#1C1917] text-[#FDFBF7]"
                    : "bg-[#F5F5F0] text-[#1C1917] hover:bg-[#E7E5E4]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Featured (video) projects */}
        {featured.length > 0 && (
          <section className="container-page pb-12 space-y-10">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <div
                  className="grid lg:grid-cols-12 gap-6 lg:gap-10 bg-[#F5F5F0] border border-[#E7E5E4] rounded-3xl overflow-hidden"
                  data-testid={`project-card-${p.id}`}
                >
                  <div className="lg:col-span-7 relative bg-black group/video">
                    <video
                      src={p.video}
                      poster={p.poster || p.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover aspect-video lg:aspect-auto"
                      data-testid={`project-video-${p.id}`}
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-[#FDFBF7]/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" /> Project walkthrough
                    </div>
                    <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-[#1C1917]/70 text-[#FDFBF7] backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] tracking-wide uppercase">
                      <Volume2 className="w-3 h-3" /> Muted
                    </div>
                  </div>
                  <div className="lg:col-span-5 p-8 lg:p-10 lg:pr-12">
                    <div className="overline text-[#D97706]">{p.category} · Featured</div>
                    <h2 className="font-display text-2xl sm:text-3xl mt-3 font-medium tracking-tight">{p.title}</h2>
                    <p className="text-[#57534E] mt-3">{p.summary}</p>

                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#57534E]">
                      <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {p.location}</span>
                      <span className="inline-flex items-center gap-1.5"><Zap className="w-4 h-4" /> {p.capacity}</span>
                    </div>

                    {p.specs && (
                      <dl className="mt-6 divide-y divide-[#E7E5E4] border-t border-b border-[#E7E5E4]" data-testid={`project-specs-${p.id}`}>
                        {p.specs.slice(0, 4).map((s) => (
                          <div key={s.label} className="py-3 grid grid-cols-3 gap-3 text-sm">
                            <dt className="text-[#57534E]">{s.label}</dt>
                            <dd className="col-span-2 font-medium text-[#1C1917]">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <Link
                      href={projectHref(p)}
                      data-testid={`project-details-${p.id}`}
                      className="inline-flex items-center gap-2 mt-8 rounded-full bg-[#1C1917] hover:bg-[#D97706] text-[#FDFBF7] px-6 py-3 text-sm font-medium transition-colors"
                    >
                      View more details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </section>
        )}

        {/* Regular grid */}
        {regular.length > 0 && (
          <section className="container-page pb-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <Link href={projectHref(p)} className="group rounded-2xl overflow-hidden border border-[#E7E5E4] bg-[#FDFBF7] h-full block" data-testid={`project-card-${p.id}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6">
                      <div className="overline text-[#D97706]">{p.category}</div>
                      <h3 className="font-display text-xl mt-2 font-medium">{p.title}</h3>
                      <p className="text-sm text-[#57534E] mt-2">{p.summary}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-[#57534E]">
                        <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {p.location}</span>
                        <span className="inline-flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> {p.capacity}</span>
                      </div>
                      <div className="mt-4 text-sm font-medium text-[#1C1917] group-hover:text-[#D97706] inline-flex items-center gap-1.5">
                        View details <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
