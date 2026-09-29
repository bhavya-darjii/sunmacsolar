import Head from "next/head";
import Link from "next/link";
import { ArrowRight, Factory, Home as HomeIcon, Droplets, MountainSnow, Sun, ShieldCheck, Wrench, BarChart3, Quote, LucideIcon } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { SERVICES, PROJECTS, COMPANY, MASCOT, TESTIMONIALS } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  Factory,
  Home: HomeIcon,
  Droplets,
  MountainSnow,
  Sun,
};

export default function Home() {
  return (
    <>
      <Head>
        <title>SunMac Solar | Commercial & Off-Grid Solar Australia</title>
        <meta
          name="description"
          content="Commercial, residential, irrigation and off-grid solar and battery systems engineered and installed across Australia."
        />
      </Head>
      <div data-testid="home-page">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1724041875334-0a6397111c7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwc29sYXIlMjBwYW5lbHMlMjByb29mfGVufDB8fHx8MTc4MTU3NTk0NXww&ixlib=rb-4.1.0&q=85"
              alt="Commercial solar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1917]/85 via-[#1C1917]/65 to-[#1C1917]/30" />
          </div>
          <div className="relative container-page pt-28 pb-24 md:pt-40 md:pb-44">
            <Reveal>
              <div className="overline text-[#FBBF24]" data-testid="hero-overline">Solar engineered for Australia</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display font-light text-5xl sm:text-6xl lg:text-7xl tracking-tight text-[#FDFBF7] mt-6 max-w-4xl leading-[1.05]">
                Power your business, farm or remote home <span className="text-[#FBBF24] italic font-normal">with the sun.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-[#D6D3D1] max-w-2xl">
                Commercial, residential, irrigation and off-grid solar systems — designed and installed in-house across Australia.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  data-testid="hero-cta-quote"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#FDFBF7] px-7 py-3.5 font-medium transition-colors"
                >
                  Request a free quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  data-testid="hero-cta-projects"
                  className="inline-flex items-center gap-2 rounded-full border border-[#FDFBF7]/30 text-[#FDFBF7] hover:bg-[#FDFBF7]/10 px-7 py-3.5 font-medium transition-colors"
                >
                  See our projects
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Marquee / trust strip */}
        <section className="border-y border-[#E7E5E4] bg-[#F5F5F0]">
          <div className="container-page py-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-3 text-sm text-[#57534E]">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#166534]" /> CEC-approved retailer</div>
            <div className="flex items-center gap-2"><Wrench className="w-4 h-4 text-[#166534]" /> In-house installation team</div>
            <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[#166534]" /> 50+ MW installed nationwide</div>
            <div className="flex items-center gap-2"><Sun className="w-4 h-4 text-[#166534]" /> Trusted by Australian farmers</div>
          </div>
        </section>

        {/* Mascot — Meet Joey */}
        <section className="section-pad" data-testid="mascot-section">
          <div className="container-page grid md:grid-cols-12 gap-10 items-center">
            <Reveal className="md:col-span-5 order-2 md:order-1">
              <div className="overline text-[#D97706]">Meet {MASCOT.name}</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium tracking-tight">
                {MASCOT.name} — our off-grid mate.
              </h2>
              <p className="mt-5 text-[#57534E] leading-relaxed">
                Born and raised in the Australian bush, Joey carries the same kit our installers do — a solar panel on his back, a battery pack, a wrench on his belt and a hand-held lantern for the late jobs.
              </p>
              <p className="mt-4 text-[#57534E] leading-relaxed">
                He is the spirit of SunMac Solar: rugged, friendly and at home anywhere from a Camellia rooftop to a remote outback station.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-[#1C1917] hover:bg-[#D97706] text-[#FDFBF7] px-6 py-3 text-sm font-medium transition-colors" data-testid="mascot-products-link">
                  Explore Joey&apos;s kit <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FDFBF7] px-6 py-3 text-sm font-medium transition-colors" data-testid="mascot-contact-link">
                  Say g&apos;day
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7 order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#FBBF24]/40 via-[#D97706]/20 to-[#166534]/20 rounded-[3rem] blur-2xl" />
                <div className="relative rounded-[2.5rem] overflow-hidden border border-[#E7E5E4] bg-[#F5F5F0]">
                  <img
                    src={MASCOT.url}
                    alt={`${MASCOT.name} — SunMac Solar mascot`}
                    className="w-full h-auto object-cover aspect-square md:aspect-[5/4]"
                    data-testid="mascot-image"
                  />
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-[#FDFBF7]/95 backdrop-blur-md px-4 py-2 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#166534] animate-pulse" />
                    <span className="text-xs font-medium tracking-wide">{MASCOT.tagline}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* About teaser */}
        <section className="section-pad">
          <div className="container-page grid md:grid-cols-12 gap-12 items-center">
            <Reveal className="md:col-span-6">
              <div className="overline text-[#D97706]">Who we are</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium tracking-tight">
                A specialist solar partner — from a single rooftop to a 5MW farm.
              </h2>
              <p className="mt-6 text-[#57534E] leading-relaxed">
                SunMac Solar is a division of Ecomac Energy Pty Ltd. We deliver complete solar
                and battery solutions across Australia, with a strong focus on off-grid
                and agricultural installations in regional NSW, QLD and VIC.
              </p>
              <p className="mt-4 text-[#57534E] leading-relaxed">
                Every project is engineered in-house and installed by our partner
                <a href={COMPANY.partner.url} target="_blank" rel="noreferrer" className="text-[#D97706] hover:underline mx-1" data-testid="about-teaser-partner-link">
                  {COMPANY.partner.name}
                </a>
                — no sub-contracted labour, no surprises.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 rounded-full border border-[#1C1917] hover:bg-[#1C1917] hover:text-[#FDFBF7] px-6 py-3 text-sm font-medium transition-colors"
                data-testid="about-teaser-link"
              >
                Learn more about us <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-6">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwxfHxvZmYlMjBncmlkJTIwc29sYXIlMjBob3VzZXxlbnwwfHx8fDE3ODE1NzU5NDV8MA&ixlib=rb-4.1.0&q=85"
                  alt="Off-grid home"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-[#FDFBF7]/95 backdrop-blur-xl rounded-2xl p-6">
                  <div className="overline text-[#D97706]">In-House Partner</div>
                  <div className="font-display text-xl mt-1">{COMPANY.partner.name}</div>
                  <div className="text-sm text-[#57534E] mt-1">{COMPANY.partner.role}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Services Bento */}
        <section className="section-pad bg-[#F5F5F0]">
          <div className="container-page">
            <Reveal>
              <div className="overline text-[#D97706]">What we do</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium tracking-tight max-w-3xl">
                Five specialisations. One in-house team.
              </h2>
            </Reveal>
            <div className="mt-14 grid md:grid-cols-6 gap-5">
              {SERVICES.map((s, i) => {
                const Icon = iconMap[s.icon] || Sun;
                const span = i === 0 ? "md:col-span-3" : i === 4 ? "md:col-span-3" : "md:col-span-2";
                return (
                  <Reveal key={s.id} delay={i * 0.05} className={span}>
                    <div className="group bg-[#FDFBF7] border border-[#E7E5E4] rounded-2xl p-8 h-full hover:-translate-y-1 transition-transform duration-300" data-testid={`service-card-${s.id}`}>
                      <div className="w-12 h-12 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center group-hover:bg-[#D97706] group-hover:text-[#FDFBF7] transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-medium mt-6">{s.title}</h3>
                      <p className="mt-3 text-sm text-[#57534E] leading-relaxed">{s.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured projects */}
        <section className="section-pad">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <div className="overline text-[#D97706]">Projects</div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium tracking-tight max-w-2xl">
                  Real systems, delivered across Australia.
                </h2>
              </Reveal>
              <Link href="/projects" className="text-sm font-medium text-[#1C1917] hover:text-[#D97706] inline-flex items-center gap-1" data-testid="home-projects-all-link">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {PROJECTS.slice(0, 3).map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <Link href={`/projects/${p.slug || p.id}`} className="group rounded-2xl overflow-hidden border border-[#E7E5E4] bg-[#FDFBF7] block" data-testid={`home-project-${p.id}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6">
                      <div className="overline text-[#D97706]">{p.category} · {p.capacity}</div>
                      <h3 className="font-display text-xl mt-2 font-medium">{p.title}</h3>
                      <p className="text-sm text-[#57534E] mt-2">{p.location}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-pad bg-[#F5F5F0]" data-testid="testimonials-section">
          <div className="container-page">
            <Reveal>
              <div className="overline text-[#D97706]">What our customers say</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium tracking-tight max-w-3xl">
                Trusted from the city to the outback.
              </h2>
            </Reveal>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.08}>
                  <figure className="bg-[#FDFBF7] border border-[#E7E5E4] rounded-2xl p-8 h-full flex flex-col" data-testid={`testimonial-card-${t.id}`}>
                    <Quote className="w-8 h-8 text-[#D97706]/30" />
                    <blockquote className="mt-4 text-[#57534E] leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 pt-6 border-t border-[#E7E5E4]">
                      <div className="font-display font-medium">{t.name}</div>
                      <div className="text-sm text-[#57534E] mt-0.5">{t.role}</div>
                      <div className="inline-flex mt-3 text-[10px] uppercase tracking-[0.15em] font-medium text-[#166534] bg-[#166534]/10 rounded-full px-3 py-1">
                        {t.service}
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-3xl bg-[#1C1917] text-[#FDFBF7] p-10 md:p-16">
              <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-[#D97706]/30 blur-3xl" />
              <Reveal>
                <div className="overline text-[#FBBF24]">Get started</div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium tracking-tight max-w-2xl">
                  Talk to an engineer, not a salesperson.
                </h2>
                <p className="mt-4 text-[#D6D3D1] max-w-xl">
                  Tell us about your site and energy needs. We will come back with a realistic system design and quote within 48 hours.
                </p>
                <Link
                  href="/contact"
                  data-testid="home-cta-final"
                  className="inline-flex items-center gap-2 mt-10 rounded-full bg-[#D97706] hover:bg-[#B45309] px-7 py-3.5 font-medium transition-colors"
                >
                  Request a quote <ArrowRight className="w-4 h-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
