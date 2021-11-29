import { refs } from './refs';
import SearchAPI from './apiService';
import modal from './modal-film-card';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import {openModalCard} from './modal-film-card'


let watched = [];
let queue = [];

export function addWatched(filmInfo) {
  if (watched.length === 0 && localStorage.getItem('WATCHED') !== null) {
    copyLocalStorageWatched();
    watched.push(filmInfo)
    localStorage.setItem('WATCHED', JSON.stringify({ watched }))
    Notify.success(`Film added to watched`);
    // console.log(watched)
  } else {
    watched.push(filmInfo)
    localStorage.setItem('WATCHED', JSON.stringify({ watched }))
    
  }
}
  
export function addQueue(filmInfo) {
  if (queue.length === 0 && localStorage.getItem('QUEUE') !== null) {
    copyLocalStorageQueue();
    queue.push(filmInfo)
    localStorage.setItem('QUEUE', JSON.stringify({ queue }))
    Notify.success(`Film added to queue`);
    
    // console.log(queue)
  } else {
    queue.push(filmInfo)
    localStorage.setItem('QUEUE', JSON.stringify({ queue }))
  }
}

function copyLocalStorageWatched() {
  const watchedFilm = localStorage.getItem('WATCHED');
  // console.log(watchedFilm)
  const parsWatched = JSON.parse(watchedFilm);
  // console.log(parsWatched)
  parsWatched.watched.forEach(el => {
    watched.push(el);
  }); 
}

function copyLocalStorageQueue() {
  const queueFilm = localStorage.getItem('QUEUE');
  // console.log(queueFilm)
  const parsQueue = JSON.parse(queueFilm);
  // console.log(parsQueue)
  parsQueue.queue.forEach(el => {
    queue.push(el);
  });
}

// QUEUE

export function searchItemQueue(filmInfo) {
  if (queue.length === 0 && localStorage.getItem('QUEUE') === null) {
    return
  }
  const queueId = localStorage.getItem('QUEUE');
  const parsQueueId = JSON.parse(queueId);
  return parsQueueId.queue.some(el => {
    if (el.id === filmInfo.id) {
      addQueryQueue()
      const remove = parsQueueId.queue.indexOf(el);
       const buttonQueue = document.querySelector('.modal__queue-list');
      buttonQueue.addEventListener('click', r => removeItemQ(remove), {
        once: true
      });

      return el.id === filmInfo.id
  }
  });
};
function addQueryQueue() {
  const btnAddQ = document.querySelector('.btnAddQ')
      const btnRmvQ = document.querySelector('.btnRmvQ')
      btnAddQ.classList.add('visually-hidden');
      btnRmvQ.classList.remove('visually-hidden')
}
function removeItemQ(remove) {
  queue.length = 0;
  const queueId = localStorage.getItem('QUEUE');
  const parsQueue = JSON.parse(queueId);
  localStorage.removeItem('QUEUE');
  parsQueue.queue.forEach(el => {
    queue.push(el);
  });
  queue.splice(remove, 1);
  localStorage.setItem('QUEUE', JSON.stringify({ queue }));
  Notify.success(`Film removed`);
}

// WATCHED

export function searchItemWatched(filmInfo) {
  if (watched.length === 0 && localStorage.getItem('WATCHED') === null) {
    return
  }
  const parsWatchedId = JSON.parse(localStorage.getItem('WATCHED'));
  return parsWatchedId.watched.some(el => {
    if (el.id === filmInfo.id) {
      addQueryWatched()
      const remove = parsWatchedId.watched.indexOf(el);
      const buttonWatched = document.querySelector('.modal__watch-list');
      buttonWatched.addEventListener('click', r => removeItemW(remove), {
        once: true
      });
      return el.id === filmInfo.id
    }
  });
  function addQueryWatched() {
    const btnAddW = document.querySelector('.btnAddW')
    const btnRmvW = document.querySelector('.btnRmvW')
    btnAddW.classList.add('visually-hidden');
    btnRmvW.classList.remove('visually-hidden')
  }
}
function removeItemW(remove) {
  watched.length = 0;
  const watchedId = localStorage.getItem('WATCHED');
  const parsWatched = JSON.parse(watchedId);
  localStorage.removeItem('WATCHED');
  parsWatched.watched.forEach(el => {
    watched.push(el);
  });
  watched.splice(remove, 1);
  localStorage.setItem('WATCHED', JSON.stringify({ watched }));
  Notify.success(`Film removed`)
}