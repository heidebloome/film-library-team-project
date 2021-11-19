// import debounce from 'lodash.debounce';
import card from '../templates/film-card-template.hbs';
import apiService from './apiService.js';
import { refs } from './refs.js';

getData();

async function getData() {
  try {
    const movies = await apiService.getMovies();
    // console.log(movies);
    showMovies(movies.results);
    removeVote();
  } catch (error) {
    console.error(error);
  }
}

function removeVote() {
  const refsVoteAverage = refs.galleryList.querySelectorAll('.descr__vote');

  refsVoteAverage.forEach(element => {
    element.classList.remove('visible');
  });
}

function showMovies(movies) {
  refs.galleryList.innerHTML = card(movies);
}
