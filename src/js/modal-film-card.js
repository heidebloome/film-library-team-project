import filmCard from '../templates/modal-film-card-template.hbs';
import { refs } from './refs.js';
import SearchAPI from './apiService';

const modal = document.querySelector('.modal-overlay');
const buttonClose = document.querySelector('.modal-close-js');

setTimeout(() => {
  const cards = document.querySelectorAll('.film-list__item');
  //   console.log(cards);
  cards.forEach(card => {
    card.addEventListener('click', openModalCard);
  });
}, 500);

function openModalCard(evt) {
  buttonClose.addEventListener('click', toClickButtonClose);
  window.addEventListener('keydown', onEscKeyPress);
  modal.addEventListener('click', toClickOnOverlay);
  //   console.log('open');
  if (evt) {
    modal.classList.remove('is-hidden');
  }
}

function closeModalCard() {
  //   console.log('close');
  modal.classList.add('is-hidden');

  buttonClose.removeEventListener('click', closeModalCard);
  modal.removeEventListener('click', toClickOnOverlay);
  window.removeEventListener('keydown', onEscKeyPress);
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
