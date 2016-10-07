'use strict';

// Wait till the DOM is ready, then fire stuff
document.addEventListener('DOMContentLoaded', function () {
  // Begin regular document stuff (UI and functions)

  // Define constants for [data-localstorage] buttons and modal
  var btns = document.querySelectorAll('.edit > button');
  var modal = document.querySelector('.edit__modal');

  // Before doing anything, check first if [data-localstorage] buttons have
  // a `disabled` attribute, then remove it. This prevents the buttons from
  // having a `disabled` attribute when the page is reloaded, therefore making
  // the buttons inaccessible.
  for (var i = 0; i < btns.length; i++) {
    if (true === btns[i].hasAttribute('disabled')) btns[i].removeAttribute('disabled');
  }

  // Begin loop for [data-localstorage] buttons

  var _loop = function _loop(_i) {
    // Function to launch the edit modal and + some other stuff
    function launchModal() {
      // Set a `disabled` attribute on all the [data-localstorage] buttons
      // when each button is clicked to launch the edit modal, to avoid
      // multiple clicks resulting to modal errors.
      for (var _i2 = 0; _i2 < btns.length; _i2++) {
        btns[_i2].setAttribute('disabled', '');
      }

      // Define variables to set modal title based on the innerText of the button clicked
      var modalTitleElem = document.querySelector('.edit__modal > h3');
      var modalTitle = modalTitleElem.innerText;
      var btnText = btns[_i].innerText;

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
      var btnDesc = btns[_i].getAttribute('data-desc');

      // Set modal description based on the innerText of the button clicked
      modalDescElem.innerHTML = '' + btnDesc;

      // Get the theme selector functions
      // Define essential variables for the theme selector
      var themeSelector = document.getElementById('theme_selector');
      var labels = document.querySelectorAll('#theme_selector > label > input');

      var _loop2 = function _loop2(_i3) {
        labels[_i3].addEventListener('click', function () {
          if (labels[_i3].hasAttribute('checked')) {
            labels[_i3].removeAttribute('checked');
          } else {
            this.setAttribute('checked', '');
          }
        }, false);
      };

      for (var _i3 = 0; _i3 < labels.length; _i3++) {
        _loop2(_i3);
      }

      // Define function to exit the modal
      function exitModal() {
        // If the modal has a `visible` class, remove it
        if (true === modal.classList.contains('visible')) modal.classList.remove('visible');

        for (var _i4 = 0; _i4 < btns.length; _i4++) {
          // If the buttons have a `disabled` attribute, remove it
          if (true === btns[_i4].hasAttribute('disabled')) btns[_i4].removeAttribute('disabled');
        }

        // Reset the modal title to `Edit` if it already has a title inherited
        // from the button clicked within a timeout of .120 seconds
        if ('Edit' !== modalTitleElem.innerText) {
          setTimeout(function () {
            modalTitleElem.innerText = 'Edit';
          }, 120);
        }

        // Reset the modal description to an empty string if it already has a
        // description inherited from the [data-desc] attr of the button clicked
        // within a timeout of .120 seconds
        if ('' !== modalDescElem.innerHTML) {
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

      // Add a keydown event listener to the document to detect
      // when `esc` key is clicked, then exit the modal
      document.addEventListener('keydown', function (e) {
        if (modal.classList.contains('visible')) {
          if (27 === e.keyCode) exitModal();
        }
      }, false);
    }

    // Add a `click` event listener to all [data-localstorage] buttons and do some stuff
    btns[_i].addEventListener('click', function () {
      launchModal();

      // Get all elements need to set the label for the inputs
      // Get the label elements
      var labelElem1 = document.querySelector('label[for="input1"]');
      var labelElem2 = document.querySelector('label[for="input2"]');

      // Get the [data-label-1, data-label-2] attributes of each button
      var dataLabel1 = btns[_i].getAttribute('data-label-1');
      var dataLabel2 = btns[_i].hasAttribute('data-label-2') ? btns[_i].getAttribute('data-label-2') : '';

      // Set the innerText of the label element based on the [dataLabel1, dataLabel2] attributes of the buttons
      labelElem1.innerText = dataLabel1;
      labelElem2.innerText = dataLabel2;
    }, false);
  };

  for (var _i = 0; _i < btns.length; _i++) {
    _loop(_i);
  }
}, false);
//# sourceMappingURL=script.js.map