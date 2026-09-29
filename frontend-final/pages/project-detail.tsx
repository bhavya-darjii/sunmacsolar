import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Zap, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/data/site";

export default function ProjectDetailPage() {
  const router = useRouter();
  const slug = (router.query.slug as string) || (router.query.id as string);
  const project = PROJECTS.find((p) => (p.slug && p.slug === slug) || String(p.id) === slug);

  if (!router.isReady) {
    return <div className="container-final py-32 text-[#57534e]">Loading project…</div>;
  }

  if (!project) {
    return (
      <div className="container-final py-32" data-testid="project-not-found">
        <h1 className="font-display text-4xl">Project not found</h1>
        <Link href="/projects" className="mt-4 inline-flex items-center gap-1.5 text-[#d97706]">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
      </div>
    );
  }

  const related = PROJECTS.filter((p) => p.id !== project.id && p.category === project.category).slice(
    0,
    3
  );

  return (
    <>
      <Head>
        <title>{project.title} | SunMac Solar</title>
        <meta name="description" content={project.summary} />
      </Head>
      <div data-testid="project-detail-page">
        <section className="relative min-h-[460px] h-[60vh] overflow-hidden bg-black">
          {project.video ? (
            <video
              src={project.video}
              poster={project.poster || project.image}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              data-testid="project-detail-video"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/95 via-[#1c1917]/40 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 container-final pb-12">
            <Reveal>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-[#fdfbf7]/90 hover:text-[#fbbf24]"
                data-testid="project-detail-back"
              >
                <ArrowLeft className="h-4 w-4" /> All projects
              </Link>
              <p className="overline mt-4 text-[#fbbf24]">{project.category}</p>
              <h1 className="mt-3 max-w-4xl font-display text-4xl font-light leading-tight text-[#fdfbf7] sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#d6d3d1]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {project.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="h-4 w-4" /> {project.capacity}
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="container-final grid gap-12 py-16 lg:grid-cols-12">
          <Reveal className="space-y-5 lg:col-span-7">
            <p className="text-xl leading-relaxed text-[#57534e]">{project.summary}</p>
            {project.description && (
              <div className="leading-relaxed whitespace-pre-line text-[#1c1917]">
                {project.description}
              </div>
            )}
            <div className="pt-8">
              <Link href="/contact" className="btn-primary" data-testid="project-detail-cta">
                Get a quote for a similar system <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            {project.specs && (
              <div
                className="rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#f5f5f0] p-6 md:p-8"
                data-testid="project-detail-specs"
              >
                <p className="overline">System specifications</p>
                <dl className="mt-4 divide-y divide-[#e7e5e4]">
                  {project.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-3 gap-3 py-3 text-sm">
                      <dt className="text-[#57534e]">{s.label}</dt>
                      <dd className="col-span-2 font-medium text-[#1c1917]">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </Reveal>
        </section>

        {related.length > 0 && (
          <section className="bg-[#f5f5f0]">
            <div className="container-final py-16">
              <p className="overline">More {project.category.toLowerCase()} projects</p>
              <h3 className="mt-3 font-display text-3xl font-medium">You may also like</h3>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug || p.id}`}
                    className="card-lift group overflow-hidden rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#fdfbf7]"
                    data-testid={`related-project-${p.id}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="400px"
                      />
                    </div>
                    <div className="p-6">
                      <p className="overline">{p.category}</p>
                      <h4 className="mt-2 font-display text-lg font-medium">{p.title}</h4>
                      <p className="mt-2 text-sm text-[#57534e]">{p.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
