const GOAL = 2000;
const STEP = 250;
const KEY = "dailyWaterDemo";

const amount = document.getElementById("amount");
const target = document.getElementById("target");
const bar = document.getElementById("bar");
const message = document.getElementById("message");

let water = load();

function load() {
  const value = Number(localStorage.getItem(KEY));
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function save() {
  localStorage.setItem(KEY, water);
}

function update() {
  const percent = Math.min(water / GOAL * 100, 100);

  amount.textContent = water;
  target.textContent = `${water} / ${GOAL} ml`;
  bar.style.width = `${percent}%`;

  message.textContent =
    water >= GOAL ? "🎉 已達成每日飲水目標" : "";
}

document.getElementById("plus").addEventListener("click", () => {
  water += STEP;
  save();
  update();
});

document.getElementById("minus").addEventListener("click", () => {
  water = Math.max(0, water - STEP);
  save();
  update();
});

document.getElementById("reset").addEventListener("click", () => {
  water = 0;
  save();
  update();
});

update();
