# LPP Solver - Linear Programming Problem Solver

A web-based tool for solving Linear Programming Problems (LPP) using the **Simplex Method** with Two-Phase optimization.

## 🔗 Live Web App

Local development server: [http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/index.html)

Or open directly: `index.html` in any modern browser

## How It Works

### Problem Support
- **Objective**: Maximize or minimize `Z = c1·X + c2·Y`
- **Constraints**: Up to 6 linear constraints with `<=`, `>=`, or `=` operators
- **Variables**: Supports 2 decision variables (X, Y) — ideal for educational visualization

### Algorithm: Two-Phase Simplex Method
The solver uses the **Two-Phase Simplex Method** to handle all constraint types:

1. **Phase 1**: Finds a feasible starting solution by minimizing the sum of artificial variables. If the optimal value is non-zero, the problem is **infeasible**.

2. **Phase 2**: Uses the feasible solution from Phase 1 as the starting point, replaces the objective row with the actual objective function, and continues pivoting until the optimal solution is found.

### Key Features
- **Handles `>=` constraints**: Introduces surplus and artificial variables
- **Handles `=` constraints**: Introduces artificial variables
- **Detects infeasibility**: When artificial variables remain in the optimal Phase 1 solution
- **Detects unboundedness**: When no pivot column ratio can be selected
- **Graphical output**: Plots the feasible region and highlights the optimal point

### File Structure
| File | Description |
|------|-------------|
| `index.html` | Main web app with simplex solver, UI, and plotting |
| `test_simplex.js` | Test suite for the simplex solver (5 test cases) |
| `todo.md` | Development progress notes |
| `LICENSE` | License file |

### Usage
1. Enter coefficients for the objective function (c₁, c₂)
2. Select Maximize or Minimize
3. Add constraints (up to 6) with coefficients and operators
4. Click "Solve LPP"
5. View the solution (X, Y, Z values) and the graphical plot

### Running Tests
```bash
node test_simplex.js
```
