import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
console.log(basicLightbox);


import apiService from './apiService';
import imagesTpl from '../templates/images.hbs';

const searchInputRef = document.querySelector('input[name=query]');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');

let page = 1;

searchInputRef.addEventListener('input', debounce(searchInputHandler, 500));
loadMoreRef.addEventListener('click', loadMoreHandler);
galleryRef.addEventListener('click', galleryHandler);

function searchInputHandler() {
  if (searchInputRef.value.length === 0) {
    galleryRef.innerHTML = '';
    loadMoreRef.classList.add('hide');
    return;
  }

  apiService.fetchImages(searchInputRef.value, page).then(data => {
    const markup = imagesTpl(data.hits);
    galleryRef.innerHTML = markup;

    if (data.totalHits > 12) {
      loadMoreRef.classList.remove('hide');
    }

    console.log(data);
  });

}

function loadMoreHandler(event) {
  const scrollPos =  window.scrollY;
  const btn = event.currentTarget;
  btn.disabled = true;
  page += 1;
  apiService.fetchImages(searchInputRef.value, page).then(data => {
    
    if (data.hits.length === 0) {
      loadMoreRef.classList.add('hide');
    } else {
      const markup = imagesTpl(data.hits);
      galleryRef.insertAdjacentHTML('beforeend', markup);
      window.scrollTo({
        top: scrollPos,
        left: 0,
        behavior: 'smooth'
      });
    }
    console.log(data);
    btn.disabled = false;
  });
}

function galleryHandler(event) {
  // console.log(basicLightbox);
  if (event.target.tagName === "IMG") {
    const instance = basicLightbox.create(`<img src="${event.target.src}" width="800" height="600">`).show();
    instance.show();

  }
}