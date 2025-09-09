// script.js

// ========== THEME TOGGLE (click) ==========
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  // Toggle dark class on <html> for broad theming
  document.documentElement.classList.toggle('dark');
  const darkOn = document.documentElement.classList.contains('dark');
  themeToggle.textContent = darkOn ? '☀️ Light mode' : '🌙 Dark mode';
  themeToggle.setAttribute('aria-pressed', String(darkOn));
});

// ========== BASIC EVENTS DEMO ==========
const clickMeBtn = document.getElementById('clickMeBtn');
const clickMessage = document.getElementById('clickMessage');
clickMeBtn.addEventListener('click', () => {
  const ts = new Date().toLocaleTimeString();
  clickMessage.textContent = `Button clicked at ${ts}`;
});

const hoverBox = document.getElementById('hoverBox');
// Pointer hover
hoverBox.addEventListener('mouseenter', () => {
  hoverBox.style.background = 'var(--accent)';
  hoverBox.style.color = '#fff';
  hoverBox.textContent = 'Thanks for hovering!';
});
hoverBox.addEventListener('mouseleave', () => {
  hoverBox.style.background = '';
  hoverBox.style.color = '';
  hoverBox.textContent = 'Hover or focus me';
});
// Keyboard focus
hoverBox.addEventListener('focus', () => {
  hoverBox.style.outline = '3px solid var(--accent)';
});
hoverBox.addEventListener('blur', () => {
  hoverBox.style.outline = '';
});

const liveInput = document.getElementById('liveInput');
const mirrorOut = document.getElementById('mirrorOut');
liveInput.addEventListener('input', (e) => {
  mirrorOut.textContent = e.target.value || '—';
});


// ========== COUNTER COMPONENT ==========
const countValue = document.getElementById('countValue');
let count = 0;
const renderCount = () => { countValue.textContent = String(count); };

document.getElementById('incBtn').addEventListener('click', () => { count++; renderCount(); });
document.getElementById('decBtn').addEventListener('click', () => { count--; renderCount(); });
document.getElementById('resetBtn').addEventListener('click', () => { count = 0; renderCount(); });

renderCount();


// ========== FAQ COLLAPSIBLES ==========
document.querySelectorAll('.faq-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const panel = btn.nextElementSibling;
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});


// ========== TABS ==========
const tabButtons = [ 'tabBtn1', 'tabBtn2', 'tabBtn3' ].map(id => document.getElementById(id));
const tabPanels  = [ 'tab1', 'tab2', 'tab3' ].map(id => document.getElementById(id));

function selectTab(index) {
  tabButtons.forEach((btn, i) => {
    btn.setAttribute('aria-selected', String(i === index));
    tabPanels[i].hidden = i !== index;
  });
}
tabButtons.forEach((btn, i) => btn.addEventListener('click', () => selectTab(i)));
selectTab(0);


// ========== FORM VALIDATION ==========
const form = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');
const formSuccess = document.getElementById('formSuccess');

// Helpers
function setError(el, msg) {
  el.textContent = msg;
}
function clearError(el) {
  el.textContent = '';
}

function validateName() {
  const value = nameInput.value.trim();
  if (value.length < 2) { setError(nameError, 'Name must be at least 2 characters.'); return false; }
  clearError(nameError); return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(value)) { setError(emailError, 'Enter a valid email address.'); return false; }
  clearError(emailError); return true;
}

function validatePassword() {
  const value = passwordInput.value;
  // At least 8 chars, one letter, one number
  const strongRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{8,}$/;
  if (!strongRe.test(value)) {
    setError(passwordError, 'Min 8 chars with letters and numbers.');
    return false;
  }
  clearError(passwordError); return true;
}

function validateConfirm() {
  if (confirmInput.value !== passwordInput.value) { setError(confirmError, 'Passwords do not match.'); return false; }
  clearError(confirmError); return true;
}

// Validate on the fly
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', () => { validatePassword(); validateConfirm(); });
confirmInput.addEventListener('input', validateConfirm);

// Validate on submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.hidden = true;

  const valid =
    validateName() &
    validateEmail() &
    validatePassword() &
    validateConfirm();

  if (valid) {
    // Simulate submission
    formSuccess.hidden = false;
    form.reset();
    // Clear mirrors/errors after reset
    [nameError, emailError, passwordError, confirmError].forEach(clearError);
  }
});
