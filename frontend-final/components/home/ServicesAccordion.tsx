"use client";

import { useState } from "react";
import { ChevronDown, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type ItemId = "infrastructure" | "sustainability" | "investors";

const ITEMS: { id: ItemId; label: string }[] = [
  { id: "infrastructure", label: "Infrastructure" },
  { id: "sustainability", label: "Sustainability" },
  { id: "investors", label: "Investors" },
];

export default function ServicesAccordion() {
  const [open, setOpen] = useState<ItemId>("sustainability");

  return (
    <section className="container-final pb-20 md:pb-28">
      <div className="divide-y divide-[#e7e5e4] border-y border-[#e7e5e4]">
        {ITEMS.map((item, index) => {
          const isOpen = open === item.id;
          return (
            <Reveal key={item.id} delay={index * 0.06}>
              <div className="py-5 md:py-6">
                <button
                  type="button"
                  onClick={() => setOpen(item.id)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "font-display text-xl font-medium transition-colors md:text-2xl",
                      isOpen ? "text-[#1c1917]" : "text-[#a8a29e]"
                    )}
                  >
                    {item.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-[#1c1917] transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    strokeWidth={1.75}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && item.id === "sustainability" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid gap-6 rounded-[var(--radius-card)] bg-[#f5f5f0] p-5 md:grid-cols-[minmax(0,200px)_1fr_auto] md:items-center md:gap-8 md:p-8">
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <div className="flex items-center gap-2 text-[#78716c]">
                            <Globe2 className="h-4 w-4 text-[#d97706]" />
                            <span className="text-xs font-medium">Energy</span>
                          </div>
                          <p className="mt-3 font-display text-2xl font-semibold text-[#1c1917]">
                            33.0%
                          </p>
                          <button
                            type="button"
                            className="mt-4 rounded-full bg-[#1c1917] px-4 py-2 text-[11px] font-semibold tracking-wide text-[#fdfbf7] uppercase transition hover:bg-[#d97706]"
                          >
                            Know more
                          </button>
                        </div>

                        <div>
                          <p className="font-display text-4xl font-semibold text-[#1c1917] md:text-5xl">
                            33.0%
                          </p>
                          <p className="mt-1 text-sm font-medium text-[#57534e]">Energy Savings</p>
                          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#78716c]">
                            Automated irrigation and soil telemetry help growers cut energy use
                            without sacrificing yield — measured in real time across every pivot
                            and pump in the network.
                          </p>
                        </div>

                        <button
                          type="button"
                          className="h-fit rounded-full bg-[#1c1917] px-6 py-3 text-sm font-semibold text-[#fdfbf7] transition hover:bg-[#d97706]"
                        >
                          Know more
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
