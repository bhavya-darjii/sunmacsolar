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

const unsplashFace = (id: string, alt: string): WhoWeAreAvatar => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=256&h=256&q=90&crop=faces`,
  alt,
});

const WHO_WE_ARE_AVATARS: WhoWeAreAvatar[] = [
  {
    src: "/images/joey-avatar.png",
    alt: `${MASCOT.name}, SunMac mascot`,
    className: "object-cover",
  },
  unsplashFace(
    "photo-1560250097-0b93528c311a",
    "SunMac installation specialist"
  ),
  unsplashFace(
    "photo-1573496359142-b8d87734a5a2",
    "SunMac project engineer"
  ),
  unsplashFace(
    "photo-1519085360753-af0119f7cbe7",
    "SunMac field technician"
  ),
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

      <Reveal delay={0.15} className="mt-14 border-t border-[#e7e5e4] pt-12 md:mt-16 md:pt-14">
        <TrustHighlightsBento />
      </Reveal>
    </section>
  );
}
