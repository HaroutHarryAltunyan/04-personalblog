// Grab form and error message elements
const form = document.getElementById('blog-form');
const errorMessageEl = document.getElementById('error-message');

// Check if the form exists (we only want this to run on index.html)
if (form) {
  // Add event listener for form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    // Basic validation
    if (!username || !title || !content) {
      errorMessageEl.textContent = 'Please fill out all fields before submitting.';
      return;
    }

    // Clear any previous error messages
    errorMessageEl.textContent = '';

    // Create a blog post object
    const newPost = { username, title, content };

    // Retrieve existing posts from localStorage or initialize an empty array
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.push(newPost);

    // Save back to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // Redirect to blog.html
    window.location.href = './blog.html';
  });
}

// Theme Toggling Logic
const toggleThemeBtn = document.getElementById('toggle-theme-btn');

// Function to apply the saved theme from localStorage
const applySavedTheme = () => {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
};

// Add event listener for theme toggle button
if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    // Save the user's preference to localStorage
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
}

// Load and apply the saved theme on page load
window.addEventListener('DOMContentLoaded', applySavedTheme);

 // Back button navigation
 backBtn.addEventListener('click', () => {
 
  window.location.href = './blog.html';
});