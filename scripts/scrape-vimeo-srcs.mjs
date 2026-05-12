import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

const pages = [
  'https://www.cravecollective.co/work',
  'https://www.cravecollective.co/store',
  'https://www.cravecollective.co/',
];

const seen = new Set();

for (const url of pages) {
  console.log(`--- ${url} ---`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
  } catch (e) {
    console.log(`error: ${e.message}`);
    continue;
  }
  const iframeSrcs = await page.evaluate(() => {
    const frames = document.querySelectorAll('iframe');
    return Array.from(frames).map(f => f.src).filter(s => s && s.includes('vimeo'));
  });
  for (const src of iframeSrcs) {
    if (!seen.has(src)) {
      seen.add(src);
      console.log(src);
    }
  }
}

await browser.close();
