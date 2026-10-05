import type { ReactNode } from "react";

/** Decorative footer icons — fixed aspect, sized by parent height only. */

function FlagFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 60 40"
      className="footer-flag-icon"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

/** Torres Strait Islander flag */
export function TorresStraitIslanderFlag() {
  return (
    <FlagFrame title="Torres Strait Islander flag">
      <rect x="0" y="0" width="60" height="7" fill="#009A44" />
      <rect x="0" y="7" width="60" height="2" fill="#1a1a1a" />
      <rect x="0" y="9" width="60" height="22" fill="#0061FF" />
      <rect x="0" y="31" width="60" height="2" fill="#1a1a1a" />
      <rect x="0" y="33" width="60" height="7" fill="#009A44" />
      <path
        d="M30 14 C22 14 18 18 18 22 C18 26 22 28 30 28 C38 28 42 26 42 22 C42 18 38 14 30 14 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.4"
      />
      <path
        d="M22 20 C26 17 34 17 38 20"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
      />
      <path
        d="M30 24 L31.1 26.8 L34 27 L31.8 28.6 L32.4 31.4 L30 29.8 L27.6 31.4 L28.2 28.6 L26 27 L28.9 26.8 Z"
        fill="#ffffff"
      />
    </FlagFrame>
  );
}

/** Australian national flag (reads clearly on a black footer) */
export function AustralianNationalFlag() {
  return (
    <FlagFrame title="Australian national flag">
      <rect width="60" height="40" fill="#012169" />
      {/* Canton — simplified Union Jack */}
      <rect x="0" y="0" width="30" height="20" fill="#012169" />
      <rect x="13" y="0" width="4" height="20" fill="#ffffff" />
      <rect x="0" y="8" width="30" height="4" fill="#ffffff" />
      <rect x="14" y="0" width="2" height="20" fill="#e4002b" />
      <rect x="0" y="9" width="30" height="2" fill="#e4002b" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#ffffff" strokeWidth="2.2" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#e4002b" strokeWidth="1" />
      {/* Commonwealth Star */}
      <circle cx="15" cy="28" r="3.2" fill="#ffffff" />
      {/* Southern Cross */}
      <circle cx="42" cy="9" r="1.6" fill="#ffffff" />
      <circle cx="48" cy="12" r="1.3" fill="#ffffff" />
      <circle cx="46" cy="18" r="1.5" fill="#ffffff" />
      <circle cx="52" cy="22" r="1.2" fill="#ffffff" />
      <circle cx="40" cy="24" r="1.4" fill="#ffffff" />
    </FlagFrame>
  );
}

export default function FooterAustraliaFlags() {
  return (
    <div
      className="footer-flags"
      aria-label="Australian national and Torres Strait Islander flags"
    >
      <AustralianNationalFlag />
      <TorresStraitIslanderFlag />
    </div>
  );
}
