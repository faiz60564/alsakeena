# AlSakeena Inc. — approved brand graphics

Check this guide before using or replacing any AlSakeena graphic. This folder is the persistent source of approved artwork; do not recreate a logo from memory or generate a substitute without explicit approval.

## Approved graphics

| File | Use | Original image |
| --- | --- | --- |
| [Full logo](approved/alsakeena-full-logo.svg) | Website header and footer; full brand signature with “Restoring Peace and Economic Dignity” | User-supplied PNG, 1983 × 793 |
| [Instagram profile image](approved/alsakeena-instagram-profile.svg) | Social profile/avatar; blue A, green S, sweeping underline, white background | User-approved generated PNG, 1254 × 1254 |

These SVG files are containers embedding the exact original PNG bytes. They are not vector redraws. The original pixels have not been resized, recolored, cropped, or compressed again.

For Instagram, export the embedded PNG using the helper below. Instagram needs the PNG rather than the SVG container. Preview the circular crop before uploading.

## Export original PNGs

From the repository root, run:

```sh
python3 brand/export-originals.py
```

This writes both original PNGs to `brand/exports/`. They are convenience exports; the approved files above remain the source of truth.

## Facebook cover

[Approved Facebook cover PNG](approved/alsakeena-facebook-cover.png) — user-approved banner featuring the full logo, “Rooted in peace. Built for dignity.”, the four areas of support, and alsakeena.org. Download the PNG directly for Facebook. Preserve this approved original and preview desktop/mobile cropping when uploading.

## Brand rules

- Organization name: **AlSakeena Inc.**
- Primary website blue: `#07517B`; green: `#21843A`.
- Keep each graphic’s original proportions and colors.
- Preserve the full logo’s tagline. Use the AS profile image when the full signature would be too small.
- Use white backgrounds and sufficient space around the mark.
- Do not crop, recolor, stretch, redraw, or replace approved artwork without approval.
- Website deployment copy of the approved full logo: `assets/alsakeena-peace-dignity-logo.svg`. Keep it in sync if a future replacement is approved.
- `assets/alsakeena-original-logo.png` is a legacy asset retained for compatibility/history, **not approved for new placements**.
- Other website photographs are existing site imagery, not approved brand logos; they were not added to this approved collection.

## Future changes

Inspect this folder before making branding changes. Preserve these approved originals. Document approval and intended use for any new graphic before changing active placements.
