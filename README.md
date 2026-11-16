# ☀️ SunMac Solar

**Commercial, residential, irrigation & off-grid solar systems — engineered and installed across Australia.**

Live site → [sunmacsolar.vercel.app](https://sunmacsolar.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)

---

## Overview

SunMac Solar is the customer-facing website for **Ecomac Energy Pty Ltd**, an Australian solar energy company specialising in commercial rooftop arrays, off-grid homestead systems, solar irrigation packages, and residential solar + battery installations.

The site is a fully responsive, statically-exported **Next.js 16** application with a **FastAPI** backend for lead capture and blog content.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (Pages Router, Turbopack) |
| **Language** | TypeScript 5 |
| **UI** | React 19, Tailwind CSS 4, Framer Motion 13 |
| **Components** | Lucide icons, shadcn/ui primitives, Base UI |
| **Backend** | FastAPI (Python), MongoDB (Motor), Resend (email) |
| **Hosting** | Vercel (frontend), backend hosted separately |
| **Package Manager** | Yarn 1.22 |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero video, services, packages, stats, brand logos, certifications |
| `/products` | Solar panels, batteries, inverters, heat pumps, HVAC & irrigation kits |
| `/projects` | Filterable project portfolio (Commercial / Residential / Irrigation / Off-Grid) |
| `/projects/:slug` | Individual project detail with specs, video & related projects |
| `/ppa` | Power Purchase Agreement (PPA) contracts information |
| `/calculator` | Solar savings calculator |
| `/blog` | Field notes and guides from solar projects |
| `/blog/:slug` | Individual blog post |
| `/about` | Company story, team & partner info |
| `/contact` | Quote request form with office hours |
| `/admin/leads` | Internal admin dashboard for managing leads & PPA enquiries |
| `/unsubscribe` | The unsubscribe page behind the link in every SunMac email: one button, no site header or footer |
| `/unsubscribe/one-click` | Where a mail app's own unsubscribe button posts (RFC 8058); served by `pages/api/unsubscribe/one-click.ts` |

---

## Project Structure

```
sunmacsolar/
├── frontend/          # ← Main Next.js application
│   ├── components/
│   │   ├── home/            # Home page sections (Hero, Services, Packages, etc.)
│   │   ├── site/            # Shared layout (Header, Footer, Nav, Mobile menu)
│   │   ├── contact/         # Contact form components
│   │   ├── forms/           # Form styling utilities
│   │   └── ui/              # Reusable UI primitives (Button, Card, GlideSelect)
│   ├── data/
│   │   └── site.ts          # All static content: nav, projects, products, services
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities (cn, API client)
│   ├── pages/               # Next.js page routes
│   ├── public/              # Static assets (images, logos, videos)
│   └── styles/              # Global CSS, home & inner-page styles
├── backend/                 # FastAPI backend
│   ├── server.py            # API routes (leads, PPA, blog, contact)
│   └── requirements.txt     # Python dependencies
└── package.json             # Root workspace config
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Yarn** 1.22+
- **Python** 3.10+ (for backend)

### Frontend

```bash
# Install dependencies
yarn install

# Start development server (port 3001)
yarn dev

# Production build
yarn build

# Start production server
yarn start
```

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment variables (copy .env.example or create .env)
# Required: MONGO_URL, DB_NAME, RESEND_API_KEY, SENDER_EMAIL, ADMIN_ACCESS_KEY

# Run server
uvicorn server:app --reload
```

---

## Key Features

- **Fully responsive** — tested across 320px–1440px+ viewports, including mobile Safari on iOS
- **iOS Safari 26 optimised** — status bar and toolbar colour management, safe-area insets, overscroll handling
- **Animated UI** — Framer Motion page transitions, scroll-triggered reveals, count-up stats
- **Video showcases** — featured project cards with autoplay video walkthroughs
- **SEO-friendly slugs** — all project URLs use descriptive slugs (`/projects/commercial-86kw-rooftop`)
- **Lead capture** — the quote form, the Joey chat and the PPA form post to `/api/enquiry` (`pages/api/enquiry.ts`), which signs each enquiry and sends it to Surge, SunMac's lead dashboard, where it lands on the Leads screen within seconds. Needs `SURGE_ENQUIRY_URL` and `SURGE_ENQUIRY_SECRET` (server-only) on Vercel; see `frontend/.env.example`. The FastAPI backend below was never deployed, so the forms used to fail.
- **Admin dashboard** — internal `/admin/leads` page for the old FastAPI backend's quote requests and PPA enquiries (superseded by Surge's Leads screen)
- **Static export** — all pages are statically generated at build time for fast load times

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `DB_NAME` | Database name |
| `RESEND_API_KEY` | Resend API key for transactional emails |
| `SENDER_EMAIL` | From address for email notifications |
| `LEAD_RECIPIENT_EMAIL` | Where lead notifications are sent |
| `ADMIN_ACCESS_KEY` | Access key for the admin leads dashboard |

### Frontend (Vercel project settings; server-only, never `NEXT_PUBLIC_`)

| Variable | Description |
|---|---|
| `SURGE_ENQUIRY_URL`, `SURGE_ENQUIRY_SECRET` | Where the quote form, Joey chat and PPA form send enquiries (SunMac's lead system), and the secret each is signed with |
| `SURGE_UNSUBSCRIBE_URL`, `SURGE_UNSUBSCRIBE_SECRET` | Where the unsubscribe page and the one-click address hand the token from an email's link (`lib/surge.ts`), and the secret that request is signed with. Not the enquiries' secret |

The unsubscribe links in SunMac's emails open this site, so nothing a recipient sees names the
internal system. The token in a link is the proof: only SunMac's system can make or check one, and
this site decides nothing. Opening the link changes nothing (mail scanners open links); only the
button does. The two secrets are each set to the same value in both projects, and never printed or
committed.

SunMac's emails load two pictures from this site, in `frontend/public/email/`:
`sunmac-banner.jpg` (the home page's hero, the big SunMac standing on the panels, cut to
1200 x 360 and shown at 600 x 180) and `sunmac-sun.png` (the sun logo at 80 x 80, shown at
20 x 20). Keep their names and addresses: emails already sent point at them. If the hero changes,
remake the banner the same way: `hero-section.webp` drawn cover at 68% down, with "SunMac" in
Outfit 600 (letter-spacing -0.03em) standing on the panels' top edge, saved as a JPG of about
50 KB.

---

## Deployment

The frontend is deployed on **Vercel** with automatic deployments from the `main` branch. The build command and output directory are auto-detected from `frontend/`.

---

## Company

**Ecomac Energy Pty Ltd** (trading as SunMac Solar)  
ABN 25 658 565 194  
7/175-179 James Ruse Drive, Camellia NSW 2142  
📞 0493 097 601 · ✉️ info@sunmacsolar.com.au

Installation partner: [RB Trades Services](https://rbts.au/)

---

## License

This is a proprietary project. All rights reserved.
