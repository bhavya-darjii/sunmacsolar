import Reveal from "@/components/Reveal";
import TrustHighlightsBento from "@/components/home/TrustHighlightsBento";
import Image from "next/image";
import { MASCOT } from "@/data/site";

const AVATAR_PX = 44;

type WhoWeAreAvatar = {
  src: string;
  alt: string;
  className?: string;
};

const WHO_WE_ARE_AVATARS: WhoWeAreAvatar[] = [
  {
    src: "/images/joey-avatar.webp",
    alt: `${MASCOT.name}, SunMac mascot`,
    className: "object-cover",
  },
  { src: "/images/team/installation-specialist.webp", alt: "SunMac installation specialist" },
  { src: "/images/team/project-engineer.webp", alt: "SunMac project engineer" },
  { src: "/images/team/field-technician.webp", alt: "SunMac field technician" },
];

export default function MissionSection() {
  return (
    <section className="container-final py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[minmax(0,200px)_1fr] md:gap-16">
        <Reveal>
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#78716c] uppercase">
              Who we are
            </p>
            <div className="mt-6 flex items-center">
              <div className="flex items-center -space-x-2.5">
                {WHO_WE_ARE_AVATARS.map((avatar, i) => (
                  <div
                    key={avatar.src}
                    className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#e7e5e4] ring-2 ring-white shadow-sm"
                    style={{ zIndex: WHO_WE_ARE_AVATARS.length - i }}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      className={avatar.className ?? "object-cover"}
                      sizes={`${AVATAR_PX}px`}
                      quality={90}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="display-lead">
            A specialist solar partner from a single rooftop to a 5MW farm,{" "}
            <span className="font-semibold">
              engineered in-house and installed without sub-contracted labour.
            </span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-20 md:mt-28 lg:mt-30">
        <TrustHighlightsBento />
      </Reveal>
    </section>
  );
}
