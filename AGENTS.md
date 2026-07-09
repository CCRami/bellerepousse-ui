# Belle Repousse Shopify Theme Rules

This repository is the Shopify Horizon theme fork for Belle Repousse.

- GitHub repo: `CCRami/bellerepousse-ui`
- Upstream theme: `Shopify/horizon`
- Shopify store: `bellerepousse.myshopify.com`
- Market: France
- Currency: EUR
- Customer-facing copy: French

## Product Focus

Belle Repousse launches as a single-product store:

`Brosse de massage cuir chevelu LED rouge 630 nm avec applicateur d'huile`

Preserve these facts in product, collection, and theme copy:

- 3 massage modes
- 72 rounded silicone teeth
- 630 nm red light feature
- 6 ml liquid reservoir
- 8 roller balls for oil, serum, or lotion
- USB-C rechargeable lithium battery, 1400 mAh
- About 3 hours charging time
- 10 minute timer
- 21.2 x 8.5 x 3.5 cm, 233 g

Use SEO phrases naturally: `brosse de massage cuir chevelu`, `masseur cuir
chevelu`, `applicateur huile capillaire`, `soin du cuir chevelu`, `brosse LED
rouge 630 nm`, and `routine cheveux a la maison`.

Avoid medical promises. Do not guarantee hair regrowth or claim treatment of
hair loss. Prefer "aide a masser", "accompagne la routine capillaire", and
"aide a repartir le soin".

## Theme Rules

Never edit files in `layout/`. Add sections, blocks, snippets, or assets
instead.

Do not add inline styles to Liquid templates. Component styling belongs in an
asset CSS file loaded from the section or snippet with `stylesheet_tag`.

Keep schema settings merchant-friendly:

- Human-readable labels
- Realistic French defaults
- `info` fields when useful

Be surgical. Do not refactor unrelated Horizon code or rename existing schema
IDs unless explicitly requested.

## Validation

Before handing off:

1. Validate JSON with `jq`.
2. Run `shopify theme check` when Shopify CLI is available.
3. Check `git status`.
4. Push to `origin main` only when the user wants the GitHub-connected theme to
   update.
