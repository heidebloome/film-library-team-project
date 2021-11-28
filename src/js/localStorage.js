import { refs } from './refs';
import SearchAPI from './apiService';
import modal from './modal-film-card';


let watched = [];
let queue = [];

export function addWatched(filmInfo) {
  if (watched.length === 0 && localStorage.getItem('WATCHED') !== null) {
    copyLocalStorageWatched();
    watched.push(filmInfo)
    localStorage.setItem('WATCHED', JSON.stringify({ watched }))
    console.log(watched)
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
    console.log(queue)
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

// export function searchItemQueue(filmId) {
//   const queueId = localStorage.getItem('QUEUE');
//   const parsQueueId = JSON.parse(queueId);
  
//   if (filmCard.includes('id:&{filmId}') === true) {
//     const btnAddQ = document.querySelector('.btnAddW')
//     const btnRmvQ = document.querySelector('.btnRmvW')
//     btnAddQ.classList.add('visually-hidden');
//     btnRmvQ.classList.remove('visually-hidden')
//       console.log(hi);
//     // btnRmvQ.addEventListener('click');
//   }
//   return
// };
// const filmCard = parsQueueId.forEach(el => {
    
//   })

// export function searchItemWatched(el) {
//   const watchedId = localStorage.getItem('QUEUE');
//   const parsWatchedId = JSON.parse(watchedId);

//   if (parsWatchedId.watched.includes(el) === true) {
//     const btnAddW = document.querySelector('.btnAddW')
//     const btnRmvW = document.querySelector('.btnRmvW')
//     btnAddW.classList.add('visually-hidden');
//     btnRmvW.classList.remove('visually-hidden');
//     // btnRmvW.addEventListener('click');
//   }
//   return
// };
 
// function removeItemQ(el) {
//   localStorage.removeItem(queue.)
// }