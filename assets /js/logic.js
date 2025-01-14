// logic.js

// Dynamically update the footer year
const currentYearSpan = document.getElementById('year');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}