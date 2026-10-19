# Castell & Reeve — Law & Advisory Preset

A “quiet authority” homepage for a **fictional** law and advisory firm (London · Athens · Nicosia). Ivory paper, deep ink-green and brass; Newsreader (editorial serif with optical sizes) + Manrope, with Mrs Saint Delafield used only for the hand-signed signature. Sections are numbered like contract clauses (§ 1, § 2 …).

Next.js 15 (static export) · GSAP 3 + ScrollTrigger · Lenis · plain CSS. No UI libraries.

```bash
npm install
npm run dev       # dev output goes to .next-dev, so builds never disturb a running dev server
npm run build     # static site in ./out
npm run images    # rebuild responsive AVIF/WebP after changing photos in assets-src/
```

## Signature pieces

| Section | What it does |
|---|---|
| Hero | Full-bleed library photograph with a green tint. The headline rises, then the firm’s **signature writes itself** — a script face revealed left-to-right with a glowing pen nib riding the ink. A circular **seal** turns slowly. |
| § 1 Statement | The firm’s position arrives **redacted**: key phrases sit under ink bars that are struck away as you scroll, revealing them in brass italic. |
| § 2 Practice | Six practice areas as a drawer of **case files** — choosing one slides its file out (matter code, summary, typical matters, lead partner, a “Reviewed” stamp). Inline accordion on mobile. |
| § 3 Record | Rolling figures on a dark ground and a ledger of anonymised recent matters whose rules draw in. |
| § 4 People | Partners as **monogram cards** (no stock faces posing as real people) that flip to show focus, admissions and languages; both faces shown on touch. |
| § 5 Consultation | Matter → urgency (recommends the lead partner) → day & time slot (some slots “taken”) → details, with a live summary card. Demo only. |
| § 6–7 | Insights reading list with a floating preview; FAQ accordion. |
| Footer | Offices with live local times, regulatory placeholder, and the firm name in large brass italic. |


## Re-skin

- **Copy & data** — `lib/content.ts` (firm, offices, hero & signature, redacted statement — `[brackets]` mark redactions, practice files, record, partners, booking options, insights, FAQ).
- **Photos** — `assets-src/<key>.jpg` → add to `ImageKey` → `npm run images`. Credits in `assets-src/CREDITS.md`.
- **Colour & type** — tokens at the top of `app/globals.css`; fonts in `app/layout.tsx`.

## Important

Castell & Reeve, its partners, matters, figures and bar admissions are fictional. Nothing on the page is legal advice, and the regulatory line is a placeholder — a real firm must replace it with its actual regulatory information.
