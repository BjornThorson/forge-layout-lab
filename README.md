# Forge Layout Lab ⚒️

A browser-based, experimental city planner for **Forge of Empires**. Forge Layout Lab lets you sketch an owned city footprint, add buildings, and generate candidate arrangements with road connections.

**Use the app:** https://forge-layout-lab.vercel.app

> **Project status:** Usable prototype, under active development. The optimizer is heuristic and the building catalogue needs further verification. See [BACKLOG.md](BACKLOG.md) for known issues and priorities.

## What it does

- Displays a fixed **56 × 56** planning grid with **4 × 4** expansion plots; starts with a **16 × 16** owned area.
- Lets you unlock or exclude expansion plots and lock expansion editing.
- Models a **7 × 6** Town Hall footprint, with coordinate controls and pointer dragging. Town Hall relocation by the optimizer is separately lockable.
- Adds buildings manually with name, dimensions, quantity, and road requirement: none, one-lane, or two-lane.
- Offers an age-filtered building catalogue, plus CSV/JSON catalogue import and JSON export.
- Generates candidate layouts using randomized packing and road routing; reports buildings that could not fit or lack road access.
- Supports mouse pan and zoom, touch interactions, JSON layout save/load, and PNG export.
- Accepts a screenshot as a **visual reference only**. It does not read buildings from screenshots.

## Quick start

Visit the [live app](https://forge-layout-lab.vercel.app), select the expansion plots you own, position the Town Hall, add buildings, and select **Generate**. Review the connected-building count and any unplaced buildings. Save a layout as JSON to return to it later, or export the result as PNG.

To run the source locally, clone the repository and open `index.html` in a modern browser. No build process or backend is required.

## Development and tests

Install Node.js, then:

```bash
npm install
npx playwright install chromium
npm test
```

The automated checks cover browser interactions, Town Hall movement, simulated touch gestures, layout JSON save/load, PNG and catalogue export, and independent road-network connectivity. They do **not** establish physical-device compatibility or guarantee that the optimizer finds the best arrangement.

The repository also contains catalogue and regression audit JSON files. These are **audit snapshots**, not proof that every catalogue entry has been independently verified.

## Known limitations

- **Optimization:** Randomized heuristics can leave buildings disconnected or unplaced even when better arrangements may exist. No global optimality guarantee.
- **Roads:** One- and two-lane routing is implemented, but more game-rule validation and dense-layout tests are needed.
- **Catalogue:** The 425-entry working catalogue is incomplete, particularly for later ages. Some names, dimensions, road requirements, and sources require verification.
- **Import:** Imported catalogue entries are session-only unless exported and saved.
- **Screenshots:** Reference images are not parsed into buildings or expansion ownership.
- **Touch:** Automated gesture tests include synthetic input; physical mobile and tablet testing is outstanding.

## Repository and release safety

This repository is the **source-of-truth backup** for future development. The Vercel deployment is a separate released copy. Editing source here or experimenting in a sandbox does **not** update the live app automatically.

Before a release: run the tests, check changes in a browser, deploy intentionally, and verify the public address resolves to the new deployment. Preserve both existing Vercel aliases when updating the live site.

## Planning

See [BACKLOG.md](BACKLOG.md) for prioritized work, acceptance criteria, and items deliberately outside the current scope.

*Forge of Empires is a game by InnoGames. This is an independent fan-made planning tool.*
