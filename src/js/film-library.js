import libCard from '../templates/library-film-card-template.hbs';
import { refs } from '../js/refs';
import { openModalCard } from './modal-film-card.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

window.addEventListener('load', onWatchedBtnClick);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick() {
  refs.watchedBtn.classList.add('filter__btn--current');
  refs.queueBtn.classList.remove('filter__btn--current');

  if (!localStorage.getItem('WATCHED')) {
    Notify.failure('Your watched list is empty. Add any movie.');
    refs.galleryList.innerHTML = '';
    return;
  }

  Loading.standard();
  showMoviesCards(getLocalStorageDataByKey(`WATCHED`));
  Loading.remove();
}

function onQueueBtnClick() {
  refs.queueBtn.classList.add('filter__btn--current');
  refs.watchedBtn.classList.remove('filter__btn--current');

  if (!localStorage.getItem('QUEUE')) {
    Notify.failure('Your queue list is empty. Add any movie.');
    refs.galleryList.innerHTML = '';
    return;
  }

  Loading.standard();
  showMoviesCards(getLocalStorageDataByKey(`QUEUE`));
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
  console.log(moviesArr);
  return moviesArr;
}

function showMoviesCards(movies) {
  refs.galleryList.innerHTML = libCard(movies);

  const cards = document.querySelectorAll('.film-list__item');
  cards.forEach(card => {
    card.addEventListener('click', openModalCard);
  });
}
