import libCard from '../templates/library-film-card-template.hbs';
import { refs } from '../js/refs.js';
import { openModalCard } from './modal-film-card.js';
import { scrollToTop } from './up-btn.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { pagination } from './pagination';

window.addEventListener('load', onWatchedBtnClick);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);

const currentPage = {
  watched: true,
  queue: false,
};

function onWatchedBtnClick() {
  refs.watchedBtn.classList.add('filter__btn--current');
  refs.queueBtn.classList.remove('filter__btn--current');

  currentPage.watched = true;
  currentPage.queue = false;

  if (!localStorage.getItem('WATCHED')) {
    Notify.failure('Your watched list is empty. Add any movie.');
    pagination.reset(0);
    refs.galleryList.innerHTML = '';
    return;
  }

  Loading.standard();
  const moviesArr = getLocalStorageDataByKey(`WATCHED`);
  pagination.reset(moviesArr.length);
  moviesArr.splice(20);
  showMoviesCards(moviesArr);
  Loading.remove();
}

function onQueueBtnClick() {
  refs.queueBtn.classList.add('filter__btn--current');
  refs.watchedBtn.classList.remove('filter__btn--current');

  currentPage.watched = false;
  currentPage.queue = true;

  if (!localStorage.getItem('QUEUE')) {
    Notify.failure('Your queue list is empty. Add any movie.');
    pagination.reset(0);
    refs.galleryList.innerHTML = '';
    return;
  }

  Loading.standard();
  const moviesArr = getLocalStorageDataByKey(`QUEUE`);
  pagination.reset(moviesArr.length);
  moviesArr.splice(20);
  showMoviesCards(moviesArr);
  Loading.remove();
}

function getLocalStorageDataByKey(key) {
  const data = localStorage.getItem(key);
  const parsedData = JSON.parse(data);
  const moviesArr = parsedData[key.toLowerCase()];

  moviesArr.forEach(movie => {
    const genresArr = movie.genres.split(', ');
    if (genresArr.length > 2) {
      genresArr.splice(2, genresArr.length, 'Other');
    }
    movie.genre_ids = movie.genres ? genresArr.join(', ') : 'undefined';
    movie.release_date = movie.release_date ? movie.release_date.slice(0, 4) : 'undefined';
  });

  return moviesArr;
}

function showMoviesCards(movies) {
  refs.galleryList.innerHTML = libCard(movies);

  const cards = document.querySelectorAll('.film-list__item');
  cards.forEach(card => {
    card.addEventListener('click', openModalCard);
  });
}

pagination.on('afterMove', showNewPage);

function showNewPage(event) {
  let moviesArr;

  if (currentPage.watched) {
    moviesArr = getLocalStorageDataByKey(`WATCHED`);
  } else if (currentPage.queue) {
    moviesArr = getLocalStorageDataByKey(`QUEUE`);
  }

  const page = event.page;
  if (page === 1) {
    moviesArr.splice(20);
    showMoviesCards(moviesArr);
  } else {
    const startPageItem = page * 20 - 20;
    const endPageItem = startPageItem + 20;
    const pageToShow = moviesArr.slice(startPageItem, endPageItem);
    showMoviesCards(pageToShow);
  }
  scrollToTop();
}
