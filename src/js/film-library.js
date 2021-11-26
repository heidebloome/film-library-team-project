import libCard from '../templates/library-film-card-template.hbs';
import { refs } from '../js/refs';
import { openModalCard } from './modal-film-card.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { addPagination } from './pagination';

const libRefs = {
  watchedBtn: document.querySelector('.watched-btn-js'),
  queueBtn: document.querySelector('.queue-btn-js'),
};

window.addEventListener('load', onWatchedBtnClick);
libRefs.watchedBtn.addEventListener('click', onWatchedBtnClick);
libRefs.queueBtn.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick() {
  libRefs.watchedBtn.classList.add('filter__btn--current');
  libRefs.queueBtn.classList.remove('filter__btn--current');

  const watchedMoviesInfo = localStorage.getItem('WATCHED');
  const parsedWatchedMovies = JSON.parse(watchedMoviesInfo);

  if (!localStorage.getItem('WATCHED')) {
    Notify.failure('Your watched list is empty. Add any movie.');
    return;
  }

  Loading.standard();
  showMoviesCards(parsedWatchedMovies.watched);
  Loading.remove();

  //   console.log(parsedWatchedMovies.watched);
}

function onQueueBtnClick() {
  libRefs.queueBtn.classList.add('filter__btn--current');
  libRefs.watchedBtn.classList.remove('filter__btn--current');

  const queueMoviesInfo = localStorage.getItem('QUEUE');
  const parsedQueueMovies = JSON.parse(queueMoviesInfo);

  if (!localStorage.getItem('QUEUE')) {
    Notify.failure('Your queue list is empty. Add any movie.');
    return;
  }

  Loading.standard();
  showMoviesCards(parsedQueueMovies.queue);
  Loading.remove();
}

function showMoviesCards(movies) {
  refs.galleryList.innerHTML = libCard(movies);

  const cards = document.querySelectorAll('.film-list__item');
  cards.forEach(card => {
    card.addEventListener('click', openModalCard);
  });
}
