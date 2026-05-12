import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  extraHTTPHeaders: {
    Referer: 'https://www.cravecollective.co/',
  },
});
const page = await ctx.newPage();

const captures = [];
let currentVideoId = null;

page.on('request', (req) => {
  const url = req.url();
  if ((url.includes('playlist.json') || url.includes('master.json')) && url.includes('vimeocdn.com')) {
    if (currentVideoId) {
      captures.push({ videoId: currentVideoId, manifestUrl: url });
    }
  }
});

const ids = ['1000908347', '1001966331', '1182049959', '1182054141', '1088096342', '1084106061'];

for (const id of ids) {
  currentVideoId = id;
  const url = `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&background=1`;
  console.log(`\n[${id}] ${url}`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(8000);
    console.log(`  captured: ${captures.filter(c => c.videoId === id).length}`);
  } catch (e) {
    console.log(`  err: ${e.message.split('\n')[0]}`);
  }
  currentVideoId = null;
}

fs.writeFileSync('/tmp/vimeo-manifests.json', JSON.stringify(captures, null, 2));
console.log(`\n=== ${captures.length} total captures ===`);
for (const c of captures) {
  console.log(`${c.videoId}: ${c.manifestUrl.slice(0, 130)}...`);
}

await browser.close();
