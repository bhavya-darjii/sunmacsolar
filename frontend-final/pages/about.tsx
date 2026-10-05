import Head from "next/head";
import Reveal from "@/components/Reveal";
import PageIntro from "@/components/site/PageIntro";
import { COMPANY } from "@/data/site";
import { Award, Users, Sparkles, Wrench } from "lucide-react";

const VALUES = [
  {
    icon: Wrench,
    title: "In-house everything",
    desc: "Design, supply, installation and after-sales — never outsourced.",
  },
  {
    icon: Award,
    title: "CEC-accredited",
    desc: "Clean Energy Council accredited designers and installers on every job.",
  },
  {
    icon: Sparkles,
    title: "Built for Australia",
    desc: "Hardware and topologies chosen to survive sun, dust and remote conditions.",
  },
  {
    icon: Users,
    title: "Long-term partner",
    desc: "We are here in 10 years for the warranty call — not just sign-off.",
  },
];

export default function AboutPage() {
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
        <PageIntro
          overline="About us"
          title="A solar company that engineers, installs and supports — under one roof."
        />

        <section className="container-final pb-16">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="space-y-5 leading-relaxed text-[#57534e] md:col-span-7">
              <p>
                SunMac Solar is a trading division of{" "}
                <strong className="text-[#1c1917]">{COMPANY.parent}</strong>, headquartered at{" "}
                {COMPANY.address}. We design and deliver complete solar and battery systems for
                commercial, residential, agricultural and off-grid clients across Australia.
              </p>
              <p>
                Our roots are in regional Australia. The majority of our installations sit on large
                farmland in the outskirts — homesteads, irrigation pump stations, remote sheds and
                stations — where reliability is not optional.
              </p>
              <p>
                We deliberately stay vertically integrated. Every job is engineered by our in-house
                team and installed by our installation division{" "}
                <strong className="text-[#1c1917]">{COMPANY.partner.name}</strong>. That is how we
                hit timelines, keep quality high and answer the phone when something goes wrong.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <div className="card-lift rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#f5f5f0] p-8">
                <p className="overline">Installation division</p>
                <div className="mt-3 font-display text-2xl">{COMPANY.partner.name}</div>
                <p className="mt-2 text-sm text-[#57534e]">{COMPANY.partner.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#57534e]">
                  {COMPANY.partner.name} operates as our exclusive in-house installation arm —
                  licensed electricians and solar accredited trades, working directly under our
                  engineering brief.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-pad bg-[#f5f5f0]">
          <div className="container-final">
            <Reveal>
              <p className="overline">What we stand for</p>
              <h2 className="display-lead mt-4 max-w-3xl">
                <span className="font-semibold">Boring fundamentals, done properly.</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.05}>
                  <div
                    className="card-lift h-full rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#fdfbf7] p-8"
                    data-testid={`value-${i}`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d97706]/10 text-[#d97706]">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <div className="mt-5 font-display text-lg font-medium">{v.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-[#57534e]">{v.desc}</div>
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
