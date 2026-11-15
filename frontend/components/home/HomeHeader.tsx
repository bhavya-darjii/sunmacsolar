import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import NavPillMenu from "@/components/site/NavPillMenu";
import MobileNav from "@/components/site/MobileNav";

type HomeHeaderProps = {
  /** Drives entrance animation; replays when the hero scrolls back into view. */
  heroInView?: boolean;
  /** "SAT NOV 8 • 5:41 PM", from the hero (which also shows it above "SunMac" on phones). */
  dateTime?: string | null;
};

export default function HomeHeader({ heroInView = true, dateTime = null }: HomeHeaderProps) {

  const router = useRouter();
  const pathname = router.asPath.split("?")[0];

  return (

    <header className="absolute inset-x-0 top-0 z-30 pt-[calc(1.5rem_+_env(safe-area-inset-top))] md:pt-[calc(2rem_+_env(safe-area-inset-top))]">

      <div className="container-final flex min-h-8 items-center justify-between gap-4 md:min-h-9">

        <motion.div

          initial={false}

          animate={
            heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }
          }

          transition={{ duration: 0.6, delay: heroInView ? 0 : 0, ease: [0.22, 1, 0.36, 1] }}

          className="flex min-w-0 items-center gap-3 md:gap-4"

        >

          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            data-testid="home-header-logo"
          >
            <Image
              src="/logo/sunmac-solar-icon.png"
              alt="SunMac Solar"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full"
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

          {/* Date/time only where it fits untruncated: phones show it above "SunMac" instead, and it's hidden beside the md pill nav */}
          <span className="hidden h-5 w-px shrink-0 bg-white/35 sm:block md:hidden lg:block" aria-hidden />

          <time

            suppressHydrationWarning

            className="hidden truncate text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase sm:block sm:text-xs md:hidden lg:block"

          >

            {dateTime ?? " "}

          </time>

        </motion.div>



        <div className="hidden shrink-0 md:block">
          <NavPillMenu pathname={pathname} variant="home" />
        </div>

        <motion.div
          initial={false}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 md:hidden"
        >
          <MobileNav
            pathname={pathname}
            variant="home"
            closeAt={768}
            data-testid="home-mobile-menu-toggle"
          />
        </motion.div>

      </div>

    </header>

  );

}
