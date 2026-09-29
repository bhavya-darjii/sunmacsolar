import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import Reveal from "@/components/Reveal";

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

export default function BlogPostPage() {
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
      <div className="container-final py-32 text-[#57534e]" data-testid="post-loading">
        Loading…
      </div>
    );
  }

  if (status === "error" || !post) {
    return (
      <div className="container-final py-32" data-testid="post-not-found">
        <h1 className="font-display text-3xl">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-block text-[#d97706]">
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
        <section className="relative min-h-[400px] h-[50vh] overflow-hidden">
          <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/90 via-[#1c1917]/40 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 container-final pb-12">
            <Reveal>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-[#fdfbf7]/90 hover:text-[#fbbf24]"
                data-testid="post-back-link"
              >
                <ArrowLeft className="h-4 w-4" /> All articles
              </Link>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-light leading-tight text-[#fdfbf7] sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <div className="mt-4 text-sm text-[#d6d3d1]">
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

        <article className="container-final max-w-3xl py-16">
          <Reveal>
            <p className="text-xl leading-relaxed text-[#57534e]">{post.excerpt}</p>
            <div className="mt-10 space-y-6 leading-relaxed whitespace-pre-line text-[#1c1917]">
              {post.content}
            </div>
            <div className="mt-12 flex flex-wrap gap-2 border-t border-[#e7e5e4] pt-8">
              {(post.tags || []).map((t) => (
                <span key={t} className="rounded-full bg-[#f5f5f0] px-3 py-1 text-xs text-[#57534e]">
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
