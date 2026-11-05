import assert from "node:assert/strict";
import test from "node:test";
import {
  axisLine, evaluate, isConnected, key, minimumCompletions, point, prepareTask, symmetryAxes,
} from "../content/assets/pages/axial-symmetry/geometry.js";
import { tasks } from "../content/assets/pages/axial-symmetry/tasks.js";

const cells = (...points) => new Set(points.map(([x, y]) => key(x, y)));
const cellList = (set) => [...set].sort().join(" ");
const solutionList = (sets) => sets.map(cellList).sort();

test("recognizes between-cell and diagonal axes and draws them in grid coordinates", () => {
  const pair = cells([0, 0], [1, 0]);
  assert.deepEqual(symmetryAxes(pair).map((axis) => axisLine(axis, 3, 2)), [[1, 0, 1, 2], [0, .5, 3, .5]]);

  const diagonal = cells([2, 1], [3, 2]);
  assert.deepEqual(symmetryAxes(diagonal).map((axis) => axisLine(axis, 5, 4)), [[0, -1, 5, 4], [0, 5, 5, 0]]);
  assert.equal(symmetryAxes(cells([-1, -2], [-1, -1], [0, -2], [0, -1])).length, 4);
  assert.equal(symmetryAxes(new Set()).length, 0);
});

test("corner contact is not connectivity, and an articulation cell cannot be removed", () => {
  assert.equal(isConnected(cells([1, 1], [2, 2])), false);
  assert.equal(isConnected(new Set()), false);
  assert.equal(isConnected(cells([2, 2])), true);
  const task = prepareTask({ mode: "remove", target: 2, rows: ["###"] });
  assert.equal(evaluate(task, cells([1, 0])).status, "disconnected");
  assert.equal(evaluate(task, cells([0, 0])).status, "correct");
  assert.equal(evaluate(task, cells([2, 0])).status, "correct");
  assert.equal(evaluate(task, cells([3, 0])).status, "invalid");
});

test("enforces one side-adjacent addition and the exact number of axes", () => {
  const task = tasks[0];
  assert.equal(evaluate(task, new Set()).status, "empty");
  assert.equal(evaluate(task, cells([6, 3], [7, 3])).status, "one");
  assert.equal(evaluate(task, cells([1, 2])).status, "invalid");
  assert.equal(evaluate(task, cells([4, 0])).status, "axis-count");
  assert.equal(evaluate(task, cells([6, 3])).status, "correct");
  assert.equal(evaluate({ ...task, target: 2 }, cells([6, 3])).status, "axis-count");
});

test("finds tied minimal completions and accepts each one", () => {
  const task = prepareTask({ mode: "complete", rows: ["###", "##."] });
  assert.deepEqual(solutionList(task.solutions), ["-1,0", "0,2", "1,-1", "2,1"]);
  for (const solution of task.solutions) assert.equal(evaluate(task, solution).status, "correct");
  assert.equal(evaluate(task, cells([2, 1], [0, 2], [1, 2], [2, 2])).status, "too-many");
  assert.equal(evaluate(task, cells([0, 0])).status, "invalid");
});

test("minimal completions match a subset search for all nonempty 2×3 patterns", () => {
  const domain = Array.from({ length: 81 }, (_, i) => key(i % 9 - 3, Math.floor(i / 9) - 3));
  const seed = ["0,0", "1,0", "2,0", "0,1", "1,1", "2,1"];
  for (let mask = 1; mask < 2 ** seed.length; mask++) {
    const original = new Set(seed.filter((_, i) => mask & (1 << i)));
    const candidates = domain.filter((cell) => !original.has(cell));
    const reference = [[]];
    for (const cell of candidates) reference.push([cell]);
    for (const [i, cell] of candidates.entries()) {
      for (const other of candidates.slice(i + 1)) reference.push([cell, other]);
    }
    const valid = reference.filter((add) => symmetryAxes(new Set([...original, ...add])).length);
    const minimum = Math.min(...valid.map((add) => add.length));
    assert.deepEqual(solutionList(minimumCompletions(original)),
      solutionList(valid.filter((add) => add.length === minimum).map((add) => new Set(add))),
      cellList(original));
  }
});

test("all 18 source figures have a reachable solution with the expected minimum", () => {
  assert.deepEqual(tasks.map(({ minimum }) => minimum), [
    1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 4, 5, 2, 3, 2, 3, 3,
  ]);
  assert.equal(new Set(tasks.map(({ id }) => id)).size, 18);
  for (const task of tasks) {
    assert.ok(task.rows.every((row) => row.length === task.width && /^[.#]+$/.test(row)), task.id);
    assert.ok(isConnected(task.cells), task.id);
    for (const solution of task.solutions) {
      assert.equal(evaluate(task, solution).status, "correct", task.id);
      for (const cell of solution) {
        const [x, y] = point(cell);
        assert.ok(x >= 0 && x < task.width && y >= 0 && y < task.height, task.id);
      }
    }
  }
  // The source says one axis for this figure, but its sole solution has two.
  const corrected = tasks.find(({ id }) => id === "remove-3");
  assert.deepEqual(solutionList(corrected.solutions), ["5,8"]);
  assert.deepEqual(evaluate(corrected, cells([5, 8])).axes.map(({ direction }) => direction), [2, 3]);
  assert.equal(prepareTask({ ...corrected, target: 1 }).solutions.length, 0);
});
