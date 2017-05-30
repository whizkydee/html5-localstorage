// Wait till the DOM is ready, then fire stuff.
document.addEventListener('DOMContentLoaded', () => {
  // Begin regular document stuff (UI and functions).

  var localStorage = (localStorage || window.localStorage);

  // Define constants for [data-editable] buttons and modal.
  const body = document.body,
        btns = document.querySelectorAll('.edit > button'),
        modal = document.querySelector('.edit__modal'),
        clearBtn = document.getElementById('clear');

  // Begin loop for [data-editable] buttons.
  const loop = i => {
    // Before doing anything, check first if [data-editable] buttons have
    // a `disabled` attribute, then remove it. This prevents the buttons from
    // having a `disabled` attribute when the page is reloaded, therefore making
    // the buttons inaccessible.

    if (true === btns[i].hasAttribute('disabled')) btns[i].removeAttribute('disabled');

    // Define global variables
    let modalTitleElem = document.querySelector('.edit__modal > h3'),
        modalTitle = modalTitleElem.innerText,
        btnText = btns[i].innerText,
        btnTextLower = btnText.toLowerCase(),

        modalDescElem = document.querySelector('.edit__modal > .edit_text'),
        modalDesc = modalDescElem.innerText,
        btnDesc = btns[i].getAttribute('data-modal-desc'),

        themeSelector = document.getElementById('theme_selector'),
        themeBtn = document.querySelectorAll('#theme_selector button'),
        themes = ['teal', 'tomato', 'blue', 'blueviolet'],
        outsetOption = document.querySelector('#theme_selector label[for="checkbox"]'),

        closeButton = document.getElementById('close_modal');

    // Function to launch the edit modal and some other stuff.
    function launchModal() {
      // Set a `disabled` attribute on all the [data-editable] buttons
      // when each button is clicked to launch the edit modal, to avoid
      // multiple clicks resulting to modal errors.

      for (let i = 0; i < btns.length; i++) {
        btns[i].setAttribute('disabled', '');
      }

      // If the modal does not have a `visible` class, add a `visible` class.
      if (false === modal.classList.contains('visible')) modal.classList.add('visible');

      modal.setAttribute('id', `${btnTextLower}_edit`);

      // Set modal title based on the innerText of the button clicked.
      modalTitleElem.innerText = `Edit ${btnText}`;

      // Set modal description based on the innerText of the button clicked.
      modalDescElem.innerHTML = btnDesc;

      // Loop through the theme selector buttons and add its class to <body>.
      for (let i = 0; i < themeBtn.length; i++) {
        themeBtn[i].addEventListener('click', e => {
          let targetTheme = `theme-${e.target.innerText.toLowerCase()}`;
          body.classList = targetTheme;
        }, false);
      }

    }

    // Define function to exit the modal.
    function exitModal() {
      // If the modal has a `visible` class, remove it.
      if (true === modal.classList.contains('visible')) modal.classList.remove('visible');

      for (let i = 0; i < btns.length; i++) {
        // If the buttons have a `disabled` attribute, remove it.
        if (true === btns[i].hasAttribute('disabled')) btns[i].removeAttribute('disabled');
      }

      const MODAL_TIMEOUT = 120; // 0.12 seconds

      // Reset the modal title to `Edit` if it already has a title inherited
      // from the button clicked after a timeout.

      if (-1 === modalTitleElem.innerText.indexOf('Edit')) {
        window.setTimeout(() => {
          modalTitleElem.innerText = 'Edit';
        }, MODAL_TIMEOUT);
      }

      // Reset the modal description to an empty string if it already has a
      // description inherited from the [data-modal-desc] attr of the button clicked
      // after a timeout.

      if (0 === modalDescElem.innerHTML.length) {
        window.setTimeout(() => {
          modalDescElem.innerHTML = '';
        }, MODAL_TIMEOUT);
      }

      // If the modal has an `id` attribute, remove it after a timeout.
      if (true === modal.hasAttribute('id')) {
        window.setTimeout(() => {
          modal.removeAttribute('id');
        }, MODAL_TIMEOUT);
      }
    }

    outsetOption.addEventListener('click', () => {
      for (let i = 0; i < btns.length; i++) {
        btns[i].classList.toggle('outset');
        clearBtn.classList.toggle('outset');
      }
    }, false);

    // Function to exit the edit modal when the close button is clicked.
    closeButton.addEventListener('click', () => {
      exitModal();
    }, false);

    document.addEventListener('keydown', e => {
      if (true === modal.classList.contains('visible')) {
        if (27 === e.keyCode) exitModal();
      }
    }, false);

    // Add a `click` event listener to all [data-editable] buttons and do some stuff.
    btns[i].addEventListener('click', () => {
      launchModal();
      let labelElem1 = document.querySelector('label[for="input1"]'),
          labelElem2 = document.querySelector('label[for="input2"]');
      const dataLabel = btns[i].getAttribute('data-modal-label').split(',');

      labelElem1.innerText = dataLabel[0];
      labelElem2.innerText = dataLabel[1];
    }, false);

  };

  for (let i = 0; i < btns.length; i++) {
    loop(i);
  }

  clearBtn.addEventListener('click', () => {
    localStorage.clear();
    window.setTimeout(() => {
      window.location.reload();
    }, 200);

  }, false);

}, false);
