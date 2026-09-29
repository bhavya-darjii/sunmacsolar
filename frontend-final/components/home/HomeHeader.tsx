"use client";



import Image from "next/image";

import Link from "next/link";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";



const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "PPA Contracts", href: "/ppa" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];



const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const MONTHS = [

  "JAN",

  "FEB",

  "MAR",

  "APR",

  "MAY",

  "JUN",

  "JUL",

  "AUG",

  "SEP",

  "OCT",

  "NOV",

  "DEC",

];



function formatHeaderDateTime(date: Date) {
  const day = DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const dom = date.getDate();
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${day} ${month} ${dom} • ${time}`;
}



export default function HomeHeader() {

  const pathname = usePathname();

  const [dateTime, setDateTime] = useState<string | null>(null);



  useEffect(() => {

    const tick = () => setDateTime(formatHeaderDateTime(new Date()));

    tick();

    const id = window.setInterval(tick, 30_000);

    return () => window.clearInterval(id);

  }, []);



  return (

    <header className="absolute inset-x-0 top-0 z-30 pt-6 md:pt-8">

      <div className="container-final flex min-h-8 items-center justify-between gap-4 md:min-h-9">

        <motion.div

          initial={{ opacity: 0, y: -12 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}

          className="flex min-w-0 max-w-[55%] items-center gap-3 md:max-w-none md:gap-4"

        >

          <Image

            src="/logo/sunmac-solar-icon.png"

            alt="SunMac"

            width={32}

            height={32}

            className="shrink-0 rounded-full"

          />

          <span className="shrink-0 text-[11px] font-semibold tracking-[0.2em] text-white uppercase sm:text-xs">
            SUNMAC
          </span>

          <span className="hidden h-5 w-px shrink-0 bg-white/35 sm:block" aria-hidden />

          <time

            suppressHydrationWarning

            className="truncate text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase sm:text-xs"

          >

            {dateTime ?? "\u00a0"}

          </time>

        </motion.div>



        <motion.nav

          initial={{ opacity: 0, y: -12 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}

          className="glass-surface hidden shrink-0 md:flex items-center gap-0.5 rounded-full px-1.5 py-1.5 nav-pill-shadow"

          aria-label="Primary"

        >

          {NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors whitespace-nowrap lg:px-3 lg:text-sm ${
                  isActive
                    ? "bg-white text-[#1c1917] shadow-sm"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

        </motion.nav>

      </div>

    </header>

  );

}


