
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const resultsGrid = document.getElementById('resultsGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');