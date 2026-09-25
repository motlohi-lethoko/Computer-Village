import { Product, RepairService, SiteConfig, StoreVideo } from '../types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  shopName: "Computer Village",
  companyLegalName: "Computer Village (Pty) Ltd",
  tagline: "Empowering Your Digital World",
  address: "Metcash Complex, Maseru, Lesotho",
  landmark: "Next to FNB ATM",
  room: "Room 104A",
  phones: ["+266 57637545", "+266 57402325"],
  whatsappNumbers: ["+26657637545", "+26657402325"],
  email: "sales@computervillage.co.ls",
  businessHours: "Mon - Fri: 8:00 AM - 5:30 PM | Sat: 8:30 AM - 3:00 PM",
  flyerImageUrl: "/assets/images/computer_village_flyer.jpg",
  flyerHeadline: "GET THE BEST LAPTOP FOR WORK & STUDY",
  flyerSubheadline: "Digital Technology · 8th to 13th Generation · Insured Fast Repairs",
  bannerNotice: "🔥 SPECIAL OFFER: Up to 40% OFF Diagnostics for new clients & Genuine Chargers from M300!"
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-lenovo-ryzen7",
    title: "Lenovo Ryzen 7 High Performance",
    brand: "Lenovo",
    category: "laptops",
    price: 6500,
    originalPrice: 7200,
    condition: "Refurbished Grade A",
    status: "available",
    featured: true,
    specs: {
      processor: "AMD Ryzen 7",
      ram: "8GB RAM",
      storage: "512GB SSD",
      os: "Windows 11 Pro",
      screenSize: "15.6 inch FHD",
      warranty: "6 Months Warranty"
    },
    image: "/assets/images/laptops_showcase_row_1790265301779.jpg",
    description: "High speed Lenovo laptop powered by AMD Ryzen 7 processor with 512GB NVMe SSD. Ultra-fast boot times, full numeric keypad, ideal for serious engineering, programming, and multitasking.",
    dateAdded: "2026-09-20"
  },
  {
    id: "prod-lenovo-thinkpad-i5",
    title: "Lenovo ThinkPad Core i5 Business Laptop",
    brand: "Lenovo",
    category: "laptops",
    price: 6000,
    originalPrice: 6500,
    condition: "Refurbished Grade A",
    status: "available",
    featured: true,
    specs: {
      processor: "Intel Core i5",
      ram: "8GB RAM",
      storage: "256GB SSD",
      os: "Windows 11 Pro",
      screenSize: "14 inch HD Anti-Glare",
      warranty: "6 Months Warranty"
    },
    image: "/assets/images/laptops_showcase_row_1790265301779.jpg",
    description: "Legendary military-grade ThinkPad durability with TrackPoint, spill-resistant keyboard, 256GB solid-state drive, and all-day battery life for corporate and field work.",
    dateAdded: "2026-09-20"
  },
  {
    id: "prod-dell-11th-i5",
    title: "Dell 11th Gen Core i5 Ultrabook",
    brand: "Dell",
    category: "laptops",
    price: 6500,
    originalPrice: 7500,
    condition: "Refurbished Grade A",
    status: "available",
    featured: true,
    specs: {
      processor: "Intel 11th Gen Core i5",
      ram: "8GB RAM",
      storage: "256GB SSD",
      os: "Windows 11 Pro",
      screenSize: "15.6 inch Narrow Bezel",
      warranty: "6 Months Warranty"
    },
    image: "/assets/images/laptops_showcase_row_1790265301779.jpg",
    description: "Modern Dell 11th Generation Core i5 laptop with crystal clear display, fast SSD, and Windows 11 Pro. Perfect for university coursework and office operations.",
    dateAdded: "2026-09-21"
  },
  {
    id: "prod-lenovo-i7-11th",
    title: "Lenovo Core i7 11th Gen Powerhouse",
    brand: "Lenovo",
    category: "laptops",
    price: 6500,
    originalPrice: 7800,
    condition: "Refurbished Grade A",
    status: "available",
    featured: true,
    specs: {
      processor: "Intel 11th Gen Core i7",
      ram: "12GB RAM",
      storage: "256GB SSD",
      os: "Windows 11",
      screenSize: "15.6 inch Display",
      warranty: "6 Months Warranty"
    },
    image: "/assets/images/laptops_showcase_row_1790265301779.jpg",
    description: "Heavy duty multitasking with 12GB RAM and 11th Gen Core i7 power. Fast response time for heavy spreadsheets, graphic design, and video editing.",
    dateAdded: "2026-09-21"
  },
  {
    id: "prod-dell-6th-i5",
    title: "Dell Core i5 6th Gen 16GB RAM",
    brand: "Dell",
    category: "laptops",
    price: 5500,
    condition: "Refurbished Grade A",
    status: "available",
    specs: {
      processor: "Intel Core i5 6th Gen",
      ram: "16GB RAM",
      storage: "256GB SSD",
      os: "Windows 10 Pro",
      screenSize: "14 inch Display",
      warranty: "6 Months Warranty"
    },
    image: "/assets/images/laptops_showcase_row_1790265301779.jpg",
    description: "Robust Dell laptop configured with a massive 16GB RAM upgrade and 256GB SSD for ultra-smooth app switching and office work.",
    dateAdded: "2026-09-22"
  },
  {
    id: "prod-asus-brand-new",
    title: "Brand New ASUS Intel Celeron Laptop",
    brand: "Asus",
    category: "laptops",
    price: 5800,
    originalPrice: 6200,
    condition: "Brand New",
    status: "available",
    featured: true,
    specs: {
      processor: "Intel Celeron Quad Core",
      ram: "4GB RAM",
      storage: "256GB SSD",
      os: "Windows 11 Pro",
      screenSize: "15.6 inch Slim",
      warranty: "1 Year Official Warranty"
    },
    image: "/assets/images/laptops_showcase_row_1790265301779.jpg",
    description: "Factory brand new ASUS laptop with sealed retail box. Sleek modern chassis, vibrant screen, high-efficiency processor, and 256GB SSD storage.",
    dateAdded: "2026-09-22"
  },
  {
    id: "prod-dell-budget-entry",
    title: "Dell Intel Budget Student Laptop",
    brand: "Dell",
    category: "laptops",
    price: 3000,
    condition: "Refurbished Grade A",
    status: "available",
    specs: {
      processor: "Intel Processor",
      ram: "4GB RAM",
      storage: "500GB HDD",
      os: "Windows 11",
      screenSize: "14 inch HD",
      warranty: "3 Months Warranty"
    },
    image: "/assets/images/laptops_showcase_row_1790265301779.jpg",
    description: "Affordable, dependable student laptop for web browsing, homework, Zoom meetings, and document typing. Only M3,000.00.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-acer-i5-7th",
    title: "Acer Core i5 7th Gen Multimedia",
    brand: "Acer",
    category: "laptops",
    price: 5000,
    condition: "Refurbished Grade A",
    status: "available",
    specs: {
      processor: "Intel Core i5 7th Gen",
      ram: "8GB RAM",
      storage: "500GB HDD",
      os: "Windows 11 Pro",
      screenSize: "15.6 inch LED",
      warranty: "6 Months Warranty"
    },
    image: "/assets/images/laptops_showcase_row_1790265301779.jpg",
    description: "Acer 15.6-inch laptop with Core i5 processor, 8GB RAM, and 500GB storage. Full numeric keyboard and HDMI port for external monitors.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-dell-optiplex-i7",
    title: "Dell OptiPlex Core i7 Desktop Tower",
    brand: "Dell",
    category: "desktops",
    price: 4500,
    originalPrice: 4900,
    condition: "Refurbished Grade A",
    status: "available",
    featured: true,
    specs: {
      processor: "Intel Core i7 3.4GHz",
      ram: "16GB RAM",
      storage: "500GB HDD (SSD Upgrade Available)",
      os: "Windows 11 Pro",
      warranty: "6 Months Warranty"
    },
    image: "/assets/images/laptop_chargers_stock_1790265213531.jpg",
    description: "Heavy-duty commercial Dell OptiPlex desktop tower (shrink-wrapped in warehouse stock). Quiet cooling, multiple USB 3.0 ports, built for continuous office uptime.",
    dateAdded: "2026-09-22"
  },
  {
    id: "prod-dell-optiplex-i3",
    title: "Dell OptiPlex Core i3 Desktop Tower",
    brand: "Dell",
    category: "desktops",
    price: 3500,
    condition: "Refurbished Grade A",
    status: "available",
    specs: {
      processor: "Intel Core i3 3.2GHz",
      ram: "8GB RAM",
      storage: "500GB HDD",
      os: "Windows 11 Pro",
      warranty: "6 Months Warranty"
    },
    image: "/assets/images/laptop_chargers_stock_1790265213531.jpg",
    description: "Reliable Dell desktop PC workstation tower with 8GB RAM and Windows 11 Pro. Excellent for shops, accounting systems, schools, and offices.",
    dateAdded: "2026-09-22"
  },
  {
    id: "prod-pantum-p2200",
    title: "Pantum P2200 / P2207 Monochrome Laser Printer",
    brand: "Pantum",
    category: "printers",
    price: 2450,
    condition: "Brand New",
    status: "available",
    featured: true,
    specs: {
      processor: "High Speed Processor",
      warranty: "1 Year Official Warranty",
      connectivity: "USB 2.0 High Speed",
      printSpeed: "22 pages per minute",
      resolution: "1200 x 1200 dpi"
    },
    image: "/assets/images/laser_printer_retail_1790265318004.jpg",
    description: "Compact desktop monochrome laser printer. Ultra-low cost per page, crisp sharp text printing, metal chassis for rugged durability.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-canon-pixma-mg2540",
    title: "Canon PIXMA MG2540 3-in-1 (Print, Copy, Scan)",
    brand: "Canon",
    category: "printers",
    price: 850,
    originalPrice: 950,
    condition: "Brand New",
    status: "available",
    featured: true,
    specs: {
      warranty: "1 Year Official Warranty",
      connectivity: "USB",
      cartridges: "Canon PG-445 & CL-446",
      functions: "Print, Copy, Flatbed Color Scanner"
    },
    image: "/assets/images/laser_printer_retail_1790265318004.jpg",
    description: "Affordable home and small-office all-in-one printer with high resolution flatbed color scanning, xerox photocopying, and color document printing.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-charger-normal",
    title: "Genuine Laptop Charger - Standard Tip (Dell, HP, Lenovo, Toshiba)",
    brand: "Generic",
    category: "chargers",
    price: 300,
    originalPrice: 350,
    condition: "Brand New",
    status: "available",
    featured: true,
    specs: {
      voltage: "19V / 19.5V / 20V",
      tipType: "Round Pin / Big Pin / Yellow Tip",
      warranty: "Replacement Guarantee",
      power: "65W / 90W"
    },
    image: "/assets/images/laptop_chargers_stock_1790265213531.jpg",
    description: "Original quality high-output laptop power adapter. Over-voltage, short-circuit, and heat protection. In stock for Dell, HP, Lenovo, Toshiba, Acer.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-charger-typec",
    title: "Genuine 65W Type-C Fast Laptop Charger",
    brand: "Generic",
    category: "chargers",
    price: 450,
    originalPrice: 500,
    condition: "Brand New",
    status: "available",
    featured: true,
    specs: {
      voltage: "5V/9V/15V/20V Auto PD",
      tipType: "Universal USB Type-C",
      power: "65W Power Delivery",
      warranty: "Replacement Guarantee"
    },
    image: "/assets/images/laptop_chargers_stock_1790265213531.jpg",
    description: "Original Type-C 65W fast charger suitable for modern HP, Dell, Lenovo ThinkPad, Apple MacBook, ASUS, and Acer laptops.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-battery-laptop",
    title: "Original Replacement Laptop Battery",
    brand: "Generic",
    category: "batteries",
    price: 650,
    originalPrice: 850,
    condition: "Brand New",
    status: "available",
    specs: {
      capacity: "4-Cell / 6-Cell Extended Life",
      warranty: "6 Months Warranty",
      compatibility: "Dell, HP, Lenovo, Acer, Toshiba"
    },
    image: "/assets/images/laptop_chargers_stock_1790265213531.jpg",
    description: "High capacity grade A replacement laptop batteries with certified cells. Restores your laptop to 3 to 6 hours of dependable battery runtime.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-zpos-cash-drawer",
    title: "ZPOS Heavy Duty Electronic Cash Drawer M750",
    brand: "ZPOS",
    category: "peripherals",
    price: 750,
    condition: "Brand New",
    status: "available",
    specs: {
      connectivity: "RJ11 Receipt Printer Port & Key Lock",
      material: "Heavy Gauge Solid Steel",
      compartments: "5 Bill / 8 Coin Trays",
      warranty: "1 Year Warranty"
    },
    image: "/assets/images/laser_printer_retail_1790265318004.jpg",
    description: "Robust retail POS cash drawer with 3-position lock (manual open, electrically driven by receipt printer, or locked shut). Essential for shops and supermarkets.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-eblink-router",
    title: "EB-Link Smart Wi-Fi 6 High-Gain Router",
    brand: "EB-Link",
    category: "networking",
    price: 850,
    condition: "Brand New",
    status: "available",
    specs: {
      speed: "Gigabit Dual Band 1800Mbps",
      antennas: "4x 5dBi High Gain Antennas",
      ports: "4x Gigabit Ethernet LAN/WAN",
      warranty: "1 Year Warranty"
    },
    image: "/assets/images/laser_printer_retail_1790265318004.jpg",
    description: "Next-gen Wi-Fi 6 router providing wide coverage, wall penetration, low latency gaming, and support for up to 64 simultaneous devices.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-nesty-gaming-headset",
    title: "Nesty USB 7.1 Surround Gaming Headphone with Mic",
    brand: "Nesty",
    category: "peripherals",
    price: 380,
    condition: "Brand New",
    status: "available",
    specs: {
      audio: "7.1 Virtual Surround Sound",
      mic: "Noise Cancelling Boom Mic",
      cable: "Braided Anti-Tangle Cable with Volume Control",
      lighting: "RGB Glow LED"
    },
    image: "/assets/images/laptop_chargers_stock_1790265213531.jpg",
    description: "Over-ear cushioned gaming headset with crystal clear audio for calls, online lectures, music, and competitive PC gaming.",
    dateAdded: "2026-09-23"
  },
  {
    id: "prod-screens-stock",
    title: "New Laptop Replacement LED Screens (Lenovo / Dell / HP)",
    brand: "Generic",
    category: "peripherals",
    price: 1250,
    condition: "Brand New",
    status: "available",
    specs: {
      models: "Lenovo T430, X240, Dell E6420, Dell E7440, HP 250 G3",
      resolution: "HD / FHD Slim & Standard 30-pin / 40-pin",
      installation: "Free or low-cost fitting in-store"
    },
    image: "/assets/images/laptop_repairs_banner_1790265197225.jpg",
    description: "Factory brand new replacement LCD/LED laptop screens with no dead pixels. Immediate in-store installation by Computer Village technicians.",
    dateAdded: "2026-09-23"
  }
];

export const INITIAL_REPAIR_SERVICES: RepairService[] = [
  {
    id: "rep-diag",
    name: "Same-Day Hardware & Software Diagnosis",
    turnaround: "Within 2 Hours",
    startingPrice: 150,
    description: "Complete motherboard, RAM, storage, power supply, and thermal inspection. Fee is waived if repair is approved.",
    features: [
      "Thermal paste & heat pipe check",
      "Memory & hard drive surface scan",
      "Power circuitry & IC testing",
      "Up to 40% OFF for new clients"
    ],
    discountText: "Up to 40% OFF for New Clients",
    iconName: "Search"
  },
  {
    id: "rep-board",
    name: "Motherboard & Chipset Component Repair",
    turnaround: "24 - 48 Hours",
    startingPrice: 650,
    description: "Precision micro-soldering for laptops that won't turn on, liquid spills, blown MOSFETs, or charging circuit issues.",
    features: [
      "Micro-soldering & chip replacement",
      "Short-circuit isolation",
      "Bios reprogramming",
      "3-month service warranty"
    ],
    iconName: "Cpu"
  },
  {
    id: "rep-screen",
    name: "Broken Screen & Broken Hinge Restoration",
    turnaround: "Same Day (1 - 3 Hours)",
    startingPrice: 450,
    description: "Replacement of cracked panels, flickering displays, and repair of snapped screen hinges without damaging housing.",
    features: [
      "Genuine grade A display panels",
      "Reinforced hinge anchoring",
      "Screen cable replacement",
      "Anti-glare & IPS options"
    ],
    iconName: "Monitor"
  },
  {
    id: "rep-os",
    name: "Windows 11 Pro Install & SSD Speed Upgrade",
    turnaround: "Same Day (1 Hour)",
    startingPrice: 350,
    description: "Supercharge slow laptops with high-speed SSDs and clean Windows installation, activated with drivers and essential office tools.",
    features: [
      "Data backup & migration",
      "Genuine drivers & anti-virus setup",
      "10x speed boost compared to old HDD",
      "Office productivity suite ready"
    ],
    iconName: "HardDrive"
  },
  {
    id: "rep-jack",
    name: "DC Power Jack & Battery Port Replacement",
    turnaround: "Same Day",
    startingPrice: 280,
    description: "Fix loose charging pins, laptops that only charge when wiggling the wire, and faulty battery connection terminals.",
    features: [
      "Heavy-duty reinforced DC jacks",
      "Voltage calibration",
      "Cable soldering test",
      "Fast same-day turnaround"
    ],
    iconName: "Zap"
  }
];

export const INITIAL_VIDEOS: StoreVideo[] = [
  {
    id: "vid-tour-1",
    title: "Computer Village Shop Tour & Shelves Overview",
    description: "Live walkthrough of our Metcash Complex shop floor showing stocked routers (EB-Link, 4G LTE), Nesty headsets, Pantum laser printers, PC towers and laptop screens.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "/assets/images/computer_village_flyer.jpg",
    duration: "0:32",
    category: "Store Walkthrough",
    dateAdded: "2026-09-24"
  },
  {
    id: "vid-repair-2",
    title: "Laptop Motherboard Repair & Diagnostic Bench",
    description: "Watch our technician diagnosing power rail failure on an HP Core i7 laptop using digital multimeter and regulated bench power supply.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "/assets/images/laptop_repairs_banner_1790265197225.jpg",
    duration: "0:45",
    category: "Repair Demo",
    dateAdded: "2026-09-24"
  }
];
