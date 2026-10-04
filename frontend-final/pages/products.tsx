import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Leaf, Wallet } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageIntro from "@/components/site/PageIntro";
import { PRODUCTS, FINANCE_OPTIONS } from "@/data/site";

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>Products & Systems | SunMac Solar</title>
        <meta
          name="description"
          content="Tier-1 solar modules, commercial inverters, battery storage and efficient heat pump systems installed across Australia."
        />
      </Head>
      <div data-testid="products-page">
        <PageIntro
          overline="Products"
          title="Tier-1 hardware, matched to your site and load."
          description="We do not push a single brand. We specify the right module, inverter and battery for the application — from a single home up to multi-megawatt commercial sites."
        />

        <section className="container-final space-y-10 pb-24">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <div
                className="card-lift grid items-center gap-8 overflow-hidden rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#f5f5f0] md:grid-cols-12"
                data-testid={`product-card-${p.id}`}
              >
                <div
                  className={`relative aspect-[4/3] min-h-[240px] md:col-span-6 md:aspect-auto md:min-h-[320px] ${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
                <div className="p-8 md:col-span-6 md:p-12">
                  <p className="overline">0{i + 1}</p>
                  <h2 className="display-lead mt-3">
                    <span className="font-semibold">{p.title}</span>
                  </h2>
                  <p className="mt-4 text-[#57534e]">{p.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-sm text-[#1c1917]">
                        <Check className="h-4 w-4 text-[#166534]" /> {pt}
                      </li>
                    ))}
                  </ul>
                  {p.scheme && (
                    <div
                      className="mt-6 flex gap-3 rounded-2xl border border-[#166534]/25 bg-[#166534]/8 p-4"
                      data-testid={`product-scheme-${p.id}`}
                    >
                      <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-[#166534]" />
                      <div>
                        <p className="text-sm leading-relaxed text-[#1c1917]">{p.scheme}</p>
                        <Link
                          href="/calculator#pdrs"
                          data-testid={`product-scheme-link-${p.id}`}
                          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#166534] hover:text-[#14532d]"
                        >
                          Estimate your PDRS incentive <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                  {p.brands && (
                    <div className="mt-6" data-testid={`product-brands-${p.id}`}>
                      <p className="overline mb-3">Brands we install</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {p.brands.map((b) => (
                          <div
                            key={b.name}
                            className="rounded-2xl border border-[#e7e5e4] bg-[#fdfbf7] p-3"
                          >
                            <div className="font-display text-sm font-semibold">{b.name}</div>
                            <div className="mt-0.5 text-xs text-[#57534e]">{b.spec}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Link
                    href="/contact"
                    data-testid={`product-quote-${p.id}`}
                    className="btn-dark mt-8"
                  >
                    Get a quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="section-pad bg-[#f5f5f0]" data-testid="finance-section">
          <div className="container-final">
            <Reveal>
              <p className="overline">Finance</p>
              <h2 className="display-lead mt-4 max-w-3xl">
                <span className="font-semibold">Flexible ways to pay — from $0 upfront.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[#57534e]">
                Every system we install — solar, battery, HVAC or heat pump — can be financed through
                our trusted partners, so your savings start before your first repayment.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {FINANCE_OPTIONS.map((f, i) => (
                <Reveal key={f.id} delay={i * 0.08}>
                  <div
                    className="card-lift flex h-full flex-col rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#fdfbf7] p-8"
                    data-testid={`finance-card-${f.id}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d97706]/10 text-[#d97706]">
                      <Wallet className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-medium">{f.name}</h3>
                    <div className="mt-2 inline-flex self-start rounded-full bg-[#166534]/10 px-3 py-1 text-[10px] font-medium tracking-[0.15em] text-[#166534] uppercase">
                      {f.tagline}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#57534e]">{f.desc}</p>
                    <Link
                      href={f.link || "/contact"}
                      data-testid={`finance-cta-${f.id}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1c1917] transition-colors hover:text-[#d97706]"
                    >
                      {f.link ? "Learn about PPA" : "Ask about finance"}{" "}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
