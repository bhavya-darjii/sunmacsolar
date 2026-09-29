import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageIntro from "@/components/site/PageIntro";
import { PROJECTS, type Project } from "@/data/site";
import { MapPin, Zap, ArrowRight, Volume2 } from "lucide-react";

const CATEGORIES = ["All", "Commercial", "Residential", "Irrigation", "Off-Grid"];

function projectHref(p: Project) {
  return `/projects/${p.slug || p.id}`;
}

export default function ProjectsPage() {
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
        <PageIntro
          overline="Our projects"
          title="Systems engineered and delivered across Australia."
          description="From rooftop arrays in industrial parks to off-grid homesteads in the outback, every project is designed for the conditions and the people who use it."
        >
          <div className="mt-10 flex flex-wrap gap-2" data-testid="projects-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                data-testid={`filter-${c.toLowerCase().replace(/[^a-z]/g, "")}`}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === c
                    ? "bg-[#1c1917] text-[#fdfbf7]"
                    : "bg-[#f5f5f0] text-[#1c1917] hover:bg-[#e7e5e4]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </PageIntro>

        {featured.length > 0 && (
          <section className="container-final space-y-10 pb-12">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <div
                  className="card-lift grid overflow-hidden rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#f5f5f0] lg:grid-cols-12 lg:gap-10"
                  data-testid={`project-card-${p.id}`}
                >
                  <div className="relative bg-black lg:col-span-7">
                    <video
                      src={p.video}
                      poster={p.poster || p.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="aspect-video h-full w-full object-cover lg:aspect-auto"
                      data-testid={`project-video-${p.id}`}
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#fdfbf7]/95 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d97706]" />{" "}
                      Project walkthrough
                    </div>
                    <div className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-[#1c1917]/70 px-3 py-1.5 text-[10px] tracking-wide text-[#fdfbf7] uppercase backdrop-blur-md">
                      <Volume2 className="h-3 w-3" /> Muted
                    </div>
                  </div>
                  <div className="p-8 lg:col-span-5 lg:p-10 lg:pr-12">
                    <p className="overline">{p.category} · Featured</p>
                    <h2 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-[#57534e]">{p.summary}</p>

                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#57534e]">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" /> {p.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Zap className="h-4 w-4" /> {p.capacity}
                      </span>
                    </div>

                    {p.specs && (
                      <dl
                        className="mt-6 divide-y divide-[#e7e5e4] border-y border-[#e7e5e4]"
                        data-testid={`project-specs-${p.id}`}
                      >
                        {p.specs.slice(0, 4).map((s) => (
                          <div key={s.label} className="grid grid-cols-3 gap-3 py-3 text-sm">
                            <dt className="text-[#57534e]">{s.label}</dt>
                            <dd className="col-span-2 font-medium text-[#1c1917]">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <Link href={projectHref(p)} data-testid={`project-details-${p.id}`} className="btn-dark mt-8">
                      View more details <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </section>
        )}

        {regular.length > 0 && (
          <section className="container-final pb-24">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regular.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <Link
                    href={projectHref(p)}
                    className="card-lift group block h-full overflow-hidden rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#fdfbf7]"
                    data-testid={`project-card-${p.id}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                    <div className="p-6">
                      <p className="overline">{p.category}</p>
                      <h3 className="mt-2 font-display text-xl font-medium">{p.title}</h3>
                      <p className="mt-2 text-sm text-[#57534e]">{p.summary}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-[#57534e]">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {p.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Zap className="h-3.5 w-3.5" /> {p.capacity}
                        </span>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#1c1917] group-hover:text-[#d97706]">
                        View details <ArrowRight className="h-3.5 w-3.5" />
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
