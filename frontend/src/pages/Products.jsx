import { Link } from "react-router-dom";
import { Check, ArrowRight, Leaf, Wallet } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { PRODUCTS, FINANCE_OPTIONS } from "@/data/site";

export default function Products() {
  return (
    <div data-testid="products-page">
      <section className="container-page pt-20 md:pt-28 pb-12">
        <Reveal>
          <div className="overline text-[#D97706]">Products</div>
          <h1 className="font-display font-light text-5xl sm:text-6xl tracking-tight mt-4 max-w-4xl">
            Tier-1 hardware, matched to your site and load.
          </h1>
          <p className="mt-6 text-[#57534E] text-lg max-w-2xl">
            We do not push a single brand. We specify the right module, inverter and battery for the application — from a single home up to multi-megawatt commercial sites.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24 space-y-10">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <div
              className={`grid md:grid-cols-12 gap-8 items-center bg-[#F5F5F0] border border-[#E7E5E4] rounded-3xl overflow-hidden`}
              data-testid={`product-card-${p.id}`}
            >
              <div className={`md:col-span-6 aspect-[4/3] md:aspect-auto md:h-full ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-6 p-8 md:p-12">
                <div className="overline text-[#D97706]">0{i + 1}</div>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight mt-3">{p.title}</h2>
                <p className="mt-4 text-[#57534E]">{p.desc}</p>
                <ul className="mt-6 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-[#1C1917]">
                      <Check className="w-4 h-4 text-[#166534]" /> {pt}
                    </li>
                  ))}
                </ul>
                {p.scheme && (
                  <div className="mt-6 flex gap-3 bg-[#166534]/8 border border-[#166534]/25 rounded-xl p-4" data-testid={`product-scheme-${p.id}`}>
                    <Leaf className="w-5 h-5 text-[#166534] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#1C1917] leading-relaxed">{p.scheme}</p>
                      <Link
                        to="/savings#pdrs"
                        data-testid={`product-scheme-link-${p.id}`}
                        className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-[#166534] hover:text-[#14532D]"
                      >
                        Estimate your PDRS incentive <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
                {p.brands && (
                  <div className="mt-6" data-testid={`product-brands-${p.id}`}>
                    <div className="overline text-[#D97706] mb-3">Brands we install</div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {p.brands.map((b) => (
                        <div key={b.name} className="bg-[#FDFBF7] border border-[#E7E5E4] rounded-xl p-3">
                          <div className="font-display text-sm font-semibold">{b.name}</div>
                          <div className="text-xs text-[#57534E] mt-0.5">{b.spec}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Link
                  to="/contact"
                  data-testid={`product-quote-${p.id}`}
                  className="inline-flex items-center gap-2 mt-8 rounded-full bg-[#1C1917] text-[#FDFBF7] hover:bg-[#D97706] px-6 py-3 text-sm font-medium transition-colors"
                >
                  Get a quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Finance options */}
      <section className="section-pad bg-[#F5F5F0]" data-testid="finance-section">
        <div className="container-page">
          <Reveal>
            <div className="overline text-[#D97706]">Finance</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium tracking-tight max-w-3xl">
              Flexible ways to pay — from $0 upfront.
            </h2>
            <p className="mt-5 text-[#57534E] max-w-2xl">
              Every system we install — solar, battery, HVAC or heat pump — can be financed through our trusted partners, so your savings start before your first repayment.
            </p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {FINANCE_OPTIONS.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.08}>
                <div className="bg-[#FDFBF7] border border-[#E7E5E4] rounded-2xl p-8 h-full flex flex-col" data-testid={`finance-card-${f.id}`}>
                  <div className="w-12 h-12 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-medium mt-6">{f.name}</h3>
                  <div className="inline-flex mt-2 text-[10px] uppercase tracking-[0.15em] font-medium text-[#166534] bg-[#166534]/10 rounded-full px-3 py-1 self-start">
                    {f.tagline}
                  </div>
                  <p className="mt-4 text-sm text-[#57534E] leading-relaxed flex-1">{f.desc}</p>
                  <Link
                    to={f.link || "/contact"}
                    data-testid={`finance-cta-${f.id}`}
                    className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[#1C1917] hover:text-[#D97706] transition-colors"
                  >
                    {f.link ? "Learn about PPA" : "Ask about finance"} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
