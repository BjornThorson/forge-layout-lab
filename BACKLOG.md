# Forge Layout Lab: Development Backlog

Last reviewed: **2026-10-16**. This is a working plan, not a promise of delivery dates.

## Current baseline

- Deployed browser prototype at https://forge-layout-lab.vercel.app.
- 56 × 56 map, expansion editing, Town Hall positioning, building list, age-filtered catalogue, heuristic placement, road routing, JSON save/load, PNG export.
- Browser regression suites and an independent road-network validator are in the repository.
- Source is version controlled independently of the development sandbox.

## P0: Protect correctness and recoverability

- [ ] **Make releases reproducible.** Document or automate the GitHub-to-Vercel release path; deploy only after explicit approval. Verify both public aliases and a post-deployment smoke test.
  - *Done when:* a fresh checkout can be tested and deployed with documented steps, and the deployed version is traceable to a commit.
- [ ] **Validate save-file boundaries.** Check excluded-cell ranges, Town Hall position, road requirements, and dimensions during JSON import. Provide actionable errors and a versioned schema.
  - *Done when:* malformed files cannot silently create invalid map state, and valid older saves still load.
- [ ] **Test actual touch hardware.** Check tapping expansions, panning, pinch zoom, Town Hall dragging, and accidental tap/drag activation on phone and tablet.
  - *Done when:* representative real-device workflows pass and defects have regression tests.

## P1: Improve layout quality

- [ ] **Repair disconnected placements.** Add a targeted second pass that identifies disconnected buildings, attempts local relocation, and accepts changes only when the scoring objective improves.
  - *Done when:* a fixed benchmark suite shows better connectivity without significant regression in placed count or runtime.
- [ ] **Build deterministic benchmark fixtures.** Include sparse, dense, fragmented, and mixed one-/two-lane layouts; record connected count, placed count, road area, and runtime.
  - *Done when:* baseline and candidate results can be reproduced with fixed random seeds.
- [ ] **Verify two-lane road geometry against game rules.** Test continuity, junctions, adjacency, and unusual obstacles rather than only graph reachability.
  - *Done when:* fixtures independently validate all reported two-lane connections.
- [ ] **Improve partial-result explanations.** Distinguish no room, no road path, and optimizer-search limitations.
  - *Done when:* the UI explains why each unserved building was not successfully accommodated, without presenting heuristic guesses as certainty.

## P1: Make the building catalogue trustworthy

- [ ] **Audit existing entries.** Review missing sources, generic age-page citations, and unsubstantiated verification labels.
  - *Done when:* each verified entry links to evidence for its name, dimensions, age, and road requirement.
- [ ] **Expand coverage across ages, especially Space Ages.** Use traceable, per-building evidence and mark uncertain entries explicitly.
  - *Done when:* coverage is measured against a defined reference list; no invented completeness claims.
- [ ] **Separate catalogue data from application logic.** Store versioned data in a maintainable format and validate it automatically.
  - *Done when:* entries can be reviewed and updated without editing the application script.

## P2: Usability and maintainability

- [ ] **Improve mobile responsiveness and accessibility.** Keyboard access, focus states, labels, contrast, and touch-target sizing.
- [ ] **Modularize the single-file app.** Extract optimizer, road router, catalogue, and UI into testable modules while preserving the no-backend experience.
- [ ] **Add a clear legend and layout diagnostics.** Distinguish excluded plots, roads, two-lane roads, connected buildings, and disconnected buildings.
- [ ] **Improve catalogue import persistence.** Make imported custom entries recoverable between sessions with clear export/backup controls.
- [ ] **Improve image export.** Add an optional legend and readable building labels, subject to visual clarity.

## Research / future ideas, not committed scope

- [ ] Explore screenshot-assisted recognition only after a feasibility and accuracy assessment.
- [ ] Explore smarter search algorithms and multi-objective trade-offs once deterministic benchmarks exist.
- [ ] Investigate game-specific building mechanics that cannot be represented by simple rectangles and road widths.

## Explicit non-goals for the current prototype

- Claiming globally optimal arrangements.
- Claiming a complete, fully verified catalogue.
- Automatically reading city ownership or buildings from screenshots.
- Requiring AI or a backend service to use the planner.

## Working rules

1. Prefer **correctness over apparent completeness**. Flag uncertain catalogue entries and unsupported assumptions.
2. Keep **exploration separate from accepted implementation**. Benchmark algorithm changes against the current baseline.
3. Add regression tests for confirmed bugs.
4. Treat **GitHub source, development sandbox, and live deployment** as separate environments.
5. Do not deploy automatically. Obtain approval before updating the public app.
