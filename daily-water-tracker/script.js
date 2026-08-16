const DAILY_GOAL = 2000;
const WATER_STEP = 250;
const STORAGE_KEY = "dailyWaterAmount";

const currentAmountEl = document.getElementById("currentAmount");
const targetTextEl = document.getElementById("targetText");
const progressBarEl = document.getElementById("progressBar");
const progressPercentEl = document.getElementById("progressPercent");
const successMessageEl = document.getElementById("successMessage");
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const resetBtn = document.getElementById("resetBtn");

let waterAmount = loadWaterAmount();

function loadWaterAmount() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return 0;
    }

    const parsed = Number(saved);

    // 無效資料、負數或非有限數值一律視為 0。
    if (!Number.isFinite(parsed) || parsed < 0) {
      return 0;
    }

    return parsed;
  } catch (error) {
    // LocalStorage 不可用時仍讓頁面正常運作。
    return 0;
  }
}

function saveWaterAmount() {
  try {
    localStorage.setItem(STORAGE_KEY, String(waterAmount));
  } catch (error) {
    // 儲存失敗不應讓操作介面崩潰。
  }
}

function updateUI() {
  const progress = Math.min((waterAmount / DAILY_GOAL) * 100, 100);

  currentAmountEl.textContent = waterAmount;
  targetTextEl.textContent = `${waterAmount} / ${DAILY_GOAL} ml`;
  progressBarEl.style.width = `${progress}%`;
  progressPercentEl.textContent = `${Math.round(progress)}%`;

  if (waterAmount >= DAILY_GOAL) {
    successMessageEl.textContent = "🎉 已達成每日飲水目標";
  } else {
    successMessageEl.textContent = "";
  }
}

function changeWaterAmount(delta) {
  waterAmount = Math.max(0, waterAmount + delta);
  saveWaterAmount();
  updateUI();
}

plusBtn.addEventListener("click", () => {
  changeWaterAmount(WATER_STEP);
});

minusBtn.addEventListener("click", () => {
  changeWaterAmount(-WATER_STEP);
});

resetBtn.addEventListener("click", () => {
  waterAmount = 0;
  saveWaterAmount();
  updateUI();
});

updateUI();
