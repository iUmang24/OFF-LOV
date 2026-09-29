# Off Culture Studio

Build a pure-white, minimal, futuristic streetwear website titled "OFF CULTURE — Streetwear Out Of Jaipur." This is a multi-page frontend demo (no real backend/payments) for a Gen-Z streetwear brand from Jaipur. Stack: React 19 + Vite + TypeScript + Tailwind CSS v4 + react-router-dom + framer-motion + lucide-react. Full site must be animation-rich, smooth, and interactive — this is the top priority, not just a static layout.

Page title: OFF CULTURE — Streetwear Out Of Jaipur
Meta description: Underground streetwear out of Jaipur. Not for everyone.
Vibe: pure white, minimal, futuristic UI with an underground Gen-Z streetwear edge. Black text on white. No purple, no cream, no glow effects, no drop shadows, no rounded card backgrounds.

═══════════════════════════════════════
FONTS
═══════════════════════════════════════
Load via Google Fonts:
https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Michroma&family=Orbitron:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap

- Orbitron (600/700/800/900): logo, headlines, drawer/page titles, drop titles
- Plus Jakarta Sans (400/500/600/700): body UI, nav links, taglines, buttons, drawer/article content — default page font

CSS utilities:
.font-orbitron { font-family: 'Orbitron', sans-serif; }
.font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }

Body: bg-white text-black antialiased, selection: selection:bg-black selection:text-white

═══════════════════════════════════════
FLUID SIZE SYSTEM (exact CSS variables)
═══════════════════════════════════════
:root {
  --pad-x: clamp(1.25rem, 4.5vw, 5rem);
  --pad-y: clamp(1rem, 3vh, 4rem);
  --header-pt: clamp(1.25rem, 2.5vh, 2.5rem);
  --gap-nav: clamp(1rem, 2.2vw, 2.25rem);
  --logo: clamp(1.35rem, 1.2vw + 0.9rem, 2.1rem);
  --logo-mark: clamp(0.65rem, 0.4vw + 0.45rem, 0.9rem);
  --nav: clamp(0.65rem, 0.35vw + 0.5rem, 0.875rem);
  --headline: clamp(2.15rem, 4.5vw + 0.75rem, 5.25rem);
  --body: clamp(0.7rem, 0.35vw + 0.55rem, 0.9rem);
  --micro: clamp(0.55rem, 0.25vw + 0.45rem, 0.7rem);
  --btn-px: clamp(1.15rem, 1.4vw, 1.75rem);
  --btn-py: clamp(0.6rem, 0.9vh, 0.85rem);
  --btn-gap: clamp(0.75rem, 1vw, 1.1rem);
  --feature-pad: clamp(1rem, 1.5vw, 1.75rem);
  --feature-min: clamp(13rem, 18vw, 20rem);
  --globe: clamp(2.25rem, 2.5vw + 1rem, 3.25rem);
  --checker-w: clamp(2.75rem, 4.5vw, 6.5rem);
  --checker-h: clamp(1.35rem, 2.2vw, 3rem);
  --corner: clamp(0.65rem, 0.4vw + 0.4rem, 0.95rem);
  --icon: clamp(1rem, 0.6vw + 0.7rem, 1.35rem);
  --drawer-pad: clamp(1.25rem, 2.5vw, 2.25rem);
  --drawer-max: clamp(18rem, 28vw, 28rem);
  --section-gap: clamp(0.75rem, 1.5vh, 1.5rem);
  --main-py: clamp(1.25rem, 4vh, 4rem);
}

═══════════════════════════════════════
BACKGROUND IMAGES (homepage hero only)
═══════════════════════════════════════
Use two full-bleed streetwear lifestyle images, moody/desaturated, Jaipur urban backdrop if possible:
- BG_IMAGE_1 (base layer, always visible): wide desaturated streetwear lifestyle shot
- BG_IMAGE_2 (reveal layer, shown only inside cursor spotlight): a second angle or close-up on garment texture (waffle knit / denim stitching / jersey fabric)
Use royalty-free streetwear placeholder imagery for now (swap before client pitch). Both layers: absolute inset-0, background-size: cover, background-position: center, background-repeat: no-repeat.

═══════════════════════════════════════
DESKTOP CURSOR-REVEAL BACKGROUND (critical — build the real canvas version, not a CSS hover fake)
═══════════════════════════════════════
Component: ImageRevealBackground. Desktop only: hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden.

Layers (bottom → top):
1. Base layer: BG_IMAGE_1 full bleed
2. Reveal layer: BG_IMAGE_2 full bleed, clipped by a CSS/WebKit mask generated from an offscreen 

 — NOT a plain radial-gradient CSS hover, it must be canvas-generated per frame
3. Subtle SVG grid overlay at opacity: 0.10, stroke #64748b, strokeWidth 0.6

Spotlight/mask algorithm (exact):
- Track raw mouse (mousemove on window) into mouseRef
- Every animation frame (requestAnimationFrame loop), ease smoothRef toward mouse with factor 0.1:
  smooth.x += (mouse.x - smooth.x) * 0.1
  smooth.y += (mouse.y - smooth.y) * 0.1
- Spotlight radius (fluid): Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16)))
- Draw soft radial gradient circle on offscreen canvas at smoothed cursor position:
  createRadialGradient(cx, cy, 0, cx, cy, radius) with stops exactly:
    0 → rgba(255,255,255,1)
    0.4 → rgba(255,255,255,1)
    0.6 → rgba(255,255,255,0.75)
    0.75 → rgba(255,255,255,0.4)
    0.88 → rgba(255,255,255,0.12)
    1 → rgba(255,255,255,0)
- Export canvas each frame as toDataURL() and apply to BG_IMAGE_2 as mask-image / -webkit-mask-image: url(dataUrl), mask-size: 100% 100%
- Result: cursor smoothly reveals BG_IMAGE_2 inside a soft circular spotlight that trails the cursor; BG_IMAGE_1 shows everywhere else

Parallax grid:
- Grid cell size (fluid): Math.round(Math.min(64, Math.max(36, window.innerWidth * 0.028))), update on resize
- SVG  with path M {cell} 0 L 0 0 0 {cell}
- Eased parallax offset: normalize smoothed cursor to container (cx, cy from −0.5 to 0.5), ease offset toward cx*16 / cy*16 with factor 0.06
- Pattern x/y = that eased offset

Below lg: hide this component, show a static bordered image of BG_IMAGE_1 instead (aspect-[4/5] mobile, sm:aspect-[16/9], border border-gray-200).

═══════════════════════════════════════
GLOBAL ANIMATION LAYER (apply across every page — use framer-motion for all of this)
═══════════════════════════════════════
1. Scroll-triggered reveals: wrap every major section/card in . On grids, stagger children with staggerChildren: 0.08.
2. Hover micro-interactions: product images grayscale-100 → grayscale-0 + scale-105 on hover (400-500ms). Primary buttons invert fill black↔white on hover (250ms) with icon nudging 2-3px up-right via whileHover. Nav links fade to 50% opacity on hover (200ms).
3. Drawers slide in from right: initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}, wrapped in . Backdrop fades in/out with opacity transition.
4. Toasts slide/fade in from top-right, auto-dismiss with fade-out.
5. Custom cursor (lg: and above only): small solid dot follows raw mouse instantly; larger outlined circle follows with ease factor ~0.15 and scales 1.5x on hover over any button/link. Hide default cursor on desktop (cursor: none, lg: only).
6. Film-grain overlay: fixed, full-viewport, ~4-6% opacity, SVG feTurbulence filter or looping noise texture, pointer-events-none, above background/below content.
7. Route transitions: wrap router outlet in  for a simple 200ms fade out/in between pages — no hard cuts.
8. Respect prefers-reduced-motion: fall back to instant/opacity-only transitions.

═══════════════════════════════════════
ROUTES & PAGE STRUCTURE
═══════════════════════════════════════

--- GLOBAL HEADER (every page, z-20) ---
Padding: paddingInline: var(--pad-x), paddingTop: var(--header-pt), paddingBottom: var(--section-gap). Flex space-between.
Logo (left): "OFF CULTURE" + small dot mark "•" (var(--logo-mark), -mt-0.5 ml-0.5), Orbitron black/900, tracking 0.15em, size var(--logo). Links home. Hover opacity 80%.
Nav (right): SHOP | DROPS | JOURNAL then gray "|" divider then lucide ShoppingBag icon (stroke 1.5, size var(--icon)). Plus Jakarta Sans medium uppercase, tracking 0.2em, size var(--nav), gap var(--gap-nav).
On Home (/): SHOP/DROPS/JOURNAL open the corresponding drawer.
On all other pages: SHOP/DROPS/JOURNAL are real  navigations to their routes; cart icon still opens the cart drawer as quick-view everywhere.
Cart shows black circular badge with item count when cart has items. Cart state is global (React context) across all pages.

--- ROUTE: / (Home) ---
Root: min-h-screen bg-white text-black font-jakarta flex flex-col justify-between relative overflow-hidden.
Main hero (flex-1), padding paddingInline: var(--pad-x), paddingBlock: var(--main-py), column on mobile / lg:flex-row space-between.

Left block (vertically centered):
1. Top-left L-corner bracket SVG (stroke 1.5, size var(--corner))
2. Headline — Orbitron extrabold uppercase, tracking 0.08em, leading 1.05, size var(--headline), three lines:
   OFF
   THE
   GRID + inline checkerboard SVG (viewBox 0 0 36 18, 4 rows of 3.8×3.8 black squares, even rows shifted 2.25, size var(--checker-w) × var(--checker-h), translated down 2px) — animate this line in last, slightly delayed after OFF/THE
3. Bottom-left L-corner bracket
4. CTA: border-gray-400, rounded-md, uppercase "SHOP THE DROP" + lucide ArrowUpRight, tracking 0.18em, size var(--body), padding var(--btn-px)/var(--btn-py). Hover: fill black, text white, border black, icon nudges up-right. Links to /shop.

Right lower feature block (self-end, bottom-aligned desktop): framed box, four corner bracket SVGs at absolute corners, no filled background. Inside: wireframe globe SVG (viewBox 0 0 64 64, stroke 1.2: outer circle r=28, equator line, 2 horizontal ellipses, meridian line, 2 vertical ellipses, size var(--globe)), tagline Plus Jakarta Sans semibold uppercase tracking 0.18em size var(--body):
NOT FOR EVERYONE.
STREETWEAR OUT OF JAIPUR.
min-width var(--feature-min), padding var(--feature-pad).

Drawers (SHOP/DROPS/JOURNAL/CART) — right-side white drawer over dimmed backdrop (bg-black/20 backdrop-blur-xs), max-width var(--drawer-max), padding var(--drawer-pad), border-left gray, header Orbitron bold uppercase title + lucide X close, click backdrop to close, slide-in animation as specified above.

SHOP drawer → title "Catalog", subtitle "Current Lineup":
1. BOXY OVERSIZED TEE — ₹1,299 — NEW DROP
2. WAFFLE KNIT HALF-SLEEVE — ₹1,599 — LIMITED EDITION
3. VARSITY JERSEY — ₹2,199 — IN STOCK
4. RELAXED FIT DENIM — ₹2,799 — PRE-ORDER
Each row: tag (micro gray), title, price, ADD button → adds to cart, toast: Added "{title}" to your bag. (3s, black toast top-right, lucide Check emerald, slide/fade in from top-right).

DROPS drawer → title "Drop Archive", subtitle "Season Lineup":
1. DROP 01 — OFF THE GRID — Oversized silhouettes built for the street, not the runway.
2. DROP 02 — CONCRETE JUNGLE — Jaipur-rooted streetwear with a raw, unfinished edge.
3. DROP 03 — MONOCHROME ONLY — Black and white pieces stripped of everything unnecessary.

JOURNAL drawer → title "Dispatch", subtitle "From The Streets":
1. AUG 2026 — HOW JAIPUR'S STREETWEAR SCENE IS TAKING SHAPE — 4 MIN READ
2. JUL 2026 — THE BOXY FIT: WHY OVERSIZED WON — 5 MIN READ
3. JUN 2026 — OFF CULTURE'S FIRST DROP, ONE YEAR LATER — 3 MIN READ

CART drawer → title "Bag". Empty: ShoppingBag icon + "Your bag is empty." With items: title/price + Remove. Footer: full-width black "CHECKOUT NOW" + ChevronRight → toast "Order submitted successfully!", clear cart, close drawer.
Non-cart drawer footer: "OFF CULTURE © 2026 — STREETWEAR OUT OF JAIPUR" (micro, gray, centered uppercase).

--- ROUTE: /shop (Catalog page) ---
Sticky header (no hero). Page title "CATALOG" Orbitron, corner brackets top-left, scroll-reveal in.
Filter pills: ALL, TEES, BOXY FITS, WAFFLES, JERSEYS, JEANS, ACCESSORIES — uppercase tracking 0.18em, active = filled black/white text, inactive = bordered gray-300, smooth color transition on switch.
Product grid: 3 cols desktop / 2 tablet / 1 mobile, gap var(--section-gap), staggered scroll-in.
At least 10 products across all categories (extend the 4 above with realistic streetwear names/prices in the same style — include boxy shirts, waffles, jerseys, jeans, accessories).
Each card: image (grayscale→color + scale on hover), title, category tag (micro gray), price ₹, "ADD" ghost button bottom-right (fades in on hover) that adds to cart + toast. Clicking card navigates to /product/:id.

--- ROUTE: /product/:id (Product detail) ---
Two-column layout: left = large image framed by corner brackets (no filled card), right = info.
Right column: category tag, Orbitron bold product name, price, short attitude-driven description (1-2 sentences), size selector S/M/L/XL as bordered squares (active = filled black), "ADD TO BAG" full-width black button (icon nudge on hover), small fabric/care micro-copy at bottom.
Below: "YOU MIGHT ALSO LIKE" — horizontal row of 3-4 related product cards, same hover behavior as catalog, scroll-reveal in.

--- ROUTE: /drops (Drop Archive) ---
Full-bleed sections, one per drop, alternating text-left/image-right and text-right/image-left, each with parallax-style scroll reveal (image and text animate in slightly offset/staggered).
Each drop: large Orbitron drop title, short manifesto copy, "SHOP THIS DROP" button linking to /shop filtered by that drop.
Use the three drops (OFF THE GRID, CONCRETE JUNGLE, MONOCHROME ONLY) with placeholder imagery.

--- ROUTE: /journal (Journal listing) ---
List of dispatch cards (image, date, title, read-time) stacked vertically with dividers, same micro/body type scale, staggered scroll-in. Use the three entries above extended to 5-6 with matching tone. Cards navigate to /journal/:id.

--- ROUTE: /journal/:id (Article detail) ---
Editorial layout: large Orbitron title, date/read-time (micro gray), full-bleed hero image, body copy in Plus Jakarta Sans, generous line-height, max-width ~65ch. Placeholder paragraphs matching the article's theme (streetwear/Jaipur/sustainability). Scroll-reveal on load.

--- ROUTE: /cart (Full Bag page) ---
Same content as cart drawer but full page: line items with image thumbnail, title, size, qty stepper, price, remove (each row animates out on remove). Order summary: subtotal, "Shipping calculated at checkout", total. "CHECKOUT NOW" black button → full-page confirmation state (scale/fade-in animation): large Check icon, "ORDER SUBMITTED SUCCESSFULLY", "CONTINUE SHOPPING" button back to /shop. No real payment integration.

═══════════════════════════════════════
ICONS
═══════════════════════════════════════
lucide-react only: ShoppingBag, ArrowUpRight, X, ChevronRight, Check, Plus, Minus (for qty stepper). Custom SVGs for: checkerboard, wireframe globe, four L-shaped corner brackets (paths: TL M0 11.5V0.5H11.5, TR M0.5 0.5H11.5V11.5, BL M0 0.5V11.5H11.5, BR M0.5 11.5H11.5V0.5, viewBox 0 0 12 12).

═══════════════════════════════════════
VISUAL RULES
═══════════════════════════════════════
- White page, black ink, gray accents only (gray-200/300/400/500/600, slate grid #64748b)
- No purple, no cream, no glow, no floating badges over hero media, no inset hero cards, no drop shadows, no rounded card backgrounds
- Brand OFF CULTURE and headline OFF THE GRID dominate the homepage first viewport
- UI text sits above background at z-10/z-20; background is z-0 and non-interactive (pointer-events-none)
- Every page must feel alive on scroll and hover — this is a portfolio-grade animated demo, not a static mockup

Build all seven routes, the global cart context, and the full animation layer in this pass. Prioritize the animation layer working correctly (especially the canvas cursor-reveal and scroll reveals) over adding extra content.





## Build with

- **Ship faster**: describe what you want to build and  handles the code.
- **Stay in sync**: every change made in  is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into  ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
