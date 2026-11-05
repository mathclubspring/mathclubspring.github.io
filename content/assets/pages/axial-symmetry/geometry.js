export const key = (x, y) => `${x},${y}`;
export const point = (cell) => cell.split(",").map(Number);

const directions = [
  {
    name: "вертикальная",
    project: (x) => x,
    scale: 2,
    reflect: (x, y, offset) => [offset - x, y],
    line: (offset, width, height) => [offset, 0, offset, height],
  },
  {
    name: "горизонтальная",
    project: (_, y) => y,
    scale: 2,
    reflect: (x, y, offset) => [x, offset - y],
    line: (offset, width) => [0, offset, width, offset],
  },
  {
    name: "диагональная ↘",
    project: (x, y) => x - y,
    scale: 1,
    reflect: (x, y, offset) => [y + offset, x - offset],
    line: (offset, width) => [0, -offset, width, width - offset],
  },
  {
    name: "диагональная ↗",
    project: (x, y) => x + y,
    scale: 1,
    reflect: (x, y, offset) => [offset - y, offset - x],
    line: (offset, width) => [0, offset, width, offset - width],
  },
];

export function axisLine(axis, width, height) {
  // Board coordinates put the center of cell (x, y) at (x + ½, y + ½).
  const originShift = [0.5, 0.5, 0, 1][axis.direction];
  const direction = directions[axis.direction];
  return direction.line(axis.offset / direction.scale + originShift, width, height);
}

function projectedBounds(cells, project) {
  const values = [...cells].map((cell) => project(...point(cell)));
  return [Math.min(...values), Math.max(...values)];
}

function missingReflections(cells, direction, offset) {
  const missing = new Set();
  for (const cell of cells) {
    const mirror = key(...direction.reflect(...point(cell), offset));
    if (!cells.has(mirror)) missing.add(mirror);
  }
  return missing;
}

export function symmetryAxes(cells) {
  if (!cells.size) return [];
  return directions.flatMap((direction, index) => {
    const [min, max] = projectedBounds(cells, direction.project);
    // Reflection exchanges the two extremes, so their midpoint fixes the axis.
    const offset = (min + max) * direction.scale / 2;
    if (!Number.isInteger(offset) || missingReflections(cells, direction, offset).size) return [];
    return [{ direction: index, offset, name: direction.name }];
  });
}

export function neighbors(cell) {
  const [x, y] = point(cell);
  return [key(x - 1, y), key(x + 1, y), key(x, y - 1), key(x, y + 1)];
}

export function adjacentEmptyCells(cells) {
  return new Set([...cells].flatMap(neighbors).filter((cell) => !cells.has(cell)));
}

export function isConnected(cells) {
  if (!cells.size) return false;
  const visited = new Set([cells.values().next().value]);
  for (const cell of visited) {
    for (const neighbor of neighbors(cell)) {
      if (cells.has(neighbor)) visited.add(neighbor);
    }
  }
  return visited.size === cells.size;
}

export function minimumCompletions(cells) {
  let count = cells.size + 1;
  const solutions = new Map();
  for (const direction of directions) {
    const [min, max] = projectedBounds(cells, direction.project);
    // An axis outside these bounds reflects every cell into an empty cell.
    // An axis through any one cell already needs fewer additions.
    for (let offset = min * direction.scale; offset <= max * direction.scale; offset++) {
      const missing = missingReflections(cells, direction, offset);
      if (missing.size > count) continue;
      if (missing.size < count) {
        count = missing.size;
        solutions.clear();
      }
      solutions.set([...missing].sort().join(";"), missing);
    }
  }
  return [...solutions.values()];
}

export function figureAfter(task, edits) {
  if (task.mode === "remove") {
    return new Set([...task.cells].filter((cell) => !edits.has(cell)));
  }
  return new Set([...task.cells, ...edits]);
}

export function prepareTask(definition) {
  const cells = new Set();
  const { rows, mode } = definition;
  rows.forEach((row, y) => {
    [...row].forEach((fill, x) => {
      if (fill === "#") cells.add(key(x, y));
    });
  });
  const adjacent = adjacentEmptyCells(cells);
  const task = { ...definition, cells, adjacent, width: rows[0].length, height: rows.length };
  const candidates = mode === "remove" ? cells : adjacent;
  const solutions = mode === "complete"
    ? minimumCompletions(cells)
    : [...candidates].map((cell) => new Set([cell])).filter((edits) => evaluate(task, edits).status === "correct");
  return { ...task, solutions, minimum: solutions[0]?.size };
}

export function evaluate(task, edits) {
  if (!edits.size) return { status: "empty" };
  if (task.mode !== "complete" && edits.size !== 1) return { status: "one" };
  if (task.mode === "remove" && [...edits].some((cell) => !task.cells.has(cell))) {
    return { status: "invalid" };
  }
  if (task.mode === "add" && [...edits].some((cell) => !task.adjacent.has(cell))) {
    return { status: "invalid" };
  }
  if (task.mode === "complete" && [...edits].some((cell) => task.cells.has(cell))) {
    return { status: "invalid" };
  }
  const figure = figureAfter(task, edits);
  if (task.mode === "remove" && !isConnected(figure)) return { status: "disconnected" };
  const axes = symmetryAxes(figure);
  if (task.mode === "complete") {
    if (!axes.length) return { status: "asymmetric" };
    if (edits.size > task.minimum) return { status: "too-many", axes };
  } else if (axes.length !== task.target) {
    return { status: "axis-count", axes };
  }
  return { status: "correct", axes };
}
