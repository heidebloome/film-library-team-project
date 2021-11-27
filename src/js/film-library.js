import libCard from '../templates/library-film-card-template.hbs';
import { refs } from '../js/refs';
import { openModalCard } from './modal-film-card.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { addPagination } from './pagination';

window.addEventListener('load', onWatchedBtnClick);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick() {
  refs.watchedBtn.classList.add('filter__btn--current');
  refs.queueBtn.classList.remove('filter__btn--current');

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
  refs.queueBtn.classList.add('filter__btn--current');
  refs.watchedBtn.classList.remove('filter__btn--current');

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
