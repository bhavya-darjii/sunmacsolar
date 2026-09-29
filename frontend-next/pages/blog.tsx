import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
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

export default function Blog() {
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
        <section className="container-page pt-20 md:pt-28 pb-12">
          <Reveal>
            <div className="overline text-[#D97706]">Insights</div>
            <h1 className="font-display font-light text-5xl sm:text-6xl tracking-tight mt-4 max-w-3xl">
              Field notes from solar projects across Australia.
            </h1>
          </Reveal>
        </section>

        {loading && (
          <div className="container-page pb-24 text-[#57534E]" data-testid="blog-loading">
            Loading…
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="container-page pb-24 text-[#57534E]" data-testid="blog-empty">
            No posts yet — check back soon.
          </div>
        )}

        {!loading && featured && (
          <section className="container-page pb-16">
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid md:grid-cols-12 gap-8 items-center bg-[#F5F5F0] border border-[#E7E5E4] rounded-3xl overflow-hidden"
                data-testid="blog-featured"
              >
                <div className="md:col-span-7 aspect-[16/10] overflow-hidden">
                  <img
                    src={featured.cover_image}
                    alt={featured.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="md:col-span-5 p-8 md:p-12">
                  <div className="overline text-[#D97706]">Featured</div>
                  <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mt-3">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[#57534E]">{featured.excerpt}</p>
                  <div className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-[#1C1917] group-hover:text-[#D97706]">
                    Read article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          </section>
        )}

        {!loading && rest.length > 0 && (
          <section className="container-page pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl overflow-hidden border border-[#E7E5E4] bg-[#FDFBF7] h-full block"
                  data-testid={`blog-post-${p.slug}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.cover_image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="overline text-[#D97706]">{p.tags?.[0]}</div>
                    <h3 className="font-display text-xl mt-2 font-medium leading-snug">{p.title}</h3>
                    <p className="text-sm text-[#57534E] mt-3 line-clamp-3">{p.excerpt}</p>
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
