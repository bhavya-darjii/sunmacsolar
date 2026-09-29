import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import JoeyChat from "./JoeyChat";

export default function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Allow the target section to render, then scroll to it
      const t = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917]">
      <Header />
      <main className="flex-1" data-testid="main-content">
        <Outlet />
      </main>
      <Footer />
      <JoeyChat />
    </div>
  );
}
