const API_KEY = '18593709-c9a0e412bd2ad0b6230bdc728';

const fetchImages = function (searchQuery, page) {
  return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`).then(res => res.json());
}

export default {
  fetchImages
}