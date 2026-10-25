import fs from 'node:fs';

const targetPage = process.argv[2]; // optional: specific page like "portfolio.html" or omit for all

const allPages = fs.readdirSync('website').filter(f => f.endsWith('.html'));
const pages = targetPage ? [targetPage] : allPages;

console.log(`\n======================================================`);
console.log(`FOCUSED AUDIT ON ${pages.length} PAGE(S)`);
console.log(`======================================================\n`);

let hasError = false;

for (const p of pages) {
  const filePath = `website/${p}`;
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File not found: ${filePath}`);
    hasError = true;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  // 1. Check Portfolio Navbar Dropdown
  const pfHasChildren = /<li[^>]*class="[^"]*menu-item-has-children[^"]*"[^>]*>\s*<a\s+href="portfolio\.html"/i.test(content);
  if (pfHasChildren) issues.push('Portfolio has dropdown submenu in navbar');

  // 2. Check Cart & Search HTML presence (outside <style>)
  const cartWidgets = content.match(/elementor-widget-wgl-header-cart/gi) || [];
  const searchWidgets = content.match(/elementor-widget-wgl-header-search/gi) || [];
  const htmlCart = cartWidgets.filter((_, idx) => {
    const pos = content.indexOf('elementor-widget-wgl-header-cart', idx);
    const sOpen = content.lastIndexOf('<style', pos);
    const sClose = content.lastIndexOf('</style>', pos);
    return !(sOpen !== -1 && (sClose === -1 || sClose < sOpen));
  });
  const htmlSearch = searchWidgets.filter((_, idx) => {
    const pos = content.indexOf('elementor-widget-wgl-header-search', idx);
    const sOpen = content.lastIndexOf('<style', pos);
    const sClose = content.lastIndexOf('</style>', pos);
    return !(sOpen !== -1 && (sClose === -1 || sClose < sOpen));
  });
  if (htmlCart.length > 0) issues.push(`Found ${htmlCart.length} cart widget(s) in HTML`);
  if (htmlSearch.length > 0) issues.push(`Found ${htmlSearch.length} search widget(s) in HTML`);

  // 3. Check for external demo URLs
  const demoUrls = [...content.matchAll(/https?:\/\/wgl-dsites\.net\/avelon\/[^\s"'<>]+/gi)].map(m => m[0]);
  if (demoUrls.length > 0) issues.push(`Found ${demoUrls.length} wgl-dsites.net/avelon/ URL(s)`);

  // 4. Page-specific checks
  if (p === 'contacts.html') {
    const hasBelapur = content.includes('73.04008') && content.includes('Balaji Bhavan');
    if (!hasBelapur) issues.push('Contacts map does not pinpoint Belapur location');
  }

  if (p === 'portfolio.html') {
    const expected = [
      'luxury-garden-estate.html',
      'urban-office-complex.html',
      'the-core-center.html',
      'workspace-redefined.html',
      'urban-family-home.html',
      'the-innovation-hub.html',
      'luxury-on-the-lake.html',
      'hub-development.html',
      'smart-energy-office.html',
    ];
    for (const exp of expected) {
      if (!content.includes(exp)) issues.push(`Portfolio grid missing link to ${exp}`);
    }
  }

  const cleanHtml = content.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

  if (p === '404.html') {
    if (!content.includes('index.html')) issues.push('404 missing link to index.html');
    if (!content.includes('portfolio.html')) issues.push('404 missing link to portfolio.html');
    if (/<form[^>]*search/i.test(cleanHtml)) issues.push('404 has leftover search form in HTML');
  }

  if (p === 'offline.html') {
    if (!content.includes('location.reload')) issues.push('Offline page missing reload retry');
    if (!content.includes('index.html')) issues.push('Offline page missing link to homepage');
    if (!content.includes('online')) issues.push('Offline page missing online reconnection listener');
    if (/<form[^>]*search/i.test(cleanHtml)) issues.push('Offline page has leftover search form in HTML');
  }

  if (issues.length === 0) {
    console.log(`  ✓ ${p}: All checks passed.`);
  } else {
    console.error(`  ✗ ${p} failed:`);
    issues.forEach(i => console.error(`      - ${i}`));
    hasError = true;
  }
}

console.log(`\n======================================================`);
console.log(hasError ? 'AUDIT FINISHED WITH ISSUES' : 'AUDIT PASSED PERFECTLY');
console.log(`======================================================\n`);

process.exit(hasError ? 1 : 0);
