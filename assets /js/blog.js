const postsContainer = document.getElementById('posts-container');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const backBtn = document.getElementById('back-btn');

// Ensure elements exist before proceeding
if (postsContainer && toggleThemeBtn && backBtn) {
  let posts = [];
  try {
    posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  } catch (e) {
    console.error('Error parsing blogPosts from localStorage', e);
    localStorage.removeItem('blogPosts');
  }

  const updateLocalStorage = () => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  };

  const renderPosts = () => {
    postsContainer.innerHTML = '';
    if (posts.length === 0) {
      postsContainer.innerHTML = '<p>No blog posts available. Add some posts to get started!</p>';
      return;
    }
    posts.forEach((post, index) => {
      const postEl = document.createElement('article');
      postEl.classList.add('blog-post');
      postEl.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <h4>~ ${post.username}</h4>
        <button class="delete-btn" data-index="${index}" aria-label="Delete post">Delete</button>
      `;
      postsContainer.appendChild(postEl);
    });

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', handleDeletePost);
    });
  };

  const handleDeletePost = (event) => {
    const postIndex = event.target.getAttribute('data-index');
    if (confirm('Are you sure you want to delete this blog post?')) {
      posts.splice(postIndex, 1);
      updateLocalStorage();
      renderPosts();
    }
  };

  // Apply saved theme on page load
  const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Toggle theme and save preference to localStorage
  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    console.log(`Theme toggled: ${theme}`);
  });


// Load and apply the saved theme on page load
window.addEventListener('DOMContentLoaded', applySavedTheme);

 // Back button navigation
 backBtn.addEventListener('click', () => {
  window.location.href = './index.html';
});


  // Initial actions
  renderPosts();
  applySavedTheme();
}