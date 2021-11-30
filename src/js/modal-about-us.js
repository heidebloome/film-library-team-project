(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    overlayClick: document.querySelector('.backdrop_command')
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

  refs.overlayClick.addEventListener('click', onOverlayClick);

  function onOverlayClick() {
    toggleModal();
  }

  window.addEventListener('keydown', onOverlaykey);

  function onOverlaykey(evt) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = evt.code === ESC_KEY_CODE;

    if (isEscKey) {
      toggleModal();
    }
  }
})();
