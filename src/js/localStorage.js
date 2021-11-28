import { refs } from './refs';
import SearchAPI from './apiService';
import modal from './modal-film-card';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


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
  }else{
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

export function searchItemQueue(filmInfo) {
  if (queue.length === 0 && localStorage.getItem('QUEUE') === null) {
    return
  }
   const queueId = localStorage.getItem('QUEUE');
  const parsQueueId = JSON.parse(queueId);
  
  parsQueueId.queue.forEach(el => {
    if (el.id === filmInfo.id) {
      const btnAddQ = document.querySelector('.btnAddQ')
      const btnRmvQ = document.querySelector('.btnRmvQ')
      btnAddQ.classList.add('visually-hidden');
      btnRmvQ.classList.remove('visually-hidden')
      // buttonQueue.addEventListener('click', remove => removeItemQ(el));
      }
  });
};

export function searchItemWatched(filmInfo) {
  if (watched.length === 0 && localStorage.getItem('WATCHED') === null) {
    return
  }
   const watchedId = localStorage.getItem('WATCHED');
  const parsWatchedId = JSON.parse(watchedId);
  
  parsWatchedId.watched.forEach(el => {
    if (el.id === filmInfo.id) {
      const btnAddW = document.querySelector('.btnAddW')
      const btnRmvW = document.querySelector('.btnRmvW')
      btnAddW.classList.add('visually-hidden');
      btnRmvW.classList.remove('visually-hidden')
      
      // buttonWatched.addEventListener('click', remove => removeItemW(el));
      console.log('hi0')
    }
  });
};

export function removeItemQ(el) {
  const queueId = localStorage.getItem('QUEUE');
  const parsQueueId = JSON.parse(queueId);
  const remove = parsQueueId.queue.indexOf(el);

  localStorage.removeItem(remove);
}
export function removeItemW(el) {
  const watchedId = localStorage.getItem('WATCHED');
  const parsWatchedId = JSON.parse(watchedId);
  const remove = parsWatchedId.watched.indexOf(el);
  localStorage.removeItem(remove);
}