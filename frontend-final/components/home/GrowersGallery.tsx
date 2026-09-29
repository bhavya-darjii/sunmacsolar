import Reveal from "@/components/Reveal";
import Image from "next/image";

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80",
    caption: "Manual Control",
  },
  {
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=80",
    caption: "Pressure Monitoring",
  },
  {
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=400&q=80",
    caption: "Solar Farm Study",
  },
  {
    src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=80",
    caption: "Field View",
  },
  {
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&q=80",
    caption: "Precision Control",
  },
];

export default function GrowersGallery() {
  return (
    <section className="container-final pb-24 md:pb-32">
      <Reveal>
        <h2 className="mx-auto max-w-4xl text-center font-display text-[clamp(1.35rem,3vw,2rem)] font-light leading-snug text-[#1c1917]">
          We give growers a comprehensive view of their operation, from pumps{" "}
          <span className="text-[#a8a29e]">
            to pivots, enabling them to allocate inputs with unparalleled efficiency.
          </span>
        </h2>
      </Reveal>

      <div className="mt-12 flex gap-4 overflow-x-auto pb-2 md:justify-center md:overflow-visible">
        {GALLERY.map((item, i) => (
          <Reveal key={item.caption} delay={i * 0.06} className="shrink-0">
            <figure className="w-[140px] md:w-[160px]">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f5f5f0]">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="160px"
                />
              </div>
              <figcaption className="mt-2 text-center text-[11px] font-medium text-[#78716c]">
                {item.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
