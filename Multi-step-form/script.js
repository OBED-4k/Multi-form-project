// ── State ──
const planData = {
  Arcade: { monthly: 9, yearly: 90 },
  Advanced: { monthly: 12, yearly: 120 },
  Pro: { monthly: 15, yearly: 150 },
};
const addonData = {
  "ao-online": { name: "Online service", monthly: 1, yearly: 10 },
  "ao-storage": { name: "Larger storage", monthly: 2, yearly: 20 },
  "ao-profile": { name: "Customizable profile", monthly: 2, yearly: 20 },
};

let selectedPlan = "Arcade";
let isYearly = false;
let currentStep = 1;

// ── Helpers ──
const fmt = (n) => (isYearly ? `$${n}/yr` : `$${n}/mo`);

// PAGE NAVIGATION
function goTo(step) {
  // Hide all panels
  document
    .querySelectorAll(".panel")
    .forEach((p) => p.classList.remove("active"));
  // Show target
  if (step <= 4) {
    document.getElementById(`panel-${step}`).classList.add("active");
  } else {
    document.getElementById("panel-ty").classList.add("active");
  }
  // Update sidebar
  document.querySelectorAll(".step").forEach((el, i) => {
    el.classList.toggle("active", i + 1 === step);
  });
  // On thank you, highlight step 4
  if (step === 5) {
    document.getElementById("s4").classList.add("active");
  }
  currentStep = step;
}

// ── Step 1 validation ──
function validateStep1() {
  let ok = true;

  const name = document.getElementById("inp-name");
  const email = document.getElementById("inp-email");
  const phone = document.getElementById("inp-phone");

  // Name
  const fName = document.getElementById("f-name");
  if (!name.value.trim()) {
    fName.classList.add("has-error");
    name.classList.add("error");
    ok = false;
  } else {
    fName.classList.remove("has-error");
    name.classList.remove("error");
  }

  // Email
  const fEmail = document.getElementById("f-email");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  if (!emailOk) {
    fEmail.classList.add("has-error");
    email.classList.add("error");
    ok = false;
  } else {
    fEmail.classList.remove("has-error");
    email.classList.remove("error");
  }

  // Phone
  const fPhone = document.getElementById("f-phone");
  const phoneValue = phone.value.trim();
  const allowedCodes = ["+234", "+1", "+44", "+91", "+81", "+61"];
  const validCode = allowedCodes.some((code) => phoneValue.startsWith(code));
  const cleanPhone = phoneValue.replace(/\D/g, "");

  if (!phoneValue) {
    fPhone.classList.add("has-error");
    phone.classList.add("error");
    fPhone.querySelector(".err-msg").textContent = "Phone number is required";
    ok = false;
  } else if (!validCode) {
    fPhone.classList.add("has-error");
    phone.classList.add("error");
    fPhone.querySelector(".err-msg").textContent =
      "Use a valid country code (+234, +1, etc)";
    ok = false;
  } else if (cleanPhone.length < 10) {
    fPhone.classList.add("has-error");
    phone.classList.add("error");
    fPhone.querySelector(".err-msg").textContent =
      "Phone number must be at least 10 digits";
    ok = false;
  } else {
    fPhone.classList.remove("has-error");
    phone.classList.remove("error");
  }
  if (ok) goTo(2);
}

// ── Step 2 ──
function selectPlan(el) {
  document
    .querySelectorAll(".plan-card")
    .forEach((c) => c.classList.remove("selected"));
  el.classList.add("selected");
  selectedPlan = el.dataset.plan;
}

function toggleBilling() {
  isYearly = !isYearly;
  document.getElementById("billingToggle").classList.toggle("yearly", isYearly);
  document.getElementById("lbl-mo").classList.toggle("on", !isYearly);
  document.getElementById("lbl-yr").classList.toggle("on", isYearly);

  for (const [name, prices] of Object.entries(planData)) {
    const key = name.toLowerCase();
    document.getElementById(`pr-${key}`).textContent = fmt(
      isYearly ? prices.yearly : prices.monthly,
    );
    document.getElementById(`sv-${key}`).style.display = isYearly
      ? "block"
      : "none";
  }

  for (const [id, info] of Object.entries(addonData)) {
    document.getElementById(`aop-${id.replace("ao-", "")}`).textContent =
      `+${fmt(isYearly ? info.yearly : info.monthly)}`;
  }
}

// ── Step 3 ──
function toggleAddon(el) {
  el.classList.toggle("checked");
}

// ── Step 4 ──
function buildSummary() {
  const period = isYearly ? "Yearly" : "Monthly";
  const base = isYearly
    ? planData[selectedPlan].yearly
    : planData[selectedPlan].monthly;

  document.getElementById("sum-name").textContent =
    `${selectedPlan} (${period})`;
  document.getElementById("sum-price").textContent = fmt(base);
  document.getElementById("sum-total-lbl").textContent =
    `Total (per ${isYearly ? "year" : "month"})`;

  let total = base;
  let html = "";

  for (const [id, info] of Object.entries(addonData)) {
    if (document.getElementById(id).classList.contains("checked")) {
      const price = isYearly ? info.yearly : info.monthly;
      total += price;
      html += `<div class="sum-addon-row"><span>${info.name}</span><span class="p">+${fmt(price)}</span></div>`;
    }
  }

  document.getElementById("sum-addons").innerHTML = html;
  document.getElementById("sum-total-amt").textContent = isYearly
    ? `$${total}/yr`
    : `+$${total}/mo`;
}
