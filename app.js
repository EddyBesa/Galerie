// Chargement des favoris depuis LocalStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const resultsGrid = document.getElementById('resultsGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Affiche la liste des favoris
function updateFavorites() {
  favoritesGrid.innerHTML = '';
  if (favorites.length === 0) {
    favoritesGrid.innerHTML = '<p>Aucun favori pour le moment.</p>';
    return;
  }
  favorites.forEach(async id => {