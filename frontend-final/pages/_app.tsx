import type { AppProps } from "next/app";
import { useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import "@/styles/globals.css";
import "@/styles/home.css";
import "@/components/ui/GlideSelect.css";
import "@/styles/contact-featured-form.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isAdmin =
    router.pathname.startsWith("/admin") || router.pathname === "/admin-leads";

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
      <div className="flex min-h-screen flex-col bg-[#fdfbf7] text-[#1c1917]">
        {!isHome && !isAdmin && <SiteHeader />}
        <main className="flex-1" data-testid="main-content">
          <Component {...pageProps} />
        </main>
        {!isHome && !isAdmin && <SiteFooter />}
      </div>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
