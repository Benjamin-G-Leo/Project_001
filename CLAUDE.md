# CLAUDE.md

LPP Solver — a single-page web app that solves 2-variable Linear Programming Problems with the Two-Phase Simplex Method and plots the feasible region. Live on GitHub Pages: https://benjamin-g-leo.github.io/Project_001/

## Commands

```bash
node test_simplex.js       # 5 solver tests; should end with "ALL TESTS PASSED"
open index.html            # or serve locally (README uses VS Code Live Server at http://127.0.0.1:5500/index.html)
```

No build step, no package.json. Tailwind (`cdn.tailwindcss.com`) and Chart.js (jsDelivr) load from CDNs.

## Structure

Everything lives in `index.html` (~400 lines): markup, Tailwind classes, and an inline `<script>` with
- `runSimplex` / `solveSimplex` — the Two-Phase Simplex solver (Phase 1 minimises artificials → infeasible if non-zero; Phase 2 optimises the real objective; no pivot row → unbounded)
- `parseInputs`, `num`, `createConstraintRow` — form handling (up to 6 constraints, `<=`, `>=`, `=`)
- `plotGraph` — Chart.js plot of constraint lines, the feasible region (from pairwise line intersections) and the optimal point

## Important: the solver is duplicated

`test_simplex.js` contains its **own copy** of `runSimplex`/`solveSimplex` (constant `EPS` instead of `SIMP_EPS`, slightly different messages) — it does not import from `index.html`. When changing the solver in `index.html`, apply the same change to `test_simplex.js` and run `node test_simplex.js`. Add a test case for any bug you fix.

## Deployment

GitHub Pages serves the `main` branch root; `.nojekyll` must stay so Pages serves files as-is. Pushing to `main` deploys.

## Conventions

- Keep it a single dependency-free HTML file; dark-mode Tailwind styling.
- `todo.md` is the original build roadmap (all phases done) — update it if adding new phases of work.
