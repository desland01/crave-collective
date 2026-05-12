import { chromium } from 'playwright';

const browser = await chromium.launch();
const routes = [
  { path: '/', name: 'home' },
  { path: '/work', name: 'work-index' },
  { path: '/store', name: 'store' },
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
    // Above-fold viewport snapshot (first impression)
    const outVP = `/Users/thebeast/crave-colective/screenshots/${route.name}-${vp.name}-viewport.png`;
    await page.screenshot({ path: outVP, fullPage: false });
    console.log(outVP);
    // Full page (deep audit)
    const outFP = `/Users/thebeast/crave-colective/screenshots/${route.name}-${vp.name}-full.png`;
    await page.screenshot({ path: outFP, fullPage: true });
    console.log(outFP);
    await ctx.close();
  }
}
await browser.close();
