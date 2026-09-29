"use client";



import Link from "next/link";

import { ChevronDown } from "lucide-react";

import Reveal from "@/components/Reveal";



const FOOTER_COLUMNS = {

  General: ["About", "Careers", "Contact"],

  Legal: ["Privacy", "Terms", "Cookies"],

  Socials: ["LinkedIn", "Instagram", "YouTube"],

};



export default function HomeFooter() {

  return (

    <footer className="bg-black text-[#fdfbf7]">

      <div className="container-final border-b border-white/10 py-14 md:min-h-[220px] md:py-20">

        <Reveal>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">

            <p className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.15]">

              <span className="block text-white">Conserving Resources.</span>

              <span className="block text-white/40">Improving Life.</span>

            </p>



            <div className="grid grid-cols-3 gap-6 sm:gap-10">

              {Object.entries(FOOTER_COLUMNS).map(([title, links]) => (

                <div key={title}>

                  <p className="text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">

                    {title}

                  </p>

                  <ul className="mt-4 space-y-2.5">

                    {links.map((link) => (

                      <li key={link}>

                        <Link

                          href="#"

                          className="text-sm text-white/70 transition hover:text-white"

                        >

                          {link}

                        </Link>

                      </li>

                    ))}

                  </ul>

                </div>

              ))}

            </div>

          </div>

        </Reveal>

      </div>



      <div className="container-final overflow-hidden py-6 md:min-h-[140px] md:py-10">

        <Reveal delay={0.08}>

          <p

            className="footer-word text-center uppercase text-white"

            aria-hidden

          >

            SunMac

          </p>

        </Reveal>

      </div>



      <div className="border-t border-white/10">

        <div className="container-final flex min-h-[52px] items-center justify-between gap-4 py-3 text-xs text-white/45">

          <span>© {new Date().getFullYear()} SunMac. All rights reserved.</span>



          <button

            type="button"

            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-white/70 transition hover:border-white/30 hover:text-white"

          >

            English (AU)

            <ChevronDown className="h-3.5 w-3.5" />

          </button>

        </div>

      </div>

    </footer>

  );

}


