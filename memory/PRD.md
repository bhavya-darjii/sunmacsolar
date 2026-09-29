# SunMac Solar Website — PRD

## Original Problem Statement
Create a professional website for commercial and off-grid solar systems.
- **Trading name:** SunMac Solar (rebranded from Ofgrid Solar)
- **Parent company:** Ecomac Energy Pty Ltd
- **Pages required:** Home, Products, Our Projects, About Us, Blog, PPA Contracts, Contact, Savings Calculator
- **Installation partner:** RB Trades Services (https://rbts.au/) — in-house design & installation team
- **Specialisations:** Large-scale commercial solar+battery, residential solar+battery, solar irrigation pump packages for farmers, off-grid systems (regional Australia/outback), PPA contracts for landowners with vacant land
- **Company details:**
  - Email: info@sunmacsolar.com.au
  - Website: www.sunmacsolar.com.au
  - Phone: 0493 097 601
  - Address: 7/175-179 James Ruse Drive, Camellia NSW 2142
  - ABN/ACN: 25 658 565 194

## User Personas
1. **Commercial property owner / facility manager** — looking to reduce energy bills with rooftop or ground-mount solar + battery.
2. **Farmer / station owner** — needs solar irrigation pumps or off-grid power for remote homestead.
3. **Landowner** — has 20+ acres of underutilised land and wants passive PPA revenue.
4. **Residential homeowner** — wants solar + battery for the family home.

## Architecture
- **Backend:** FastAPI (`/app/backend/server.py`) with MongoDB (motor). Endpoints under `/api`:
  - `GET /api/health`
  - `POST /api/leads` / `GET /api/leads` — contact/quote form submissions
  - `POST /api/ppa-inquiries` / `GET /api/ppa-inquiries` — PPA landowner inquiries
  - `GET /api/blog` / `GET /api/blog/{slug}` — blog posts (3 seeded on startup)
- **Frontend:** React (CRA + craco) with react-router-dom v7, framer-motion, lucide-react, sonner. Tailwind + shadcn/ui available.
- **Theme:** Light, Organic & Earthy — Outfit (headings) + Manrope (body); amber (#D97706) accent on warm off-white (#FDFBF7).
- **Design source:** `/app/design_guidelines.json`

## What's Been Implemented (2026-02-16)
- [x] Brand identity: typography (Outfit + Manrope from Google Fonts), color palette, header logo
- [x] Sticky glass-morphism header with mobile menu; footer with full company details
- [x] Home page: hero with image overlay, trust strip, about teaser, 5-service bento grid, featured projects, dark CTA
- [x] Products page: 5 product categories (panels, batteries, inverters, irrigation, off-grid) with alternating layout
- [x] Projects page: filterable gallery (All / Commercial / Residential / Irrigation / Off-Grid / PPA), 6 seeded projects
- [x] About page: company story, RB Trades partnership card, 4 core values, dark company-facts panel
- [x] Blog: list + detail pages backed by FastAPI + MongoDB, 3 seeded articles
- [x] PPA Contracts page: benefits, ideal-site checklist, full inquiry form posting to backend
- [x] Contact page: full quote-request form + office card + hours
- [x] All forms persist to MongoDB; success/error toasts via sonner
- [x] data-testid attributes on every interactive element
- [x] Tested by testing_agent_v3 — 100% backend + 100% frontend pass

## What's Been Implemented (2026-02, later sessions)
- [x] Rebrand to SunMac Solar (logos, copy, emails)
- [x] Joey mascot chat widget (lead capture)
- [x] Products expanded: heat pumps (Sanden etc.), HVAC, battery/inverter brands
- [x] Project detail pages with compressed MP4 video hero
- [x] Resend email integration — lead notifications to info@sunmacsolar.com.au
- [x] /savings page: Solar Savings Calculator + Australian Rebates Guide
- [x] Code review fixes: BackgroundTasks for email, lazy-loading images, video compression
- [x] (2026-02-18) SENDER_EMAIL switched to verified leads@sunmacsolar.com.au — domain verified in Resend, test send succeeded
- [x] (2026-02-18) Auto-reply thank-you email to customers on Contact + PPA form submissions
- [x] (2026-02-18) Admin dashboard at /admin/leads (X-Admin-Key protected; key in /app/memory/test_credentials.md) — contact leads + PPA inquiries tables
- [x] (2026-02-18) Testimonials section on Home page (3 cards)
- [x] (2026-02-18) Lead status tracking: status field (new/contacted/quoted/won/lost) on leads + PPA inquiries, PATCH /api/leads/{id}/status and /api/ppa-inquiries/{id}/status (admin-key protected), colored status dropdowns in admin dashboard — tested via curl + Playwright (persistence verified)
- [x] (2026-02-18) Commercial HVAC product line: expanded HVAC entry on Products page for commercial warehouses, cold storage & restaurants; brands Mitsubishi Electric, Daikin, ActronAir, Midea; NSW PDRS (Peak Demand Reduction Scheme / Net Zero plan) eligibility callout; new commercial HVAC hero image
- [x] (2026-02-18) Finance Options section on Products page: Brighte (0% interest plans), Plenti (green loans), PPA Contracts ($0 upfront, links to /ppa); added "Commercial HVAC / air conditioning" option to Contact form service dropdown
- [x] (2026-02-18) PDRS HVAC section on Savings page (/savings#pdrs): explainer (who qualifies, how it's paid, why generous) + interactive incentive estimator (warehouse/cold storage/restaurant × cooling kW → indicative $ range + PRC count); Products PDRS callout now links to it; Layout supports hash-anchor scrolling
- [x] Tested iteration 4: 100% backend + 100% frontend pass (/app/test_reports/iteration_4.json); pytest suite at /app/backend/tests/backend_test.py

## Prioritized Backlog
### P1 (next iteration)
- SEO meta tags + sitemap + Open Graph for each page
- Rate-limit POST /api/leads and /api/ppa-inquiries by IP (auto-reply abuse prevention — flagged in code review)

### P2
- Pagination on admin leads tables (currently capped at 500)
- Proper admin auth (JWT + user accounts) to replace shared static key
- Blog rich-text editor and image uploads (object storage)
- Testimonials dedicated page / user-supplied real testimonials (current 3 are placeholder copy)

### P3
- Multi-language (en-AU only today; could add zh-CN for the local market)
- WhatsApp widget
- Google Analytics + heatmap integration

## Notes
- Resend integration live: sender leads@sunmacsolar.com.au (domain verified), notifications to info@sunmacsolar.com.au, auto-reply to customer.
- Admin access: /admin/leads, key stored in backend .env (ADMIN_ACCESS_KEY) and /app/memory/test_credentials.md.
- User has a production deployment — changes need re-Deploy to go live.
