import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { PROJECTS } from "@/data/site";
import "@/styles/globals.css";
import "@/styles/home.css";
import "@/components/ui/GlideSelect.css";
import "@/styles/contact-featured-form.css";
import "@/styles/inner-pages.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isAdmin =
    router.pathname.startsWith("/admin") || router.pathname === "/admin-leads";

  // Project pages open on a full-bleed photo, so the header floats over it (see SiteHeader).
  // Until the router is ready the page shows a dark placeholder the size of that photo, so the
  // header floats then too; an unknown project falls back to the normal white header.
  const projectSlug = (router.query.slug as string) || (router.query.id as string);
  const overlayHeader =
    router.pathname === "/project-detail" &&
    (!router.isReady ||
      PROJECTS.some((p) => p.slug === projectSlug || String(p.id) === projectSlug));

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        {/* viewport-fit=cover lets the page run behind Safari's status bar and bottom toolbar;
            headers, the menu and the footer pad themselves with env(safe-area-inset-*) */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-[#1c1917]">
        {!isHome && !isAdmin && <SiteHeader overlay={overlayHeader} />}
        <main className="flex-1" data-testid="main-content">
          <Component {...pageProps} />
        </main>
        {!isHome && !isAdmin && <SiteFooter />}
      </div>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
