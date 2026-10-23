const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Scroll reveal animation
const revealElements = $$(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 4) * 90}ms`;
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Interactive process steps
const processSteps = [
  { title: "Start with smarter sorting.", description: "Separate recyclable materials first. Only suitable residual waste should be considered for energy recovery.", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=85", alt: "Waste recycling and sorting" },
  { title: "Prepare the right materials.", description: "Waste is sorted and prepared according to the chosen technology. Organic waste can be treated separately from dry residual waste.", image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?auto=format&fit=crop&w=1000&q=85", alt: "Recycling and waste processing" },
  { title: "Turn waste into useful energy.", description: "Suitable waste can produce heat and electricity through controlled combustion, while organic waste can generate biogas through anaerobic digestion.", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=85", alt: "Electricity generation infrastructure" },
  { title: "Recover resources responsibly.", description: "Facilities must monitor emissions, manage remaining residues safely, and recover useful materials wherever possible.", image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=85", alt: "Green landscape and sustainable environment" }
];
const processButtons = $$(".process-step");
const processImage = $("#processImage");
const processTitle = $("#processTitle");
const processDescription = $("#processDescription");
const processCurrent = $("#processCurrent");

function showProcess(index) {
  const step = processSteps[index];
  processButtons.forEach((button, i) => {
    button.classList.toggle("active", i === index);
    button.setAttribute("aria-pressed", String(i === index));
  });
  processImage.style.opacity = "0";
  window.setTimeout(() => {
    processImage.src = step.image;
    processImage.alt = step.alt;
    processTitle.textContent = step.title;
    processDescription.textContent = step.description;
    processCurrent.textContent = String(index + 1).padStart(2, "0");
    processImage.style.opacity = "1";
  }, 180);
}
processButtons.forEach((button) => {
  button.addEventListener("click", () => showProcess(Number(button.dataset.step)));
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
});

// Illustrative electricity calculator
const wasteRange = $("#wasteRange");
const wasteValue = $("#wasteValue");
const energyValue = $("#energyValue");
const resultBar = $("#resultBar");
const resetCalc = $("#resetCalc");
const KWH_PER_TONNE = 500;

function updateCalculator() {
  const tonnes = Number(wasteRange.value);
  wasteValue.textContent = tonnes.toLocaleString("en-IN");
  energyValue.textContent = (tonnes * KWH_PER_TONNE).toLocaleString("en-IN");
  resultBar.style.width = `${(tonnes / Number(wasteRange.max)) * 100}%`;
  wasteRange.setAttribute("aria-valuetext", `${tonnes} tonnes per day`);
}
wasteRange.addEventListener("input", updateCalculator);
resetCalc.addEventListener("click", () => {
  wasteRange.value = 100;
  updateCalculator();
});
$("#year").textContent = new Date().getFullYear();
updateCalculator();
