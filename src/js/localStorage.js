import { Notify } from 'notiflix/build/notiflix-notify-aio';

let watched = [];
let queue = [];

//******************************* */ QUEUE  **********************

export function addQueue(filmInfo) {
  if (searchItemQueue(filmInfo) === true) {
    const parsQueueId = JSON.parse(localStorage.getItem('QUEUE'));
    parsQueueId.queue.some(el => {
      if (el.id === filmInfo.id) {
        const remove = parsQueueId.queue.indexOf(el);
        removeItemQ(remove);
      }
    });
    return;
  }
  if (queue.length === 0 && localStorage.getItem('QUEUE') !== null) {
    copyLocalStorageQueue();
    queue.push(filmInfo);
    localStorage.setItem('QUEUE', JSON.stringify({ queue }));
    removeQueryQueue();
    Notify.success(`Film added to queue`);
  } else {
    queue.push(filmInfo);
    localStorage.setItem('QUEUE', JSON.stringify({ queue }));
    removeQueryQueue();
    Notify.success(`Film added to queue`);
  }
}
function removeItemQ(remove) {
  queue.length = 0;
  const queueId = localStorage.getItem('QUEUE');
  const parsQueue = JSON.parse(queueId);
  // localStorage.removeItem('QUEUE');
  parsQueue.queue.forEach(el => {
    queue.push(el);
  });
  queue.splice(remove, 1);
  localStorage.setItem('QUEUE', JSON.stringify({ queue }));
  addQueryQueue();
  Notify.success(`Film removed`);
}

function copyLocalStorageQueue() {
  const queueFilm = localStorage.getItem('QUEUE');
  const parsQueue = JSON.parse(queueFilm);
  parsQueue.queue.forEach(el => {
    queue.push(el);
  });
}

export function searchItemQueue(filmInfo) {
  if (queue.length === 0 && localStorage.getItem('QUEUE') === null) {
    return;
  }
  const parsQueueId = JSON.parse(localStorage.getItem('QUEUE'));
  return parsQueueId.queue.some(el => {
    if (el.id === filmInfo.id) {
      const remove = parsQueueId.queue.indexOf(el);
      removeQueryQueue();
      return el.id === filmInfo.id;
    }
  });
}
function removeQueryQueue() {
  const btnAddQ = document.querySelector('.btnAddQ');
  const btnRmvQ = document.querySelector('.btnRmvQ');
  btnAddQ.classList.add('visually-hidden');
  btnRmvQ.classList.remove('visually-hidden');
}
function addQueryQueue() {
  const btnAddQ = document.querySelector('.btnAddQ');
  const btnRmvQ = document.querySelector('.btnRmvQ');
  btnAddQ.classList.remove('visually-hidden');
  btnRmvQ.classList.add('visually-hidden');
}

//************************* */ WATCHED *****************************

export function addWatched(filmInfo) {
  if (searchItemWatched(filmInfo) === true) {
    const parsWatchedId = JSON.parse(localStorage.getItem('WATCHED'));
    parsWatchedId.watched.some(el => {
      if (el.id === filmInfo.id) {
        const remove = parsWatchedId.watched.indexOf(el);
        removeItemW(remove);
      }
    });
    return;
  }
  if (watched.length === 0 && localStorage.getItem('WATCHED') !== null) {
    copyLocalStorageWatched();
    watched.push(filmInfo);
    localStorage.setItem('WATCHED', JSON.stringify({ watched }));
    addQueryWatched();
    Notify.success(`Film added to watched`);
    // console.log(watched)
  } else {
    watched.push(filmInfo);
    localStorage.setItem('WATCHED', JSON.stringify({ watched }));
    addQueryWatched();
    Notify.success(`Film added to watched`);
  }
}

function copyLocalStorageWatched() {
  const watchedFilm = localStorage.getItem('WATCHED');

  const parsWatched = JSON.parse(watchedFilm);

  parsWatched.watched.forEach(el => {
    watched.push(el);
  });
}

export function searchItemWatched(filmInfo) {
  if (watched.length === 0 && localStorage.getItem('WATCHED') === null) {
    return;
  }
  const parsWatchedId = JSON.parse(localStorage.getItem('WATCHED'));
  return parsWatchedId.watched.some(el => {
    if (el.id === filmInfo.id) {
      addQueryWatched();
      const remove = parsWatchedId.watched.indexOf(el);
      return el.id === filmInfo.id;
    }
  });
}

function addQueryWatched() {
  const btnAddW = document.querySelector('.btnAddW');
  const btnRmvW = document.querySelector('.btnRmvW');
  btnAddW.classList.add('visually-hidden');
  btnRmvW.classList.remove('visually-hidden');
}

function removeQueryWatched() {
  const btnAddW = document.querySelector('.btnAddW');
  const btnRmvW = document.querySelector('.btnRmvW');
  btnAddW.classList.remove('visually-hidden');
  btnRmvW.classList.add('visually-hidden');
}

function removeItemW(remove) {
  watched.length = 0;
  const parsWatched = JSON.parse(localStorage.getItem('WATCHED'));
  // localStorage.removeItem('WATCHED');
  parsWatched.watched.forEach(el => {
    watched.push(el);
  });
  watched.splice(remove, 1);
  localStorage.setItem('WATCHED', JSON.stringify({ watched }));
  removeQueryWatched();
  Notify.success(`Film removed`);
}
