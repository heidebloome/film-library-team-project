import { refs } from './refs';
import SearchAPI from './apiService';
import modal from './modal-film-card';


let watched = [];
let queue = [];


export function addWatched(filmInfo) {
    watched.push(filmInfo)
    localStorage.setItem('WATCHED', JSON.stringify({ watched }))

  }
export function addQueue(filmInfo) {
    queue.push(filmInfo)
    localStorage.setItem('QUEUE', JSON.stringify({ queue }))
}