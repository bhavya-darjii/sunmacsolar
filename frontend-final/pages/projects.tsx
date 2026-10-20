import { useState } from "react";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import PageCanvas from "@/components/site/PageCanvas";
import { PROJECTS, type Project } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Droplets,
  Factory,
  Home,
  LayoutGrid,
  MapPin,
  MountainSnow,
  Volume2,
  Zap,
  type LucideIcon,
} from "lucide-react";

const PROJECT_FILTERS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "All", label: "All", icon: LayoutGrid },
  { id: "Commercial", label: "Commercial", icon: Factory },
  { id: "Residential", label: "Residential", icon: Home },
  { id: "Irrigation", label: "Irrigation", icon: Droplets },
  { id: "Off-Grid", label: "Off-grid", icon: MountainSnow },
];

function projectHref(p: Project) {
  return `/projects/${p.slug || p.id}`;
}

const revealEase = [0.22, 1, 0.36, 1] as const;

const resultsList = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.22 } },
};

const resultsItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: revealEase },
  },
};

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
      <PageCanvas data-testid="projects-page">
        <PageIntro
          overline="Our projects"
          title="Systems engineered and delivered across Australia."
          description="From rooftop arrays in industrial parks to off-grid homesteads in the outback, every project is designed for the conditions and the people who use it. Below is a sample of recent work with capacity, location and how we approached each site, so you can see what a similar install might look like on your property."
        >
          <div
            className="-mx-4 mt-10 flex justify-center overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0"
            data-testid="projects-filters"
          >
            <div
              className="services-tab-strip flex w-max max-w-full gap-5 pb-1 md:gap-6"
              role="tablist"
              aria-label="Filter projects by category"
            >
              {PROJECT_FILTERS.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(id)}
                    data-testid={`filter-${id.toLowerCase().replace(/[^a-z]/g, "")}`}
                    className={cn(
                      "group flex shrink-0 snap-start flex-col items-center transition-opacity",
                      isActive ? "opacity-100" : "opacity-55 hover:opacity-85"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f5f0] shadow-sm ring-1 transition md:h-16 md:w-16",
                        isActive
                          ? "ring-[#d97706] ring-2"
                          : "ring-[#e7e5e4]/80 group-hover:ring-[#d6d3d1]"
                      )}
                    >
                      <Icon className="h-5 w-5 text-[#1c1917] md:h-[22px] md:w-[22px]" strokeWidth={1.5} />
                    </div>
                    <p className="mt-1.5 max-w-[4.5rem] text-center text-[10px] font-semibold leading-tight text-[#1c1917] md:max-w-[5rem] md:text-[11px]">
                      {label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </PageIntro>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={resultsList}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {featured.length > 0 && (
              <section className="container-final space-y-10 pb-12">
                {featured.map((p) => (
                  <motion.div key={p.id} variants={resultsItem}>
                    <div
                      className="card-lift surface-glass grid overflow-hidden lg:grid-cols-12 lg:gap-10"
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
                  </motion.div>
                ))}
              </section>
            )}

            {regular.length > 0 && (
              <section
                className={cn(
                  "container-final pb-24",
                  featured.length > 0 ? "pt-0" : "pt-2"
                )}
              >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {regular.map((p) => (
                    <motion.div key={p.id} variants={resultsItem}>
                      <Link
                    href={projectHref(p)}
                    className="card-lift surface-glass group block h-full overflow-hidden"
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
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {featured.length === 0 && regular.length === 0 && (
              <motion.p
                variants={resultsItem}
                className="container-final pb-24 text-center text-[#57534e]"
              >
                No projects in this category yet.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </PageCanvas>
    </>
  );
}
