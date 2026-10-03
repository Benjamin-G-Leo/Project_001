// Simplex Method Tests - FIXED
const EPS = 1e-9;

function runSimplex(tableau, m, rc, basis, skipCols) {
    while (true) {
        let pc = -1, best = -EPS;
        for (let j = 0; j < rc; j++) {
            if (skipCols && skipCols.includes(j)) continue;
            if (tableau[m][j] < best) { best = tableau[m][j]; pc = j; }
        }
        if (pc === -1) break;
        let pr = -1, mr = Infinity;
        for (let i = 0; i < m; i++) {
            if (tableau[i][pc] > EPS) {
                const r = tableau[i][rc] / tableau[i][pc];
                if (r < mr) { mr = r; pr = i; }
            }
        }
        if (pr === -1) return { unbounded: true };
        basis[pr] = pc;
        const pv = tableau[pr][pc];
        for (let j = 0; j <= rc; j++) tableau[pr][j] /= pv;
        for (let i = 0; i <= m; i++) {
            if (i !== pr) { const f = tableau[i][pc]; for (let j = 0; j <= rc; j++) tableau[i][j] -= f * tableau[pr][j]; }
        }
    }
    return { unbounded: false };
}

function solveSimplex(cInput, A, b, ops, objType) {
    let c = cInput.slice();
    if (objType === 'min') c = c.map(x => -x);
    const m = A.length, n = c.length;
    let nV = n;
    let basis = [], art = [], tableau = [];

    for (let i = 0; i < m; i++) {
        let row = new Array(n).fill(0);
        for (let j = 0; j < A[i].length; j++) row[j] = A[i][j];
        if (b[i] < -EPS) {
            for (let j = 0; j < n; j++) row[j] = -row[j];
            b[i] = -b[i];
            ops[i] = ops[i] === '<=' ? '>=' : ops[i] === '>=' ? '<=' : '=';
        }
        while (row.length < nV) row.push(0);
        if (ops[i] === '<=') { row.push(1); basis.push(nV++); }
        else if (ops[i] === '>=') { row.push(-1); row.push(1); basis.push(nV + 1); art.push(nV + 1); nV += 2; }
        else { row.push(1); basis.push(nV); art.push(nV); nV++; }
        tableau.push(row);
    }
    for (let i = 0; i < m; i++) {
        while (tableau[i].length < nV) tableau[i].push(0);
        tableau[i][nV] = b[i];
    }
    const RHS = nV;

    let p1obj = new Array(nV + 1).fill(0);
    for (const av of art) p1obj[av] = 1;
    for (let i = 0; i < m; i++) { if (art.includes(basis[i])) for (let j = 0; j <= RHS; j++) p1obj[j] -= tableau[i][j]; }
    tableau.push(p1obj);
    let r1 = runSimplex(tableau, m, RHS, basis);
    if (r1.unbounded) return { status: 'unbounded', msg: 'Unbounded' };
    if (tableau[m][RHS] < -EPS) return { status: 'infeasible', msg: 'Infeasible' };

    let obj = new Array(nV + 1).fill(0);
    for (let j = 0; j < n; j++) obj[j] = -c[j];
    for (let i = 0; i < m; i++) { const bi = basis[i]; if (obj[bi] !== 0) { const f = obj[bi]; for (let j = 0; j <= RHS; j++) obj[j] -= f * tableau[i][j]; } }
    for (const av of art) obj[av] = 0;
    tableau[m] = obj;

    let r2 = runSimplex(tableau, m, RHS, basis, art);
    if (r2.unbounded) return { status: 'unbounded', msg: 'Unbounded' };

    let sol = new Array(n).fill(0);
    for (let i = 0; i < m; i++) { if (basis[i] < n) sol[basis[i]] = tableau[i][RHS]; }
    let z = 0; for (let j = 0; j < n; j++) z += cInput[j] * sol[j];
    return { status: 'optimal', solution: sol, z: z, msg: 'Optimal found' };
}

// TEST 1: Max Z=3x+2y, x+y<=4, 2x+y<=6 -> (2,2,10)
let t1 = solveSimplex([3,2], [[1,1],[2,1]], [4,6], ['<=','<='], 'max');
let p1 = t1.status === 'optimal' && Math.abs(t1.solution[0]-2)<0.01 && Math.abs(t1.solution[1]-2)<0.01 && Math.abs(t1.z-10)<0.01;
console.log('Test 1:', JSON.stringify(t1), p1 ? 'PASS' : 'FAIL');

// TEST 2: Infeasible (x+y>=3 AND x+y<=2 with x,y>=0)
let t2 = solveSimplex([1,1], [[1,1],[1,1]], [3,2], ['>=','<='], 'max');
let p2 = t2.status === 'infeasible';
console.log('Test 2:', t2.status, p2 ? 'PASS' : 'FAIL');

// TEST 3: 3-var min: Min x1+2x2+3x3 s.t. x1+x2+x3>=1, x1+2x2>=2 -> (0,1,0), z=2
let t3 = solveSimplex([1,2,3], [[1,1,1],[1,2,0]], [1,2], ['>=','>='], 'min');
let p3 = t3.status === 'optimal' && Math.abs(t3.solution[0])<0.01 && Math.abs(t3.solution[1]-1)<0.01 && Math.abs(t3.solution[2])<0.01 && Math.abs(t3.z-2)<0.01;
console.log('Test 3:', JSON.stringify(t3), p3 ? 'PASS' : 'FAIL');

// TEST 4: 3-var max: Max 2x+3y+z s.t. x+y+z<=5, x+2y+3z>=6 -> (0,5,0), z=15
let t4 = solveSimplex([2,3,1], [[1,1,1],[1,2,3]], [5,6], ['<=','>='], 'max');
let p4 = t4.status === 'optimal' && Math.abs(t4.z - 15) < 0.01;
console.log('Test 4:', JSON.stringify(t4), p4 ? 'PASS' : 'FAIL');

// TEST 5: Bounded: Max x, s.t. -x >= -1 (equivalent to x <= 1) -> (1,1)
let t5 = solveSimplex([1], [[-1]], [-1], ['>='], 'max');
let p5 = t5.status === 'optimal' && Math.abs(t5.solution[0]-1)<0.01 && Math.abs(t5.z-1)<0.01;
console.log('Test 5:', JSON.stringify(t5), p5 ? 'PASS' : 'FAIL');

// Summary
let allPass = p1 && p2 && p3 && p4 && p5;
console.log('\n' + (allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'));
