let currentStep = 1;

function showStep(step) {
  document.querySelectorAll('.form-step').forEach((el, index) => {
    el.classList.remove('active');
  });
  document.getElementById(`step-${step}`).classList.add('active');
}

function nextStep(step) {
  if (validateStep(step)) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep(step) {
  currentStep--;
  showStep(currentStep);
}

// Validate required fields for current step
function validateStep(step) {
  const currentFields = document.querySelector(`#step-${step}`).querySelectorAll('input, select, textarea');
  for (let field of currentFields) {
    if (field.hasAttribute('required') && !field.value.trim()) {
      alert('Please fill in all required fields.');
      field.focus();
      return false;
    }
  }

  // Captcha check at step 3
  if (step === 3 && !checkCaptcha()) {
    alert("Captcha is incorrect.");
    return false;
  }

  return true;
}

// Subcategories
const subcategories = {
  public_infrastructure: [
    "Road damage (potholes, cracks)",
    "Street lighting issues",
    "Sidewalk problems",
    "Traffic signal malfunctions",
    "Public transportation delays",
    "Water supply issues",
    "Sewage or drainage problems",
    "Garbage collection issues",
    "Public park maintenance"
  ],
  public_safety: [
    "Noise complaints",
    "Illegal dumping",
    "Vandalism",
    "Unsafe construction",
    "Street crime reports",
    "Fire hazards",
    "Animal control issues"
  ],
  utilities: [
    "Electricity outages",
    "Gas leaks",
    "Water billing issues",
    "Waste management"
  ],
  health_sanitation: [
    "Food safety complaints",
    "Pest infestations",
    "Public toilet hygiene",
    "Pollution"
  ],
  admin_services: [
    "Document delays",
    "Corruption or bribery",
    "Poor customer service",
    "Discrimination",
    "Billing disputes"
  ],
  environmental_concerns: [
    "Illegal deforestation",
    "Water pollution",
    "Illegal hunting",
    "Urban planning violations"
  ],
  education_social_services: [
    "School issues",
    "Social welfare delays",
    "Child labor reports",
    "Elderly care complaints"
  ]
};

const categorySelect = document.getElementById("category");
const subcategoryContainer = document.getElementById("subcategory-container");

categorySelect.addEventListener("change", () => {
  const selected = categorySelect.value;
  subcategoryContainer.innerHTML = "";
  if (subcategories[selected]) {
    subcategories[selected].forEach((item, index) => {
      const id = `sub_${index}`;
      const label = document.createElement("label");
      label.setAttribute("for", id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = id;
      checkbox.name = "subcategory";
      checkbox.value = item;
      label.appendChild(checkbox);
      label.append(" " + item);
      subcategoryContainer.appendChild(label);
    });
  }
});

// Captcha
const captchaText = document.getElementById("captchaText");
let captchaValue = "";

function generateCaptcha() {
  captchaValue = Math.random().toString(36).substring(2, 8).toUpperCase();
  captchaText.textContent = captchaValue;
}

function checkCaptcha() {
  const userInput = document.getElementById("captchaInput").value.trim().toUpperCase();
  return userInput === captchaValue;
}

generateCaptcha();

// On submit
document.getElementById("complaintForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validateStep(3)) return;

  alert("Complaint submitted successfully!");
  this.reset();
  currentStep = 1;
  showStep(currentStep);
  generateCaptcha();
  subcategoryContainer.innerHTML = "";
});
