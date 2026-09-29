import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Zap, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { PROJECTS } from "@/data/site";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => (p.slug && p.slug === slug) || String(p.id) === slug);

  if (!project) {
    return (
      <div className="container-page py-32" data-testid="project-not-found">
        <h1 className="font-display text-4xl">Project not found</h1>
        <Link to="/projects" className="text-[#D97706] mt-4 inline-flex items-center gap-1.5"><ArrowLeft className="w-4 h-4" /> Back to projects</Link>
      </div>
    );
  }

  const related = PROJECTS.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);

  return (
    <div data-testid="project-detail-page">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[460px] overflow-hidden bg-black">
        {project.video ? (
          <video
            src={project.video}
            poster={project.poster || project.image}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            data-testid="project-detail-video"
          />
        ) : (
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/95 via-[#1C1917]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-page pb-12">
          <Reveal>
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-[#FDFBF7]/90 hover:text-[#FBBF24] text-sm" data-testid="project-detail-back">
              <ArrowLeft className="w-4 h-4" /> All projects
            </Link>
            <div className="overline text-[#FBBF24] mt-4">{project.category}</div>
            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#FDFBF7] mt-3 max-w-4xl leading-tight">{project.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#D6D3D1]">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {project.location}</span>
              <span className="inline-flex items-center gap-1.5"><Zap className="w-4 h-4" /> {project.capacity}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="container-page py-16 grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-7 space-y-5">
          <p className="text-xl text-[#57534E] leading-relaxed">{project.summary}</p>
          {project.description && (
            <div className="text-[#1C1917] leading-relaxed whitespace-pre-line">
              {project.description}
            </div>
          )}
          <div className="pt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#FDFBF7] px-6 py-3 text-sm font-medium transition-colors"
              data-testid="project-detail-cta"
            >
              Get a quote for a similar system <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          {project.specs && (
            <div className="bg-[#F5F5F0] border border-[#E7E5E4] rounded-2xl p-6 md:p-8" data-testid="project-detail-specs">
              <div className="overline text-[#D97706]">System specifications</div>
              <dl className="mt-4 divide-y divide-[#E7E5E4]">
                {project.specs.map((s) => (
                  <div key={s.label} className="py-3 grid grid-cols-3 gap-3 text-sm">
                    <dt className="text-[#57534E]">{s.label}</dt>
                    <dd className="col-span-2 font-medium text-[#1C1917]">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </Reveal>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[#F5F5F0]">
          <div className="container-page py-16">
            <div className="overline text-[#D97706]">More {project.category.toLowerCase()} projects</div>
            <h3 className="font-display text-3xl font-medium mt-3">You may also like</h3>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/projects/${p.slug || p.id}`} className="group rounded-2xl overflow-hidden border border-[#E7E5E4] bg-[#FDFBF7]" data-testid={`related-project-${p.id}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="overline text-[#D97706]">{p.category}</div>
                    <h4 className="font-display text-lg mt-2 font-medium">{p.title}</h4>
                    <p className="text-sm text-[#57534E] mt-2">{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
