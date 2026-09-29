import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import Reveal from "@/components/site/Reveal";

interface BlogPostDetail {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  published_at: string;
  tags?: string[];
}

export default function BlogPost() {
  const router = useRouter();
  const slug = (router.query.slug as string) || (router.query.id as string);
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    if (!slug) return;
    setStatus("loading");
    api
      .get(`/blog/${slug}`)
      .then((r) => {
        setPost(r.data);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  if (!router.isReady || status === "loading") {
    return (
      <div className="container-page py-32 text-[#57534E]" data-testid="post-loading">
        Loading…
      </div>
    );
  }

  if (status === "error" || !post) {
    return (
      <div className="container-page py-32" data-testid="post-not-found">
        <h1 className="font-display text-3xl">Post not found</h1>
        <Link href="/blog" className="text-[#D97706] mt-4 inline-block">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | SunMac Solar</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <div data-testid="blog-post-page">
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-page pb-12">
            <Reveal>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[#FDFBF7]/90 hover:text-[#FBBF24] text-sm"
                data-testid="post-back-link"
              >
                <ArrowLeft className="w-4 h-4" /> All articles
              </Link>
              <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#FDFBF7] mt-4 max-w-4xl leading-tight">
                {post.title}
              </h1>
              <div className="mt-4 text-sm text-[#D6D3D1]">
                By {post.author} ·{" "}
                {new Date(post.published_at).toLocaleDateString("en-AU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <article className="container-page max-w-3xl py-16">
          <Reveal>
            <p className="text-xl text-[#57534E] leading-relaxed">{post.excerpt}</p>
            <div className="mt-10 space-y-6 text-[#1C1917] leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
            <div className="mt-12 pt-8 border-t border-[#E7E5E4] flex flex-wrap gap-2">
              {(post.tags || []).map((t) => (
                <span key={t} className="px-3 py-1 text-xs rounded-full bg-[#F5F5F0] text-[#57534E]">
                  #{t}
                </span>
              ))}
            </div>
          </Reveal>
        </article>
      </div>
    </>
  );
}
