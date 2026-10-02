# UNDEFAULT AI

UNDEFAULT AI is a design-led editorial concept exploring why AI-generated interfaces often converge on familiar defaults.

## Local development

```bash
npm install
npm run dev -- --host 0.0.0.0
```

The app runs at http://localhost:5173.

## How the detector works

The current version is a deterministic, rule-based detector.

When a user uploads a screenshot:

1. The file is validated as PNG, JPG, or WEBP.
2. The browser reads the image into a canvas.
3. The detector samples pixel data and calculates:
   - average brightness
   - average saturation
   - blue / purple colour bias
   - central layout bias
   - image aspect ratio
4. It then flags familiar SaaS patterns such as:
   - centred hero layouts
   - purple / blue gradients
   - rounded cards
   - high-contrast sans-serif feel
5. It returns a score and recommendations without claiming the design was created by AI.

This keeps the MVP inexpensive and predictable while keeping a clear path to a future AI-powered provider abstraction.

## Cloudflare architecture

The project includes a Cloudflare Worker and an R2 bucket configuration for temporary screenshot storage:

- Worker: `workers/detector/index.js`
- Config: `wrangler.toml`
- Bucket binding: `DEFAULT_DETECTOR`
- Bucket name: `default-detector`

This is intended for the upload flow described in the product brief. The Worker validates the upload, stores the file in the private bucket, and returns a visual-analysis result.

### Deploying to Cloudflare

1. Install Wrangler if needed.
2. Create the R2 bucket in Cloudflare:
   ```bash
   npx wrangler r2 bucket create default-detector
   ```
3. Authenticate Wrangler.
4. Run:
   ```bash
   npm run deploy:cf
   ```

## Notes

- The detector is intentionally rule-based for the MVP.
- The architecture is already structured for a future `AnalysisProvider` abstraction.

## Design system

UNDEFAULT and DEFAULT are two separate visual worlds, and their tokens never mix (`src/index.css`).

- **UNDEFAULT**: white paper, black ink, and one marker yellow (`--mark`). Yellow is the opposite hue of the default's blue-violet, and it is only ever used as a highlight behind ink to mark a decision. It is never used as text colour or decoration.
- **Type**: serif for the voice, monospace for annotations. Geometric sans-serif (`--d-sans`) belongs only to the DEFAULT world.
- **Shape and motion**: square corners, 1px black rules where something is divided, and no decorative animation.
- **DEFAULT** (`--d-*`): blue/violet gradient, geometric sans, rounded surfaces, glow. These are used only in the DEFAULT section, the hero's "by default" view, and the vague-prompt thumbnails.

The footer colophon states the reason for each choice. Add a reason there before adding a new visual element.
