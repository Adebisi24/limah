# Limah — Home & Living

Design handoff for a home and interiors editorial publication. This repository contains the latest eight desktop/mobile wireframes and Python generators. It is not yet a working Next.js/Sanity/Supabase application.

## Preview

Run `python -m http.server 8765` from the repository root and open `http://localhost:8765/`. All eight previews are linked there.

## Files

- `outputs/`: latest layouts and browser previews, including 1–3 retailer-button variants for Best Products.
- `assets/`: shared images referenced by the checked-in SVGs.
- `work/build_*.py`: editable design generators, with input images in `work/`.
- `docs/DESIGN_DECISIONS.md`: latest user-approved changes.

The checked-in SVGs reference shared local images to keep Git history small. To generate standalone SVGs with embedded images for Figma import, run the appropriate generator from the repository root, for example `python work/build_look.py`. This overwrites its local outputs with standalone versions. Keep optimized files in Git unless intentionally changing this storage choice.

The generators require Python's standard library only. Photography, product illustrations, author information and editorial samples are placeholders. Product availability, specifications and testing have not been verified. Replace imagery with confirmed licensed assets before publication.

## Application setup

The earlier ChatGPT discussion referenced a starter archive, but that archive/application source was not present in this workspace or repository at handoff. Do not treat its stated package versions or validation claims as verified.

Next steps: establish the application source, configure Sanity content types and datasets, then agree what Supabase will own (such as reader accounts or saved items) before adding it. Keep editorial content and products in Sanity unless the architecture is explicitly changed. Do not commit credentials. No Sanity or Supabase project has been connected by this upload.
