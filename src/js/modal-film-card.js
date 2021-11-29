import filmCard from '../templates/modal-film-card-template.hbs';
import { refs } from './refs.js';
import SearchAPI from './apiService';
import { addWatched } from './localStorage.js';
import { addQueue } from './localStorage.js';
import { searchItemQueue } from './localStorage.js';
import { searchItemWatched } from './localStorage.js';
// import { searchItemQueue } from './localStorage.js';
// import { searchItemWatched } from './localStorage.js';

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

    // if (el => searchItemQueue(filmInfo)) {
    //   buttonQueue.removeEventListener('click', add => addQueue(filmInfo));
    // }
    // if (el => searchItemWatched(filmInfo)) {
    //   buttonWatched.removeEventListener('click', add => addWatched(filmInfo));
    // }
    if(!searchItemQueue(filmInfo)) {
      buttonQueue.removeEventListener('click', remove => removeItemQ(remove));
      buttonQueue.addEventListener('click', add => addQueue(filmInfo), {
        once: true
      });
    }
    if (!searchItemWatched(filmInfo)) {
      buttonWatched.removeEventListener('click', remove => removeItemW(remove));
      buttonWatched.addEventListener('click', add => addWatched(filmInfo), {
        once: true
      });
    }
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
