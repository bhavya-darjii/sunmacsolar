import Reveal from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/site";

const GALLERY = PROJECTS.slice(0, 5).map((project) => ({
  src: project.image,
  caption: project.title,
  href: project.slug ? `/projects/${project.slug}` : "/projects",
}));

export default function GrowersGallery() {
  return (
    <section className="container-final pb-24 md:pb-32">
      <Reveal variant="rise">
        <h2 className="mx-auto max-w-4xl text-center font-display text-[clamp(1.35rem,3vw,2rem)] font-light leading-snug text-[#1c1917]">
          Real systems, delivered across Australia —{" "}
          <span className="text-[#a8a29e]">
            from commercial rooftops and irrigation pivots to fully off-grid homesteads.
          </span>
        </h2>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-2 md:justify-center md:overflow-visible">
          {GALLERY.map((item) => (
            <Link key={item.caption} href={item.href} className="block shrink-0">
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
                <figcaption className="mt-2 line-clamp-2 text-center text-[11px] font-medium text-[#78716c]">
                  {item.caption}
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
