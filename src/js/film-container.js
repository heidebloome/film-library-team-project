import debounce from 'lodash.debounce';
import card from '../templates/film-card-template.hbs';
import SearchAPI from './apiService.js';
import { refs } from './refs.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { pagination } from './pagination.js';

import { openModalCard } from './modal-film-card.js';
import { scrollToTop } from './up-btn.js';

const apiService = new SearchAPI();

getData();

async function getData() {
  try {
    const movies = await apiService.getMovies();
    // console.log(movies);
    pagination.reset(movies.total_results);
    // pagination.getCurrentPage(apiService.page)
    // console.log(movies);
    // pagination.movePageTo(apiService.page);
    showMovies(movies.results);
  } catch (error) {
    console.error(error);
  }
}

function showMovies(movies) {
  refs.galleryList.innerHTML = card(movies);

  const cards = document.querySelectorAll('.film-list__item');
  cards.forEach(card => {
    card.addEventListener('click', openModalCard);
  });
}

/*******************поиск по запросу******************************* */
const DEBOUNCE_DELAY = 700;
refs.inputSearch.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));
refs.searchForm.addEventListener('submit', onInputSearch);

async function onInputSearch(event) {
  if (event.type === 'submit') {
    event.preventDefault();
  }
  if (event.type === 'input') {
    apiService.searchQuery = event.target.value.trim();
  }

  apiService.ressetPage();

  if (!apiService.searchQuery) {
    Loading.standard();
    getData();
    Loading.remove();
    return;
  }

  try {
    Loading.standard();
    const movies = await apiService.getMovies();
    pagination.reset(movies.total_results);
    Loading.remove();

    if (movies.total_results > 0) {
      showMovies(movies.results);
      Notify.success(`Hooray! We found ${movies.total_results} movies.`);
    } else {
      refs.galleryList.innerHTML = '';
      Notify.failure('Oops, there is no movies with that name.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Пагинация

pagination.on('afterMove', showNewPage);

async function showNewPage(event) {
  apiService.page = event.page;
  const movies = await apiService.getMovies();

  showMovies(movies.results);
  scrollToTop();
}
