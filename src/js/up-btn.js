import { refs } from './refs.js';

window.onscroll = function () {
  let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled > 800) {
    refs.upBtn.style.opacity = '1';
  } else {
    refs.upBtn.style.opacity = '0';
  }
};

refs.upBtn.addEventListener('click', up);

function up() {
  const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.requestAnimationFrame(up);
    window.scrollTo(0, top - top / 3);
  }
}
