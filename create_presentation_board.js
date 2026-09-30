const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1.5 // 2880 x 1620 crisp Retina capture
  });

  const page = await context.newPage();
  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');

  console.log('Opening page for 4K presentation capture...');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait 3.5 seconds so scan line is halfway down the face and checkmarks are glowing
  await page.waitForTimeout(3500);

  const outputPath = path.resolve(__dirname, 'quinfy_master_board.png');
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log('Saved master board to:', outputPath);

  await browser.close();
}

run();
