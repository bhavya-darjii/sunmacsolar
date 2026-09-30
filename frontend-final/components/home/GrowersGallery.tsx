import Reveal from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/site";

const GALLERY = PROJECTS.slice(0, 5).map((project) => ({
  src: project.image,
  caption: project.title,
  href: project.slug ? `/projects/${project.slug}` : "/projects",
}));

const LOOP_ITEMS = [...GALLERY, ...GALLERY];

function GalleryCard({
  item,
  decorative,
}: {
  item: (typeof GALLERY)[number];
  decorative?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className="block shrink-0"
      aria-hidden={decorative ? true : undefined}
      tabIndex={decorative ? -1 : undefined}
    >
      <figure className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-[#f5f5f0] shadow-sm ring-1 ring-[#e7e5e4]/80">
          <Image
            src={item.src}
            alt={decorative ? "" : item.caption}
            fill
            className="object-cover transition duration-500 hover:scale-105"
            sizes="260px"
          />
        </div>
        <figcaption className="mt-3 line-clamp-2 text-center text-sm font-semibold leading-snug text-[#1c1917] md:mt-4 md:text-base">
          {item.caption}
        </figcaption>
      </figure>
    </Link>
  );
}

export default function GrowersGallery() {
  return (
    <section className="overflow-hidden pb-24 md:pb-32">
      <div className="container-final">
        <Reveal variant="rise">
          <h2 className="display-lead mx-auto max-w-4xl text-center">
            Real systems, delivered across Australia —{" "}
            <span className="font-semibold">
              from commercial rooftops and irrigation pivots to fully off-grid homesteads.
            </span>
          </h2>
        </Reveal>
      </div>

      <div className="growers-marquee-viewport mt-12 md:mt-14" aria-label="Featured project gallery">
        <div className="growers-marquee-track flex w-max gap-5 md:gap-6">
          {LOOP_ITEMS.map((item, index) => (
            <GalleryCard
              key={`${item.caption}-${index}`}
              item={item}
              decorative={index >= GALLERY.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
