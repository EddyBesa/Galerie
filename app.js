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
    // Récupérer les infos photo par ID via API Unsplash
    try {
      const res = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`);
      const image = await res.json();

      const card = document.createElement('div');
      card.className = 'card favorite-card';

      card.innerHTML = `
        <img src="${image.urls.small}" alt="Photo de ${image.user.name}" tabindex="0" />
        <h3>${image.user.name}</h3>
        <a href="${image.links.html}" target="_blank" rel="noopener noreferrer">Source</a>
        <button class="remove-fav-btn" data-id="${id}">Supprimer</button>
      `;

      favoritesGrid.appendChild(card);

      card.querySelector('.remove-fav-btn').addEventListener('click', () => {
        toggleFavorite(id);
      });
      card.querySelector('img').addEventListener('click', () => openLightbox(image.urls.regular));
    } catch (error) {
      console.error("Erreur en récupérant favori:", error);
    }
  });
}
// Fonction pour rechercher et afficher les images
async function fetchImages(query) {
  if (!query.trim()) {
    alert('Veuillez saisir un terme de recherche.');
    return;
  }
  loader.classList.remove('hidden');
  resultsGrid.innerHTML = '';

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&client_id=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    loader.classList.add('hidden');

    if (!data.results.length) {
      resultsGrid.innerHTML = '<p>Aucun résultat trouvé.</p>';
      return;
    }
    displayResults(data.results);
  } catch (error) {
    loader.classList.add('hidden');
    resultsGrid.innerHTML = '<p>Erreur lors de la récupération des images.</p>';
  }
}