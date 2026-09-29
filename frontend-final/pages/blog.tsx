import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageIntro from "@/components/site/PageIntro";
import { api } from "@/lib/api";

interface BlogPostItem {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  tags?: string[];
  author?: string;
  published_at?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/blog")
      .then((r) => setPosts(r.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = posts;

  return (
    <>
      <Head>
        <title>Insights & Field Notes | SunMac Solar</title>
        <meta
          name="description"
          content="Field notes, guides, and insights from commercial and off-grid solar projects across Australia."
        />
      </Head>
      <div data-testid="blog-page">
        <PageIntro
          overline="Insights"
          title="Field notes from solar projects across Australia."
        />

        {loading && (
          <div className="container-final pb-24 text-[#57534e]" data-testid="blog-loading">
            Loading…
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="container-final pb-24 text-[#57534e]" data-testid="blog-empty">
            No posts yet — check back soon.
          </div>
        )}

        {!loading && featured && (
          <section className="container-final pb-16">
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="card-lift group grid items-center gap-8 overflow-hidden rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#f5f5f0] md:grid-cols-12"
                data-testid="blog-featured"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:col-span-7">
                  <Image
                    src={featured.cover_image}
                    alt={featured.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                </div>
                <div className="p-8 md:col-span-5 md:p-12">
                  <p className="overline">Featured</p>
                  <h2 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[#57534e]">{featured.excerpt}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#1c1917] group-hover:text-[#d97706]">
                    Read article <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          </section>
        )}

        {!loading && rest.length > 0 && (
          <section className="container-final grid gap-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="card-lift group block h-full overflow-hidden rounded-[var(--radius-card)] border border-[#e7e5e4] bg-[#fdfbf7]"
                  data-testid={`blog-post-${p.slug}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.cover_image}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <div className="p-6">
                    <p className="overline">{p.tags?.[0]}</p>
                    <h3 className="mt-2 font-display text-xl font-medium leading-snug">{p.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm text-[#57534e]">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
