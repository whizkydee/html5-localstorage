// Wait till the DOM is ready, then fire stuff.
document.addEventListener('DOMContentLoaded', () => {
  // Begin regular document stuff (UI and functions).

  // Get the body element.
  const body = document.body;

  // Define `localStorage` if it is dependent on the `window` object.
  var localStorage = (localStorage || window.localStorage);

  // Define constants for [data-editable] buttons and modal.
  const btns = document.querySelectorAll('.edit > button');
  const modal = document.querySelector('.edit__modal');

  // Get the `Clear all` button.
  const clearBtn = document.getElementById('clear');

  // Begin loop for [data-editable] buttons.
  const loop = i => {
    // Before doing anything, check first if [data-editable] buttons have
    // a `disabled` attribute, then remove it. This prevents the buttons from
    // having a `disabled` attribute when the page is reloaded, therefore making
    // the buttons inaccessible.

    if (true === btns[i].hasAttribute('disabled')) btns[i].removeAttribute('disabled');

    // Function to launch the edit modal and some other stuff.
    function launchModal() {
      // Set a `disabled` attribute on all the [data-editable] buttons
      // when each button is clicked to launch the edit modal, to avoid
      // multiple clicks resulting to modal errors.

      for (let i = 0; i < btns.length; i++) {
        btns[i].setAttribute('disabled', '');
      }

      // Define variables to set modal title based on the innerText of the button clicked.
      let modalTitleElem = document.querySelector('.edit__modal > h3');
      let modalTitle = modalTitleElem.innerText;
      let btnText = btns[i].innerText;

      // If the modal does not have a `visible` class, add a `visible` class.
      if (false === modal.classList.contains('visible')) modal.classList.add('visible');

      // Add an `id` to the modal based on the button clicked.
      let btnTextLower = btnText.toLowerCase();

      modal.setAttribute('id', `${btnTextLower}_edit`);

      // Set modal title based on the innerText of the button clicked.
      modalTitleElem.innerText = `Edit ${btnText}`;

      // Define variables to set modal description based on the [data-modal-desc] of the button clicked.
      let modalDescElem = document.querySelector('.edit__modal > .edit_text');
      let modalDesc = modalDescElem.innerText;
      let btnDesc = btns[i].getAttribute('data-modal-desc');

      // Set modal description based on the innerText of the button clicked.
      modalDescElem.innerHTML = btnDesc;

      // Get the theme selector functions.
      // Define essential variables for the theme selector.
      let themeSelector = document.getElementById('theme_selector');
      let themeBtn = document.querySelectorAll('#theme_selector button');
      // Define an array of the available themes.
      let themes = ['teal', 'tomato', 'blue', 'blueviolet'];

      // Loop through the theme selector buttons and add it's class to <body>.
      for (let i = 0; i < themeBtn.length; i++) {
        themeBtn[i].addEventListener('click', e => {
          let text = `theme-${e.target.innerText.toLowerCase()}`;
          for (let i = 0; i < themes.length; i++) {
            let theme = `theme-${themes[i]}`;
            if (true === body.classList.contains(theme)) {
              body.classList = '';
              body.classList = text;
            } else {
              body.classList = text;
            }
          }
        }, false);
      }

      // Define variables for button.outset functionality.
      let outsetOption = document.querySelector('#theme_selector label[for="checkbox"]');

      outsetOption.addEventListener('click', () => {
        for (let i = 0; i < btns.length; i++) {
          btns[i].classList.toggle('outset');
          clearBtn.classList.toggle('outset');
        }
      }, false);

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

      // Get the close button.
      let closeButton = document.getElementById('close_modal');

      // Function to close the edit modal when the close button is clicked.
      closeButton.addEventListener('click', () => {
        exitModal();
      }, false);

      // Add a keydown event listener to the document to detect
      // when `esc` key is clicked, then exit the modal.

      document.addEventListener('keydown', e => {
        if (true === modal.classList.contains('visible')) {
          if (27 === e.keyCode) exitModal();
        }
      }, false);

    }

    // Add a `click` event listener to all [data-editable] buttons and do some stuff.
    btns[i].addEventListener('click', () => {
      launchModal();

      // Get all elements needed to set the label for the inputs.
      // Get the label elements.
      let labelElem1 = document.querySelector('label[for="input1"]');
      let labelElem2 = document.querySelector('label[for="input2"]');

      // Get the [data-modal-label] attribute of each button.
      const dataLabel = btns[i].getAttribute('data-modal-label').split(',');

      // Set the innerText of the label element based on the [data-modal-label] attribute of the buttons.
      labelElem1.innerText = dataLabel[0];
      labelElem2.innerText = dataLabel[1];
    }, false);

  };

  for (let i = 0; i < btns.length; i++) {
    loop(i);
  }

  // Main `window.localStorage` functionality.
  // Get all required elements for the localstorage.
  const controllers = document.querySelectorAll('[data-controller]');

  for (let i = 0; i < btns.length; i++) {
    var dataLabel = btns[i].getAttribute('data-modal-label').split(',');
    for (let i = 0; i < dataLabel.length; i++) {
      const localStorageOption = dataLabel[i].replace(' ', '_').replace(' ', '_').toLowerCase();
      console.log(localStorageOption);
    }
  }

  clearBtn.addEventListener('click', () => {
    localStorage.clear();

    window.setTimeout(() => {
      window.location.reload();
    }, 200);

  }, false);

}, false);
