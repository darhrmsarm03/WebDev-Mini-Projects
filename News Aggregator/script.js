const apiKey = 'YOUR_NEWSAPI_KEY'; // Replace with your NewsAPI.org API key
const articlesContainer = document.getElementById('articles-container');
const loader = document.getElementById('loader');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryButtons = document.querySelectorAll('.category-buttons button');

let currentCategory = 'general';
let currentQuery = '';

// Show loader
function showLoader() {
  loader.classList.remove('hidden');
}

// Hide loader
function hideLoader() {
  loader.classList.add('hidden');
}

// Fetch news articles
async function fetchNews({category = 'general', query = ''} = {}) {
  showLoader();
  let url = '';
  const baseUrl = 'https://newsapi.org/v2/top-headlines?country=us';

  if (query) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
  } else {
    url = `${baseUrl}&category=${category}&apiKey=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'ok') {
      displayArticles(data.articles);
    } else {
      articlesContainer.innerHTML = `<p>Error: ${data.message}</p>`;
    }
  } catch (error) {
    articlesContainer.innerHTML = `<p>Error fetching news.</p>`;
    console.error(error);
  } finally {
    hideLoader();
  }
}

// Display articles
function displayArticles(articles) {
  if (!articles || articles.length === 0) {
    articlesContainer.innerHTML = `<p>No articles found.</p>`;
    return;
  }
  articlesContainer.innerHTML = '';

  articles.forEach(article => {
    const articleDiv = document.createElement('div');
    articleDiv.className = 'article';

    articleDiv.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x180?text=No+Image'}" alt="${article.title}" />
      <div class="article-content">
        <div class="article-title">${article.title}</div>
        <div class="article-description">${article.description || ''}</div>
        <div class="article-link"><a href="${article.url}" target="_blank">Read more</a></div>
      </div>
    `;

    articlesContainer.appendChild(articleDiv);
  });
}

// Handle category button clicks
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    currentQuery = '';
    fetchNews({category: currentCategory});
  });
});

// Handle search
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query;
    fetchNews({query: currentQuery});
  }
});

// Optional: trigger search on Enter key
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchBtn.click();
  }
});

// Load default news on page load
window.addEventListener('load', () => {
  fetchNews({category: currentCategory});
});