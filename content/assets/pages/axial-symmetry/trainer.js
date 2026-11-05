import { axisLine, evaluate, key, point } from "./geometry.js";
import { tasks } from "./tasks.js";

const $ = (id) => document.getElementById(`symmetry-${id}`);
const storageKey = "mathclub:axial-symmetry:v1";
const modes = {
  add: {
    title: "Добавь одну клетку",
    hint: "Представь линию сгиба. Где не хватает пары для закрашенной клетки?",
  },
  remove: {
    title: "Убери одну клетку",
    hint: "Представь линию сгиба. Поищи закрашенную клетку, у которой нет пары.",
  },
  complete: {
    title: "Докрась минимум клеток",
    hint: "Попробуй разные линии сгиба. Выбери ту, для которой не хватает меньше всего клеток.",
  },
};

const knownIds = new Set(tasks.map(({ id }) => id));
let saved;
try {
  saved = JSON.parse(localStorage.getItem(storageKey));
} catch {
  // The trainer still works when the browser blocks storage.
}
const solved = new Set(Array.isArray(saved?.solved) ? saved.solved.filter((id) => knownIds.has(id)) : []);
const attempts = new Map();
const grid = $("grid");
const overlay = $("axes");
const feedback = $("feedback");
let index = Math.max(0, tasks.findIndex(({ id }) => id === saved?.task));
let task, attempt, buttons, focusedCell;
let hintLevel = 0;

function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ task: task.id, solved: [...solved] }));
  } catch {
    // Progress remains available for the current session.
  }
}

function axisCount(count) {
  return `${count} ${count === 1 ? "ось" : count ? "оси" : "осей"}`;
}

function taskInstruction({ mode, target }) {
  const goal = `Должно получиться ровно ${axisCount(target)} симметрии.`;
  if (mode === "add") return `Закрась одну пустую клетку рядом с фигурой. Клетки должны касаться сторонами. ${goal}`;
  if (mode === "remove") return `Убери одну закрашенную клетку. Фигура должна остаться целой: её клетки соединены сторонами. ${goal}`;
  return "Добавь как можно меньше клеток, чтобы появилась хотя бы одна ось симметрии. Исходные клетки остаются на месте.";
}

const groups = {};
for (const [mode, { title }] of Object.entries(modes)) {
  const group = document.createElement("optgroup");
  group.label = title;
  $("task").append(group);
  groups[mode] = group;
}
for (const item of tasks) {
  const option = document.createElement("option");
  option.value = item.id;
  groups[item.mode].append(option);
}

function renderProgress() {
  $("progress").textContent = `Решено ${solved.size} из ${tasks.length}`;
  for (const [i, option] of [...$("task").options].entries()) {
    const { id, number } = tasks[i];
    option.textContent = `Задача ${number}${solved.has(id) ? " ✓" : ""}`;
  }
}

function showFeedback(message = "", correct = false) {
  feedback.textContent = message;
  feedback.toggleAttribute("data-correct", correct);
}

function clearFeedback() {
  hintLevel = 0;
  overlay.replaceChildren();
  grid.querySelector("[data-hint]")?.removeAttribute("data-hint");
  showFeedback();
}

function focusCell(cell) {
  buttons.get(focusedCell).tabIndex = -1;
  focusedCell = cell;
  buttons.get(focusedCell).tabIndex = 0;
}

function openTask(nextIndex) {
  index = nextIndex;
  task = tasks[index];
  if (!attempts.has(task.id)) attempts.set(task.id, { edits: new Set(), undo: [] });
  attempt = attempts.get(task.id);
  $("task").value = task.id;
  $("title").textContent = `${modes[task.mode].title} · Задача ${task.number}`;
  $("instruction").textContent = taskInstruction(task);
  $("note").hidden = task.id !== "remove-3";
  $("prev").disabled = index === 0;
  $("next").disabled = index === tasks.length - 1;
  $("field").style.setProperty("--sym-columns", task.width);
  overlay.setAttribute("viewBox", `0 0 ${task.width} ${task.height}`);

  const cells = document.createDocumentFragment();
  buttons = new Map();
  for (let y = 0; y < task.height; y++) {
    for (let x = 0; x < task.width; x++) {
      const cell = key(x, y);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "symmetry-cell";
      button.dataset.cell = cell;
      button.tabIndex = -1;
      cells.append(button);
      buttons.set(cell, button);
    }
  }
  const focusCandidates = task.mode === "remove" ? task.cells : task.adjacent;
  focusedCell = focusCandidates.values().next().value;
  buttons.get(focusedCell).tabIndex = 0;
  grid.replaceChildren(cells);
  clearFeedback();
  renderBoard();
  renderProgress();
  saveProgress();
}

function renderBoard() {
  const { edits, undo } = attempt;
  for (const [cell, button] of buttons) {
    const original = task.cells.has(cell);
    const edited = edits.has(cell);
    const fill = edited ? (original ? "removed" : "added") : (original ? "original" : "empty");
    const [x, y] = point(cell);
    const state = { removed: "убрана", added: "добавлена", original: "закрашена", empty: "пуста" };
    button.dataset.fill = fill;
    button.setAttribute("aria-label", `Ряд ${y + 1}, столбец ${x + 1}, клетка ${state[fill]}`);
    button.setAttribute("aria-pressed", String(edited));
  }
  $("count").textContent = task.mode === "remove" ? `Убрано клеток: ${edits.size}` : `Добавлено клеток: ${edits.size}`;
  $("undo").disabled = !undo.length;
  $("reset").disabled = !edits.size && !undo.length;
}

function editCell(cell) {
  const original = task.cells.has(cell);
  if (task.mode === "remove" ? !original : original) {
    clearFeedback();
    showFeedback(task.mode === "remove" ? "Выбери закрашенную клетку." : "Выбери пустую клетку.");
    return;
  }
  if (task.mode === "add" && !task.adjacent.has(cell)) {
    clearFeedback();
    showFeedback("Выбери пустую клетку, которая касается фигуры стороной.");
    return;
  }
  const { edits, undo } = attempt;
  undo.push(edits);
  if (task.mode === "complete") {
    attempt.edits = new Set(edits);
    if (edits.has(cell)) attempt.edits.delete(cell);
    else attempt.edits.add(cell);
  } else {
    attempt.edits = new Set(edits.has(cell) ? [] : [cell]);
  }
  clearFeedback();
  renderBoard();
}

function drawAxes(axes) {
  for (const axis of axes) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const endpoints = axisLine(axis, task.width, task.height);
    ["x1", "y1", "x2", "y2"].forEach((attribute, i) => line.setAttribute(attribute, endpoints[i]));
    overlay.append(line);
  }
}

function check() {
  clearFeedback();
  const { status, axes } = evaluate(task, attempt.edits);
  if (status === "correct") {
    drawAxes(axes);
    solved.add(task.id);
    saveProgress();
    renderProgress();
    const names = axes.map(({ name }) => name).join(", ");
    const result = task.mode === "complete" ? `Найден минимум — ${task.minimum}.` : "Верно!";
    showFeedback(`${result} Оси на рисунке: ${names}.`, true);
    return;
  }
  const messages = {
    empty: task.mode === "remove" ? "Сначала убери клетку." : "Сначала закрась клетку.",
    one: "Измени ровно одну клетку.",
    invalid: "Выбери другую клетку.",
    disconnected: "Фигура распалась на части. Попробуй убрать другую клетку.",
    asymmetric: "Пока осей симметрии нет. Попробуй изменить закраску.",
    "too-many": "Симметрия есть, но можно добавить меньше клеток. Попробуй ещё.",
    "axis-count": `Получилось ${axisCount(axes?.length ?? 0)} симметрии. Нужно ${axisCount(task.target)}.`,
  };
  showFeedback(messages[status]);
}

function showHint() {
  overlay.replaceChildren();
  grid.querySelector("[data-hint]")?.removeAttribute("data-hint");
  if (hintLevel++ === 0) {
    showFeedback(modes[task.mode].hint);
    return;
  }
  const { edits } = attempt;
  const changes = task.solutions.map((solution) => ({
    extra: [...edits].filter((cell) => !solution.has(cell)),
    missing: [...solution].filter((cell) => !edits.has(cell)),
  }));
  changes.sort((a, b) => a.extra.length + a.missing.length - b.extra.length - b.missing.length);
  const { extra, missing } = changes[0];
  const cell = task.mode === "complete" ? extra[0] ?? missing[0] : missing[0];
  if (!cell) {
    showFeedback("Нажми «Проверить», чтобы увидеть результат.");
    return;
  }
  buttons.get(cell).setAttribute("data-hint", "");
  const [x, y] = point(cell);
  const action = task.mode === "remove" ? "Убери клетку" : edits.has(cell) ? "Сними закраску" : "Закрась клетку";
  showFeedback(`${action}: ряд ${y + 1}, столбец ${x + 1}.`);
}

grid.addEventListener("click", (event) => {
  const { cell } = event.target.dataset;
  if (!cell) return;
  focusCell(cell);
  editCell(cell);
});
grid.addEventListener("keydown", (event) => {
  const offsets = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  const offset = offsets[event.key];
  if (!offset || !event.target.dataset.cell) return;
  event.preventDefault();
  const [x, y] = point(event.target.dataset.cell);
  const cell = key(x + offset[0], y + offset[1]);
  if (!buttons.has(cell)) return;
  focusCell(cell);
  buttons.get(cell).focus();
});

$("check").addEventListener("click", check);
$("hint").addEventListener("click", showHint);
$("undo").addEventListener("click", () => {
  attempt.edits = attempt.undo.pop();
  clearFeedback();
  renderBoard();
  if ($("undo").disabled) buttons.get(focusedCell).focus();
});
$("reset").addEventListener("click", () => {
  attempt.edits = new Set();
  attempt.undo = [];
  clearFeedback();
  renderBoard();
  buttons.get(focusedCell).focus();
});
$("task").addEventListener("change", (event) => {
  openTask(tasks.findIndex(({ id }) => id === event.target.value));
});
for (const [button, step] of [["prev", -1], ["next", 1]]) {
  $(button).addEventListener("click", () => {
    openTask(index + step);
    $("task").focus();
  });
}

openTask(index);
$("trainer").hidden = false;
