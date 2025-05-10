const apiKey = 'YOUR_NEWSAPI_KEY'; // Replace with your NewsAPI.org API key
const articlesContainer = document.getElementById('articles-container');
const loader = document.getElementById('loader');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryButtons = document.querySelectorAll('.category-buttons button');

let currentCategory = 'general';
let currentQuery = '';