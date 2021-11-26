import { refs } from './refs';
import SearchAPI from './apiService';
import modal from './modal-film-card';


let watched = [];
let queue = [];
// export function addQuery() {
//   const buttonWatched = document.querySelector('.modal__watch-list');
//     const buttonQueue = document.querySelector('.modal__queue-list');
// }

// export function addLocalStorage(filmInfo) {
//   buttonWatched.addEventListener('click', addWatched(filmInfo));
//      buttonQueue.addEventListener('click', addQueue(filmInfo));
  
    
//     console.log(filmInfo)
//   }

export function addWatched(filmInfo) {
    watched.push(filmInfo)
    localStorage.setItem('WATCHED', JSON.stringify({ watched }))
  console.log(123)
}
export function addQueue(filmInfo) {
    queue.push(filmInfo)
    localStorage.setItem('QUEUE', JSON.stringify({ queue }))
}