import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = './clones';
const DEST_DIR = './website';

fs.mkdirSync(DEST_DIR, { recursive: true });

// Read user's SVG logo from visiting card
const rawSvg = fs.readFileSync('shivansh-logo.svg', 'utf8');
const innerPaths = rawSvg.substring(rawSvg.indexOf('<path'), rawSvg.lastIndexOf('</svg>')).trim();

// 1. Perfectly Bounded, Bold, Centered SVG Logo (Zero phantom whitespace)
const SVG_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226 52" width="226" height="52">
  <g fill="none" fill-rule="evenodd">
    <!-- Visiting card emblem (normalized and scaled) -->
    <g transform="translate(2, 2) scale(0.0505) translate(-125, -25)">
      ${innerPaths}
    </g>
    <!-- Brand typography exact as requested, tightly aligned -->
    <text x="49" y="30" font-family="'Space Grotesk', 'Inter', -apple-system, sans-serif" font-size="26.5" font-weight="800" fill="#FFFFFF" letter-spacing="1.5">SHIVANSH</text>
    <text x="50.5" y="45" font-family="'Space Grotesk', 'Inter', -apple-system, sans-serif" font-size="8.4" font-weight="700" fill="#FFFFFF" letter-spacing="2.8" opacity="0.95">BUILDERS &amp; DEVELOPERS</text>
  </g>
</svg>`;
const LOGO_DATA_URI = 'data:image/svg+xml;base64,' + Buffer.from(SVG_LOGO).toString('base64');

// 2. Favicon SVG (Emblem on dark rounded icon background)
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1016 1016" width="64" height="64">
  <rect width="1016" height="1016" rx="200" fill="#181818"/>
  <g transform="translate(60, 60) scale(0.88)">
    ${innerPaths}
  </g>
</svg>`;
const FAVICON_DATA_URI = 'data:image/svg+xml;base64,' + Buffer.from(FAVICON_SVG).toString('base64');

// 9 Portfolio Projects Specification & Content
const PORTFOLIO_PROJECTS = [
  {
    title: 'LUXURY GARDEN ESTATE',
    slug: 'luxury-garden-estate',
    file: 'luxury-garden-estate.html',
    category: 'Building, Residential',
    date: 'January 14, 2026',
    services: 'Landscape Architecture, Structural Engineering, Luxury Estate Development',
    team: 'Yogesh Navle &amp; ShivAnsh Engineering Team',
    specLocation: 'Alibaug Coastal Enclave, Maharashtra',
    specArea: '34,500 sq. ft. Total Built-up Area',
    specFoundation: 'Reinforced Piled Raft with Hydrological Soil Stabilization',
    specTimeline: '16 Months (Completed On Schedule)',
    specQuality: 'IS 456 / IS 1893 Seismic Zone III Certified',
    specExecution: 'Turnkey Architectural &amp; Structural EPC',
    overview1: 'The Luxury Garden Estate represents an advanced synthesis of expansive landscaped grounds with high-specification structural residential architecture. Engineered to maximize natural illumination while preserving thermal efficiency, the private enclave features post-tensioned cantilevered terraces, sustainable greywater irrigation systems, and marine-grade protective coatings designed for high-salinity coastal environments.',
    overview2: 'From initial topographical grading and soil compaction to heavy reinforced concrete framing and custom stone masonry, ShivAnsh Builders delivered total turnkey precision. All structural components underwent third-party ultrasonic and core compressive testing to guarantee multi-generational durability.',
    prevTitle: 'SMART ENERGY OFFICE',
    prevFile: 'smart-energy-office.html',
    nextTitle: 'URBAN OFFICE COMPLEX',
    nextFile: 'urban-office-complex.html',
  },
  {
    title: 'URBAN OFFICE COMPLEX',
    slug: 'urban-office-complex',
    file: 'urban-office-complex.html',
    category: 'Architecture, Commercial',
    date: 'January 18, 2026',
    services: 'Commercial Planning, Structural Engineering, Modern Facades',
    team: 'Yogesh Navle &amp; Commercial Development Division',
    specLocation: 'Sector 15, CBD Belapur, Navi Mumbai',
    specArea: '92,000 sq. ft. Commercial Facility',
    specFoundation: 'Deep Bored Cast-in-Situ Piles (22m Depth into Basalt)',
    specTimeline: '22 Months (Completed On Schedule)',
    specQuality: 'National Building Code (NBC) &amp; Grade-A Structural Compliance',
    specExecution: 'Core, Shell &amp; Advanced MEP Infrastructure',
    overview1: 'Designed to support fast-scaling corporate enterprises, the Urban Office Complex showcases high-performance acoustic double-glazed curtain walls and column-free open-span floor plates. Our engineering division engineered post-tensioned transfer beams to eliminate internal load-bearing obstructions, maximizing usable carpet area.',
    overview2: 'ShivAnsh managed complex urban staging logistics, integrated high-efficiency VRF climate management conduits, and executed continuous concrete pours with zero traffic disruption. The facility incorporates high-capacity rainwater harvesting sumps and backup microgrid connections.',
    prevTitle: 'LUXURY GARDEN ESTATE',
    prevFile: 'luxury-garden-estate.html',
    nextTitle: 'THE CORE CENTER',
    nextFile: 'the-core-center.html',
  },
  {
    title: 'THE CORE CENTER',
    slug: 'the-core-center',
    file: 'the-core-center.html',
    category: 'Building, Design',
    date: 'January 20, 2026',
    services: 'Core & Shell Construction, High-Rise Engineering, Structural Works',
    team: 'Yogesh Navle &amp; Structural Works Group',
    specLocation: 'Sector 17, Vashi, Navi Mumbai',
    specArea: '145,000 sq. ft. High-Density Landmark',
    specFoundation: 'High-Capacity Friction Piles with Central Shear Wall Core',
    specTimeline: '24 Months (Delivered Ahead of Schedule)',
    specQuality: 'IS 13920 Ductile Detailing for Seismic Resistance',
    specExecution: 'Heavy Structural High-Rise Engineering',
    overview1: 'The Core Center stands as a testament to heavy structural engineering mastery. Built around a slip-formed reinforced concrete central core with dual peripheral moment-resisting frames, the development provides robust seismic dampening and supreme torsional stiffness for high-density metropolitan usage.',
    overview2: 'Our construction management protocols oversaw three subterranean parking basements with contiguous secant pile shoring, advanced dewatering wells, and precision concrete placement exceeding 50 MPa characteristic compressive strength.',
    prevTitle: 'URBAN OFFICE COMPLEX',
    prevFile: 'urban-office-complex.html',
    nextTitle: 'WORKSPACE REDEFINED',
    nextFile: 'workspace-redefined.html',
  },
  {
    title: 'WORKSPACE REDEFINED',
    slug: 'workspace-redefined',
    file: 'workspace-redefined.html',
    category: 'Architecture, Residential',
    date: 'January 22, 2026',
    services: 'Interior Fit-out, Workspace Optimization, Modern Architecture',
    team: 'Yogesh Navle &amp; Architectural Design Team',
    specLocation: 'Millennium Business Park, Mahape, Navi Mumbai',
    specArea: '48,000 sq. ft. Creative Corporate Space',
    specFoundation: 'Reinforced Isolated Footings with Stiff Ground Beams',
    specTimeline: '14 Months (Completed On Schedule)',
    specQuality: 'Green Building Standards &amp; Acoustic Class-A Certified',
    specExecution: 'Structural Retrofit &amp; Modern Commercial Fit-out',
    overview1: 'Workspace Redefined blends industrial-grade structural resilience with flexible, collaborative modern interior architecture. Designed for hybrid operational requirements, the layout combines open-span steel truss mezzanines, high-decibel acoustic partitioning, and modular utility shafts.',
    overview2: 'ShivAnsh executed intricate MEP services concealment, smart automation conduits, and fire-resistant architectural woodwork with millimeter tolerance, producing an inspiring environment optimized for workforce collaboration.',
    prevTitle: 'THE CORE CENTER',
    prevFile: 'the-core-center.html',
    nextTitle: 'URBAN FAMILY HOME',
    nextFile: 'urban-family-home.html',
  },
  {
    title: 'URBAN FAMILY HOME',
    slug: 'urban-family-home',
    file: 'urban-family-home.html',
    category: 'Commercial, Design',
    date: 'November 22, 2025',
    services: 'Residential Construction, Custom Architectural Design',
    team: 'Yogesh Navle &amp; ShivAnsh Project Team',
    specLocation: 'Seawoods Estates, Navi Mumbai',
    specArea: '9,200 sq. ft. Multi-Level Private Villa',
    specFoundation: 'Engineered Strip &amp; Pad Footings on Solid Bedrock',
    specTimeline: '12 Months (Completed On Schedule)',
    specQuality: 'IS 456 Structural Concrete Standards',
    specExecution: 'Turnkey High-End Residential Construction',
    overview1: 'The Urban Family Home exemplifies bespoke luxury living tailored for multigenerational families. Featuring dramatic double-height structural spans, cantilevered steel pergola canopies, and thermally insulated exterior cavity walls, the residence offers a tranquil sanctuary within the city.',
    overview2: 'Every structural finish was hand-inspected by Yogesh Navle and the ShivAnsh engineering team, ensuring that waterproofing membranes, concealed structural lintels, and premium Italian marble installations perform flawlessly for decades.',
    prevTitle: 'WORKSPACE REDEFINED',
    prevFile: 'workspace-redefined.html',
    nextTitle: 'THE INNOVATION HUB',
    nextFile: 'the-innovation-hub.html',
  },
  {
    title: 'THE INNOVATION HUB',
    slug: 'the-innovation-hub',
    file: 'the-innovation-hub.html',
    category: 'Building, Residential',
    date: 'January 26, 2026',
    services: 'Smart Infrastructure, Sustainable Building, Energy Management',
    team: 'Yogesh Navle &amp; Innovation Projects Team',
    specLocation: 'Kharghar Innovation Corridor, Navi Mumbai',
    specArea: '78,000 sq. ft. Eco-Engineering Campus',
    specFoundation: 'Deep Bored Piling with Eco-Friendly Fly-Ash Concrete',
    specTimeline: '18 Months (Completed On Schedule)',
    specQuality: 'IGBC Platinum Benchmark &amp; Zero-Discharge Rating',
    specExecution: 'Sustainable Structural EPC',
    overview1: 'The Innovation Hub is an energy-positive development combining high-efficiency solar photovoltaic arrays, insulated exterior envelope louvers, and real-time structural health monitoring sensors. Engineered to minimize lifecycle operational costs and environmental impact.',
    overview2: 'ShivAnsh coordinated multidisciplinary structural, electrical, and environmental teams to implement greywater filtration systems, low-VOC building materials, and thermal mass flooring that naturally moderates indoor temperatures.',
    prevTitle: 'URBAN FAMILY HOME',
    prevFile: 'urban-family-home.html',
    nextTitle: 'LUXURY ON THE LAKE',
    nextFile: 'luxury-on-the-lake.html',
  },
  {
    title: 'LUXURY ON THE LAKE',
    slug: 'luxury-on-the-lake',
    file: 'luxury-on-the-lake.html',
    category: 'Architecture, Design',
    date: 'January 28, 2026',
    services: 'Waterfront Engineering, Foundation Piling, Luxury Villa Development',
    team: 'Yogesh Navle &amp; Custom Residential Team',
    specLocation: 'Lakefront Promenade, Navi Mumbai',
    specArea: '18,200 sq. ft. Waterfront Villa Enclave',
    specFoundation: 'Marine-Grade M40 Concrete Driven Piles &amp; Shoreline Retaining Wall',
    specTimeline: '15 Months (Completed On Schedule)',
    specQuality: 'Coastal Marine Engineering Standards (Zone III)',
    specExecution: 'Turnkey Waterfront Villa Construction',
    overview1: 'Positioned along an active waterfront shoreline, Luxury on the Lake demanded advanced foundation piling, specialized anti-washout concrete additives, and comprehensive shoreline erosion controls. The architectural profile opens expansive panoramic glass fronts toward the water.',
    overview2: 'ShivAnsh managed specialized hydrological soil stabilization, subterranean moisture barrier installation, and luxury architectural detailing, delivering a weather-resilient residential sanctuary that stands immune to coastal weathering.',
    prevTitle: 'THE INNOVATION HUB',
    prevFile: 'the-innovation-hub.html',
    nextTitle: 'HUB DEVELOPMENT',
    nextFile: 'hub-development.html',
  },
  {
    title: 'HUB DEVELOPMENT',
    slug: 'hub-development',
    file: 'hub-development.html',
    category: 'Building, Design',
    date: 'January 30, 2026',
    services: 'Mixed-Use Development, Master Planning, Urban Infrastructure',
    team: 'Yogesh Navle &amp; Urban Projects Group',
    specLocation: 'Ghansoli Transit Node, Navi Mumbai',
    specArea: '115,000 sq. ft. Mixed-Use Transit Hub',
    specFoundation: 'High-Load Post-Tensioned Transfer Slabs over Deep Piles',
    specTimeline: '20 Months (Completed On Schedule)',
    specQuality: 'NBC Urban Infrastructure &amp; Life Safety Compliance',
    specExecution: 'Mixed-Use Retail &amp; Residential Turnkey Delivery',
    overview1: 'Hub Development seamlessly integrates residential apartments, pedestrian retail corridors, and civic public plazas. Engineered with robust post-tensioned transfer slabs, the structure allows high-clearance retail arcades beneath residential towers.',
    overview2: 'Our construction management protocols minimized urban disruption, maintained rigorous dust and noise control, and executed continuous slip-form structural casting while ensuring strict milestone adherence and budget fidelity.',
    prevTitle: 'LUXURY ON THE LAKE',
    prevFile: 'luxury-on-the-lake.html',
    nextTitle: 'SMART ENERGY OFFICE',
    nextFile: 'smart-energy-office.html',
  },
  {
    title: 'SMART ENERGY OFFICE',
    slug: 'smart-energy-office',
    file: 'smart-energy-office.html',
    category: 'Architecture, Commercial',
    date: 'February 02, 2026',
    services: 'Green Energy Integration, Commercial Construction, Smart Controls',
    team: 'Yogesh Navle &amp; Energy Engineering Division',
    specLocation: 'Sector 11, CBD Belapur, Navi Mumbai',
    specArea: '65,000 sq. ft. High-Efficiency Corporate Tower',
    specFoundation: 'Reinforced Raft Foundation on Weathered Basalt',
    specTimeline: '16 Months (Completed On Schedule)',
    specQuality: 'LEED Gold Specification &amp; Seismic Zone III Certified',
    specExecution: 'Turnkey Corporate Headquarter Development',
    overview1: 'The Smart Energy Office sets the standard for high-efficiency corporate workspaces in Belapur. Equipped with rooftop solar microgrid connectivity, high-efficiency VRF HVAC systems, and automated daylight harvesting facades, this building reduces lifetime operating expenses significantly.',
    overview2: 'From foundation stone to rooftop commissioning, ShivAnsh executed every phase with uncompromising quality, integrating smart sensors that optimize ventilation and power distribution in real time.',
    prevTitle: 'HUB DEVELOPMENT',
    prevFile: 'hub-development.html',
    nextTitle: 'LUXURY GARDEN ESTATE',
    nextFile: 'luxury-garden-estate.html',
  }
];

// Dynamically extract matching featured images from clones/portfolio-masonry-3/index-final.html
const masonryFinalPath = path.join(SRC_DIR, 'portfolio-masonry-3', 'index-final.html');
if (fs.existsSync(masonryFinalPath)) {
  const masonryHtml = fs.readFileSync(masonryFinalPath, 'utf8');
  const articles = [...masonryHtml.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi)];
  articles.forEach((a, i) => {
    const inner = a[1];
    const imgMatch = inner.match(/<img\b[^>]*src=["']?([^"'\s>]+)["']?[^>]*>/i) ||
                     inner.match(/<img\b[^>]*srcset=["']?([^"'\s>]+)["']?[^>]*>/i);
    if (imgMatch && PORTFOLIO_PROJECTS[i]) {
      PORTFOLIO_PROJECTS[i].imgSrc = imgMatch[1];
    }
  });
}

const PAGES = [
  { src: 'avelon-homepage-1', dest: 'index.html', title: 'ShivAnsh Builders and Developers', navKey: 'home' },
  { src: 'about-us', dest: 'about-us.html', title: 'About Us – ShivAnsh Builders and Developers', navKey: 'about' },
  { src: 'our-team', dest: 'our-team.html', title: 'Our Team – ShivAnsh Builders and Developers', navKey: 'team' },
  { src: 'services', dest: 'services.html', title: 'Services – ShivAnsh Builders and Developers', navKey: 'services' },
  { src: 'portfolio-masonry-3', dest: 'portfolio.html', title: 'Projects – ShivAnsh Builders and Developers', navKey: 'portfolio' },
  { src: 'faqs', dest: 'faqs.html', title: 'FAQ – ShivAnsh Builders and Developers', navKey: 'faq' },
  { src: 'contacts', dest: 'contacts.html', title: 'Contact Us – ShivAnsh Builders and Developers', navKey: 'contact' },
  { src: '404', dest: '404.html', title: 'Page Not Found – ShivAnsh Builders and Developers', navKey: 'none' },
  { src: 'typography', dest: 'typography.html', title: 'Typography – ShivAnsh Builders and Developers', navKey: 'none' },
  { src: 'elements', dest: 'elements.html', title: 'Elements – ShivAnsh Builders and Developers', navKey: 'none' },
  { src: 'avelon-homepage-2', dest: 'homepage-2.html', title: 'Homepage 2 – ShivAnsh Builders and Developers', navKey: 'none' },
];

// Enhanced Responsive Styles (Desktop Centering + Mobile Bar + Footer Fix + Cart/Search Removal)
const ENHANCED_STYLES = `
<style id="shivansh-enhanced-styles">
  /* 1. Desktop Logo Prominence & Perfect Centering in Header */
  @media (min-width: 1201px) {
    .wgl-theme-header .elementor-element.elementor-element-16b2a75,
    .wgl-theme-header .elementor-element.elementor-element-b883903 {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 16px !important;
      box-sizing: border-box !important;
    }
    .wgl-theme-header .elementor-element.elementor-element-b0bd965,
    .wgl-theme-header .elementor-element.elementor-element-1eef75b {
      width: 100% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      margin: 0 !important;
    }
    .wgl-theme-header .wgl-logotype-container.default_logo {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      width: 100% !important;
      text-align: center !important;
    }
    .wgl-theme-header .wgl-logotype-container.default_logo a {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      max-width: 100% !important;
    }
    .wgl-theme-header .wgl-logotype-container.default_logo img.default_logo {
      height: 52px !important;
      width: auto !important;
      max-width: 100% !important;
      display: block !important;
      margin: 0 auto !important;
    }
    .pill-nav-mobile-wrapper,
    .pill-nav,
    .pill-nav--mobile {
      display: none !important;
    }
  }

  /* Subtle Neutral Separation for ShivAnsh Logo across All Headers & Viewports */
  .wgl-logotype-container img,
  .wgl-logotype-container.default_logo img.default_logo,
  .wgl-theme-header .wgl-logotype-container img,
  .wgl-sticky-header .wgl-logotype-container img,
  .wgl-mobile-header .wgl-logotype-container img,
  .pill-nav__mark svg {
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.45)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2)) !important;
    transition: filter 0.25s ease !important;
  }

  /* 2. Responsive PillNav for Mobile Screens (<= 1200px) */
  @media only screen and (max-width: 1200px) {
    .wgl-mobile-header,
    .wgl-theme-header {
      display: none !important;
    }

    html, body {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }

    .pill-nav-mobile-wrapper {
      position: fixed !important;
      top: 14px !important;
      left: 14px !important;
      right: 14px !important;
      z-index: 999999 !important;
      pointer-events: none !important;
      display: flex !important;
      justify-content: center !important;
    }

    .pill-nav-mobile-wrapper .pill-nav {
      pointer-events: auto !important;
      width: 100% !important;
      max-width: 480px !important;
    }
  }

  /* Core PillNav Component Styles */
  :root {
    --pn-surface: rgba(22, 22, 28, 0.84);
    --pn-solid: #18171f;
    --pn-edge: rgba(255, 255, 255, 0.1);
    --pn-rim: rgba(255, 255, 255, 0.14);
    --pn-shadow: 0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5);
    --pn-text: rgba(244, 244, 245, 0.72);
    --pn-strong: #ffffff;
    --pn-pill: #FB651B;
    --pn-pill-ink: #ffffff;
    --pn-pill-shadow: 0 6px 18px -4px rgba(251, 101, 27, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.35);
    --pn-dot: #FB651B;
    --pn-ring: rgba(251, 101, 27, 0.65);
    --pn-row-hover: rgba(251, 101, 27, 0.14);
    --pn-tile: linear-gradient(180deg, #322e3e 0%, #201e29 100%);
    --pn-tile-rim: inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 4px 10px -4px rgba(0, 0, 0, 0.7);
    --pn-h: 48px;
    --pn-pad: 4px;
    --pn-inner: 40px;
    --pn-x: 16px;
    --pn-font: 14.5px;
    --pn-gap: 8px;
    --pn-mark: 26px;
    --pn-blur: blur(20px) saturate(1.6);
  }

  .pill-nav {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--pn-gap);
    max-width: 100%;
    font-size: var(--pn-font);
    line-height: 1;
    -webkit-tap-highlight-color: transparent;
    font-family: 'Space Grotesk', 'Inter', -apple-system, sans-serif;
  }

  .pill-nav[data-collapsed] {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .pill-nav__surface {
    background: var(--pn-surface);
    box-shadow: var(--pn-shadow);
    -webkit-backdrop-filter: var(--pn-blur);
    backdrop-filter: var(--pn-blur);
  }

  .pill-nav__rim {
    position: absolute;
    inset: 0;
    z-index: 4;
    border-radius: inherit;
    box-shadow:
      inset 0 0 0 1px var(--pn-edge),
      inset 0 1px 0 var(--pn-rim);
    pointer-events: none;
  }

  .pill-nav__logo {
    position: relative;
    z-index: 2;
    display: inline-grid;
    flex: none;
    place-items: center;
    width: var(--pn-h);
    height: var(--pn-h);
    border-radius: 999px;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .pill-nav__logo:active {
    transform: scale(0.92);
  }

  .pill-nav__logo-link {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    border-radius: inherit;
    color: var(--pn-strong);
    text-decoration: none;
    outline: none;
  }

  .pill-nav__logo-link:focus-visible,
  .pill-nav__toggle:focus-visible {
    outline: 2px solid var(--pn-ring);
    outline-offset: 2px;
  }

  .pill-nav__mark {
    display: grid;
    place-items: center;
    width: var(--pn-mark);
    height: var(--pn-mark);
    transform-origin: 50% 50%;
    will-change: transform;
  }

  .pill-nav__mark svg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .pill-nav__toggle {
    position: relative;
    z-index: 3;
    display: inline-grid;
    flex: none;
    place-items: center;
    width: var(--pn-h);
    height: var(--pn-h);
    padding: 0;
    border: 0;
    border-radius: 999px;
    color: var(--pn-strong);
    cursor: pointer;
    outline: none;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .pill-nav__toggle:active {
    transform: scale(0.92);
  }

  .pill-nav__burger {
    position: relative;
    width: 18px;
    height: 12px;
  }

  .pill-nav__line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: currentColor;
    transition:
      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
      top 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .pill-nav__line--top {
    top: 2px;
  }

  .pill-nav__line--bottom {
    top: 8px;
  }

  .pill-nav[data-open] .pill-nav__line--top {
    top: 5px;
    transform: rotate(45deg);
  }

  .pill-nav[data-open] .pill-nav__line--bottom {
    top: 5px;
    transform: rotate(-45deg);
  }

  .pill-nav__panel {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    padding: calc(var(--pn-h) + 12px) 10px 14px;
    border-radius: 26px;
    box-sizing: border-box;
  }

  .pill-nav__menu {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pill-nav__row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 44px;
    padding: 0 16px;
    border: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background: none;
    color: var(--pn-strong);
    font-family: 'Space Grotesk', 'Inter', -apple-system, sans-serif;
    font-size: 15px;
    line-height: 1;
    font-weight: 600;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    transition: background-color 0.22s ease, color 0.22s ease, transform 0.15s ease;
  }

  .pill-nav__row:hover {
    background: var(--pn-row-hover);
    color: #FB651B;
  }

  .pill-nav__row:active {
    transform: scale(0.98);
  }

  .pill-nav__row[aria-current] {
    background: var(--pn-pill);
    box-shadow: var(--pn-pill-shadow);
    color: var(--pn-pill-ink);
  }

  .pill-nav__contact-footer {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pn-contact-tag {
    font-size: 10.5px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 0 8px;
  }

  .pn-btn-group {
    display: flex;
    gap: 8px;
  }

  .pn-contact-btn {
    flex: 1;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    border-radius: 14px;
    font-size: 12.5px;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .pn-contact-btn:active {
    transform: scale(0.96);
  }

  .pn-call-btn {
    background: rgba(251, 101, 27, 0.15);
    color: #FB651B;
    border: 1px solid rgba(251, 101, 27, 0.35);
  }

  .pn-mail-btn {
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    .pill-nav__line,
    .pill-nav__row,
    .pill-nav__logo,
    .pill-nav__toggle {
      transition: none !important;
    }
  }

  /* 3. Footer Email Overflow & Button Styling */
  .elementor-element.elementor-element-55c86bd .wgl-widget__button {
    font-size: 21px !important;
    line-height: 1.3 !important;
    letter-spacing: -0.01em !important;
    max-width: 100% !important;
    word-break: break-all !important;
  }
  .elementor-element.elementor-element-55c86bd .button__text {
    font-size: 21px !important;
    line-height: 1.3 !important;
    word-break: break-all !important;
    white-space: normal !important;
  }
  .elementor-element.elementor-element-62813f6 .wgl-widget__button,
  .elementor-element.elementor-element-62813f6 .button__text {
    font-size: 28px !important;
    line-height: 1.2 !important;
  }
  .elementor-element.elementor-element-4615da2 {
    max-width: 100% !important;
  }

  /* 4. Service Cards & Showcase Layout (Desktop & Mobile) */
  @media (min-width: 1201px) {
    .pin-spacer {
      margin-left: auto !important;
      margin-right: auto !important;
      float: none !important;
    }
    .elementor-element.elementor-element-981bb1a,
    .elementor-element.elementor-element-bc8075b,
    .elementor-element.elementor-element-549dd9e {
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }

  /* 4a. Mobile & Tablet Service Cards Responsive Layout & Stacking Animation (<= 1200px) */
  @media only screen and (max-width: 1200px) {
    .pin-spacer {
      position: sticky !important;
      inset: auto !important;
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      padding: 0 16px !important;
      margin: 0 auto 36px auto !important;
      box-sizing: border-box !important;
      display: block !important;
      clear: both !important;
      transform: none !important;
    }

    .pin-spacer:has(.elementor-element-981bb1a),
    .pin-spacer-1 {
      top: 76px !important;
      z-index: 10 !important;
    }
    .pin-spacer:has(.elementor-element-bc8075b),
    .pin-spacer-2 {
      top: 90px !important;
      z-index: 20 !important;
    }
    .pin-spacer:has(.elementor-element-549dd9e),
    .pin-spacer-3 {
      top: 104px !important;
      z-index: 30 !important;
      margin-bottom: 70px !important;
    }

    .elementor-element.elementor-element-981bb1a,
    .elementor-element.elementor-element-bc8075b,
    .elementor-element.elementor-element-549dd9e {
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      margin: 0 auto !important;
      position: relative !important;
      inset: auto !important;
      box-sizing: border-box !important;
      opacity: 1 !important;
      visibility: visible !important;
    }

    .elementor-element-981bb1a .e-con-inner,
    .elementor-element-bc8075b .e-con-inner,
    .elementor-element-549dd9e .e-con-inner {
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 !important;
      margin: 0 auto !important;
      box-sizing: border-box !important;
    }

    .elementor-element-e372a2d,
    .elementor-element-a4e973c,
    .elementor-element-62502c5 {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }

    .elementor-element-21aa120,
    .elementor-element-82ecd13,
    .elementor-element-f8720b9 {
      display: flex !important;
      flex-direction: column !important;
      width: 100% !important;
      max-width: 100% !important;
      padding: 28px 20px !important;
      box-sizing: border-box !important;
      height: auto !important;
      border-radius: 10px !important;
      background-color: #f7f7f8 !important;
      box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.08), 0 14px 34px rgba(0, 0, 0, 0.12) !important;
      transform-origin: center top !important;
      will-change: transform, filter !important;
      transition: transform 0.15s ease-out, filter 0.15s ease-out !important;
    }

    /* Keep Card 2 reading flow uniform (Text first, Image second) */
    .elementor-element-82ecd13 > .elementor-element:first-child {
      order: 2 !important; /* image */
    }
    .elementor-element-82ecd13 > .elementor-element:last-child {
      order: 1 !important; /* text */
    }

    .elementor-element-da13c3d,
    .elementor-element-bc8075b .elementor-element-21aa120 > div:first-child,
    .elementor-element-549dd9e .elementor-element-21aa120 > div:first-child {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }

    .elementor-element-6933adf,
    .elementor-element-981bb1a .e-con-child,
    .elementor-element-bc8075b .e-con-child,
    .elementor-element-549dd9e .e-con-child {
      padding-left: 0 !important;
      padding-right: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }

    .elementor-element-981bb1a .dblh__title-wrapper,
    .elementor-element-bc8075b .dblh__title-wrapper,
    .elementor-element-549dd9e .dblh__title-wrapper {
      font-size: 26px !important;
      line-height: 1.25 !important;
      padding: 0 !important;
    }

    .elementor-element-981bb1a .dblh__subtitle,
    .elementor-element-bc8075b .dblh__subtitle,
    .elementor-element-549dd9e .dblh__subtitle {
      font-size: 18px !important;
      font-weight: 700 !important;
      color: #FB651B !important;
      margin-bottom: 8px !important;
    }

    .elementor-element-981bb1a .elementor-widget-text-editor,
    .elementor-element-bc8075b .elementor-widget-text-editor,
    .elementor-element-549dd9e .elementor-widget-text-editor {
      width: 100% !important;
      max-width: 100% !important;
      margin: 12px 0 16px 0 !important;
    }

    .elementor-element-981bb1a .elementor-widget-text-editor p,
    .elementor-element-bc8075b .elementor-widget-text-editor p,
    .elementor-element-549dd9e .elementor-widget-text-editor p {
      font-size: 14.5px !important;
      line-height: 1.55 !important;
      color: #555555 !important;
      margin: 0 !important;
    }

    .elementor-element-ef2de4c,
    .elementor-element-bc8075b .elementor-widget-image,
    .elementor-element-549dd9e .elementor-widget-image {
      width: 100% !important;
      max-width: 100% !important;
      margin-top: 18px !important;
      box-sizing: border-box !important;
    }

    .elementor-element-981bb1a img,
    .elementor-element-bc8075b img,
    .elementor-element-549dd9e img {
      width: 100% !important;
      height: 220px !important;
      max-height: 220px !important;
      object-fit: cover !important;
      border-radius: 8px !important;
      display: block !important;
    }

    .elementor-element-981bb1a .wgl-widget__button,
    .elementor-element-bc8075b .wgl-widget__button,
    .elementor-element-549dd9e .wgl-widget__button {
      min-width: 48px !important;
      min-height: 48px !important;
      width: 48px !important;
      height: 48px !important;
      background-color: #FB651B !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 4px !important;
      margin-top: 6px !important;
    }
  }

  /* 4b. Responsive Services Showcase for Mobile & Tablet (<= 1024px) */
  @media only screen and (max-width: 1024px) {
    .wgl-showcase .showcase__item {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      padding: 24px 20px !important;
      margin-bottom: 20px !important;
      border-radius: 8px !important;
    }
    .wgl-showcase .showcase__item_inner {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      text-align: left !important;
      width: 100% !important;
      max-width: 100% !important;
      gap: 12px !important;
      box-sizing: border-box !important;
    }
    .wgl-showcase .showcase__title {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      width: 100% !important;
      max-width: 100% !important;
      flex: none !important;
      gap: 6px !important;
    }
    .wgl-showcase .showcase__title .title {
      font-size: 22px !important;
      font-weight: 800 !important;
      line-height: 1.25 !important;
      text-transform: uppercase !important;
      margin: 0 !important;
    }
    .wgl-showcase .showcase__subtitle {
      display: block !important;
      font-size: 16px !important;
      font-weight: 700 !important;
      color: #FB651B !important;
      letter-spacing: 0.5px !important;
    }
    .wgl-showcase .showcase__content_wrapper {
      width: 100% !important;
      max-width: 100% !important;
      flex: none !important;
    }
    .wgl-showcase .showcase__content {
      width: 100% !important;
    }
    .wgl-showcase .showcase__content p {
      width: 100% !important;
      font-size: 14.5px !important;
      line-height: 1.6 !important;
      color: #555555 !important;
      margin: 0 !important;
    }
    .wgl-showcase .showcase__item.active .showcase__title .title {
      color: #ffffff !important;
    }
    .wgl-showcase .showcase__item.active .showcase__subtitle {
      color: #FB651B !important;
    }
    .wgl-showcase .showcase__item.active .showcase__content p {
      color: rgba(255, 255, 255, 0.9) !important;
      text-shadow: 0 1px 3px rgba(0,0,0,0.6) !important;
    }
    .wgl-showcase .wgl-button-wrapper {
      margin-top: 8px !important;
      display: block !important;
      width: auto !important;
      align-self: flex-start !important;
      flex: none !important;
    }
    .wgl-showcase .wgl-button-wrapper .wgl-showcase__button {
      width: 48px !important;
      height: 48px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: #FB651B !important;
      color: #ffffff !important;
      border-radius: 4px !important;
    }
    .wgl-showcase .wgl-button-wrapper .icon-wrapper svg {
      fill: #ffffff !important;
    }
  }

  /* 5. Requirement 3: Completely Remove Shopping Cart and Search Everywhere */
  .elementor-widget-wgl-header-cart,
  .elementor-widget-wgl-header-search,
  .mini_cart-overlay,
  .mini-cart,
  .wgl-mini-cart_wrapper,
  .header_search,
  .header_search-button-wrapper,
  .header_search-field,
  .header_search-close,
  .widget_shopping_cart_live_region,
  .woosc-area,
  .woosc-bar,
  .woosc-bar-search,
  .woosc-bar-btn[data-action="search"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  /* 6. Metadata Layout Fix - Eliminate SERVICES Word Overlap Everywhere */
  .elementor-element-3dd93e3,
  .elementor-element-730cdb4,
  .elementor-element-125bb17,
  .elementor-element-a12e207 {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: flex-start !important;
    gap: 10px !important;
  }

  .elementor-element-3dd93e3 .elementor-element-5653cca,
  .elementor-element-730cdb4 .elementor-element-c2666ad,
  .elementor-element-125bb17 .elementor-element-1bf2fac,
  .elementor-element-a12e207 .elementor-element-b503edb {
    flex: 0 0 auto !important;
    min-width: max-content !important;
    width: auto !important;
  }

  .elementor-element-3dd93e3 .elementor-heading-title,
  .elementor-element-730cdb4 .elementor-heading-title,
  .elementor-element-125bb17 .elementor-heading-title,
  .elementor-element-a12e207 .elementor-heading-title {
    white-space: nowrap !important;
    margin-right: 0px !important;
  }

  .elementor-element-3dd93e3 .elementor-element-cd88c94,
  .elementor-element-730cdb4 .elementor-element-6a6351b,
  .elementor-element-125bb17 .elementor-element-3d04426,
  .elementor-element-a12e207 .elementor-element-cc341fb {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    width: auto !important;
    max-width: 100% !important;
  }

  .elementor-element-3dd93e3 .elementor-element-cd88c94 p,
  .elementor-element-730cdb4 .elementor-element-6a6351b p,
  .elementor-element-125bb17 .elementor-element-3d04426 p,
  .elementor-element-a12e207 .elementor-element-cc341fb p {
    margin: 0 !important;
    word-break: normal !important;
  }

  /* 7. Remove Comments Everywhere from Portfolio Pages */
  #comments,
  .comments-area,
  #respond,
  .comment-respond,
  .commentlist,
  .comments-title {
    display: none !important;
  }

  /* 8. Portfolio Project Technical Specs Grid */
  .shivansh-specs-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 14px !important;
    margin: 24px 0 28px 0 !important;
  }
  @media (max-width: 767px) {
    .shivansh-specs-grid {
      grid-template-columns: 1fr !important;
    }
  }
  .shivansh-spec-card {
    background: rgba(17, 26, 36, 0.04) !important;
    border: 1px solid rgba(17, 26, 36, 0.1) !important;
    border-left: 3px solid #FB651B !important;
    padding: 12px 16px !important;
    border-radius: 3px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 4px !important;
  }
  .shivansh-spec-card .spec-label {
    font-size: 11px !important;
    text-transform: uppercase !important;
    letter-spacing: 1.5px !important;
    font-weight: 700 !important;
    color: #FB651B !important;
  }
  .shivansh-spec-card .spec-val {
    font-size: 14.5px !important;
    font-weight: 600 !important;
    color: #111a24 !important;
    line-height: 1.4 !important;
  }

  /* 9. Native Project Action Buttons (Avelon Theme Styled & Guaranteed Clickable) */
  .shivansh-project-actions {
    display: flex !important;
    gap: 16px !important;
    flex-wrap: wrap !important;
    margin-top: 18px !important;
    margin-bottom: 24px !important;
    position: relative !important;
    z-index: 20 !important;
    pointer-events: auto !important;
  }
  .shivansh-project-actions .wgl-button {
    pointer-events: auto !important;
    cursor: pointer !important;
    position: relative !important;
    z-index: 20 !important;
  }

  /* 10. Form WhatsApp Redirect Confirmation & Direct Buttons */
  .shivansh-form-redirect-msg {
    margin-top: 16px !important;
    padding: 14px 18px !important;
    border-radius: 4px !important;
    background: rgba(251, 101, 27, 0.12) !important;
    border: 1px solid rgba(251, 101, 27, 0.4) !important;
    color: #ffffff !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    display: none;
    animation: sscFadeUp 0.3s ease forwards !important;
  }
  .shivansh-form-redirect-msg.active {
    display: block !important;
  }
  .shivansh-direct-contact-row {
    display: flex !important;
    gap: 12px !important;
    margin-top: 16px !important;
    flex-wrap: wrap !important;
  }
  .shivansh-direct-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 11px 18px !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    border-radius: 4px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    text-decoration: none !important;
    transition: all 0.25s ease !important;
  }
  .shivansh-direct-btn--whatsapp {
    background: #25D366 !important;
    color: #ffffff !important;
  }
  .shivansh-direct-btn--whatsapp:hover {
    background: #20bd5a !important;
    transform: translateY(-2px) !important;
  }
  .shivansh-direct-btn--call {
    background: #FB651B !important;
    color: #ffffff !important;
  }
  .shivansh-direct-btn--call:hover {
    background: #e25510 !important;
    transform: translateY(-2px) !important;
  }

  /* 11. FAQ Accordion Interactive Smooth Styling */
  .wgl-accordion .wgl-accordion_panel {
    transition: background 0.3s ease, border-color 0.3s ease !important;
  }
  .wgl-accordion .wgl-accordion_header {
    cursor: pointer !important;
    user-select: none !important;
  }
  .wgl-accordion .wgl-accordion_header:hover .wgl-accordion_title {
    color: #FB651B !important;
  }
  .wgl-accordion .wgl-accordion_content {
    overflow: hidden !important;
    transition: opacity 0.3s ease !important;
  }
  .wgl-accordion .wgl-accordion_panel.active .wgl-accordion_content {
    display: block !important;
    opacity: 1 !important;
  }
  .wgl-accordion .wgl-accordion_panel.active .wgl-accordion_icon {
    transform: rotate(90deg) !important;
  }
</style>
`;

const GLOBAL_SCRIPTS = `
<script id="shivansh-global-scripts">
(function() {
  // 1. Interactive Collapsible Accordions (All FAQ questions fully working)
  function initAccordions() {
    const accordions = document.querySelectorAll('.wgl-accordion');
    accordions.forEach(function(acc) {
      const panels = acc.querySelectorAll('.wgl-accordion_panel');
      panels.forEach(function(panel) {
        const header = panel.querySelector('.wgl-accordion_header');
        const content = panel.querySelector('.wgl-accordion_content');
        if (!header || !content) return;
        content.classList.remove('sf-hidden');

        header.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const isCurrentlyActive = panel.classList.contains('active');
          if (isCurrentlyActive) {
            panel.classList.remove('active');
            content.style.display = 'none';
            content.style.opacity = '0';
          } else {
            panel.classList.add('active');
            content.style.display = 'block';
            setTimeout(function() {
              content.style.opacity = '1';
            }, 10);
          }
        });
      });
    });
  }

  // 2. Direct WhatsApp Pre-Filled Form Redirection (No lead capture walls, direct connection)
  function initForms() {
    document.querySelectorAll('form').forEach(function(form) {
      if (form.classList.contains('search-form') || form.classList.contains('posts_grid_ajax')) return;

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const nameInput = form.querySelector('[name*="name"], [name*="author"], input[placeholder*="Name"]');
        const emailInput = form.querySelector('[name*="email"], input[placeholder*="Email"], input[type="email"]');
        const phoneInput = form.querySelector('[name*="phone"], [name*="tel"], [name*="website"], [name*="url"], input[placeholder*="Phone"], input[placeholder*="Website"]');
        const msgInput = form.querySelector('textarea, [name*="message"], [name*="comment"], input[placeholder*="Comment"], input[placeholder*="requirements"]');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const msg = msgInput ? msgInput.value.trim() : '';

        let text = 'Hello ShivAnsh Builders & Developers,\\n\\nI would like to inquire about your construction and development services.\\n';
        if (name) text += '\\n*Name:* ' + name;
        if (phone) text += '\\n*Contact / Phone:* ' + phone;
        if (email) text += '\\n*Email:* ' + email;
        if (msg) text += '\\n*Project Details:* ' + msg;

        const waUrl = 'https://wa.me/919082451849?text=' + encodeURIComponent(text);

        let notice = form.querySelector('.shivansh-form-redirect-msg');
        if (!notice) {
          notice = document.createElement('div');
          notice.className = 'shivansh-form-redirect-msg';
          form.appendChild(notice);
        }
        notice.innerHTML = '<strong>✓ Redirecting to WhatsApp...</strong> Your message is ready to send to <strong>+91 9082451849</strong>.<br>You can also call us directly at <a href="tel:+919082451849" style="color:#FB651B;font-weight:700;text-decoration:underline;">+91 9082451849</a>.';
        notice.classList.add('active');

        window.open(waUrl, '_blank');
      });
    });
  }

  // 3. Mobile Card Stacking & Layered Animation (Matching PC Experience on Mobile)
  function initMobileCardStack() {
    const card1 = document.querySelector('.elementor-element-21aa120');
    const card2 = document.querySelector('.elementor-element-82ecd13');
    const card3 = document.querySelector('.elementor-element-f8720b9');
    if (!card1 || !card2 || !card3) return;

    const sp1 = card1.closest('.pin-spacer');
    const sp2 = card2.closest('.pin-spacer');
    const sp3 = card3.closest('.pin-spacer');
    if (!sp1 || !sp2 || !sp3) return;

    if (sp1) sp1.classList.add('pin-spacer-1');
    if (sp2) sp2.classList.add('pin-spacer-2');
    if (sp3) sp3.classList.add('pin-spacer-3');

    let ticking = false;
    function updateMobileCards() {
      if (window.innerWidth > 1200) {
        card1.style.transform = '';
        card1.style.filter = '';
        card2.style.transform = '';
        card2.style.filter = '';
        sp1.style.top = '';
        sp1.style.zIndex = '';
        sp1.style.inset = '';
        sp2.style.top = '';
        sp2.style.zIndex = '';
        sp2.style.inset = '';
        sp3.style.top = '';
        sp3.style.zIndex = '';
        sp3.style.inset = '';
        return;
      }

      sp1.style.setProperty('inset', 'auto', 'important');
      sp1.style.setProperty('top', '76px', 'important');
      sp1.style.setProperty('z-index', '10', 'important');
      sp2.style.setProperty('inset', 'auto', 'important');
      sp2.style.setProperty('top', '90px', 'important');
      sp2.style.setProperty('z-index', '20', 'important');
      sp3.style.setProperty('inset', 'auto', 'important');
      sp3.style.setProperty('top', '104px', 'important');
      sp3.style.setProperty('z-index', '30', 'important');

      const r1 = sp1.getBoundingClientRect();
      const r2 = sp2.getBoundingClientRect();
      const r3 = sp3.getBoundingClientRect();

      // Card 1 scales down (1.0 -> 0.90) and blurs (0px -> 5px) as Card 2 slides over it
      const overlap2 = Math.max(0, Math.min(1, (r1.bottom - r2.top) / (r1.height * 0.85)));
      const s1 = 1 - (overlap2 * 0.10);
      const b1 = overlap2 * 5.0;
      const br1 = 100 - (overlap2 * 12);
      card1.style.transform = 'scale(' + s1.toFixed(3) + ')';
      card1.style.filter = 'blur(' + b1.toFixed(1) + 'px) brightness(' + br1.toFixed(0) + '%)';

      // Card 2 scales down (1.0 -> 0.94) and blurs (0px -> 5px) as Card 3 slides over it
      const overlap3 = Math.max(0, Math.min(1, (r2.bottom - r3.top) / (r2.height * 0.85)));
      const s2 = 1 - (overlap3 * 0.06);
      const b2 = overlap3 * 5.0;
      const br2 = 100 - (overlap3 * 12);
      card2.style.transform = 'scale(' + s2.toFixed(3) + ')';
      card2.style.filter = 'blur(' + b2.toFixed(1) + 'px) brightness(' + br2.toFixed(0) + '%)';
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(function() {
          updateMobileCards();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    updateMobileCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initAccordions();
      initForms();
      initMobileCardStack();
    });
  } else {
    initAccordions();
    initForms();
    initMobileCardStack();
  }

  // 3. Production Service Worker Registration for Offline Caching
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function() {
        // Safe silent fallback for environments without SW support
      });
    });
  }
})();
</script>
`;


function generateMobileNav(currentNavKey) {
  const items = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'about', label: 'About Us', href: 'about-us.html' },
    { key: 'team', label: 'Our Team', href: 'our-team.html' },
    { key: 'services', label: 'Services', href: 'services.html' },
    { key: 'portfolio', label: 'Portfolio', href: 'portfolio.html' },
    { key: 'faq', label: 'FAQ', href: 'faqs.html' },
    { key: 'contact', label: 'Contact', href: 'contacts.html' },
  ];

  return `
<!-- React Bits <PillNav /> Component for Mobile Screens -->
<div class="pill-nav-mobile-wrapper">
  <nav class="pill-nav pill-nav--mobile" data-layout="split" data-items="pill" data-collapsed aria-label="Main" id="shivansh-pill-nav">
    <span class="pill-nav__logo pill-nav__surface" id="pn-logo-bubble">
      <a href="index.html" class="pill-nav__logo-link" aria-label="ShivAnsh Logo">
        <span class="pill-nav__mark" id="pn-mark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1016 1016" width="100%" height="100%">
            ${innerPaths}
          </svg>
        </span>
      </a>
      <span class="pill-nav__rim"></span>
    </span>

    <button type="button" class="pill-nav__toggle pill-nav__surface" aria-expanded="false" aria-controls="pn-panel" aria-label="Open menu" id="pn-toggle-btn">
      <span class="pill-nav__burger" aria-hidden="true">
        <span class="pill-nav__line pill-nav__line--top"></span>
        <span class="pill-nav__line pill-nav__line--bottom"></span>
      </span>
      <span class="pill-nav__rim"></span>
    </button>

    <div id="pn-panel" class="pill-nav__panel pill-nav__surface" style="display: none;">
      <ul class="pill-nav__menu">
        ${items.map(it => {
          const isCurrent = it.key === currentNavKey;
          const ariaCurr = isCurrent ? ' aria-current="page"' : '';
          return `<li><a href="${it.href}" class="pill-nav__row"${ariaCurr}><span>${it.label}</span></a></li>`;
        }).join('\n        ')}
      </ul>
      <div class="pill-nav__contact-footer">
        <div class="pn-contact-tag">Direct Inquiries</div>
        <div class="pn-btn-group">
          <a href="tel:+919082451849" class="pn-contact-btn pn-call-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            9082451849
          </a>
          <a href="mailto:shivanshbuilders.dev@gmail.com" class="pn-contact-btn pn-mail-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Email
          </a>
        </div>
      </div>
      <span class="pill-nav__rim"></span>
    </div>
  </nav>
</div>
<script id="shivansh-pillnav-script">
(function() {
  const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const EASE_IN = 'cubic-bezier(0.4, 0, 0.2, 1)';

  function initPillNav() {
    const root = document.getElementById('shivansh-pill-nav');
    const toggle = document.getElementById('pn-toggle-btn');
    const panel = document.getElementById('pn-panel');
    const mark = document.getElementById('pn-mark');
    const logoBubble = document.getElementById('pn-logo-bubble');

    if (!root || !toggle || !panel) return;

    let open = false;
    let isAnimating = false;

    function spinLogo() {
      if (!mark || isAnimating) return;
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
      if (mark.getAnimations?.().length) return;
      mark.animate(
        [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(360deg)' }
        ],
        {
          duration: 900,
          easing: 'cubic-bezier(0.65, 0, 0.25, 1)'
        }
      );
    }
    logoBubble?.addEventListener('pointerenter', spinLogo);
    logoBubble?.addEventListener('click', spinLogo);

    function toggleMenu() {
      const next = !open;
      open = next;
      root.toggleAttribute('data-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

      const width = panel.offsetWidth || (root.offsetWidth || 360);
      const height = panel.scrollHeight || 420;
      const header = toggle.offsetHeight || 48;

      const start = 'inset(0px 0px ' + Math.max(0, height - header) + 'px ' + Math.max(0, width - header) + 'px round ' + (header / 2) + 'px)';
      const end = 'inset(0px 0px 0px 0px round 26px)';

      if (open) {
        root.setAttribute('data-panel', '');
        panel.style.display = 'block';
        panel.animate([{ clipPath: start }, { clipPath: end }], {
          duration: 560,
          easing: EASE_OUT
        });
        const rows = panel.querySelectorAll('.pill-nav__row, .pn-contact-btn');
        rows.forEach((row, i) => {
          row.animate(
            [
              { opacity: 0, transform: 'translateY(-10px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            {
              duration: 420,
              delay: 70 + i * 35,
              easing: EASE_OUT,
              fill: 'backwards'
            }
          );
        });
      } else {
        isAnimating = true;
        const morph = panel.animate([{ clipPath: end }, { clipPath: start }], {
          duration: 380,
          easing: EASE_IN,
          fill: 'forwards'
        });
        morph.onfinish = function() {
          panel.style.display = 'none';
          root.removeAttribute('data-panel');
          isAnimating = false;
        };
        const rows = panel.querySelectorAll('.pill-nav__row, .pn-contact-btn');
        rows.forEach(function(row) {
          row.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' });
        });
      }
    }

    toggle.addEventListener('click', toggleMenu);

    document.addEventListener('pointerdown', function(e) {
      if (!open) return;
      if (root.contains(e.target)) return;
      toggleMenu();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && open) {
        toggleMenu();
        toggle.focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPillNav);
  } else {
    initPillNav();
  }
})();
</script>
`;
}

// Requirement 1: Portfolio is a DIRECT navigation link with NO dropdown
function generateNavItems(currentNavKey, isMobile = false) {
  const items = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'about', label: 'About Us', href: 'about-us.html' },
    { key: 'team', label: 'Our Team', href: 'our-team.html' },
    { key: 'services', label: 'Services', href: 'services.html' },
    { key: 'portfolio', label: 'Portfolio', href: 'portfolio.html' }, // Direct link, NO children, NO dropdown!
    { key: 'faq', label: 'FAQ', href: 'faqs.html' },
    { key: 'contact', label: 'Contact', href: 'contacts.html' },
  ];

  let html = '';
  for (const item of items) {
    const isCurrent = item.key === currentNavKey;
    const currentClass = isCurrent ? ' current-menu-item current_page_item active-lavalamp-menu-item' : '';
    
    html += `
      <li class="menu-item${currentClass}">
        <a href="${item.href}">
          <span class="item_wrapper_text"><span class="item_text">${item.label}</span></span>
        </a>
      </li>
    `;
  }
  return html.trim();
}

function replaceUlById(html, ulId, newInnerContent) {
  const marker = new RegExp(`<ul\\b[^>]*id=["']?${ulId}["']?[^>]*>`, 'i');
  const m = marker.exec(html);
  if (!m) return html;

  const startUl = m.index;
  const tagRe = /<\/?ul\b[^>]*>/gi;
  tagRe.lastIndex = startUl;
  let depth = 0;
  let match;
  while ((match = tagRe.exec(html)) !== null) {
    if (match[0].startsWith('</')) {
      depth--;
      if (depth === 0) {
        const endUl = match.index + match[0].length;
        const openTag = m[0];
        const closeTag = match[0];
        return html.substring(0, startUl) + `${openTag}${newInnerContent}${closeTag}` + html.substring(endUl);
      }
    } else {
      depth++;
    }
  }
  return html;
}

function updateNavbars(html, navKey) {
  const desktopNavItems = `<div class="lavalamp-object ease-in-out" style="transition-duration:0.5s;"></div>` + generateNavItems(navKey, false);
  const mobileNavItems = generateNavItems(navKey, true);

  // 1. Replace main desktop navbar (menu-primary-menu)
  html = replaceUlById(html, 'menu-primary-menu', desktopNavItems);

  // 2. Replace sticky desktop navbar (menu-primary-menu-1)
  html = replaceUlById(html, 'menu-primary-menu-1', desktopNavItems);

  // 3. Replace mobile drawer navbar (menu-primary-menu-2)
  html = replaceUlById(html, 'menu-primary-menu-2', mobileNavItems);

  return html;
}

// Depth-aware element stripper to completely excise DOM trees without touching <style> blocks
function stripElementByClass(html, className) {
  let idx = 0;
  while ((idx = html.indexOf(className, idx)) !== -1) {
    const lastStyleOpen = html.lastIndexOf('<style', idx);
    const lastStyleClose = html.lastIndexOf('</style>', idx);
    if (lastStyleOpen !== -1 && (lastStyleClose === -1 || lastStyleClose < lastStyleOpen)) {
      idx += className.length;
      continue;
    }

    const startDiv = html.lastIndexOf('<div', idx);
    if (startDiv === -1) {
      idx += className.length;
      continue;
    }

    const tagRe = /<\/?div\b[^>]*>/gi;
    tagRe.lastIndex = startDiv;
    let depth = 0;
    let match;
    let endDiv = -1;
    while ((match = tagRe.exec(html)) !== null) {
      if (match[0].startsWith('</')) {
        depth--;
        if (depth === 0) {
          endDiv = match.index + match[0].length;
          break;
        }
      } else {
        depth++;
      }
    }

    if (endDiv !== -1) {
      html = html.substring(0, startDiv) + html.substring(endDiv);
      idx = startDiv;
    } else {
      idx += className.length;
    }
  }
  return html;
}

// Requirement 3: Remove Shopping Cart and Search Completely from entire website
function removeCartAndSearch(html) {
  // Strip Cart Widgets
  html = stripElementByClass(html, 'elementor-widget-wgl-header-cart');

  // Strip Search Widgets
  html = stripElementByClass(html, 'elementor-widget-wgl-header-search');

  // Strip Overlays & mini-cart popups
  html = stripElementByClass(html, 'mini_cart-overlay');
  html = stripElementByClass(html, 'widget_shopping_cart_live_region');
  html = stripElementByClass(html, 'woosc-area');
  html = stripElementByClass(html, 'woosc-bar-search');
  html = stripElementByClass(html, 'woosc-bar');

  return html;
}

function cleanToolbarAndThemeBloat(html) {
  // Strip SingleFile restrictive Content-Security-Policy that blocks map iframes
  html = html.replace(/<meta\b[^>]*content-security-policy[^>]*>/gi, '');

  // Strip out full Envato / WebGeniusLab demo toolbar
  html = html.replace(/<aside id=wgl-envato-toolbar[\s\S]*?<\/aside>/gi, '');
  html = html.replace(/<script id=wgl-toolbar-react-js-extra[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script id=wgl-toolbar-react-js\b[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style>#wgl-envato-toolbar[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<style\b[^>]*id=["']?wgl-toolbar-[^>]*>[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<style id="hide-wgl-toolbar">[\s\S]*?<\/style>/gi, '');

  // Strip dead feeds & oembed links to external staging site
  html = html.replace(/<link rel=["']alternate["']\s+type=["']application\/rss\+xml["'][^>]*>/gi, '');
  html = html.replace(/<link rel=["']EditURI["'][^>]*>/gi, '');
  html = html.replace(/<link rel=["']https:\/\/api\.w\.org\/["'][^>]*>/gi, '');
  html = html.replace(/<link rel=["']alternate["']\s+type=["']application\/json\+oembed["'][^>]*>/gi, '');
  html = html.replace(/<link rel=["']alternate["']\s+type=["']text\/xml\+oembed["'][^>]*>/gi, '');
  html = html.replace(/<link rel=["']alternate["'][^>]*href=["']https?:\/\/wgl-dsites\.net[^"']*["'][^>]*>/gi, '');

  return html;
}

function applyShivAnshBranding(html, pageTitle, navKey) {
  // 1. Page Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${pageTitle}</title>`);

  // 2. OpenGraph & Twitter Meta & RSS links
  html = html.replace(/(<meta\b[^>]*property=["']og:site_name["'][^>]*content=)["'][^"']*["']/gi, '$1"ShivAnsh Builders and Developers"');
  html = html.replace(/(<meta\b[^>]*property=["']og:title["'][^>]*content=)["'][^"']*["']/gi, `$1"${pageTitle}"`);
  html = html.replace(/(<meta\b[^>]*name=["']twitter:title["'][^>]*content=)["'][^"']*["']/gi, `$1"${pageTitle}"`);
  html = html.replace(/(<meta\b[^>]*name=["']twitter:site["'][^>]*content=)["'][^"']*["']/gi, '$1"ShivAnsh Builders and Developers"');
  html = html.replace(/title=["']Avelon/gi, 'title="ShivAnsh');

  // 3. Favicon (Add user's logo as favicon & remove old ones)
  const faviconTag = `<link rel="icon" type="image/svg+xml" href="${FAVICON_DATA_URI}">`;
  if (/<link\b[^>]*\brel=["']?icon["']?[^>]*>/i.test(html)) {
    html = html.replace(/<link\b[^>]*\brel=["']?icon["']?[^>]*>/gi, faviconTag);
  } else {
    html = html.replace('</head>', `${faviconTag}\n</head>`);
  }

  // 4. Logo in header, sticky header, and mobile menu
  html = html.replace(
    /<div class=["']?wgl-logotype-container default_logo["']?>[\s\S]*?<\/div>/gi,
    `<div class="wgl-logotype-container default_logo"><a href="index.html"><img class="default_logo" src="${LOGO_DATA_URI}" alt="ShivAnsh Builders and Developers" style="height:52px;width:auto;display:block;margin:0 auto;"></a></div>`
  );

  // 5. Footer copyright text
  html = html.replace(/©\s*2026\s*Avelon\s*byWebGeniusLab\.\s*All\s*Rights\s*Reserved/gi, '© 2026 ShivAnsh Builders and Developers. All Rights Reserved');
  html = html.replace(/©\s*2026\s*Avelon\.\s*All\s*Rights\s*Reserved/gi, '© 2026 ShivAnsh Builders and Developers. All Rights Reserved');
  html = html.replace(/©2026\s*avelon/gi, '©2026 ShivAnsh');

  // 6. Contact details from Visiting Card:
  html = html.replace(/avelon@mail\.com/gi, 'shivanshbuilders.dev@gmail.com');
  html = html.replace(/contact@shivanshbuilders\.com/gi, 'shivanshbuilders.dev@gmail.com');

  // Phone: 9082451849
  html = html.replace(/href=["']?tel:\+?1?8001234657["']?/gi, 'href="tel:+919082451849"');
  html = html.replace(/href=["']?tel:\+?1%20800%20123%2046%2057["']?/gi, 'href="tel:+919082451849"');
  html = html.replace(/\+1\s*800\s*123\s*46\s*57/g, '9082451849');
  html = html.replace(/\+18001234657/g, '9082451849');

  // Address: A 232, Balaji Bhavan, Plot No. 42A, Sector 11, CBD Belapur, Mumbai - 400614.
  html = html.replace(/27 Division St, New York/gi, 'A 232, Balaji Bhavan, Plot No. 42A, Sector 11, CBD Belapur, Mumbai - 400614.');
  html = html.replace(/London Eye, London, United Kingdom/gi, 'A 232, Balaji Bhavan, Plot No. 42A, Sector 11, CBD Belapur, Mumbai - 400614.');

  // User-facing text substitutions
  html = html.replace(/>URBAN FAMILY HOME – Avelon</gi, '>URBAN FAMILY HOME – ShivAnsh<');

  // 7. Inject Enhanced Styles before </head>
  html = html.replace('</head>', `${ENHANCED_STYLES}\n</head>`);

  // 8. Inject Responsive Mobile Navigation Bar right after <body...>
  const mobileNavMarkup = generateMobileNav(navKey);
  html = html.replace(/<body\b[^>]*>/i, `$&${mobileNavMarkup}`);

  // 9. Insert address cleanly in footer before spacer element (if not already inserted)
  const spacerTarget = '<div class="elementor-element elementor-element-63699d2';
  const phoneIdx = html.indexOf('9082451849');
  if (phoneIdx !== -1 && !html.includes('📍</span> A 232, Balaji Bhavan')) {
    const spacerIdx = html.indexOf(spacerTarget, phoneIdx);
    if (spacerIdx !== -1) {
      const addressHtml = `
<div class="elementor-element aleft elementor-widget" style="margin: 12px 0 16px 0;">
  <div style="color: #ffffff; font-size: 13.5px; line-height: 1.45; opacity: 0.95;">
    <span style="display:inline-block; margin-right:4px;">📍</span> A 232, Balaji Bhavan, Plot No. 42A, Sector 11, CBD Belapur, Mumbai - 400614.
  </div>
</div>
`;
      html = html.substring(0, spacerIdx) + addressHtml + html.substring(spacerIdx);
    }
  }

  // 10. Service Cards Horizontal Centering & Raised Start Positions for Full Exposure
  html = html.replace(
    'class=pin-spacer style=order:0;place-self:auto;grid-area:auto;z-index:auto;float:none;flex-shrink:1;display:flex;margin:0px;inset:0px;position:relative;flex-basis:auto;overflow:visible;box-sizing:border-box;width:1239px;height:590px;padding:0px>',
    'class="pin-spacer pin-spacer-1" style="order:0;place-self:auto;grid-area:auto;z-index:auto;float:none;flex-shrink:1;display:flex;margin:0 auto;inset:0px;position:relative;flex-basis:auto;overflow:visible;box-sizing:border-box;width:1239px;height:590px;padding:0px">'
  );

  html = html.replace(
    'class=pin-spacer style="order:0;place-self:auto;grid-area:auto;z-index:auto;float:none;flex-shrink:1;display:flex;margin:80px 0px 0px;inset:0px;position:relative;flex-basis:auto;overflow:visible;box-sizing:border-box;width:1239px;height:590px;padding:0px"><div class="elementor-element elementor-element-bc8075b',
    'class="pin-spacer pin-spacer-2" style="order:0;place-self:auto;grid-area:auto;z-index:auto;float:none;flex-shrink:1;display:flex;margin:80px auto 0px;inset:0px;position:relative;flex-basis:auto;overflow:visible;box-sizing:border-box;width:1239px;height:590px;padding:0px"><div class="elementor-element elementor-element-bc8075b'
  );

  html = html.replace(
    'class=pin-spacer style="order:0;place-self:auto;grid-area:auto;z-index:auto;float:none;flex-shrink:1;display:flex;margin:80px 0px 0px;inset:0px;position:relative;flex-basis:auto;overflow:visible;box-sizing:border-box;width:1239px;height:590px;padding:0px"><div class="elementor-element elementor-element-549dd9e',
    'class="pin-spacer pin-spacer-3" style="order:0;place-self:auto;grid-area:auto;z-index:auto;float:none;flex-shrink:1;display:flex;margin:180px auto 0px;inset:0px;position:relative;flex-basis:auto;overflow:visible;box-sizing:border-box;width:1239px;height:590px;padding:0px"><div class="elementor-element elementor-element-549dd9e'
  );

  html = html.replaceAll('"layered_custom_start_position":"center top+=450"', '"layered_custom_start_position":"center top+=370"');
  html = html.replaceAll('"layered_custom_start_position":"center top+=520"', '"layered_custom_start_position":"center top+=440"');
  html = html.replaceAll('"layered_custom_start_position":"center top+=590"', '"layered_custom_start_position":"center top+=510"');

  if (!html.includes('id="shivansh-global-scripts"')) {
    if (html.includes('</body>')) {
      html = html.replace('</body>', `${GLOBAL_SCRIPTS}\n</body>`);
    } else {
      html += `\n${GLOBAL_SCRIPTS}\n`;
    }
  }

  return html;
}

// Requirement 2 & 5: Rewrite all portfolio project URLs to local pages, eliminate external demo URLs
function rewriteInternalLinks(html) {
  // 1. Rewrite all portfolio project URLs to local pages
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/luxury-garden-estate\/?/gi, 'luxury-garden-estate.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/urban-office-complex\/?/gi, 'urban-office-complex.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/the-core-center\/?/gi, 'the-core-center.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/workspace-redefined\/?/gi, 'workspace-redefined.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/urban-family-home\/?/gi, 'urban-family-home.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/the-innovation-hub\/?/gi, 'the-innovation-hub.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/bridge-to-progress-2\/?/gi, 'luxury-on-the-lake.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/bridge-to-progress\/?/gi, 'luxury-on-the-lake.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/hub-development\/?/gi, 'hub-development.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio\/smart-energy-office\/?/gi, 'smart-energy-office.html');

  // Relative clone paths for projects if any
  html = html.replace(/\.\.\/urban-family-home\/(?:index-final\.html|index\.html)?/gi, 'urban-family-home.html');

  // Categories & Tags & Grids
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio-grid\/?/gi, 'portfolio.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio-masonry-3\/?/gi, 'portfolio.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio-category\/[^"'\s<>]+/gi, 'portfolio.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/portfolio-tag\/[^"'\s<>]+/gi, 'portfolio.html');

  // Team links
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/team\/[^"'\s<>]+/gi, 'our-team.html');

  // Standard pages
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/about-us\/?/gi, 'about-us.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/our-team\/?/gi, 'our-team.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/services\/?/gi, 'services.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/faqs\/?/gi, 'faqs.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/contacts\/?/gi, 'contacts.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/homepage-2\/?/gi, 'homepage-2.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/home-0?2\/?/gi, 'homepage-2.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/typography\/?/gi, 'typography.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/elements\/?/gi, 'elements.html');
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/404\/?/gi, '404.html');

  // Relative clone paths
  const linkReplacements = [
    [/\.\.\/about-us\/(?:index-final\.html|index\.html)?/g, 'about-us.html'],
    [/\.\.\/our-team\/(?:index-final\.html|index\.html)?/g, 'our-team.html'],
    [/\.\.\/services\/(?:index-final\.html|index\.html)?/g, 'services.html'],
    [/\.\.\/portfolio-masonry-3\/(?:index-final\.html|index\.html)?/g, 'portfolio.html'],
    [/\.\.\/faqs\/(?:index-final\.html|index\.html)?/g, 'faqs.html'],
    [/\.\.\/contacts\/(?:index-final\.html|index\.html)?/g, 'contacts.html'],
    [/\.\.\/404\/(?:index-final\.html|index\.html)?/g, '404.html'],
    [/\.\.\/typography\/(?:index-final\.html|index\.html)?/g, 'typography.html'],
    [/\.\.\/elements\/(?:index-final\.html|index\.html)?/g, 'elements.html'],
    [/\.\.\/avelon-homepage-1\/(?:index-final\.html|index\.html)?/g, 'index.html'],
    [/\.\.\/avelon-homepage-2\/(?:index-final\.html|index\.html)?/g, 'homepage-2.html'],
  ];

  for (const [pattern, target] of linkReplacements) {
    html = html.replace(pattern, target);
  }

  // Base homepage link
  html = html.replace(/https:\/\/wgl-dsites\.net\/avelon\/?(?=["'#\s>])/gi, 'index.html');

  // Ensure header logo links to index.html
  html = html.replace(/(<a\b[^>]*class="[^"]*header_logo[^"]*"[^>]*href=)["']?[^"'\s>]+["']?/gi, '$1"index.html"');

  // Dead demo endpoints / media hrefs
  html = html.replace(/href=["']https:\/\/wgl-dsites\.net\/avelon\/wp-content\/uploads\/[^\s"'>]+["']/gi, 'href="#"');
  html = html.replace(/action=["']https:\/\/wgl-dsites\.net\/avelon\/wp-comments-post\.php["']/gi, 'action="#"');

  return html;
}

// Requirement 5 & 6: Neutralize external theme vendor & promotional links
function removeExternalLinks(html) {
  // Neutralize external social media links
  html = html.replace(/href=["']https?:\/\/(?:www\.)?(?:facebook|twitter|x|instagram|linkedin|pinterest)\.com[^"']*["']/gi, 'href="#"');

  // Neutralize ThemeForest, theme documentation, vendor support links
  html = html.replace(/href=["']https?:\/\/themeforest\.net[^"']*["']/gi, 'href="#"');
  html = html.replace(/href=["']https?:\/\/wgl-dsites\.net\/avelon\/?[^"']*["']/gi, 'href="index.html"');
  html = html.replace(/href=["']https?:\/\/wgl-dsites\.net[^"']*["']/gi, 'href="#"');

  // Clean out dead staging URLs and JSON endpoints
  html = html.replace(/https?:\/\/wgl-dsites\.net\/avelon\/wp-admin\/admin-ajax\.php/gi, '#');
  html = html.replace(/https?:\/\/wgl-dsites\.net\/avelon\/wp-content\/plugins\/[^\s"'<>]+/gi, '#');
  html = html.replace(/https?:\/\/wgl-dsites\.net\/avelon\/wp-content\/uploads\/[^\s"'<>]+/gi, '#');
  html = html.replace(/https?:\/\/wgl-dsites\.net\/avelon\/wp-json\/[^\s"'<>]+/gi, '');
  html = html.replace(/https?:\/\/wgl-dsites\.net\/avelon\/feed\/?/gi, '');
  html = html.replace(/https?:\/\/wgl-dsites\.net\/avelon\/comments\/feed\/?/gi, '');
  html = html.replace(/https?:\/\/wgl-dsites\.net\/avelon\/xmlrpc\.php[^\s"'<>]*/gi, '');
  html = html.replace(/https?:\/\/wgl-dsites\.net\/avelon\/?(?=["'#\s>])/gi, 'index.html');
  html = html.replace(/https?:\/\/wgl-dsites\.net\/avelon\b/gi, 'index.html');
  html = html.replace(/https?:\/\/wgl-dsites\.net\b/gi, '#');

  return html;
}

// Requirement 4: Fix Contacts Map to correspond to Balaji Bhavan, CBD Belapur, Mumbai
function fixContactsMap(html) {
  const mapIdx = html.indexOf('id=contact-map');
  if (mapIdx !== -1) {
    const startWidget = html.lastIndexOf('<div class="elementor-element', mapIdx);
    if (startWidget !== -1) {
      const tagRe = /<\/?div\b[^>]*>/gi;
      tagRe.lastIndex = startWidget;
      let depth = 0;
      let match;
      let endWidget = -1;
      while ((match = tagRe.exec(html)) !== null) {
        if (match[0].startsWith('</')) {
          depth--;
          if (depth === 0) {
            endWidget = match.index + match[0].length;
            break;
          }
        } else {
          depth++;
        }
      }

      if (endWidget !== -1) {
        const cleanMapWidget = `
<div class="elementor-element elementor-element-96edac9 elementor-widget elementor-widget-google_maps" data-id="96edac9" data-element_type="widget" id="contact-map" data-widget_type="google_maps.default">
  <div class="elementor-widget-container">
    <div class="elementor-custom-embed" style="position:relative;width:100%;height:460px;border-radius:8px;overflow:hidden;box-shadow:0 12px 35px rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.1);">
      <iframe loading="lazy" style="border:0;width:100%;height:100%;display:block;" src="https://www.openstreetmap.org/export/embed.html?bbox=73.0330%2C19.0090%2C73.0470%2C19.0190&amp;layer=mapnik&amp;marker=19.01441%2C73.04008" title="A 232, Balaji Bhavan, Plot No. 42A, Sector 11, CBD Belapur, Mumbai - 400614" aria-label="A 232, Balaji Bhavan, Plot No. 42A, Sector 11, CBD Belapur, Mumbai - 400614" allowfullscreen></iframe>
    </div>
  </div>
</div>`;
        html = html.substring(0, startWidget) + cleanMapWidget + html.substring(endWidget);
      }
    }
  }

  const mapStyles = `
<style id="shivansh-contact-map-fix">
  #contact-map,
  .elementor-element-96edac9 {
    display: block !important;
    width: 100% !important;
    margin-top: 35px !important;
  }
  #contact-map iframe {
    height: 460px !important;
    width: 100% !important;
  }
</style>
`;
  if (!html.includes('shivansh-contact-map-fix')) {
    html = html.replace('</head>', `${mapStyles}\n</head>`);
  }

  return html;
}

function enhanceContactsPage(html) {
  html = fixContactsMap(html);

  // Rename website field placeholder to Phone Number / Location
  html = html.replace('placeholder=Website', 'placeholder="Phone Number / Location"');
  html = html.replace('placeholder="Website"', 'placeholder="Phone Number / Location"');
  html = html.replace('placeholder="Your Comment"', 'placeholder="Tell us about your project requirements..."');

  // Add direct WhatsApp and Call buttons below the submit button
  const submitBtnIdx = html.indexOf('GET IN TOUCH');
  if (submitBtnIdx !== -1) {
    const colEndIdx = html.indexOf('</div>', submitBtnIdx);
    if (colEndIdx !== -1) {
      const directButtons = `
<div class="wgl_col-12" style="margin-top: 18px;">
  <div class="shivansh-direct-contact-row">
    <a href="https://wa.me/919082451849?text=Hello%20ShivAnsh%20Builders%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project." target="_blank" rel="noopener" class="shivansh-direct-btn shivansh-direct-btn--whatsapp">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.107.005.25.04.39.375.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.178.181-.077.355.101.174.449.741.963 1.2 0.662.592 1.22.775 1.393.862.174.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.174.232-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/></svg>
      <span>WhatsApp: 9082451849</span>
    </a>
    <a href="tel:+919082451849" class="shivansh-direct-btn shivansh-direct-btn--call">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.046 15.046 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.01A11.36 11.36 0 0 1 8.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z"/></svg>
      <span>Call: 9082451849</span>
    </a>
  </div>
</div>`;
      html = html.substring(0, colEndIdx + 6) + directButtons + html.substring(colEndIdx + 6);
    }
  }

  return html;
}

const FAQ_ANSWERS = [
  'ShivAnsh Builders &amp; Developers provides comprehensive turnkey construction, structural engineering, and development services across Mumbai, Navi Mumbai (including CBD Belapur, Vashi, Kharghar, Panvel, Seawoods, and Ghansoli), Thane, and the surrounding metropolitan region.',
  'Yes, absolutely. ShivAnsh Builders is fully licensed and registered with relevant municipal and state development authorities. We maintain full structural contractor insurance, third-party liability coverage, and strict workman safety compliance across all construction sites.',
  'We prepare transparent, line-item quantity estimations (BOQs) based on detailed architectural blueprints, soil investigation reports, and structural specifications. Our contracts clearly define milestones, material grades (e.g. M40/M50 concrete, Fe550D TMT steel), and fixed timelines without hidden escalations.',
  'Yes. We assist with end-to-end statutory approvals, municipal building permissions, environmental and fire department NOCs, commencement certificates (CC), and final occupancy certificates (OC) with local municipal corporations (NMMC, CIDCO, BMC).',
  'Project duration depends on built-up area and foundation complexity. A luxury private residence typically takes 12 to 16 months, while commercial complexes and multi-level structures require 18 to 24 months. We establish strict milestone schedules and transparent progress tracking.',
  'Simply connect with us via WhatsApp or phone at +91 9082451849. We begin with a direct consultation with Managing Director Yogesh Navle, followed by site inspection, architectural feasibility analysis, and an initial structural consultation.',
  'We maintain an experienced in-house core engineering and project supervision team led by Yogesh Navle. For specialized requirements (such as geothermal HVAC or facade glazing), we partner exclusively with pre-vetted, certified engineering vendors who adhere strictly to our quality control standards.',
  'We utilize only certified, high-grade materials including primary-grade TMT steel (Tata Tiscon / JSW Neosteel Fe550D), tested ready-mix concrete from certified batching plants, premium waterproofing compounds, and standardized MEP systems conforming to IS 456 and NBC specifications.'
];

function enhanceFaqPage(html) {
  // Replace panel 1's generic farming filler text with ShivAnsh construction answer
  html = html.replace(
    '<p>Our advanced seeds, soil care, and farming techniques help farmers produce more — with less. We promote eco-friendly practices that protect soil, water, and biodiversity for long-term success.</p>',
    `<p>${FAQ_ANSWERS[0]}</p>`
  );

  // Populate panels 2 through 8
  const questions = [
    'Are you licensed and insured?',
    'How do you estimate project costs?',
    'Do you handle permits and inspections?',
    'How long does a typical project take?',
    'What’s the first step to get started?',
    'Do you work with subcontractors?',
    'What materials do you use?'
  ];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const ans = FAQ_ANSWERS[i + 1];
    const qIdx = html.indexOf(q);
    if (qIdx !== -1) {
      const patternWithHidden = '<div class="wgl-accordion_content sf-hidden"></div>';
      const patternPlain = '<div class="wgl-accordion_content"></div>';
      let emptyIdx = html.indexOf(patternWithHidden, qIdx);
      let patternLen = patternWithHidden.length;
      if (emptyIdx === -1 || emptyIdx - qIdx > 1500) {
        emptyIdx = html.indexOf(patternPlain, qIdx);
        patternLen = patternPlain.length;
      }
      if (emptyIdx !== -1 && emptyIdx - qIdx < 1500) {
        html = html.substring(0, emptyIdx) + `<div class="wgl-accordion_content" style="display:none;"><p>${ans}</p></div>` + html.substring(emptyIdx + patternLen);
      }
    }
  }

  // Strip sf-hidden from any remaining accordion content elements so panels can expand
  html = html.replaceAll('class="wgl-accordion_content sf-hidden"', 'class="wgl-accordion_content"');
  html = html.replaceAll("class='wgl-accordion_content sf-hidden'", 'class="wgl-accordion_content"');

  // Enhance Pricing Cards on FAQs page with authentic Indian civil construction rates
  html = html.replace(
    /<h4 class=pretitle>Solid Start<\/h4>[\s\S]*?<a href=[^>]*class="wgl-pricing__button[^"]*"[^>]*><div class=button__content><span class=button__text>Choose Plan<\/span><\/div><\/a>/i,
    `<h4 class=pretitle>Core &amp; Shell Structure</h4></div><div class=pricing__header><div class=pricing__price><span class=price__currency>₹</span><span class=price__value>1,850</span><span class=price__period>per sq. ft.<br>built-up</span></div></div><div class=pricing__content><p>Fundamental structural framing for villas, independent floors, and commercial plots.<ul class="avelon_dot list_primary_color"><li>Soil testing, excavation &amp; deep piling<li>High-grade Fe550D TMT reinforcement<li>Ready-mix concrete M30/M40 casting<li>Seismic Zone III certified RCC frame</ul></div><div class=pricing__button><div class=wgl-button-wrapper><a href=contacts.html class="wgl-pricing__button wgl-widget__button wgl-button no_media"><div class=button__content><span class=button__text>Get Estimate</span></div></a>`
  );

  html = html.replace(
    /<h4 class=pretitle>Smart Build<\/h4>[\s\S]*?<a href=[^>]*class="wgl-pricing__button[^"]*"[^>]*><div class=button__content><span class=button__text>Choose Plan<\/span><\/div><\/a>/i,
    `<h4 class=pretitle>Turnkey Semi-Furnished</h4></div><div class=pricing__header><div class=pricing__price><span class=price__currency>₹</span><span class=price__value>2,950</span><span class=price__period>per sq. ft.<br>built-up</span></div></div><div class=pricing__content><p>Complete civil construction, advanced waterproofing, and integrated MEP systems.<ul class="avelon_dot list_primary_color"><li>Detailed architectural &amp; MEP blueprints<li>Multi-layer terrace &amp; wet area waterproofing<li>Concealed copper wiring &amp; CPVC plumbing<li>Dedicated on-site civil supervisor</ul></div><div class=pricing__button><div class=wgl-button-wrapper><a href=contacts.html class="wgl-pricing__button wgl-widget__button wgl-button no_media"><div class=button__content><span class=button__text>Get Estimate</span></div></a>`
  );

  html = html.replace(
    /<h4 class=pretitle>Turnkey Construction<\/h4>[\s\S]*?<a href=[^>]*class="wgl-pricing__button[^"]*"[^>]*><div class=button__content><span class=button__text>Choose Plan<\/span><\/div><\/a>/i,
    `<h4 class=pretitle>Luxury Turnkey EPC</h4></div><div class=pricing__header><div class=pricing__price><span class=price__currency>₹</span><span class=price__value>4,500</span><span class=price__period>per sq. ft.<br>built-up</span></div></div><div class=pricing__content><p>Ultra-luxury turnkey residential estates and bespoke corporate headquarters.<ul class="avelon_dot list_primary_color"><li>Imported Italian marble &amp; wooden flooring<li>Smart IoT climate &amp; lighting automation<li>Premium Kohler/Grohe sanitary fittings<li>Comprehensive 5-year structural warranty</ul></div><div class=pricing__button><div class=wgl-button-wrapper><a href=contacts.html class="wgl-pricing__button wgl-widget__button wgl-button no_media"><div class=button__content><span class=button__text>Get Estimate</span></div></a>`
  );

  return html;
}

function enhancePortfolioPage(html) {
  // 1. Replace "MASONRY 3" with "PROJECTS"
  html = html.replace(/<h1 class=page-header_title[^>]*>MASONRY 3<\/h1>/i, '<h1 class=page-header_title style="color:#ffffff;font-weight:700;--pt-font-size:96px;--pt-line-height:104px;letter-spacing:-0.05em">PROJECTS</h1>');
  html = html.replace(/<h1 class="page-header_title"[^>]*>MASONRY 3<\/h1>/i, '<h1 class="page-header_title" style="color:#ffffff;font-weight:700;--pt-font-size:96px;--pt-line-height:104px;letter-spacing:-0.05em">PROJECTS</h1>');
  html = html.replaceAll('MASONRY 3', 'PROJECTS');
  html = html.replaceAll('Masonry 3', 'Projects');
  html = html.replaceAll('MASONRY%203', 'PROJECTS');
  html = html.replaceAll('masonry%203', 'projects');
  html = html.replaceAll('portfolio-masonry-3', 'projects');

  // 2. Subtitle: Case Studies of Quality and Innovation
  html = html.replace(
    'Case Studies of Quality and Innovation',
    'Landmark Developments &amp; Turnkey Civil Engineering Across Maharashtra'
  );

  return html;
}

function enhanceIndexPage(html) {
  // 1. Update review text inside wgl-testimonials (Image 2) preserving exact Swiper slide markup
  const testWidgetIdx = html.indexOf('data-widget_type=wgl-testimonials.default');
  if (testWidgetIdx !== -1) {
    const swiperStart = html.indexOf('<div class=swiper-wrapper', testWidgetIdx);
    const swiperEnd = html.indexOf('</div><span class="swiper-notification', swiperStart);
    if (swiperStart !== -1 && swiperEnd !== -1) {
      const swiperHtml = html.substring(swiperStart, swiperEnd);

      const r0 = {
        name: 'Dr. Vikram Mehta',
        pos: 'Owner, Luxury Garden Estate Villa',
        quote: '“ShivAnsh Builders delivered our 4,500 sq.ft private luxury villa ahead of schedule. From seismic-resistant raft foundations to Italian marble finishing, their craftsmanship and milestone transparency were extraordinary.”'
      };
      const r1 = {
        name: 'Rajesh Singhania',
        pos: 'Managing Director, Horizon Logistics Park',
        quote: '“Constructing our 65,000 sq.ft commercial corporate facility required heavy structural steel engineering and high-load post-tensioned slabs. Yogesh ji and his team delivered the entire turnkey EPC contract with zero cost overruns.”'
      };
      const r2 = {
        name: 'Ananya Deshmukh',
        pos: 'Resident Owner, Highland Enclave',
        quote: '“The structural durability and architectural elegance of our residential high-rise enclave set a benchmark in Navi Mumbai. Living in a home built with this level of seismic integrity gives our family lasting peace of mind.”'
      };
      const r3 = {
        name: 'Kailash Patil',
        pos: 'Managing Trustee, Apex Infrastructure &amp; Commercial Hub',
        quote: '“Their in-house engineering team handled everything from municipal CIDCO/NMMC sanctions to comprehensive MEP utility execution. ShivAnsh Builders is hands-down our most dependable civil contracting partner.”'
      };

      const slideParts = swiperHtml.split(/(?=<div class="testimonials__wrapper swiper-slide)/g);
      if (slideParts.length >= 7) {
        // Slide 0 (duplicate of slide 3: Luis Vireon)
        slideParts[1] = slideParts[1]
          .replace('<h3 class=author__name>Luis Vireon</h3>', `<h3 class=author__name>${r3.name}</h3>`)
          .replace('<span class=author__position>Company client</span>', `<span class=author__position>${r3.pos}</span>`)
          .replace(/<div class=item__quote><p>[\s\S]*?<\/p><\/div>/, `<div class=item__quote><p>${r3.quote}</p></div>`);

        // Slide 1 (index 0: Christian Grant)
        slideParts[2] = slideParts[2]
          .replace('<h3 class=author__name>Christian Grant</h3>', `<h3 class=author__name>${r0.name}</h3>`)
          .replace('<span class=author__position>Company client</span>', `<span class=author__position>${r0.pos}</span>`)
          .replace(/<div class=item__quote><p>[\s\S]*?<\/p><\/div>/, `<div class=item__quote><p>${r0.quote}</p></div>`);

        // Slide 2 (index 1: Matey Grant)
        slideParts[3] = slideParts[3]
          .replace('<h3 class=author__name>Matey Grant</h3>', `<h3 class=author__name>${r1.name}</h3>`)
          .replace('<span class=author__position>Company client</span>', `<span class=author__position>${r1.pos}</span>`)
          .replace(/<div class=item__quote><p>[\s\S]*?<\/p><\/div>/, `<div class=item__quote><p>${r1.quote}</p></div>`);

        // Slide 3 (index 2: Marry Parton)
        slideParts[4] = slideParts[4]
          .replace('<h3 class=author__name>Marry Parton</h3>', `<h3 class=author__name>${r2.name}</h3>`)
          .replace('<span class=author__position>Company client</span>', `<span class=author__position>${r2.pos}</span>`)
          .replace(/<div class=item__quote><p>[\s\S]*?<\/p><\/div>/, `<div class=item__quote><p>${r2.quote}</p></div>`);

        // Slide 4 (index 3: Luis Vireon)
        slideParts[5] = slideParts[5]
          .replace('<h3 class=author__name>Luis Vireon</h3>', `<h3 class=author__name>${r3.name}</h3>`)
          .replace('<span class=author__position>Company client</span>', `<span class=author__position>${r3.pos}</span>`)
          .replace(/<div class=item__quote><p>[\s\S]*?<\/p><\/div>/, `<div class=item__quote><p>${r3.quote}</p></div>`);

        // Slide 5 (duplicate of slide 0: Christian Grant)
        slideParts[6] = slideParts[6]
          .replace('<h3 class=author__name>Christian Grant</h3>', `<h3 class=author__name>${r0.name}</h3>`)
          .replace('<span class=author__position>Company client</span>', `<span class=author__position>${r0.pos}</span>`)
          .replace(/<div class=item__quote><p>[\s\S]*?<\/p><\/div>/, `<div class=item__quote><p>${r0.quote}</p></div>`);

        const updatedSwiperHtml = slideParts.join('');
        html = html.substring(0, swiperStart) + updatedSwiperHtml + html.substring(swiperEnd);
      }
    }
  }

  // 3. Enhance copy on section headings
  html = html.replace(
    'we build more than structures — we build trust, innovation, and enduring value',
    'We construct landmark residential enclaves, commercial high-rises, and industrial infrastructure with generational durability'
  );

  return html;
}

function enhanceHomepage2Page(html) {
  // Polish project descriptions under case studies
  html = html.replace(
    'Urban Office ComplexHigh-performance facilities built to meet the unique needs of manufacturing, logistics, and energy sectors.',
    'Urban Office ComplexA 12-storey state-of-the-art commercial high-rise engineered for corporate headquarters, featuring parametric glass facade architecture in Belapur.'
  );
  html = html.replace(
    'The Core CenterHigh-performance facilities built to meet the unique needs of manufacturing, logistics, and energy sectors.',
    'The Core CenterA premier commercial enterprise hub engineered with column-free floor plates and high-speed transit connectivity in Navi Mumbai.'
  );
  html = html.replace(
    'VISSION',
    'VISION'
  );

  return html;
}

function enhanceOurTeamPage(html) {
  // Founder Name on quote: Yogesh Navle
  html = html.replace(/Christian Grant/g, 'Yogesh Navle');

  // Update team titles to authentic civil engineering & development leadership roles
  html = html.replace('General manager', 'General Manager (Operations &amp; Planning)');
  html = html.replace('Construction director', 'Project Director &amp; Chief Civil Engineer');
  html = html.replace('Architect', 'Principal Architectural Designer');
  html = html.replace('Lead engineer', 'Head of Structural Quality &amp; Safety');

  return html;
}


// Requirement 2: Dedicated Local Page Generator for every Portfolio Project
function generateProjectDetailPage(baseHtml, project) {
  let html = baseHtml;

  // 1. Clean toolbar and advertising bloat
  html = cleanToolbarAndThemeBloat(html);

  // 2. Remove cart and search completely
  html = removeCartAndSearch(html);

  // 3. Update navigation menus (Portfolio direct link with NO dropdown)
  html = updateNavbars(html, 'portfolio');

  // 4. Rewrite internal navigation and external demo links
  html = rewriteInternalLinks(html);
  html = removeExternalLinks(html);

  // 5. Apply ShivAnsh branding, visiting card contact details, enhanced logo, mobile bar, and footer fix
  html = applyShivAnshBranding(html, `${project.title} – ShivAnsh Builders and Developers`, 'portfolio');

  // 6. Project-Specific Title and Breadcrumb
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${project.title} – ShivAnsh Builders and Developers</title>`);
  html = html.replace(/<span class=current>[\s\S]*?<\/span>/gi, `<span class="current">${project.title}</span>`);
  html = html.replace(/<span class="current">[\s\S]*?<\/span>/gi, `<span class="current">${project.title}</span>`);
  html = html.replace(/<h1 class=item__title>[\s\S]*?<\/h1>/gi, `<h1 class="item__title">${project.title}</h1>`);
  html = html.replace(/<h1 class="item__title">[\s\S]*?<\/h1>/gi, `<h1 class="item__title">${project.title}</h1>`);

  // 7. Hero Image
  const heroIdx = html.indexOf('item__image item__image-wide');
  if (heroIdx !== -1 && project.imgSrc) {
    const srcStart = html.indexOf('src="', heroIdx);
    if (srcStart !== -1) {
      const srcEnd = html.indexOf('"', srcStart + 5);
      html = html.substring(0, srcStart + 5) + project.imgSrc + html.substring(srcEnd);
    }
  }

  // 8. Project Metadata (Category, Date, Services, Team)
  html = html.replace(/<p>Residential,\s*building<\/p>/gi, `<p>${project.category}</p>`);
  html = html.replace(/November 22, 2025/g, project.date);
  html = html.replace(/<p>Construction,\s*design<\/p>/gi, `<p>${project.services}</p>`);
  html = html.replace(/<p>Harry Olson<\/p>/gi, `<p>${project.team}</p>`);
  html = html.replace(/<p>Avelon Team<\/p>/gi, `<p>${project.team}</p>`);
  html = html.replace(/<p>ShivAnsh Team<\/p>/gi, `<p>${project.team}</p>`);

  // 9. Completely Excise WordPress Comments Container
  const commentsIdx = html.indexOf('id=comments');
  if (commentsIdx !== -1) {
    const containerStart = html.lastIndexOf('<div class=wgl-container>', commentsIdx);
    if (containerStart !== -1) {
      const tagRe = /<\/?div\b[^>]*>/gi;
      tagRe.lastIndex = containerStart;
      let depth = 0;
      let match;
      let containerEnd = -1;
      while ((match = tagRe.exec(html)) !== null) {
        if (match[0].startsWith('</')) {
          depth--;
          if (depth === 0) {
            containerEnd = match.index + match[0].length;
            break;
          }
        } else {
          depth++;
        }
      }
      if (containerEnd !== -1) {
        html = html.substring(0, containerStart) + html.substring(containerEnd);
      }
    }
  }

  // 10. Replace Section 1 (Technical Specifications & Project Scope)
  html = html.replace(
    'Attention to Detail Defines Excellence',
    'PROJECT SPECIFICATIONS &amp; TECHNICAL SCOPE'
  );

  const text1Pattern = /<div class="elementor-element elementor-element-f978b54[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
  const newSection1Content = `
<div class="elementor-element elementor-element-f978b54 elementor-widget elementor-widget-text-editor" data-id="f978b54" data-element_type="widget" data-widget_type="text-editor.default">
  <p>${project.overview1}</p>
  <div class="shivansh-specs-grid">
    <div class="shivansh-spec-card">
      <span class="spec-label">Project Location</span>
      <span class="spec-val">${project.specLocation}</span>
    </div>
    <div class="shivansh-spec-card">
      <span class="spec-label">Total Built-Up Area</span>
      <span class="spec-val">${project.specArea}</span>
    </div>
    <div class="shivansh-spec-card">
      <span class="spec-label">Structural Foundation</span>
      <span class="spec-val">${project.specFoundation}</span>
    </div>
    <div class="shivansh-spec-card">
      <span class="spec-label">Project Timeline</span>
      <span class="spec-val">${project.specTimeline}</span>
    </div>
    <div class="shivansh-spec-card">
      <span class="spec-label">Quality &amp; Seismic Code</span>
      <span class="spec-val">${project.specQuality}</span>
    </div>
    <div class="shivansh-spec-card">
      <span class="spec-label">Delivery Model</span>
      <span class="spec-val">${project.specExecution}</span>
    </div>
  </div>
</div>
</div>
</div>`;
  html = html.replace(text1Pattern, newSection1Content);

  // 11. Replace Section 2 (Engineering Execution & Direct Inquiry CTA)
  html = html.replace(
    'Innovation Keeps the Industry Moving Forward',
    'ENGINEERING EXECUTION &amp; DIRECT CONSULTATION'
  );

  const sec2ContainerPattern = /<div class="elementor-element elementor-element-7fbbb02[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i;
  const newSection2Content = `
<div class="elementor-element elementor-element-7fbbb02 e-con-full e-flex e-con e-child" data-id="7fbbb02" data-element_type="container">
  <div class="elementor-element elementor-element-4046e25 elementor-widget elementor-widget-text-editor" data-id="4046e25" data-element_type="widget" data-widget_type="text-editor.default">
    <p>${project.overview2}</p>
    <p style="margin-top: 24px; margin-bottom: 8px; color: rgba(255,255,255,0.9); font-size: 15px; line-height: 1.6; font-weight: 500;">
      Planning a residential or commercial development? Discuss architectural blueprints, structural feasibility, and quantity estimations directly with Managing Director <strong>Yogesh Navle</strong>.
    </p>
  </div>
  <div class="elementor-element shivansh-project-actions" style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 14px; position: relative; z-index: 20; pointer-events: auto;">
    <div class="elementor-widget-container">
      <a class="wgl-button wgl-widget__button align-icon-right" href="https://wa.me/919082451849?text=${encodeURIComponent(`Hello Yogesh ji, I am inquiring about a project similar to "${project.title}". Please let me know when we can discuss.`)}" target="_blank" rel="noopener" role="button" style="display: inline-flex; align-items: center; pointer-events: auto !important; position: relative !important; z-index: 20 !important; cursor: pointer !important;">
        <div class="button__content">
          <span class="media-wrapper icon-wrapper">
            <span class="wgl-icon"><span class="icon elementor-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14"><path d="M0 6.78247C0 6.52555 0.102065 6.27914 0.283741 6.09746C0.465416 5.91579 0.711822 5.81372 0.96875 5.81372H12.1927L8.03288 1.65585C7.85097 1.47394 7.74878 1.22723 7.74878 0.969974C7.74878 0.712721 7.85097 0.466004 8.03288 0.284099C8.21478 0.102194 8.4615 0 8.71875 0C8.976 0 9.22272 0.102194 9.40463 0.284099L15.2171 6.0966C15.3073 6.18659 15.3789 6.29349 15.4278 6.41118C15.4766 6.52888 15.5017 6.65505 15.5017 6.78247C15.5017 6.9099 15.4766 7.03607 15.4278 7.15376C15.3789 7.27146 15.3073 7.37836 15.2171 7.46835L9.40463 13.2808C9.22272 13.4628 8.976 13.5649 8.71875 13.5649C8.4615 13.5649 8.21478 13.4628 8.03288 13.2808C7.85097 13.0989 7.74878 12.8522 7.74878 12.595C7.74878 12.3377 7.85097 12.091 8.03288 11.9091L12.1927 7.75122H0.96875C0.711822 7.75122 0.465416 7.64916 0.283741 7.46748C0.102065 7.28581 0 7.0394 0 6.78247Z"></path></svg>
            </span></span>
          </span>
          <span class="button__text">WHATSAPP INQUIRY</span>
        </div>
      </a>
    </div>
    <div class="elementor-widget-container">
      <a class="wgl-button wgl-widget__button align-icon-right" href="tel:+919082451849" role="button" style="display: inline-flex; align-items: center; pointer-events: auto !important; position: relative !important; z-index: 20 !important; cursor: pointer !important;">
        <div class="button__content">
          <span class="media-wrapper icon-wrapper">
            <span class="wgl-icon"><span class="icon elementor-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14"><path d="M0 6.78247C0 6.52555 0.102065 6.27914 0.283741 6.09746C0.465416 5.91579 0.711822 5.81372 0.96875 5.81372H12.1927L8.03288 1.65585C7.85097 1.47394 7.74878 1.22723 7.74878 0.969974C7.74878 0.712721 7.85097 0.466004 8.03288 0.284099C8.21478 0.102194 8.4615 0 8.71875 0C8.976 0 9.22272 0.102194 9.40463 0.284099L15.2171 6.0966C15.3073 6.18659 15.3789 6.29349 15.4278 6.41118C15.4766 6.52888 15.5017 6.65505 15.5017 6.78247C15.5017 6.9099 15.4766 7.03607 15.4278 7.15376C15.3789 7.27146 15.3073 7.37836 15.2171 7.46835L9.40463 13.2808C9.22272 13.4628 8.976 13.5649 8.71875 13.5649C8.4615 13.5649 8.21478 13.4628 8.03288 13.2808C7.85097 13.0989 7.74878 12.8522 7.74878 12.595C7.74878 12.3377 7.85097 12.091 8.03288 11.9091L12.1927 7.75122H0.96875C0.711822 7.75122 0.465416 7.64916 0.283741 7.46748C0.102065 7.28581 0 7.0394 0 6.78247Z"></path></svg>
            </span></span>
          </span>
          <span class="button__text">CALL +91 9082451849</span>
        </div>
      </a>
    </div>
  </div>
</div>
</div>
</div>
</div>
</div>`;
  html = html.replace(sec2ContainerPattern, newSection2Content);

  // 12. Post Navigation (Cleanly replace existing post navigation without unclosed tags)
  const navRegex = /<section\b[^>]*\bclass=["']?avelon-post-navigation["']?[\s\S]*?<\/section>/i;
  const newNav = `<section class="avelon-post-navigation">
<div class="prev-link_wrapper"><div class="info_wrapper"><a href="${project.prevFile}" title="${project.prevTitle}"><div class="prev-link-info_wrapper"><div class="prev_title-info_wrap"><i class="link-icon wgl-svg-icon"><svg width="1em" height="1em" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M0 6.78247C0 6.52555 0.102065 6.27914 0.283741 6.09746C0.465416 5.91579 0.711822 5.81372 0.96875 5.81372H12.1927L8.03288 1.65585C7.85097 1.47394 7.74878 1.22723 7.74878 0.969974C7.74878 0.712721 7.85097 0.466004 8.03288 0.284099C8.21478 0.102194 8.4615 0 8.71875 0C8.976 0 9.22272 0.102194 9.40463 0.284099L15.2171 6.0966C15.3073 6.18659 15.3789 6.29349 15.4278 6.41118C15.4766 6.52888 15.5017 6.65505 15.5017 6.78247C15.5017 6.9099 15.4766 7.03607 15.4278 7.15376C15.3789 7.27146 15.3073 7.37836 15.2171 7.46835L9.40463 13.2808C9.22272 13.4628 8.976 13.5649 8.71875 13.5649C8.4615 13.5649 8.21478 13.4628 8.03288 13.2808C7.85097 13.0989 7.74878 12.8522 7.74878 12.595C7.74878 12.3377 7.85097 12.091 8.03288 11.9091L12.1927 7.75122H0.96875C0.711822 7.75122 0.465416 7.64916 0.283741 7.46748C0.102065 7.28581 0 7.0394 0 6.78247Z"></path></svg></i><div class="prev_title-info">PREV</div></div><h4 class="prev_title">${project.prevTitle}</h4></div></a></div></div>
<div class="next-link_wrapper"><div class="info_wrapper"><a href="${project.nextFile}" title="${project.nextTitle}"><div class="next-link-info_wrapper"><div class="next_title-info_wrap"><div class="next_title-info">NEXT</div><i class="link-icon wgl-svg-icon"><svg width="1em" height="1em" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M0 6.78247C0 6.52555 0.102065 6.27914 0.283741 6.09746C0.465416 5.91579 0.711822 5.81372 0.96875 5.81372H12.1927L8.03288 1.65585C7.85097 1.47394 7.74878 1.22723 7.74878 0.969974C7.74878 0.712721 7.85097 0.466004 8.03288 0.284099C8.21478 0.102194 8.4615 0 8.71875 0C8.976 0 9.22272 0.102194 9.40463 0.284099L15.2171 6.0966C15.3073 6.18659 15.3789 6.29349 15.4278 6.41118C15.4766 6.52888 15.5017 6.65505 15.5017 6.78247C15.5017 6.9099 15.4766 7.03607 15.4278 7.15376C15.3789 7.27146 15.3073 7.37836 15.2171 7.46835L9.40463 13.2808C9.22272 13.4628 8.976 13.5649 8.71875 13.5649C8.4615 13.5649 8.21478 13.4628 8.03288 13.2808C7.85097 13.0989 7.74878 12.8522 7.74878 12.595C7.74878 12.3377 7.85097 12.091 8.03288 11.9091L12.1927 7.75122H0.96875C0.711822 7.75122 0.465416 7.64916 0.283741 7.46748C0.102065 7.28581 0 7.0394 0 6.78247Z"></path></svg></i></div><h4 class="next_title">${project.nextTitle}</h4></div></a></div></div>
</section>`;
  html = html.replace(navRegex, newNav);

  return html;
}

function enhanceAboutUsPage(html) {
  const targetImgStr = 'class="attachment-full size-full wp-image-1799" alt srcset="data:image/webp;base64,';
  if (html.includes(targetImgStr)) {
    const dataStart = html.indexOf(targetImgStr) + targetImgStr.length;
    const dataEnd = html.indexOf('"', dataStart);
    const base64Data = html.substring(dataStart, dataEnd);
    
    html = html.replace(
      targetImgStr,
      `class="attachment-full size-full wp-image-1799" alt="ShivAnsh Construction Partner" src="data:image/webp;base64,${base64Data}" srcset="data:image/webp;base64,`
    );
  }

  const aboutStyles = `
<style id="shivansh-about-banner-fix">
  .elementor-element-f1d736f,
  .elementor-element-8063f6e,
  .elementor-element-97fbcbc {
    opacity: 1 !important;
    visibility: visible !important;
    animation: none !important;
  }
  .elementor-element-f1d736f .wgl-webgl-plane_wrapper {
    display: block !important;
    width: 100% !important;
    max-width: 1170px !important;
    margin: 30px auto 0 !important;
  }
  .elementor-element-f1d736f .wgl-webgl-plane_wrapper img {
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
    width: 100% !important;
    height: auto !important;
    max-height: 480px !important;
    object-fit: cover !important;
    border-radius: 8px !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
  }
  .elementor-element-f1d736f .wgl-webgl-plane_wrapper canvas {
    display: none !important;
  }
</style>
`;
  if (!html.includes('shivansh-about-banner-fix')) {
    html = html.replace('</head>', `${aboutStyles}\n</head>`);
  }
  // Mission and Company Copywriting
  html = html.replace(
    'We driven by a simple mission — to create spaces that inspire progress.',
    'ShivAnsh Builders &amp; Developers is driven by a singular mission — to construct enduring spaces that inspire progress, foster thriving communities, and stand as benchmarks of structural excellence.'
  );

  // Update leadership roles on About Us page
  html = html.replace('General manager', 'General Manager (Operations &amp; Planning)');
  html = html.replace('Construction director', 'Project Director &amp; Chief Civil Engineer');

  return html;
}

function enhanceServicesPage(html) {
  // Fix mismatched service descriptions
  html = html.replace(
    'Comprehensive management and execution of construction projects from start to finish.',
    'Comprehensive management and turnkey execution of civil construction projects from groundbreaking to occupancy with strict quality control.'
  );
  html = html.replace(
    'An integrated approach that combines architectural design, engineering, and construction under one roof.',
    'Integrated architectural blueprints, structural engineering calculations, 3D BIM modeling, and statutory municipal sanctioning.'
  );
  html = html.replace(
    'Professional planning, scheduling, budgeting, and oversight to keep every project on track.',
    'Full-scale structural retrofitting, building expansion, structural rehabilitation, and architectural modernization.'
  );
  html = html.replace(
    'From modern homes to apartment complexes, we bring residential visions to life with precision.',
    'Heavy foundation engineering, post-tensioned transfer slabs, weather-proof roofing, and industrial grade civil flooring.'
  );

  // 1. Fix Tab Header Typo: VISSION -> VISION
  html = html.replace('<span class=wgl-tabs_title>VISSION</span>', '<span class=wgl-tabs_title>VISION</span>');
  html = html.replace('<span class="wgl-tabs_title">VISSION</span>', '<span class="wgl-tabs_title">VISION</span>');

  // 2. Populate Tab 2 (PHILOSOPHY), Tab 3 (BENEFITS), and Tab 4 (VISION)
  function generateTabInner(heading, paragraph, bullet1, bullet2, btnText, btnLink) {
    return `
<div class="elementor-element elementor-element-8646654 e-flex e-con-boxed e-con e-parent e-lazyloaded" data-id="8646654" data-element_type="container">
<div class="e-con-inner">
<div class="elementor-element elementor-element-61d0339 elementor-widget__width-initial elementor-widget elementor-widget-heading" data-id="61d0339" data-element_type="widget" data-widget_type="heading.default">
<h5 class="elementor-heading-title elementor-size-default">${heading}</h5> </div>
<div class="elementor-element elementor-element-497dfb5 elementor-widget elementor-widget-spacer" data-id="497dfb5" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-spacer"><div class="elementor-spacer-inner"></div></div>
</div>
<div class="elementor-element elementor-element-d6ca41f elementor-widget__width-initial elementor-widget elementor-widget-text-editor" data-id="d6ca41f" data-element_type="widget" data-widget_type="text-editor.default">
<p>${paragraph}</p> </div>
<div class="elementor-element elementor-element-5f5a2d8 elementor-widget elementor-widget-spacer" data-id="5f5a2d8" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-spacer"><div class="elementor-spacer-inner"></div></div>
</div>
<div class="elementor-element elementor-element-81d6401 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="81d6401" data-element_type="widget" data-widget_type="icon-list.default">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14"><path d="M0 6.78247C0 6.52555 0.102065 6.27914 0.283741 6.09746C0.465416 5.91579 0.711822 5.81372 0.96875 5.81372H12.1927L8.03288 1.65585C7.85097 1.47394 7.74878 1.22723 7.74878 0.969974C7.74878 0.712721 7.85097 0.466004 8.03288 0.284099C8.21478 0.102194 8.4615 0 8.71875 0C8.976 0 9.22272 0.102194 9.40463 0.284099L15.2171 6.0966C15.3073 6.18659 15.3789 6.29349 15.4278 6.41118C15.4766 6.52888 15.5017 6.65505 15.5017 6.78247C15.5017 6.9099 15.4766 7.03607 15.4278 7.15376C15.3789 7.27146 15.3073 7.37836 15.2171 7.46835L9.40463 13.2808C9.22272 13.4628 8.976 13.5649 8.71875 13.5649C8.4615 13.5649 8.21478 13.4628 8.03288 13.2808C7.85097 13.0989 7.74878 12.8522 7.74878 12.595C7.74878 12.3377 7.85097 12.091 8.03288 11.9091L12.1927 7.75122H0.96875C0.711822 7.75122 0.465416 7.64916 0.283741 7.46748C0.102065 7.28581 0 7.0394 0 6.78247Z"></path></svg> </span>
<span class="elementor-icon-list-text">${bullet1}</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14"><path d="M0 6.78247C0 6.52555 0.102065 6.27914 0.283741 6.09746C0.465416 5.91579 0.711822 5.81372 0.96875 5.81372H12.1927L8.03288 1.65585C7.85097 1.47394 7.74878 1.22723 7.74878 0.969974C7.74878 0.712721 7.85097 0.466004 8.03288 0.284099C8.21478 0.102194 8.4615 0 8.71875 0C8.976 0 9.22272 0.102194 9.40463 0.284099L15.2171 6.0966C15.3073 6.18659 15.3789 6.29349 15.4278 6.41118C15.4766 6.52888 15.5017 6.65505 15.5017 6.78247C15.5017 6.9099 15.4766 7.03607 15.4278 7.15376C15.3789 7.27146 15.3073 7.37836 15.2171 7.46835L9.40463 13.2808C9.22272 13.4628 8.976 13.5649 8.71875 13.5649C8.4615 13.5649 8.21478 13.4628 8.03288 13.2808C7.85097 13.0989 7.74878 12.8522 7.74878 12.595C7.74878 12.3377 7.85097 12.091 8.03288 11.9091L12.1927 7.75122H0.96875C0.711822 7.75122 0.465416 7.64916 0.283741 7.46748C0.102065 7.28581 0 7.0394 0 6.78247Z"></path></svg> </span>
<span class="elementor-icon-list-text">${bullet2}</span>
</li>
</ul>
</div>
<div class="elementor-element elementor-element-5c040a7 elementor-widget elementor-widget-spacer" data-id="5c040a7" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-spacer"><div class="elementor-spacer-inner"></div></div>
</div>
<div class="elementor-element elementor-element-0d7bffb has-separated aleft elementor-widget-icon-box wgl-icon-box elementor-widget elementor-widget-wgl-button" data-id="0d7bffb" data-element_type="widget" data-widget_type="wgl-button.default">
<div class="elementor-widget-container">
<a class="wgl-button wgl-widget__button align-icon-right" href="${btnLink}" role="button"><div class="button__content"><span class="media-wrapper icon-wrapper"><span class="wgl-icon"><span class="icon elementor-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14"><path d="M0 6.78247C0 6.52555 0.102065 6.27914 0.283741 6.09746C0.465416 5.91579 0.711822 5.81372 0.96875 5.81372H12.1927L8.03288 1.65585C7.85097 1.47394 7.74878 1.22723 7.74878 0.969974C7.74878 0.712721 7.85097 0.466004 8.03288 0.284099C8.21478 0.102194 8.4615 0 8.71875 0C8.976 0 9.22272 0.102194 9.40463 0.284099L15.2171 6.0966C15.3073 6.18659 15.3789 6.29349 15.4278 6.41118C15.4766 6.52888 15.5017 6.65505 15.5017 6.78247C15.5017 6.9099 15.4766 7.03607 15.4278 7.15376C15.3789 7.27146 15.3073 7.37836 15.2171 7.46835L9.40463 13.2808C9.22272 13.4628 8.976 13.5649 8.71875 13.5649C8.4615 13.5649 8.21478 13.4628 8.03288 13.2808C7.85097 13.0989 7.74878 12.8522 7.74878 12.595C7.74878 12.3377 7.85097 12.091 8.03288 11.9091L12.1927 7.75122H0.96875C0.711822 7.75122 0.465416 7.64916 0.283741 7.46748C0.102065 7.28581 0 7.0394 0 6.78247Z"></path></svg></span></span></span><span class="button__text">${btnText}</span></div></a> </div>
</div>
</div>
</div>
`;
  }

  const tab2Content = generateTabInner(
    'Integrity, Quality &amp; Precision Engineering',
    'Our core philosophy centers on transparency, structural perfection, and uncompromising craftsmanship. We believe that true construction excellence is achieved through rigorous engineering standards and an unwavering commitment to our clients.',
    'Sustainable &amp; Future-Proof Construction Practices',
    'Transparent Communication &amp; Detailed Milestone Tracking',
    'read more',
    'about-us.html'
  );

  html = html.replace(
    /<div\s+data-tab-id=["']?wgl-tab_7382["']?\s+class=["']?wgl-tabs_content["']?[^>]*>[\s\S]*?<\/div>/i,
    `<div data-tab-id="wgl-tab_7382" class="wgl-tabs_content" style="display:none">\n${tab2Content}\n</div>`
  );

  const tab3Content = generateTabInner(
    'End-to-End Value &amp; Guaranteed Assurance',
    'Partnering with ShivAnsh Builders guarantees on-time completion, strict budget compliance, and structural longevity. Our in-house engineering and project control systems eliminate costly delays and safeguard your capital investment.',
    'On-Time Handover &amp; Guaranteed Budget Adherence',
    'Certified Premium Materials &amp; Advanced Quality Audits',
    'read more',
    'about-us.html'
  );

  html = html.replace(
    /<div\s+data-tab-id=["']?wgl-tab_7383["']?\s+class=["']?wgl-tabs_content["']?[^>]*>[\s\S]*?<\/div>/i,
    `<div data-tab-id="wgl-tab_7383" class="wgl-tabs_content" style="display:none">\n${tab3Content}\n</div>`
  );

  const tab4Content = generateTabInner(
    'Redefining Modern Skylines &amp; Urban Living',
    'Our vision is to stand at the forefront of contemporary construction, creating resilient residential communities and landmark commercial developments that foster sustainable progress and enhance urban living across Mumbai and Navi Mumbai.',
    'Architectural Landmark Development &amp; Urban Transformation',
    'Pioneering Smart, Safe &amp; Energy-Efficient Infrastructure',
    'read more',
    'about-us.html'
  );

  html = html.replace(
    /<div\s+data-tab-id=["']?wgl-tab_7384["']?\s+class=["']?wgl-tabs_content["']?[^>]*>[\s\S]*?<\/div>/i,
    `<div data-tab-id="wgl-tab_7384" class="wgl-tabs_content" style="display:none">\n${tab4Content}\n</div>`
  );

  // Replace dead Revolution Slider with <FlexCarousel /> from React Bits
  const revSliderStart = html.indexOf('<div class=wp-block-themepunch-revslider>');
  const revSliderEnd = html.indexOf('</div>', html.indexOf('</sr7-module>')) + 6;

  if (revSliderStart !== -1 && revSliderEnd !== -1) {
    const flexCarouselMarkup = `
<div class="shivansh-flex-carousel-section" id="shivanshFlexCarouselSection">
  <div class="shivansh-carousel-header">
    <span class="shivansh-carousel-badge">FEATURED CAPABILITIES &amp; PROJECTS</span>
    <h2 class="shivansh-carousel-title">SIGNATURE DEVELOPMENTS</h2>
    <p class="shivansh-carousel-desc">Drag or scroll through ShivAnsh Builders &amp; Developers' premier residential enclaves, commercial high-rises, and turnkey infrastructure projects.</p>
  </div>
  <div id="shivanshFlexCarousel" style="width: 100%; height: 580px; position: relative;"></div>
</div>
`;
    html = html.substring(0, revSliderStart) + flexCarouselMarkup + html.substring(revSliderEnd);
  }

  const servicesEnhancements = `
<style id="shivansh-services-fix-styles">
  .wgl-tabs_content-wrap {
    height: auto !important;
    min-height: 380px !important;
    transition: min-height 0.3s ease;
  }
  .wgl-tabs_content {
    animation: sscFadeUp 0.4s ease forwards;
  }
  .wgl-tabs_headings .wgl-tabs_header {
    cursor: pointer !important;
  }
  .wgl-tabs_headings .wgl-tabs_header:hover .wgl-tabs_title {
    color: #FB651B !important;
  }
  .wgl-tabs_headings .wgl-tabs_header.active .wgl-tabs_title {
    color: #FB651B !important;
  }

  .wgl-tabs_content .elementor-heading-title {
    font-size: 30px !important;
    text-transform: uppercase !important;
    line-height: 1.4em !important;
    color: #FFFFFF !important;
    font-family: inherit !important;
    font-weight: 700 !important;
  }
  .wgl-tabs_content .elementor-widget-text-editor {
    color: #FFFFFF !important;
    max-width: 570px !important;
  }
  .wgl-tabs_content .elementor-widget-text-editor p {
    color: rgba(255, 255, 255, 0.85) !important;
    font-size: 15px !important;
    line-height: 1.7em !important;
    margin-block-end: 0px !important;
  }
  .wgl-tabs_content .elementor-icon-list-item > .elementor-icon-list-text {
    font-size: 20px !important;
    line-height: 1.75em !important;
    color: #FFFFFF !important;
  }
  .wgl-tabs_content .elementor-icon-list-icon svg {
    fill: #FB651B !important;
  }
  .wgl-tabs_content .wgl-widget__button {
    justify-content: center !important;
    text-align: center !important;
    text-transform: uppercase !important;
    padding: 17px 35px 17px 35px !important;
    border: 1px solid #FFFFFF !important;
    background-color: transparent !important;
    color: #FFFFFF !important;
    display: inline-flex !important;
    align-items: center !important;
    transition: all 0.3s ease !important;
  }
  .wgl-tabs_content .wgl-widget__button .wgl-icon {
    border: 1px solid #FFFFFF !important;
    background-color: transparent !important;
    color: #FFFFFF !important;
    fill: #FFFFFF !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 60px !important;
    height: 60px !important;
    transition: all 0.3s ease !important;
  }
  .wgl-tabs_content .wgl-widget__button .button__text {
    color: #FFFFFF !important;
    font-weight: 700 !important;
    font-size: 13.5px !important;
    letter-spacing: 1px !important;
    text-transform: uppercase !important;
    margin-right: 15px !important;
  }
  .wgl-tabs_content .wgl-widget__button:is(:hover, :focus) {
    background-color: #FB651B !important;
    border-color: #FB651B !important;
  }
  .wgl-tabs_content .wgl-widget__button:is(:hover, :focus) .wgl-icon {
    background-color: #FB651B !important;
    border-color: #FB651B !important;
  }

  /* FlexCarousel Section & Header Styling */
  .shivansh-flex-carousel-section {
    position: relative;
    width: 100%;
    background: #0d151f;
    border-radius: 6px;
    margin: 48px 0 24px 0;
    padding: 48px 0 36px 0;
    overflow: hidden;
    box-shadow: 0 20px 45px rgba(0,0,0,0.35);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .shivansh-carousel-header {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 24px auto;
    padding: 0 20px;
    z-index: 5;
    position: relative;
  }
  .shivansh-carousel-badge {
    display: inline-block;
    color: #FB651B;
    font-size: 12.5px;
    font-weight: 800;
    letter-spacing: 2.2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .shivansh-carousel-title {
    font-size: 38px;
    font-weight: 800;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin: 0 0 12px 0;
  }
  .shivansh-carousel-desc {
    font-size: 15.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.75);
    margin: 0 auto;
  }
  @media (max-width: 767px) {
    .shivansh-flex-carousel-section {
      padding: 32px 0 20px 0;
    }
    .shivansh-carousel-title {
      font-size: 26px;
    }
    #shivanshFlexCarousel {
      height: 440px !important;
    }
  }

  /* FlexCarousel CSS from React Bits */
  .flex-carousel {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: grab;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    overscroll-behavior: contain;
    outline: none;
  }
  .flex-carousel[data-hover='open'] { cursor: zoom-in; }
  .flex-carousel[data-hover='close'] { cursor: zoom-out; }
  .flex-carousel[data-dragging] { cursor: grabbing; }
  .flex-carousel:focus-visible { box-shadow: inset 0 0 0 2px rgba(128, 128, 140, 0.55); }
  .flex-carousel__caption {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(50% + var(--flex-carousel-half) * var(--flex-carousel-lift, 1) + 22px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 0 16px;
    pointer-events: none;
    text-align: center;
    animation: flex-carousel-reveal 900ms ease both;
  }
  .flex-carousel__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.35;
    animation: flex-carousel-title 520ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .flex-carousel__subtitle { font-weight: 400; opacity: 0.7; color: #FB651B; font-size: 13px; margin-top: 2px; }
  .flex-carousel__count {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 12px;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    opacity: 0.6;
    color: #ffffff;
    transition: opacity 400ms ease;
  }
  .flex-carousel__count[data-hidden] { opacity: 0; }
  .flex-carousel__digits { display: inline-flex; }
  .flex-carousel__digit { display: inline-block; height: 1em; overflow: hidden; }
  .flex-carousel__reel { display: flex; flex-direction: column; transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1); }
  .flex-carousel__reel span { height: 1em; }
  .flex-carousel__slash { opacity: 0.6; }
  .flex-carousel__live { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
  @keyframes flex-carousel-title { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes flex-carousel-reveal { from { opacity: 0; } to { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) {
    .flex-carousel__caption, .flex-carousel__title { animation: none; }
    .flex-carousel__reel { transition: none; }
  }
</style>

<script id="shivansh-services-interactive-js">
  document.addEventListener('DOMContentLoaded', function() {
    const tabHeaders = document.querySelectorAll('.wgl-tabs_headings .wgl-tabs_header:not(.divider)');
    const tabContents = document.querySelectorAll('.wgl-tabs_content-wrap .wgl-tabs_content');
    const lavaLamp = document.querySelector('.wgl-tabs_headings .lavalamp-object');

    function updateLavalamp(activeEl) {
      if (!lavaLamp || !activeEl) return;
      const parent = activeEl.parentElement;
      const pRect = parent.getBoundingClientRect();
      const aRect = activeEl.getBoundingClientRect();
      const left = aRect.left - pRect.left;
      const width = aRect.width;
      lavaLamp.style.transform = 'translate(' + left + 'px)';
      lavaLamp.style.width = width + 'px';
      lavaLamp.style.opacity = '1';
    }

    tabHeaders.forEach(header => {
      header.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab-id');
        
        tabHeaders.forEach(h => {
          h.classList.remove('active', 'slide-active', 'active-lavalamp-menu-item');
        });
        this.classList.add('active', 'slide-active', 'active-lavalamp-menu-item');
        
        tabContents.forEach(c => {
          if (c.getAttribute('data-tab-id') === tabId) {
            c.classList.add('active');
            c.style.display = 'block';
            c.style.opacity = '1';
          } else {
            c.classList.remove('active');
            c.style.display = 'none';
            c.style.opacity = '0';
          }
        });
        
        const contentWrap = document.querySelector('.wgl-tabs_content-wrap');
        if (contentWrap) {
          contentWrap.style.height = 'auto';
        }

        updateLavalamp(this);
      });
    });

    const activeHeader = document.querySelector('.wgl-tabs_headings .wgl-tabs_header.active');
    if (activeHeader) {
      setTimeout(() => updateLavalamp(activeHeader), 200);
    }
  });
</script>
<script src="assets/flex-carousel.bundle.js"></script>
`;

  if (!html.includes('shivansh-services-fix-styles')) {
    html = html.replace('</head>', `${servicesEnhancements}\n</head>`);
  }

  return html;
}

function enhance404Page(html) {
  // 1. Remove obsolete search form
  html = html.replace(/<div class=["']?avelon_404_search["']?>[\s\S]*?<\/form>\s*<\/div>/gi, '');
  html = html.replace(/<div class=["']?avelon_404_search["']?>[\s\S]*?<\/div>/gi, '');

  // 2. Change heading to professional PAGE NOT FOUND
  html = html.replace(/<h2 class=["']?error_page__title["']?>[\s\S]*?<\/h2>/gi, '<h2 class="error_page__title">PAGE NOT FOUND</h2>');

  // 3. Update description
  html = html.replace(
    /<p class=["']?error_page__description["']?>[\s\S]*?<\/p>/gi,
    '<p class="error_page__description">The page you are looking for may have been moved, renamed, or does not exist. Please return to the homepage or explore our portfolio of completed projects.</p>'
  );

  // 4. Update buttons: BACK TO HOMEPAGE and EXPLORE PROJECTS
  const buttonsHtml = `
<div class="avelon_404__button elementor-widget-wgl-button" style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:24px;">
  <a class="wgl-button btn-size-xl" href="index.html">
    <div class="button__content">
      <span class="button__text">BACK TO HOMEPAGE</span>
    </div>
  </a>
  <a class="wgl-button btn-size-xl" href="portfolio.html">
    <div class="button__content">
      <span class="button__text">EXPLORE PROJECTS</span>
    </div>
  </a>
</div>
`;
  html = html.replace(/<div class=["']?avelon_404__button elementor-widget-wgl-button["']?>[\s\S]*?<\/div>\s*<\/div>/gi, `${buttonsHtml}</div>`);

  return html;
}

function generateOfflinePage(html404) {
  let offline = html404;

  // Title
  offline = offline.replace(/<title>[\s\S]*?<\/title>/gi, '<title>You\'re Offline – ShivAnsh Builders and Developers</title>');

  // Breadcrumbs and page header
  offline = offline.replace(/>ERROR 404</gi, '>OFFLINE<');
  offline = offline.replace(/>Error 404</gi, '>Offline<');

  // Heading & Description
  offline = offline.replace(/<h2 class=["']?error_page__title["']?>[\s\S]*?<\/h2>/gi, '<h2 class="error_page__title">YOU\'RE CURRENTLY OFFLINE</h2>');
  offline = offline.replace(
    /<p class=["']?error_page__description["']?>[\s\S]*?<\/p>/gi,
    '<p class="error_page__description">It appears you have lost your internet connection. Please check your network connectivity and retry to continue browsing ShivAnsh Builders &amp; Developers.</p>'
  );

  // Action buttons: RETRY CONNECTION and GO TO HOMEPAGE
  const offlineButtonsHtml = `
<div class="avelon_404__button elementor-widget-wgl-button" style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:24px;">
  <button type="button" class="wgl-button btn-size-xl" onclick="window.location.reload();" style="cursor:pointer;background:#FB651B;color:#ffffff;border:none;">
    <div class="button__content">
      <span class="button__text">RETRY CONNECTION</span>
    </div>
  </button>
  <a class="wgl-button btn-size-xl" href="index.html">
    <div class="button__content">
      <span class="button__text">GO TO HOMEPAGE</span>
    </div>
  </a>
</div>
<script>
  window.addEventListener('online', function() {
    window.location.reload();
  });
</script>
`;
  offline = offline.replace(/<div class=["']?avelon_404__button[\s\S]*?<\/div>\s*<\/div>/i, `${offlineButtonsHtml}</div>`);

  return offline;
}

console.log('='.repeat(80));
console.log('BUILDING CLEAN, ROBUST WEBSITE FOR "SHIVANSH BUILDERS AND DEVELOPERS"');
console.log('Requirements: Direct Portfolio Link, 9 Internal Project Pages, No Cart/Search, Accurate Belapur Map, No Demo URLs');
console.log('='.repeat(80));

// Step 1: Process the 11 Core Website Pages
for (const { src, dest, title, navKey } of PAGES) {
  const srcFile = path.join(SRC_DIR, src, 'index-final.html');
  const destFile = path.join(DEST_DIR, dest);

  if (!fs.existsSync(srcFile)) {
    console.error(`ERROR: Source file missing: ${srcFile}`);
    continue;
  }

  console.log(`\nProcessing Core Page [${title}] -> ${dest}`);
  let html = fs.readFileSync(srcFile, 'utf8');

  // 1. Clean toolbar and advertising bloat
  html = cleanToolbarAndThemeBloat(html);

  // 2. Remove shopping cart and search widgets, overlays, panels completely
  html = removeCartAndSearch(html);

  // 3. Update navigation menus with depth-aware parsing (Portfolio has NO dropdown)
  html = updateNavbars(html, navKey);

  // 4. Rewrite internal navigation links & eliminate demo urls
  html = rewriteInternalLinks(html);

  // 5. Neutralize all external links & demo endpoints
  html = removeExternalLinks(html);

  // 6. Apply ShivAnsh branding, visiting card contact details, enhanced logo, mobile bar, and footer fix
  html = applyShivAnshBranding(html, title, navKey);

  // 7. Page-Specific Enhancements
  if (dest === 'index.html') {
    html = enhanceIndexPage(html);
  } else if (dest === 'homepage-2.html') {
    html = enhanceHomepage2Page(html);
  } else if (dest === 'about-us.html') {
    html = enhanceAboutUsPage(html);
  } else if (dest === 'services.html') {
    html = enhanceServicesPage(html);
  } else if (dest === 'portfolio.html') {
    html = enhancePortfolioPage(html);
  } else if (dest === 'contacts.html') {
    html = enhanceContactsPage(html);
  } else if (dest === 'faqs.html') {
    html = enhanceFaqPage(html);
  } else if (dest === 'our-team.html') {
    html = enhanceOurTeamPage(html);
  } else if (dest === 'elements.html') {
    html = enhanceFaqPage(html);
  } else if (dest === '404.html') {
    html = enhance404Page(html);
  }

  fs.writeFileSync(destFile, html, 'utf8');
  const sizeMb = (fs.statSync(destFile).size / 1048576).toFixed(2);
  console.log(`  ✓ Written ${destFile} (${sizeMb} MB)`);

  if (dest === '404.html') {
    const offlineHtml = generateOfflinePage(html);
    const offlineFile = path.join(DEST_DIR, 'offline.html');
    fs.writeFileSync(offlineFile, offlineHtml, 'utf8');
    const offlineMb = (fs.statSync(offlineFile).size / 1048576).toFixed(2);
    console.log(`  ✓ Generated & Written ${offlineFile} (${offlineMb} MB) [Cloned from 404]`);
  }
}

// Step 2: Generate All 9 Individual Portfolio Project Detail Pages
const urbanTemplatePath = path.join(SRC_DIR, 'urban-family-home', 'index-final.html');
if (fs.existsSync(urbanTemplatePath)) {
  const baseProjectTemplate = fs.readFileSync(urbanTemplatePath, 'utf8');
  console.log('\n--- Generating 9 Individual Portfolio Project Detail Pages ---');
  
  for (const project of PORTFOLIO_PROJECTS) {
    console.log(`Generating Project Page: [${project.title}] -> ${project.file}`);
    const projectHtml = generateProjectDetailPage(baseProjectTemplate, project);
    const destFile = path.join(DEST_DIR, project.file);
    fs.writeFileSync(destFile, projectHtml, 'utf8');
    const sizeMb = (fs.statSync(destFile).size / 1048576).toFixed(2);
    console.log(`  ✓ Written ${destFile} (${sizeMb} MB)`);
  }
} else {
  console.error('ERROR: Base project template missing at', urbanTemplatePath);
}

console.log('\nMigration complete! Total 20 pages generated cleanly in website/ directory.');
