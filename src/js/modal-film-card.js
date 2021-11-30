import filmCard from '../templates/modal-film-card-template.hbs';
import libCard from '../templates/library-film-card-template.hbs';
import { refs } from './refs.js';
import SearchAPI from './apiService';
import { pagination } from './pagination.js';

import { addWatched, addQueue, searchItemQueue, searchItemWatched } from './localStorage.js';

const apiService = new SearchAPI();

const modal = document.querySelector('.modal-overlay');
const buttonClose = document.querySelector('.modal-close-js');
const modalCard = document.querySelector('.modal-js');

export function openModalCard(evt) {
  modalCard.innerHTML = '';
  buttonClose.addEventListener('click', toClickButtonClose);
  window.addEventListener('keydown', onEscKeyPress);
  modal.addEventListener('click', toClickOnOverlay);
  document.body.classList.toggle('modal-open');
  //   console.log('open');
  if (evt) {
    modal.classList.remove('is-hidden');
  }
  const filmId = evt.currentTarget.dataset.idNumber;
  // console.log(filmId);
  getFilmInfo(filmId);
}

async function getFilmInfo(filmId) {
  try {
    const filmInfo = await apiService.getMovieById(filmId);
    cardMarkup(filmInfo);
    const buttonWatched = document.querySelector('.modal__watch-list');
    const buttonQueue = document.querySelector('.modal__queue-list');

    searchItemQueue(filmInfo);
    buttonQueue.addEventListener('click', add => addQueue(filmInfo));
    searchItemWatched(filmInfo);
    buttonWatched.addEventListener('click', add => addWatched(filmInfo));
  } catch (error) {
    console.error(error);
  }
}

function cardMarkup(filmInfo) {
  modalCard.insertAdjacentHTML('beforeend', filmCard(filmInfo));
}

function closeModalCard() {
  //   console.log('close');
  modal.classList.add('is-hidden');

  buttonClose.removeEventListener('click', closeModalCard);
  modal.removeEventListener('click', toClickOnOverlay);
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.toggle('modal-open');

  if (window.location.pathname === '/film-library-team-project/library.html') {
    const isInWatched = refs.watchedBtn.classList.contains('filter__btn--current');
    if (isInWatched) {
      const moviesArr = getLocalStorageMovies('WATCHED');
      const page = pagination.getCurrentPage();
      showLibraryPage(moviesArr, page);
    } else {
      const moviesArr = getLocalStorageMovies('QUEUE');
      const page = pagination.getCurrentPage();
      showLibraryPage(moviesArr, page);
    }
  }
}

function showLibraryPage(moviesArr, page) {
  if (page === 1) {
    moviesArr.splice(20);
    showMoviesCards(moviesArr);
  } else {
    const startPageItem = page * 20 - 20;
    const endPageItem = startPageItem + 20;
    const pageToShow = moviesArr.slice(startPageItem, endPageItem);
    showMoviesCards(pageToShow);
  }
}

function getLocalStorageMovies(keyItem) {
  if (keyItem === 'WATCHED') {
    const res = JSON.parse(localStorage.getItem('WATCHED'));
    return res ? res.watched : [];
  } else if (keyItem === 'QUEUE') {
    const res = JSON.parse(localStorage.getItem('QUEUE'));
    return res ? res.queue : [];
  }
}

function toClickButtonClose(evt) {
  if (evt) {
    closeModalCard();
  }
}

function toClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModalCard();
  }
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    closeModalCard();
  }
}

function showMoviesCards(movies) {
  refs.galleryList.innerHTML = libCard(movies);

  const cards = document.querySelectorAll('.film-list__item');
  cards.forEach(card => {
    card.addEventListener('click', openModalCard);
  });
}
