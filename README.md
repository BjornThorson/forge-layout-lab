# Forge Layout Lab

A browser-based city layout planner and road-aware packing experiment for **Forge of Empires**.

**Live application:** https://forge-layout-lab.vercel.app

## Running locally

Open `index.html` in a modern browser. No build step is required.

## Browser regression tests

The tests use [Playwright](https://playwright.dev/) and Chromium.

```bash
npm install
npx playwright install chromium
npm test
```

The test suites cover mouse interactions, simulated touch interactions, layout JSON import/export, PNG export, and road connectivity. Synthetic touch tests are not a substitute for testing on physical touch hardware.

## Limitations

- The optimizer uses a randomized heuristic. It does not guarantee a globally optimal layout.
- Some placed buildings may lack road access; the interface reports partial results.
- The building catalogue is incomplete and contains entries requiring source verification.
- Screenshot upload is a visual reference, not automatic building recognition.

## Development and deployment

The source and regression tests are tracked here independently of the development sandbox. Changes to this repository or the sandbox do **not** automatically update the live website. Deployments should be intentional and tested.
