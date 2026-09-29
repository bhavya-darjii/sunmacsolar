"use client";



import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";



import NavPillMenu from "@/components/site/NavPillMenu";



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

          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            data-testid="home-header-logo"
          >
            <Image
              src="/logo/sunmac-solar-icon.png"
              alt="SunMac Solar"
              width={36}
              height={36}
              className="shrink-0 rounded-full"
            />
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-sm font-semibold tracking-tight text-white sm:text-base">
                SunMac Solar
              </div>
              <div className="hidden text-[10px] tracking-[0.18em] text-white/65 uppercase sm:block">
                Ecomac Energy
              </div>
            </div>
          </Link>

          <span className="hidden h-5 w-px shrink-0 bg-white/35 sm:block" aria-hidden />

          <time

            suppressHydrationWarning

            className="truncate text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase sm:text-xs"

          >

            {dateTime ?? "\u00a0"}

          </time>

        </motion.div>



        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="hidden shrink-0 md:block"
        >
          <NavPillMenu pathname={pathname} variant="home" />
        </motion.div>

      </div>

    </header>

  );

}


