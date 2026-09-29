export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Mark & Susan Riley",
    role: "Cattle station owners — Longreach, QLD",
    quote:
      "Our homestead has been fully off-grid for 18 months now. The SunMac team designed everything around our loads and even integrated our old genset as backup. We haven't bought a litre of diesel since.",
    service: "Off-Grid System",
  },
  {
    id: "t2",
    name: "David Nguyen",
    role: "Operations Manager — Western Sydney logistics warehouse",
    quote:
      "The 250kW rooftop system paid for itself faster than projected. From design to grid approval, SunMac handled everything in-house — our energy bill dropped by over 60% in the first quarter.",
    service: "Commercial Solar",
  },
  {
    id: "t3",
    name: "Helen Cartwright",
    role: "Orchard owner — Griffith, NSW",
    quote:
      "Switching our bore pumps to solar was the best decision we've made on the farm. Installation was clean, on time, and the monitoring app lets me check the pumps from anywhere.",
    service: "Solar Irrigation",
  },
];

export const MASCOT = {
  name: "Joey",
  url: "https://customer-assets.emergentagent.com/job_ecomac-energy-site/artifacts/crbmgjs3_e421df1a-e4b5-49bf-877f-116ea016c923.jpeg",
  tagline: "Your off-grid solar guide",
};

export const COMPANY = {
  name: "SunMac Solar",
  parent: "Ecomac Energy Pty Ltd",
  email: "info@sunmacsolar.com.au",
  website: "www.sunmacsolar.com.au",
  phone: "0493 097 601",
  address: "7/175-179 James Ruse Drive, Camellia NSW 2142",
  abn: "25 658 565 194",
  partner: {
    name: "RB Trades Services",
    url: "https://rbts.au/",
    role: "In-house design & installation partner",
  },
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/savings", label: "Savings" },
  { href: "/ppa", label: "PPA Contracts" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const SERVICES = [
  {
    id: "commercial",
    title: "Large-scale Commercial",
    desc: "Roof-top and ground-mount solar plus battery storage for warehouses, factories and shopping centres.",
    icon: "Factory",
  },
  {
    id: "residential",
    title: "Residential Solar & Battery",
    desc: "End-to-end home solar systems with modern lithium battery storage and smart monitoring.",
    icon: "Home",
  },
  {
    id: "irrigation",
    title: "Solar Irrigation Pumps",
    desc: "Engineered packages for bore pumps and pivots — designed for Australian farms.",
    icon: "Droplets",
  },
  {
    id: "offgrid",
    title: "Off-Grid Specialists",
    desc: "Standalone systems for remote homesteads and stations across the outback.",
    icon: "MountainSnow",
  },
  {
    id: "ppa",
    title: "PPA & Solar Farms",
    desc: "Turn vacant land into recurring revenue — we finance, build and operate.",
    icon: "Sun",
  },
];

export type Project = {
  id: number;
  title: string;
  location: string;
  capacity: string;
  category: string;
  image: string;
  summary: string;
  slug?: string;
  video?: string;
  poster?: string;
  description?: string;
  specs?: { label: string; value: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: 0,
    slug: "commercial-86kw-rooftop",
    title: "86kW Commercial Rooftop with 100kWh Battery",
    location: "Sydney, NSW",
    capacity: "86 kW + 100 kWh",
    category: "Commercial",
    video: "/projects/commercial-86kw-rooftop.mp4",
    poster: "/projects/commercial-86kw-rooftop-poster.jpg",
    image: "/projects/commercial-86kw-rooftop-poster.jpg",
    summary:
      "Hybrid rooftop solar-plus-storage system designed for 24/7 self-consumption and demand-response participation.",
    description:
      "This commercial rooftop installation delivers 86kW of generation paired with a 100kWh Goodwe battery bank — large enough to keep critical loads running through the evening peak and provide whole-site backup during grid outages. The two 29.9kW Goodwe hybrid inverters were chosen for their robust three-phase output, seamless battery integration and proven track record on Australian commercial sites. Jinko Tiger Neo 475W N-type modules were selected for their low temperature coefficient and 30-year linear performance warranty — important for a rooftop installation that will see sustained ambient temperatures above 35°C every summer.\n\nThe project was designed and installed in-house by our team and our partner RB Trades Services, with full electrical commissioning and remote monitoring set up before handover. The system began exporting in the first week of operation and is forecast to offset more than 70% of the site's annual energy bill.",
    specs: [
      { label: "Solar panels", value: "Jinko Tiger Neo 475W (×181)" },
      { label: "Inverters", value: "2× Goodwe 29.9kW Hybrid" },
      { label: "Battery", value: "Goodwe 100 kWh" },
      {
        label: "System size",
        value: "86 kW solar · 59.8 kW inverter · 100 kWh storage",
      },
      { label: "Annual generation (est.)", value: "~131 MWh / year" },
      { label: "Completed", value: "2025" },
    ],
  },
  {
    id: 1,
    title: "Camellia Industrial Park Rooftop",
    location: "Camellia, NSW",
    capacity: "480 kW",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1724041875334-0a6397111c7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwc29sYXIlMjBwYW5lbHMlMjByb29mfGVufDB8fHx8MTc4MTU3NTk0NXww&ixlib=rb-4.1.0&q=85",
    summary: "Rooftop array offsetting 72% of the site's annual grid consumption.",
  },
  {
    id: 2,
    title: "Riverina Centre-Pivot Solar Irrigation",
    location: "Riverina, NSW",
    capacity: "90 kW + 100 kWh",
    category: "Irrigation",
    image:
      "https://images.unsplash.com/photo-1717702576954-c07131c54169?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxmYXJtZXIlMjBmaWVsZCUyMHN1bnNldHxlbnwwfHx8fDE3ODE1NzU5NDV8MA&ixlib=rb-4.1.0&q=85",
    summary: "Replaced diesel-driven pivot pumping with hybrid solar + battery package.",
  },
  {
    id: 3,
    title: "Outback Station Off-Grid Homestead",
    location: "Western QLD",
    capacity: "22 kW + 60 kWh",
    category: "Off-Grid",
    image:
      "https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwxfHxvZmYlMjBncmlkJTIwc29sYXIlMjBob3VzZXxlbnwwfHx8fDE3ODE1NzU5NDV8MA&ixlib=rb-4.1.0&q=85",
    summary: "Fully autonomous homestead with backup generator integration.",
  },
  {
    id: 4,
    title: "Hunter Valley Battery Retrofit",
    location: "Hunter Valley, NSW",
    capacity: "15 kWh",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1780445392417-68b9dccc45f2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGJhdHRlcnklMjBzeXN0ZW18ZW58MHx8fHwxNzgxNTc1OTQ1fDA&ixlib=rb-4.1.0&q=85",
    summary: "Battery retrofit to an existing rooftop solar array for evening self-consumption.",
  },
  {
    id: 5,
    title: "Commercial Motel Rooftop Solar",
    location: "Southern Highlands, NSW",
    capacity: "55 kW",
    category: "Commercial",
    image:
      "https://customer-assets.emergentagent.com/job_ecomac-energy-site/artifacts/uevle0ih_IMG_0269.jpeg",
    summary:
      "Multi-roof rooftop array spread across guest accommodation wings, offsetting daytime HVAC and pool-heating loads.",
  },
  {
    id: 6,
    title: "Bush Retreat Hotel Solar Installation",
    location: "Blue Mountains, NSW",
    capacity: "78 kW",
    category: "Commercial",
    image:
      "https://customer-assets.emergentagent.com/job_ecomac-energy-site/artifacts/88ao50rc_Gemini_Generated_Image_mnasyomnasyomnas%20%282%29%20%281%29.png",
    summary:
      "Tile-roof multi-section installation across a heritage hotel and conference venue nestled in bushland.",
  },
];

export const PRODUCTS = [
  {
    id: "panels",
    title: "Solar Panels",
    desc: "Tier-1 monocrystalline modules with 25-year performance warranty.",
    points: [
      "Trina, Jinko, Longi",
      "TOPCon & N-type",
      "Up to 605W per module",
      "30-year linear performance warranty",
      "Low-temperature coefficient (-0.30%/°C)",
      "IEC 61215 / 61730 certified",
    ],
    image:
      "https://images.unsplash.com/photo-1724041875334-0a6397111c7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwc29sYXIlMjBwYW5lbHMlMjByb29mfGVufDB8fHx8MTc4MTU3NTk0NXww&ixlib=rb-4.1.0&q=85",
    brands: [
      { name: "Jinko Tiger Neo", spec: "475W – 605W · N-type TOPCon" },
      { name: "Trina Vertex S+", spec: "440W – 500W · 30yr warranty" },
      { name: "Longi Hi-MO X6", spec: "430W – 600W · back-contact" },
    ],
  },
  {
    id: "batteries",
    title: "Battery Storage",
    desc: "Lithium-iron-phosphate (LFP) batteries from 5 kWh up to industrial scale.",
    points: [
      "LFP chemistry (safer chemistry)",
      "Modular & stackable",
      "10-year product warranty",
      "Cloud monitoring & app control",
    ],
    image:
      "https://images.unsplash.com/photo-1780445392417-68b9dccc45f2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGJhdHRlcnklMjBzeXN0ZW18ZW58MHx8fHwxNzgxNTc1OTQ1fDA&ixlib=rb-4.1.0&q=85",
    brands: [
      { name: "Fox ESS", spec: "ECS / EP-Series · 5.8 – 24 kWh" },
      { name: "GoodWe Lynx", spec: "Home U / Home F · 5.4 – 32 kWh" },
      { name: "Sigenergy SigenStor", spec: "All-in-one hybrid · 8 – 48 kWh" },
      { name: "Pylontech US/Force", spec: "US5000 / Force-L2 · 4.8 – 14 kWh" },
    ],
  },
  {
    id: "inverters",
    title: "Inverters",
    desc: "String, hybrid and three-phase inverters for every system size.",
    points: [
      "Single & three-phase",
      "Hybrid + backup ready",
      "Cloud monitoring",
      "Up to 98.4% efficiency",
    ],
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=80",
    brands: [
      { name: "Fox ESS Hybrid", spec: "H1 / H3 · 3 – 12 kW single/three-phase" },
      { name: "GoodWe ET / EH", spec: "5 – 50 kW hybrid · battery-ready" },
      { name: "Sigenergy SigenStor", spec: "5 – 25 kW · integrated inverter+battery" },
      { name: "Solis S6", spec: "3 – 110 kW · grid-tied & hybrid" },
      { name: "Pylontech", spec: "Force-H2 hybrid · 3.6 – 12 kW" },
    ],
  },
  {
    id: "irrigation",
    title: "Irrigation Kits",
    desc: "Pre-engineered solar pumping packages for bores and centre-pivots.",
    points: ["Grundfos & Lorentz pumps", "VFD-controlled", "Tank-fill automation"],
    image:
      "https://images.unsplash.com/photo-1717702576954-c07131c54169?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxmYXJtZXIlMjBmaWVsZCUyMHN1bnNldHxlbnwwfHx8fDE3ODE1NzU5NDV8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "offgrid",
    title: "Off-Grid Systems",
    desc: "Stand-alone power systems designed for remote properties.",
    points: ["Selectronic SP PRO", "Victron MultiPlus II", "Generator integration"],
    image:
      "https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwxfHxvZmYlMjBncmlkJTIwc29sYXIlMjBob3VzZXxlbnwwfHx8fDE3ODE1NzU5NDV8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "heatpump",
    title: "Heat Pump Hot Water",
    desc: "High-efficiency heat pump hot water systems — up to 5x cheaper to run than electric resistive units.",
    points: [
      "Sanden, Midea, Emerald Planet & Reclaim",
      "270L – 400L tanks",
      "Smart timer for solar self-use",
      "STC rebate eligible",
    ],
    image: "/products/sanden-heatpump.jpg",
    brands: [
      {
        name: "Sanden Eco Plus",
        spec: "Japanese CO₂ refrigerant · 315L · 5-yr warranty",
      },
      { name: "Midea Chromagen", spec: "170L – 280L all-in-one · STC eligible" },
      {
        name: "Emerald Planet",
        spec: "Australian-designed · 200L – 300L · 6-yr warranty",
      },
      { name: "Reclaim Energy", spec: "CO₂ heat pump · 250L – 400L · cold-climate rated" },
    ],
  },
  {
    id: "hvac",
    title: "Commercial HVAC Systems",
    desc: "Complete HVAC solutions for commercial warehouses, cold storage facilities and restaurants — engineered, installed and maintained under the NSW Net Zero carbon plan.",
    points: [
      "Commercial warehouses, cold storage & restaurants",
      "Split, multi-split, VRF/VRV & ducted systems",
      "Reverse-cycle inverter technology",
      "Smart Wi-Fi control & zoning",
      "Residential aircon also available",
    ],
    scheme:
      "NSW PDRS Eligible — as an Accredited pathway under the NSW Peak Demand Reduction Scheme (part of the Net Zero plan), eligible high-efficiency HVAC upgrades attract government incentives that significantly reduce your upfront cost.",
    image:
      "https://images.unsplash.com/photo-1774290331891-5d759056c68d?auto=format&fit=crop&w=1600&q=80",
    brands: [
      {
        name: "Mitsubishi Electric",
        spec: "City Multi VRF · ducted & split · commercial grade",
      },
      { name: "Daikin", spec: "VRV / Sky Air · cold rooms to full restaurants" },
      { name: "ActronAir", spec: "Australian-made · ducted & packaged commercial units" },
      { name: "Midea", spec: "High-efficiency splits & light-commercial systems" },
    ],
  },
];

export const FINANCE_OPTIONS = [
  {
    id: "brighte",
    name: "Brighte",
    tagline: "0% interest payment plans",
    desc: "Spread the cost of your solar, battery, HVAC or heat pump over fortnightly repayments — with $0 upfront and fast digital approval.",
  },
  {
    id: "plenti",
    name: "Plenti",
    tagline: "Green loans up to $80,000",
    desc: "Competitive-rate renewable energy loans with flexible terms of 3-10 years, so your energy savings can outpace your repayments from day one.",
  },
  {
    id: "ppa-finance",
    name: "PPA Contracts",
    tagline: "$0 capital outlay",
    desc: "We fund, build and maintain the system on your site — you simply purchase the energy it produces at a rate below the grid. Ideal for commercial sites.",
    link: "/ppa",
  },
];
