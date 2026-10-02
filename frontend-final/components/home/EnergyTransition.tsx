import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1724041875334-0a6397111c7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwc29sYXIlMjBwYW5lbHMlMjByb29mfGVufDB8fHx8MTc4MTU3NTk0NXww&ixlib=rb-4.1.0&q=85";

export default function EnergyTransition() {
  return (
    <section className="container-final pb-20 md:pb-28">
      <Reveal variant="rise">
        <div className="relative overflow-hidden rounded-[var(--radius-card)]">
          <div className="relative aspect-[16/7] min-h-[240px] md:aspect-[21/9] md:min-h-[320px]">
            <Image
              src={BANNER_IMAGE}
              alt="Commercial solar panels on a warehouse rooftop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/55 via-[#1c1917]/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 px-5 pb-8 md:px-8 md:pb-10">
              <p className="max-w-2xl text-center font-display text-lg font-medium leading-snug text-white md:text-2xl md:leading-snug">
                Talk to an engineer, not a salesperson — realistic designs and quotes within 48
                hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#1c1917] px-5 py-2.5 text-sm font-medium text-[#fdfbf7] transition-colors hover:bg-[#d97706] hover:text-[#fdfbf7]"
              >
                Request a free quote
              </Link>
            </div>
          </div>

          <div className="segment-bar flex h-1.5 gap-1 bg-[#1c1917]/10">
            <span className="flex-[3] bg-[#1c1917]" />
            <span className="flex-[2] bg-[#d97706]" />
            <span className="flex-[2] bg-[#166534]" />
            <span className="flex-[1] bg-[#e7e5e4]" />
            <span className="flex-[2] bg-[#57534e]" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
