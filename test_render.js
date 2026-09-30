const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  console.log('Loading:', fileUrl);

  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait 1.5s for initial Three.js render
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'render_initial.png', fullPage: false });
  console.log('Saved render_initial.png');

  // Wait another 3s to capture scan line and checklist update
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'render_mid_scan.png', fullPage: false });
  console.log('Saved render_mid_scan.png');

  await browser.close();
}

run();
