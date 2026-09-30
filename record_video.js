const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const videoDir = path.resolve(__dirname, 'videos');
  if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');

  console.log('Starting video recording of:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Record 10 seconds of pristine 60fps looping animation
  console.log('Recording 10-second animation cycle...');
  await page.waitForTimeout(10000);

  const videoPage = page.video();
  await page.close();
  await context.close();
  await browser.close();

  if (videoPage) {
    const videoPath = await videoPage.path();
    const finalPath = path.resolve(__dirname, 'quinfy_hero_animation_loop.webm');
    fs.copyFileSync(videoPath, finalPath);
    console.log('Video saved successfully to:', finalPath);
    console.log('Video file size:', fs.statSync(finalPath).size, 'bytes');
  }
}

run();
