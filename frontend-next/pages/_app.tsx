import type { AppProps } from "next/app";
import { useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import JoeyChat from "@/components/site/JoeyChat";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin") || router.pathname === "/admin-leads";

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
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917]">
        {!isAdmin && <Header />}
        <main className="flex-1" data-testid="main-content">
          <Component {...pageProps} />
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <JoeyChat />}
      </div>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
