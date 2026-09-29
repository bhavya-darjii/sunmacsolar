import Head from "next/head";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import { COMPANY } from "@/data/site";
import { Award, Users, Sparkles, Wrench } from "lucide-react";

const VALUES = [
  { icon: Wrench, title: "In-house everything", desc: "Design, supply, installation and after-sales — never outsourced." },
  { icon: Award, title: "CEC-accredited", desc: "Clean Energy Council accredited designers and installers on every job." },
  { icon: Sparkles, title: "Built for Australia", desc: "Hardware and topologies chosen to survive sun, dust and remote conditions." },
  { icon: Users, title: "Long-term partner", desc: "We are here in 10 years for the warranty call — not just sign-off." },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | SunMac Solar</title>
        <meta
          name="description"
          content="Learn about SunMac Solar — a vertically integrated Australian solar and battery engineering company."
        />
      </Head>
      <div data-testid="about-page">
        <section className="container-page pt-20 md:pt-28 pb-12">
          <Reveal>
            <div className="overline text-[#D97706]">About us</div>
            <h1 className="font-display font-light text-5xl sm:text-6xl tracking-tight mt-4 max-w-4xl">
              A solar company that engineers, installs and supports — under one roof.
            </h1>
          </Reveal>
        </section>

        <section className="container-page pb-16 grid md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-7 space-y-5 text-[#57534E] leading-relaxed">
            <p>
              SunMac Solar is a trading division of <strong className="text-[#1C1917]">{COMPANY.parent}</strong>, headquartered at {COMPANY.address}. We design and deliver complete solar and battery systems for commercial, residential, agricultural and off-grid clients across Australia.
            </p>
            <p>
              Our roots are in regional Australia. The majority of our installations sit on large farmland in the outskirts — homesteads, irrigation pump stations, remote sheds and stations — where reliability is not optional.
            </p>
            <p>
              We deliberately stay vertically integrated. Every job is engineered by our in-house team and installed by our installation division <strong className="text-[#1C1917]">{COMPANY.partner.name}</strong>. That is how we hit timelines, keep quality high and answer the phone when something goes wrong.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#E7E5E4] bg-[#F5F5F0] p-8">
              <div className="overline text-[#D97706]">Installation division</div>
              <div className="font-display text-2xl mt-3">{COMPANY.partner.name}</div>
              <p className="text-sm text-[#57534E] mt-2">{COMPANY.partner.role}</p>
              <p className="text-sm text-[#57534E] mt-4">{COMPANY.partner.name} operates as our exclusive in-house installation arm — licensed electricians and solar accredited trades, working directly under our engineering brief.</p>
            </div>
          </Reveal>
        </section>

        {/* Values */}
        <section className="bg-[#F5F5F0] section-pad">
          <div className="container-page">
            <Reveal>
              <div className="overline text-[#D97706]">What we stand for</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium tracking-tight max-w-3xl">Boring fundamentals, done properly.</h2>
            </Reveal>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.05}>
                  <div className="bg-[#FDFBF7] border border-[#E7E5E4] rounded-2xl p-8 h-full" data-testid={`value-${i}`}>
                    <div className="w-11 h-11 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center">
                      <v.icon className="w-5 h-5" />
                    </div>
                    <div className="font-display text-lg font-medium mt-5">{v.title}</div>
                    <div className="text-sm text-[#57534E] mt-2 leading-relaxed">{v.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Company facts */}
        <section className="container-page section-pad">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 bg-[#1C1917] text-[#FDFBF7] rounded-3xl p-10 md:p-16">
              <div>
                <div className="overline text-[#FBBF24]">Company details</div>
                <h3 className="font-display text-2xl md:text-3xl mt-4 font-medium">{COMPANY.name} — a trading division of {COMPANY.parent}</h3>
              </div>
              <div className="space-y-3 text-sm text-[#D6D3D1]">
                <div><span className="text-[#A8A29E]">Address: </span>{COMPANY.address}</div>
                <div><span className="text-[#A8A29E]">Phone: </span>{COMPANY.phone}</div>
                <div><span className="text-[#A8A29E]">Email: </span>{COMPANY.email}</div>
                <div><span className="text-[#A8A29E]">ABN/ACN: </span>{COMPANY.abn}</div>
                <Link href="/contact" className="inline-flex items-center gap-2 mt-6 rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#FDFBF7] px-6 py-3 font-medium transition-colors" data-testid="about-contact-cta">
                  Get in touch
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
