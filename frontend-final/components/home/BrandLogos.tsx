import Reveal from "@/components/Reveal";

interface BrandItem {
  id: string;
  name: string;
  svg: () => React.JSX.Element;
}

const BRANDS: BrandItem[] = [
  {
    id: "byd",
    name: "BYD Energy",
    svg: () => (
      <svg
        viewBox="0 0 110 36"
        height="32"
        aria-label="BYD"
        role="img"
        className="shrink-0"
      >
        <rect
          x="2"
          y="3"
          width="106"
          height="30"
          rx="15"
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.2"
        />
        <text
          x="55"
          y="24"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="3"
          fill="#dc2626"
        >
          BYD
        </text>
      </svg>
    ),
  },
  {
    id: "sma",
    name: "SMA Solar Technology",
    svg: () => (
      <svg
        viewBox="0 0 130 36"
        height="32"
        aria-label="SMA Solar Technology"
        role="img"
        className="shrink-0"
      >
        <text
          x="2"
          y="25"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="-0.02em"
          fill="#1c1917"
        >
          SMA
        </text>
        <path d="M68 9 A 13 13 0 0 1 81 22 L 68 22 Z" fill="#d97706" />
        <text
          x="87"
          y="17"
          fontFamily="'Manrope', sans-serif"
          fontWeight="800"
          fontSize="9"
          letterSpacing="0.08em"
          fill="#1c1917"
        >
          SOLAR
        </text>
        <text
          x="87"
          y="26"
          fontFamily="'Manrope', sans-serif"
          fontWeight="600"
          fontSize="8"
          letterSpacing="0.08em"
          fill="#78716c"
        >
          TECH
        </text>
      </svg>
    ),
  },
  {
    id: "fronius",
    name: "Fronius",
    svg: () => (
      <svg
        viewBox="0 0 115 36"
        height="30"
        aria-label="Fronius"
        role="img"
        className="shrink-0"
      >
        <text
          x="2"
          y="26"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="0.01em"
          fill="#e11d48"
        >
          Fronius
        </text>
      </svg>
    ),
  },
  {
    id: "jinko",
    name: "JinkoSolar",
    svg: () => (
      <svg
        viewBox="0 0 145 36"
        height="30"
        aria-label="JinkoSolar"
        role="img"
        className="shrink-0"
      >
        <text
          x="2"
          y="25"
          fontFamily="'Outfit', sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.02em"
          fill="#0284c7"
        >
          Jinko
        </text>
        <circle cx="71" cy="11" r="3.5" fill="#16a34a" />
        <text
          x="77"
          y="25"
          fontFamily="'Outfit', sans-serif"
          fontWeight="500"
          fontSize="22"
          letterSpacing="0.01em"
          fill="#1c1917"
        >
          Solar
        </text>
      </svg>
    ),
  },
  {
    id: "canadian",
    name: "Canadian Solar",
    svg: () => (
      <svg
        viewBox="0 0 175 36"
        height="30"
        aria-label="Canadian Solar"
        role="img"
        className="shrink-0"
      >
        <g transform="translate(4, 7) scale(0.85)">
          <path
            d="M11 0 L13 6 L18 4 L15 9 L20 11 L16 14 L18 19 L13 17 L12 24 L10 24 L9 17 L4 19 L6 14 L2 11 L7 9 L4 4 L9 6 Z"
            fill="#dc2626"
          />
        </g>
        <text
          x="32"
          y="25"
          fontFamily="'Outfit', sans-serif"
          fontWeight="800"
          fontSize="20"
          letterSpacing="-0.02em"
          fill="#1c1917"
        >
          Canadian<tspan fontWeight="400" fill="#57534e">Solar</tspan>
        </text>
      </svg>
    ),
  },
  {
    id: "growatt",
    name: "Growatt",
    svg: () => (
      <svg
        viewBox="0 0 135 36"
        height="30"
        aria-label="Growatt"
        role="img"
        className="shrink-0"
      >
        <path d="M4 24 C4 13 13 6 22 6 C22 17 13 24 4 24 Z" fill="#16a34a" />
        <text
          x="28"
          y="24"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="20"
          letterSpacing="0.04em"
          fill="#1c1917"
        >
          GROWATT
        </text>
      </svg>
    ),
  },
  {
    id: "victron",
    name: "Victron Energy",
    svg: () => (
      <svg
        viewBox="0 0 165 36"
        height="30"
        aria-label="Victron Energy"
        role="img"
        className="shrink-0"
      >
        <path d="M4 9 L12 25 L20 9 Z" fill="#0284c7" />
        <path d="M12 17 L17 25 L7 25 Z" fill="#d97706" />
        <text
          x="26"
          y="24"
          fontFamily="'Outfit', sans-serif"
          fontWeight="800"
          fontSize="18"
          letterSpacing="0.03em"
          fill="#1c1917"
        >
          victron energy
        </text>
      </svg>
    ),
  },
  {
    id: "cec",
    name: "Clean Energy Council",
    svg: () => (
      <svg
        viewBox="0 0 195 36"
        height="32"
        aria-label="Clean Energy Council"
        role="img"
        className="shrink-0"
      >
        <circle cx="16" cy="18" r="13" fill="#166534" />
        <path
          d="M10 18 L14 22 L22 14"
          stroke="#ffffff"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="38"
          y="15"
          fontFamily="'Manrope', sans-serif"
          fontWeight="800"
          fontSize="10"
          letterSpacing="0.06em"
          fill="#1c1917"
        >
          CLEAN ENERGY
        </text>
        <text
          x="38"
          y="26"
          fontFamily="'Manrope', sans-serif"
          fontWeight="700"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#166534"
        >
          APPROVED RETAILER
        </text>
      </svg>
    ),
  },
  {
    id: "sungrow",
    name: "Sungrow",
    svg: () => (
      <svg
        viewBox="0 0 140 36"
        height="30"
        aria-label="Sungrow"
        role="img"
        className="shrink-0"
      >
        <circle cx="14" cy="18" r="10" fill="#f97316" />
        <circle cx="14" cy="18" r="5" fill="#ffffff" />
        <text
          x="32"
          y="25"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="21"
          letterSpacing="0.03em"
          fill="#1c1917"
        >
          SUNGROW
        </text>
      </svg>
    ),
  },
  {
    id: "tesla",
    name: "Tesla Energy",
    svg: () => (
      <svg
        viewBox="0 0 115 36"
        height="28"
        aria-label="Tesla Energy"
        role="img"
        className="shrink-0"
      >
        <text
          x="57"
          y="24"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontWeight="800"
          fontSize="18"
          letterSpacing="5"
          fill="#e11d48"
        >
          TESLA
        </text>
      </svg>
    ),
  },
];

const LOOP_BRANDS = [...BRANDS, ...BRANDS];

export default function BrandLogos() {
  return (
    <section
      className="brand-logos-section"
      data-testid="brand-logos"
      aria-label="Hardware & engineering partners"
    >
      <div className="container-final text-center mb-8">
          <Reveal variant="rise">
            <h2 className="display-lead">
              We Install.{" "}
              <span className="font-semibold">Tier-1 Hardware & Inverter Partners.</span>
            </h2>
          </Reveal>
        </div>

      {/* Marquee Viewport with Edge Fading */}
      <div className="brand-logos-viewport mt-6" aria-hidden>
        <div className="brand-logos-track">
          {LOOP_BRANDS.map((brand, index) => {
            const SvgComponent = brand.svg;
            return (
              <div
                key={`${brand.id}-${index}`}
                className="brand-logo-item"
                title={brand.name}
              >
                <SvgComponent />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
