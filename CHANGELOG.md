# Changelog

All notable changes to the Crave Collective website project.

## 2026-05-12

### Founder portrait fix
- **Problem:** Previous scrape session pulled `@cravecollectivee` business account profile pic for founder portrait — resulted in wrong person (woman in black blouse, not Dante).
- **Fix:** Pulled from Dante's personal account `@dantefilms_` via Bright Data Instagram Profiles MCP. Found cinematic boxing gym portrait (1080x1920) from his "dropout to business owner" post. Replaced `public/posters/founder-portrait.jpg`.
- **Technique:** `mcp__bright-data__web_data_instagram_profiles` → parsed `posts[].image_url` array → visually identified correct portrait by cross-referencing profile pic (curly hair, gold chain) → downloaded 1080p post image.
- **Lesson:** Instagram business accounts often use team/brand photos as profile pics. For founder portraits, always check the personal account (`dantefilms_` not `cravecollectivee`). Verify identity visually before replacing.

### Typography tuning
- Testimonial quote font size reduced one level: `text-m lg:text-l` → `text-s lg:text-m` in `src/components/compounds/Testimonial.tsx`.
- Dante's founder quote ("A note from Dante" section) bumped to `text-xl` in `src/app/page.tsx` — creates visual hierarchy between founder voice and client testimonials.
- **Pattern:** Use inline className override on shared primitive (`<H3 className="text-xl ...">`) rather than modifying the primitive itself when only one instance needs a different size.

### Files changed
- `public/posters/founder-portrait.jpg` — replaced with correct Dante portrait from `@dantefilms_`
- `public/posters/dante-profile-320.jpg` — Dante's IG profile pic (320x320 backup)
- `public/posters/dante-post-0.jpg`, `dante-post-1.jpg`, `dante-post-2.jpg` — candidate images from post scrape
- `public/posters/founder-portrait-WRONG.jpg` — archived wrong image for reference
- `src/components/compounds/Testimonial.tsx` — quote font size reduced
- `src/app/page.tsx` — founder quote font size bumped to xl
- `screenshots/*.png` — updated captures reflecting changes
