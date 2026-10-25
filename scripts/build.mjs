import fs from 'node:fs';
import path from 'node:path';

// Optional single page target: node scripts/build.mjs [filename.html]
const singleTarget = process.argv[2];

const SRC_DIR = './clones';
const DEST_DIR = './website';

fs.mkdirSync(DEST_DIR, { recursive: true });

// Read user's SVG logo from visiting card
const rawSvg = fs.readFileSync('shivansh-logo.svg', 'utf8');
const innerPaths = rawSvg.substring(rawSvg.indexOf('<path'), rawSvg.lastIndexOf('</svg>')).trim();

const SVG_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226 52" width="226" height="52">
  <g fill="none" fill-rule="evenodd">
    <g transform="translate(2, 2) scale(0.0505) translate(-125, -25)">
      ${innerPaths}
    </g>
    <text x="49" y="30" font-family="'Space Grotesk', 'Inter', -apple-system, sans-serif" font-size="26.5" font-weight="800" fill="#FFFFFF" letter-spacing="1.5">SHIVANSH</text>
    <text x="50.5" y="45" font-family="'Space Grotesk', 'Inter', -apple-system, sans-serif" font-size="8.4" font-weight="700" fill="#FFFFFF" letter-spacing="2.8" opacity="0.95">BUILDERS &amp; DEVELOPERS</text>
  </g>
</svg>`;
const LOGO_DATA_URI = 'data:image/svg+xml;base64,' + Buffer.from(SVG_LOGO).toString('base64');

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1016 1016" width="64" height="64">
  <rect width="1016" height="1016" rx="200" fill="#181818"/>
  <g transform="translate(60, 60) scale(0.88)">
    ${innerPaths}
  </g>
</svg>`;
const FAVICON_DATA_URI = 'data:image/svg+xml;base64,' + Buffer.from(FAVICON_SVG).toString('base64');

const PORTFOLIO_PROJECTS = [
  {
    title: 'LUXURY GARDEN ESTATE',
    slug: 'luxury-garden-estate',
    file: 'luxury-garden-estate.html',
    category: 'Building, Residential',
    date: 'January 14, 2026',
    services: 'Landscape Architecture, Structural Engineering, Luxury Estate Development',
    team: 'Yogesh Navle & ShivAnsh Engineering Team',
    descTitle: 'Harmonious Integration of Nature and Architecture',
    desc1: 'The Luxury Garden Estate project represents a seamless synthesis of sprawling natural landscapes with bold, contemporary residential architecture. Engineered to maximize panoramic natural lighting while maintaining supreme thermal efficiency, this private enclave features cantilevered terraces, sustainable greywater irrigation systems, and custom reinforced structural foundations.',
    desc2: 'From initial site excavation and soil stabilization to the meticulous placement of high-specification architectural finishes, ShivAnsh Builders delivered end-to-end precision, demonstrating our capacity for turnkey luxury residential execution in demanding environments.',
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
    team: 'Yogesh Navle & Commercial Development Division',
    descTitle: 'Dynamic Commercial Spaces Built for High Productivity',
    desc1: 'Designed to meet the rigorous demands of fast-growing corporate enterprises, the Urban Office Complex showcases high-performance glass curtain walling, flexible open-span floor plates, and intelligent building management infrastructure. Our structural team deployed advanced post-tensioned slab construction to eliminate unnecessary internal columns.',
    desc2: 'Every aspect of the mechanical, electrical, and plumbing engineering was designed to exceed modern sustainability benchmarks, delivering exceptional lifecycle durability and minimal operational overhead.',
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
    team: 'Yogesh Navle & Structural Works Group',
    descTitle: 'Precision High-Load Structural Foundations and Framing',
    desc1: 'The Core Center stands as a testament to heavy structural engineering mastery. Built on deep-piled foundations with a reinforced concrete central core, the development provides robust seismic resilience and unyielding structural integrity for high-density metropolitan usage.',
    desc2: 'ShivAnsh managed complex staging logistics, continuous slip-form casting, and rigorous acoustic mitigation, resulting in a landmark civic and commercial hub built on time and within strict capital budgets.',
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
    team: 'Yogesh Navle & Architectural Design Team',
    descTitle: 'Adaptive Spaces Blending Residential Comfort with Corporate Function',
    desc1: 'Workspace Redefined explores hybrid living and working typologies. By balancing industrial-grade acoustic dampening with warm natural materials and modular interior partitioning, this development creates adaptable environments optimized for focused creativity and collaborative teamwork.',
    desc2: 'Our team executed intricate MEP services concealment, smart lighting automation, and high-specification architectural woodwork with millimeter precision.',
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
    team: 'Yogesh Navle & ShivAnsh Project Team',
    descTitle: 'Attention to Detail Defines Excellence',
    desc1: 'Every project we undertake is guided by a commitment to quality, durability, and thoughtful execution. From initial planning and site preparation through to the final structural finishes, our approach prioritizes precision craftsmanship and collaborative problem-solving.',
    desc2: 'Through careful material selection, rigorous safety standards, and transparent project oversight, we deliver enduring structures that exceed modern building regulations and client expectations.',
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
    team: 'Yogesh Navle & Innovation Projects Team',
    descTitle: 'Next-Generation Smart Infrastructure and Eco-Engineering',
    desc1: 'The Innovation Hub is an energy-positive development combining advanced solar arrays, integrated building envelope insulation, and automated lifecycle monitoring systems. Engineered to minimize carbon footprint while delivering unparalleled occupant comfort.',
    desc2: 'ShivAnsh Builders coordinated multidisciplinary engineering teams to integrate geothermal heat exchange and low-emission building materials across all stages of structural construction.',
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
    team: 'Yogesh Navle & Custom Residential Team',
    descTitle: 'Waterfront Structural Mastery and Coastal Protection',
    desc1: 'Positioned along a delicate shoreline, Luxury on the Lake demanded advanced foundation piling, specialized marine-grade concrete formulations, and comprehensive shoreline erosion controls. The architectural profile opens expansive panoramic glass fronts toward the water.',
    desc2: 'ShivAnsh managed all environmental clearances, specialized hydrological soil stabilization, and luxury architectural detailing to create an enduring residential sanctuary.',
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
    team: 'Yogesh Navle & Urban Projects Group',
    descTitle: 'Integrated Mixed-Use Infrastructure Revitalizing Communities',
    desc1: 'Hub Development integrates residential apartments, retail walkways, and civic public plazas into a cohesive, pedestrian-oriented urban environment. The project features structural transfer slabs, wide-span basements, and elevated transit connections.',
    desc2: 'Our construction management protocols minimized urban disruption while ensuring strict milestone adherence and flawless structural delivery.',
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
    team: 'Yogesh Navle & Energy Engineering Division',
    descTitle: 'Net-Zero Commercial Engineering for Forward-Thinking Enterprises',
    desc1: 'The Smart Energy Office sets the standard for high-efficiency commercial workspaces. Equipped with microgrid connectivity, high-efficiency VRF HVAC systems, and automated daylight harvesting facades, this building reduces lifetime operating expenses significantly.',
    desc2: 'From foundation stone to rooftop photovoltaic commissioning, ShivAnsh executed every phase with uncompromising quality and environmental responsibility.',
    prevTitle: 'HUB DEVELOPMENT',
    prevFile: 'hub-development.html',
    nextTitle: 'LUXURY GARDEN ESTATE',
    nextFile: 'luxury-garden-estate.html',
  }
];

// Extract images from portfolio masonry clone
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

const CORE_PAGES = [
  { src: 'avelon-homepage-1', dest: 'index.html', title: 'ShivAnsh Builders and Developers', navKey: 'home' },
  { src: 'about-us', dest: 'about-us.html', title: 'About Us – ShivAnsh Builders and Developers', navKey: 'about' },
  { src: 'our-team', dest: 'our-team.html', title: 'Our Team – ShivAnsh Builders and Developers', navKey: 'team' },
  { src: 'services', dest: 'services.html', title: 'Services – ShivAnsh Builders and Developers', navKey: 'services' },
  { src: 'portfolio-masonry-3', dest: 'portfolio.html', title: 'Portfolio – ShivAnsh Builders and Developers', navKey: 'portfolio' },
  { src: 'faqs', dest: 'faqs.html', title: 'FAQ – ShivAnsh Builders and Developers', navKey: 'faq' },
  { src: 'contacts', dest: 'contacts.html', title: 'Contact Us – ShivAnsh Builders and Developers', navKey: 'contact' },
  { src: '404', dest: '404.html', title: 'Page Not Found – ShivAnsh Builders and Developers', navKey: 'none' },
  { src: 'typography', dest: 'typography.html', title: 'Typography – ShivAnsh Builders and Developers', navKey: 'none' },
  { src: 'elements', dest: 'elements.html', title: 'Elements – ShivAnsh Builders and Developers', navKey: 'none' },
  { src: 'avelon-homepage-2', dest: 'homepage-2.html', title: 'Homepage 2 – ShivAnsh Builders and Developers', navKey: 'none' },
];

// Import existing functions from root migration script
import { execSync } from 'node:child_process';

if (!singleTarget) {
  console.log('Building full website via migrate-to-website.mjs...');
  execSync('node migrate-to-website.mjs', { stdio: 'inherit' });
} else {
  console.log(`Targeted build requested for: ${singleTarget}`);
  execSync('node migrate-to-website.mjs', { stdio: 'inherit' });
}
