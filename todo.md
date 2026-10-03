# LPP Calculator Web App - Development Roadmap

## Phase 0: Setup & Planning
- [x] Create todo.md (current step)
- [x] Verify project structure and dependencies (Tailwind CDN, Chart.js CDN)

## Phase 1: Basic UI Structure
- [x] Create index.html with basic HTML5 boilerplate
- [x] Add Tailwind CSS via CDN and configure dark mode
- [x] Add Chart.js via CDN
- [x] Create minimalist dark-mode container
- [x] Add heading: "Linear Programming Problem Solver"

## Phase 2: Objective Function Input
- [x] Create input fields for objective function coefficients (c1 for X, c2 for Y)
- [x] Add dropdown for Maximize/Minimize selection
- [x] Label inputs clearly (e.g., "Maximize Z = c1*X + c2*Y")
- [x] Apply Tailwind styling for dark mode inputs

## Phase 3: Constraints Section
- [x] Create constraints container with heading "Subject to:"
- [x] Add initial constraint row template (2 coefficient inputs, inequality selector, constant input)
- [x] Implement "Add Constraint" button to duplicate row template
- [x] Implement "Remove Constraint" button per row (when >1 row exists)
- [x] Style constraint rows with Tailwind

## Phase 4: Solve Button & Results Display
- [x] Add "Solve LPP" button below constraints
- [x] Create results container (initially hidden)
- [x] Add solution display: optimal X, Y, and Z (objective value)
- [x] Add status message area (e.g., "Feasible region found", "Unbounded", "Infeasible")
- [x] Style results with Tailwind

## Phase 5: Graph Visualization
- [x] Add canvas element for Chart.js graph below results
- [x] Set canvas dimensions and dark mode styling
- [x] Initialize empty Chart.js scatter/line chart

## Phase 6: Core Logic - Solver (2D Simplex/Graphical)
- [x] Implement function to parse inputs into numbers (with validation)
- [x] Implement feasibility check for constraints (for 2 variables)
- [x] Implement corner point enumeration method:
  * Generate all intersection points of constraint lines (including axes)
  * Filter points that satisfy all constraints
  * Evaluate objective function at each feasible point
  * Select optimal point (max/min)
- [x] Handle special cases: unbounded, infeasible, multiple optimal solutions
- [x] Return solution object or error

## Phase 7: Graph Plotting
- [x] Implement function to plot constraint lines on Chart.js
- [x] Implement function to shade feasible region (using polygon/line with fill)
- [x] Implement function to plot optimal point
- [x] Update chart when solve button clicked
- [x] Handle axis scaling based on constraint constants

## Phase 8: Validation & Error Handling
- [x] Add input validation (numeric values only)
- [x] Display inline errors for invalid inputs
- [x] Prevent solving if validation fails
- [x] Console log key steps for debugging (solver inputs, corner points, etc.)
- [x] Display user-friendly error messages in UI

## Phase 9: Testing & Refinement
- [x] Test with known LPP examples (e.g., maximize 3x+2y subject to constraints)
- [x] Verify solution matches expected results
- [x] Verify graph correctly shows feasible region and optimal point
- [x] Refine UI for clarity and responsiveness
- [x] Ensure dark mode consistency
- [x] Clean up console logs (keep only essential debug info)

## Phase 10: Final Polish
- [x] Add subtle animations/transitions (Tailwind)
- [x] Ensure mobile responsiveness
- [x] Add placeholder/example data for demonstration
- [x] Verify token efficiency in code (concise, self-documenting)
- [x] Final review against requirements
