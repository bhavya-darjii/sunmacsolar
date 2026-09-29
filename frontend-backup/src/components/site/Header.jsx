import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun } from "lucide-react";
import { NAV } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#FDFBF7]/85 border-b border-[#E7E5E4]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group" data-testid="header-logo">
          <div className="w-9 h-9 rounded-full bg-[#D97706] flex items-center justify-center text-[#FDFBF7] group-hover:bg-[#B45309] transition-colors">
            <Sun className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-lg tracking-tight">SunMac Solar</div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#57534E]">Powered by Ecomac Energy</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? "bg-[#1C1917] text-[#FDFBF7]"
                    : "text-[#1C1917] hover:bg-[#F5F5F0]"
                }`
              }
              end={n.to === "/"}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            data-testid="header-get-quote-btn"
            className="rounded-full bg-[#D97706] text-[#FDFBF7] hover:bg-[#B45309] transition-colors px-5 py-2.5 text-sm font-medium"
          >
            Get a Quote
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          data-testid="mobile-menu-toggle"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#E7E5E4] bg-[#FDFBF7]" data-testid="mobile-menu">
          <div className="container-page py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive ? "bg-[#1C1917] text-[#FDFBF7]" : "text-[#1C1917] hover:bg-[#F5F5F0]"
                  }`
                }
                end={n.to === "/"}
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[#D97706] text-center text-[#FDFBF7] px-5 py-3 font-medium"
              data-testid="mobile-get-quote-btn"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
