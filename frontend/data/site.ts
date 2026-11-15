export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Mark & Susan Riley",
    role: "Cattle station owners, Longreach, QLD",
    quote:
      "Our homestead has been fully off-grid for 18 months now. The SunMac team designed everything around our loads and even integrated our old genset as backup. We haven't bought a litre of diesel since.",
    service: "Off-Grid System",
  },
  {
    id: "t2",
    name: "David Nguyen",
    role: "Operations Manager, Western Sydney logistics warehouse",
    quote:
      "The 250kW rooftop system paid for itself faster than projected. From design to grid approval, SunMac handled everything in-house, our energy bill dropped by over 60% in the first quarter.",
    service: "Commercial Solar",
  },
  {
    id: "t3",
    name: "Helen Cartwright",
    role: "Orchard owner, Griffith, NSW",
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
    desc: "Engineered packages for bore pumps and pivots, designed for Australian farms.",
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
    desc: "Turn vacant land into recurring revenue, we finance, build and operate.",
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
  slug: string;
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
    poster: "/projects/commercial-86kw-rooftop-poster.webp",
    image: "/projects/commercial-86kw-rooftop-poster.webp",
    summary:
      "Hybrid rooftop solar-plus-storage system designed for 24/7 self-consumption and demand-response participation.",
    description:
      "This commercial rooftop installation delivers 86kW of generation paired with a 100kWh Goodwe battery bank, large enough to keep critical loads running through the evening peak and provide whole-site backup during grid outages. The two 29.9kW Goodwe hybrid inverters were chosen for their robust three-phase output, seamless battery integration and proven track record on Australian commercial sites. Jinko Tiger Neo 475W N-type modules were selected for their low temperature coefficient and 30-year linear performance warranty, important for a rooftop installation that will see sustained ambient temperatures above 35°C every summer.\n\nThe project was designed and installed in-house by our team and our partner RB Trades Services, with full electrical commissioning and remote monitoring set up before handover. The system began exporting in the first week of operation and is forecast to offset more than 70% of the site's annual energy bill.",
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
    slug: "camellia-industrial-park-rooftop",
    title: "Camellia Industrial Park Rooftop",
    location: "Camellia, NSW",
    capacity: "480 kW",
    category: "Commercial",
    image: "/images/photos/commercial-rooftop-solar.webp",
    summary: "Rooftop array offsetting 72% of the site's annual grid consumption.",
    description:
      "This 480kW rooftop array covers the main warehouse roofs of an industrial estate in Camellia, a few minutes from our own office. The estate's tenants draw most of their power during business hours, so the brief was simple: generate as much as possible while the site is working and keep export to a minimum. Eight hundred Longi Hi-MO X6 600W modules are laid out across the east and west roof faces, which flattens the generation curve and holds output into the late afternoon.\n\nFour Solis 110kW three-phase string inverters feed the main switchboard through a dedicated solar distribution board, with a grid protection relay and export limiting set to the network's connection conditions. Installation was staged roof by roof so tenants kept trading throughout, and the system is monitored remotely by our team. It is forecast to offset around 72% of the site's annual grid consumption.",
    specs: [
      { label: "Solar panels", value: "Longi Hi-MO X6 600W (×800)" },
      { label: "Inverters", value: "4× Solis S6 110kW three-phase" },
      { label: "System size", value: "480 kW solar · 440 kW inverter" },
      { label: "Mounting", value: "Rail-mounted on metal roofing, east and west faces" },
      { label: "Grid connection", value: "Export limited, with grid protection relay" },
      { label: "Annual generation (est.)", value: "~690 MWh / year" },
      { label: "Completed", value: "2024" },
    ],
  },
  {
    id: 2,
    slug: "riverina-centre-pivot-solar-irrigation",
    title: "Riverina Centre-Pivot Solar Irrigation",
    location: "Riverina, NSW",
    capacity: "90 kW + 100 kWh",
    category: "Irrigation",
    image: "/images/photos/farm-field-sunset.webp",
    summary: "Replaced diesel-driven pivot pumping with hybrid solar + battery package.",
    description:
      "This Riverina irrigator was running a centre-pivot bore pump on diesel through every watering season, with the fuel deliveries and generator servicing that come with it. We replaced the generator with a 90kW ground-mounted array and a 100kWh battery, sized so the pump runs from solar through the day and the battery carries the early-morning and evening shifts.\n\nOne hundred and fifty Jinko Tiger Neo 600W modules sit on a fixed-tilt ground mount beside the pump shed and feed two GoodWe 50kW hybrid inverters. The pump runs through a variable frequency drive for soft starts and flow control, which keeps its peak load within what the inverters and battery can deliver. The original diesel generator stays on site as standby for long overcast spells, and the grower checks pump status and battery charge from a phone.",
    specs: [
      { label: "Solar panels", value: "Jinko Tiger Neo 600W (×150)" },
      { label: "Inverters", value: "2× GoodWe ET 50kW Hybrid" },
      { label: "Battery", value: "GoodWe 100 kWh LFP" },
      { label: "Pump", value: "55 kW centre-pivot bore pump on variable frequency drive" },
      { label: "Mounting", value: "Fixed-tilt ground mount, north facing" },
      { label: "Annual generation (est.)", value: "~150 MWh / year" },
      { label: "Completed", value: "2025" },
    ],
  },
  {
    id: 3,
    slug: "outback-station-off-grid-homestead",
    title: "Outback Station Off-Grid Homestead",
    location: "Western QLD",
    capacity: "22 kW + 60 kWh",
    category: "Off-Grid",
    image: "/images/photos/off-grid-solar-house.webp",
    summary: "Fully autonomous homestead with backup generator integration.",
    description:
      "This cattle station homestead in Western Queensland sits well beyond the reach of the grid and had run on a diesel generator for decades. The new stand-alone power system supplies the homestead, workers' quarters, cold room and workshop from solar and batteries, with the generator kept only as an automatic backup.\n\nFifty Trina Vertex S+ 440W modules on a ground-mount frame charge a 60kWh lithium iron phosphate battery bank through two Victron MPPT charge controllers. Three Victron MultiPlus-II inverter-chargers supply three-phase power to the station and start the existing generator automatically if the battery falls below a set level during a long run of cloudy days. The battery bank is sized for roughly two days of typical use without sun, and the equipment is housed in an insulated, ventilated enclosure built for outback summers.",
    specs: [
      { label: "Solar panels", value: "Trina Vertex S+ 440W (×50)" },
      { label: "Inverter-chargers", value: "3× Victron MultiPlus-II 48/5000 (15 kVA, three-phase)" },
      { label: "Charge controllers", value: "2× Victron SmartSolar MPPT RS 450/200" },
      { label: "Battery", value: "60 kWh LFP bank, 48 V" },
      { label: "Backup", value: "Auto-start of the existing diesel generator" },
      { label: "Autonomy (est.)", value: "~2 days of typical use without sun" },
      { label: "Completed", value: "2025" },
    ],
  },
  {
    id: 4,
    slug: "hunter-valley-battery-retrofit",
    title: "Hunter Valley Battery Retrofit",
    location: "Hunter Valley, NSW",
    capacity: "15 kWh",
    category: "Residential",
    image: "/images/photos/home-battery-system.webp",
    summary: "Battery retrofit to an existing rooftop solar array for evening self-consumption.",
    description:
      "The owners of this Hunter Valley home already had a 6.6kW rooftop array, but most of what it generated at midday was exported for a few cents while they bought power back at peak rates every evening. Rather than replace a system that was working well, we added a 15kWh battery alongside it.\n\nThe Sigenergy SigenStor battery is AC-coupled, so the existing panels and inverter stayed exactly as they were. Surplus solar now charges the battery through the day and the household runs on it from late afternoon into the night. A backup gateway keeps the fridge, lights and internet running if the grid goes down. The battery was installed and commissioned in a single day, and the discount under the federal Cheaper Home Batteries Program was applied to the quote up front.",
    specs: [
      { label: "Battery", value: "Sigenergy SigenStor 15 kWh LFP" },
      { label: "Battery inverter", value: "Sigenergy 5 kW single-phase, AC-coupled" },
      { label: "Existing solar", value: "6.6 kW rooftop array (retained)" },
      { label: "Backup", value: "Essential circuits through a backup gateway" },
      { label: "Monitoring", value: "Phone app with live solar, battery and grid flows" },
      { label: "Installation", value: "1 day on site" },
      { label: "Completed", value: "2025" },
    ],
  },
  {
    id: 5,
    slug: "commercial-motel-rooftop-solar",
    title: "Commercial Motel Rooftop Solar",
    location: "Southern Highlands, NSW",
    capacity: "55 kW",
    category: "Commercial",
    image: "/images/photos/motel-rooftop-solar.webp",
    summary:
      "Multi-roof rooftop array spread across guest accommodation wings, offsetting daytime HVAC and pool-heating loads.",
    description:
      "A motel's biggest loads line up neatly with the sun: air conditioning in guest rooms, pool heating, laundry and the kitchen all peak through the day. This 55kW system in the Southern Highlands was designed to cover those loads directly, with very little export.\n\nThe roof space is split across several accommodation wings facing different directions, so the 116 Jinko Tiger Neo 475W modules are wired as separate strings for each roof face and connected to two Solis 25kW three-phase inverters. Each roof face runs on its own tracker input, so a shaded or west-facing wing never drags down the others. Work was scheduled wing by wing around bookings so no rooms were taken out of service, and cable runs were kept out of sight of guest areas.",
    specs: [
      { label: "Solar panels", value: "Jinko Tiger Neo 475W (×116)" },
      { label: "Inverters", value: "2× Solis S6 25kW three-phase" },
      { label: "System size", value: "55 kW solar · 50 kW inverter" },
      { label: "Roof", value: "Metal roofing across several accommodation wings" },
      { label: "Loads offset", value: "Guest-room air conditioning, pool heating, laundry" },
      { label: "Annual generation (est.)", value: "~75 MWh / year" },
      { label: "Completed", value: "2024" },
    ],
  },
  {
    id: 6,
    slug: "bush-retreat-hotel-solar-installation",
    title: "Bush Retreat Hotel Solar Installation",
    location: "Blue Mountains, NSW",
    capacity: "78 kW",
    category: "Commercial",
    image: "/images/photos/bush-retreat-hotel-solar.webp",
    summary:
      "Tile-roof multi-section installation across a heritage hotel and conference venue nestled in bushland.",
    description:
      "This heritage hotel and conference venue in the Blue Mountains wanted lower power bills without changing how the building looks from its grounds. The 78kW system is spread over the roof sections of the accommodation and conference wings that face away from the main approach.\n\nThe roofs are tiled, so every mounting point is a tile bracket fixed to the rafter with the tile refitted over it, which keeps the roof weathertight. The 156 Trina Vertex S+ 500W modules feed three Solis 25kW three-phase inverters in the plant area. Because the site is surrounded by bushland, cabling runs in metal conduit and the array layout leaves clear access to gutters and roof edges for maintenance. Installation was staged around conference bookings.",
    specs: [
      { label: "Solar panels", value: "Trina Vertex S+ 500W (×156)" },
      { label: "Inverters", value: "3× Solis S6 25kW three-phase" },
      { label: "System size", value: "78 kW solar · 75 kW inverter" },
      { label: "Roof", value: "Tiled, six roof sections, rafter-fixed tile brackets" },
      { label: "Site", value: "Bushland setting, cabling in metal conduit" },
      { label: "Annual generation (est.)", value: "~105 MWh / year" },
      { label: "Completed", value: "2025" },
    ],
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
    image: "/images/photos/commercial-rooftop-solar.webp",
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
    image: "/images/photos/home-battery-system.webp",
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
    image: "/images/photos/solar-inverters.webp",
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
    image: "/images/photos/farm-field-sunset.webp",
  },
  {
    id: "offgrid",
    title: "Off-Grid Systems",
    desc: "Stand-alone power systems designed for remote properties.",
    points: ["Selectronic SP PRO", "Victron MultiPlus II", "Generator integration"],
    image: "/images/photos/off-grid-solar-house.webp",
  },
  {
    id: "heatpump",
    title: "Heat Pump Hot Water",
    desc: "High-efficiency heat pump hot water systems, up to 5x cheaper to run than electric resistive units.",
    points: [
      "Sanden, Midea, Emerald Planet & Reclaim",
      "270L – 400L tanks",
      "Smart timer for solar self-use",
      "STC rebate eligible",
    ],
    image: "/products/sanden-heatpump.webp",
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
    desc: "Complete HVAC solutions for commercial warehouses, cold storage facilities and restaurants, engineered, installed and maintained under the NSW Net Zero carbon plan.",
    points: [
      "Commercial warehouses, cold storage & restaurants",
      "Split, multi-split, VRF/VRV & ducted systems",
      "Reverse-cycle inverter technology",
      "Smart Wi-Fi control & zoning",
      "Residential aircon also available",
    ],
    scheme:
      "NSW PDRS Eligible, as an Accredited pathway under the NSW Peak Demand Reduction Scheme (part of the Net Zero plan), eligible high-efficiency HVAC upgrades attract government incentives that significantly reduce your upfront cost.",
    image: "/images/photos/commercial-hvac.webp",
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
    desc: "Spread the cost of your solar, battery, HVAC or heat pump over fortnightly repayments, with $0 upfront and fast digital approval.",
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
    desc: "We fund, build and maintain the system on your site, you simply purchase the energy it produces at a rate below the grid. Ideal for commercial sites.",
    link: "/ppa",
  },
];
