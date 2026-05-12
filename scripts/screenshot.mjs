import { chromium } from 'playwright';

const browser = await chromium.launch();
const routes = [
  { path: '/', name: 'home' },
  { path: '/work/longboat-key', name: 'work' },
  { path: '/contact', name: 'contact' },
];
const viewports = [
  { name: 'desktop', width: 1680, height: 1050 },
  { name: 'mobile', width: 375, height: 812 },
];

for (const route of routes) {
  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:3000${route.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    const out = `/Users/thebeast/crave-colective/screenshots/${route.name}-${vp.name}.png`;
    await page.screenshot({ path: out, fullPage: true });
    console.log(`${out} (${vp.width}x${vp.height})`);
    await ctx.close();
  }
}
await browser.close();
