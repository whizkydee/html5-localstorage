// Wait till the DOM is ready, then fire stuff
document.addEventListener('DOMContentLoaded', () => {
  // Begin regular document stuff (UI and functions)

  // Define constants for [data-localstorage] buttons and modal
  const btns = document.querySelectorAll('.edit > button');
  const modal = document.querySelector('.edit__modal');

  // Before doing anything, check first if [data-localstorage] buttons have
  // a `disabled` attribute, then remove it. This prevents the buttons from
  // having a `disabled` attribute when the page is reloaded, therefore making
  // the buttons inaccessible.
  for (let i = 0; i < btns.length; i++) {
    if (true === btns[i].hasAttribute('disabled')) btns[i].removeAttribute('disabled');
  }

  // Begin loop for [data-localstorage] buttons
  for (let i = 0; i < btns.length; i++) {
    // Function to launch the edit modal and + some other stuff
    function launchModal() {
      // Set a `disabled` attribute on all the [data-localstorage] buttons
      // when each button is clicked to launch the edit modal, to avoid
      // multiple clicks resulting to modal errors.
      for (let i = 0; i < btns.length; i++) {
        btns[i].setAttribute('disabled', '');
      }

      // Define variables to set modal title based on the innerText of the button clicked
      let modalTitleElem = document.querySelector('.edit__modal > h3');
      let modalTitle = modalTitleElem.innerText;
      let btnText = btns[i].innerText;

      // If the modal does not have a `visible` class, add a `visible` class
      if (false === modal.classList.contains('visible')) modal.classList.add('visible');

      // Add an `id` to the modal based on the button clicked
      let btnTextLower = btnText.toLowerCase();

      modal.setAttribute('id', `${btnTextLower}_edit`);

      // Set modal title based on the innerText of the button clicked
      modalTitleElem.innerText = `Edit ${btnText}`;

      // Define variables to set modal description based on the [data-desc] of the button clicked
      let modalDescElem = document.querySelector('.edit__modal > .edit_text');
      let modalDesc = modalDescElem.innerText;
      let btnDesc = btns[i].getAttribute('data-desc');

      // Set modal description based on the innerText of the button clicked
      modalDescElem.innerHTML = `${btnDesc}`;

      // Get the theme selector functions
      // Define essential variables for the theme selector
      let themeSelector = document.getElementById('theme_selector');
      let labels = document.querySelectorAll('#theme_selector > label > input');

      for (let i = 0; i < labels.length; i++) {
        labels[i].addEventListener('click', () => {
          while (labels[i].hasAttribute('checked')) {
            labels[i].removeAttribute('checked');
          }

        }, false);
      }

      // Define function to exit the modal
      function exitModal() {
        // If the modal has a `visible` class, remove it
        if (true === modal.classList.contains('visible')) modal.classList.remove('visible');

        for (let i = 0; i < btns.length; i++) {
          // If the buttons have a `disabled` attribute, remove it
          if (true === btns[i].hasAttribute('disabled'))
            btns[i].removeAttribute('disabled');
        }

        // Reset the modal title to `Edit` if it already has a title inherited
        // from the button clicked within a timeout of .120 seconds
        if ('Edit' !== modalTitleElem.innerText) {
          setTimeout(() => {
            modalTitleElem.innerText = 'Edit';
          }, 120);
        }

        // Reset the modal description to an empty string if it already has a
        // description inherited from the [data-desc] attr of the button clicked
        // within a timeout of .120 seconds
        if ('' !== modalDescElem.innerHTML) {
          setTimeout(() => {
            modalDescElem.innerHTML = '';
          }, 120);
        }

        // If the modal has an `id` attribute, remove it within a timeout of .120 seconds
        if (true === modal.hasAttribute('id')) {
          setTimeout(() => {
            modal.removeAttribute('id');
          }, 120);
        }

      }

      // Get the close button
      let closeButton = document.getElementById('close_modal');

      // Function to close the edit modal when the close button is clicked
      closeButton.addEventListener('click', () => {
        exitModal();
      }, false);

      // Add a keydown event listener to the document to detect
      // when `esc` key is clicked, then exit the modal
      document.addEventListener('keydown', e => {
        if (modal.classList.contains('visible')) {
          if (27 === e.keyCode) exitModal();
        }
      }, false);

    }

    // Add a `click` event listener to all [data-localstorage] buttons and do some stuff
    btns[i].addEventListener('click', () => {
      launchModal();

      // Get all elements need to set the label for the inputs
      // Get the label elements
      let labelElem1 = document.querySelector('label[for="input1"]');
      let labelElem2 = document.querySelector('label[for="input2"]');

      // Get the [data-label-1, data-label-2] attributes of each button
      let dataLabel1 = btns[i].getAttribute('data-label-1');
      let dataLabel2 = (btns[i].hasAttribute('data-label-2')) ? btns[i].getAttribute('data-label-2') : '';

      // Set the innerText of the label element based on the [dataLabel1, dataLabel2] attributes of the buttons
      labelElem1.innerText = dataLabel1;
      labelElem2.innerText = dataLabel2;

    }, false);

  }
}, false);
