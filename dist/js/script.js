'use strict';

// Wait till the DOM is ready, then fire stuff
document.addEventListener('DOMContentLoaded', function () {
  // Begin regular document stuff (UI and functions)

  // Get the body element
  var body = document.body;

  // Define constants for [data-localstorage] buttons and modal
  var btns = document.querySelectorAll('.edit > button');
  var modal = document.querySelector('.edit__modal');

  // Begin loop for [data-localstorage] buttons
  var loop = function loop(i) {
    /**
     * Before doing anything, check first if [data-localstorage] buttons have
     * a `disabled` attribute, then remove it. This prevents the buttons from
     * having a `disabled` attribute when the page is reloaded, therefore making
     * the buttons inaccessible.
     */
    if (true === btns[i].hasAttribute('disabled')) btns[i].removeAttribute('disabled');

    // Function to launch the edit modal and + some other stuff
    function launchModal() {
      /**
       * Set a `disabled` attribute on all the [data-localstorage] buttons
       * when each button is clicked to launch the edit modal, to avoid
       * multiple clicks resulting to modal errors.
       */
      for (var _i = 0; _i < btns.length; _i++) {
        btns[_i].setAttribute('disabled', '');
      }

      // Define variables to set modal title based on the innerText of the button clicked
      var modalTitleElem = document.querySelector('.edit__modal > h3');
      var modalTitle = modalTitleElem.innerText;
      var btnText = btns[i].innerText;

      // If the modal does not have a `visible` class, add a `visible` class
      if (false === modal.classList.contains('visible')) modal.classList.add('visible');

      // Add an `id` to the modal based on the button clicked
      var btnTextLower = btnText.toLowerCase();

      modal.setAttribute('id', btnTextLower + '_edit');

      // Set modal title based on the innerText of the button clicked
      modalTitleElem.innerText = 'Edit ' + btnText;

      // Define variables to set modal description based on the [data-desc] of the button clicked
      var modalDescElem = document.querySelector('.edit__modal > .edit_text');
      var modalDesc = modalDescElem.innerText;
      var btnDesc = btns[i].getAttribute('data-desc');

      // Set modal description based on the innerText of the button clicked
      modalDescElem.innerHTML = btnDesc;

      // Get the theme selector functions
      // Define essential variables for the theme selector
      var themeSelector = document.getElementById('theme_selector');
      var themeBtn = document.querySelectorAll('#theme_selector button');
      // Define an array of the available themes
      var themes = ['teal', 'tomato', 'blue', 'blueviolet'];

      // Loop through the theme selector buttons and add it's class to the body
      themeBtn.forEach(function (each) {
        each.addEventListener('click', function (e) {
          var text = e.target.innerText.toLowerCase();
          themes.forEach(function (theme) {
            if (true === body.classList.contains(theme)) {
              body.classList = '';
              body.classList = text;
            } else {
              body.classList = text;
            }
          });
        }, false);
      });

      // Define variables for button.outset functionality
      var outsetOption = document.querySelector('#theme_selector label[for="checkbox"]');
      var clearBtn = document.getElementById('clear');

      outsetOption.addEventListener('click', function () {
        btns.forEach(function (btn) {
          btn.classList.add('outset');
          clearBtn.classList.add('outset');
        });
      }, false);

      // Define function to exit the modal
      function exitModal() {
        // If the modal has a `visible` class, remove it
        if (true === modal.classList.contains('visible')) modal.classList.remove('visible');

        for (var _i2 = 0; _i2 < btns.length; _i2++) {
          // If the buttons have a `disabled` attribute, remove it
          if (true === btns[_i2].hasAttribute('disabled')) btns[_i2].removeAttribute('disabled');
        }

        /**
         * Reset the modal title to `Edit` if it already has a title inherited
         * from the button clicked within a timeout of .120 seconds
         */

        if (-1 === modalTitleElem.innerText.indexOf('Edit')) {
          setTimeout(function () {
            modalTitleElem.innerText = 'Edit';
          }, 120);
        }

        /**
         * Reset the modal description to an empty string if it already has a
         * description inherited from the [data-desc] attr of the button clicked
         * within a timeout of .120 seconds
         */

        if (-1 === modalDescElem.innerHTML.indexOf('')) {
          setTimeout(function () {
            modalDescElem.innerHTML = '';
          }, 120);
        }

        // If the modal has an `id` attribute, remove it within a timeout of .120 seconds
        if (true === modal.hasAttribute('id')) {
          setTimeout(function () {
            modal.removeAttribute('id');
          }, 120);
        }
      }

      // Get the close button
      var closeButton = document.getElementById('close_modal');

      // Function to close the edit modal when the close button is clicked
      closeButton.addEventListener('click', function () {
        exitModal();
      }, false);

      /**
       * Add a keydown event listener to the document to detect
       * when `esc` key is clicked, then exit the modal
       */
      document.addEventListener('keydown', function (e) {
        if (true === modal.classList.contains('visible')) {
          if (27 === e.keyCode) exitModal();
        }
      }, false);
    }

    // Add a `click` event listener to all [data-localstorage] buttons and do some stuff
    btns[i].addEventListener('click', function () {
      launchModal();

      // Get all elements need to set the label for the inputs
      // Get the label elements
      var labelElem1 = document.querySelector('label[for="input1"]');
      var labelElem2 = document.querySelector('label[for="input2"]');

      // Get the [data-label-1, data-label-2] attributes of each button
      var dataLabel1 = btns[i].getAttribute('data-label-1');
      var dataLabel2 = btns[i].hasAttribute('data-label-2') ? btns[i].getAttribute('data-label-2') : null;

      // Set the innerText of the label element based on the [dataLabel1, dataLabel2] attributes of the buttons
      labelElem1.innerText = dataLabel1;
      labelElem2.innerText = dataLabel2;
    }, false);
  };

  for (var i = 0; i < btns.length; i++) {
    loop(i);
  }
}, false);
//# sourceMappingURL=script.js.map
