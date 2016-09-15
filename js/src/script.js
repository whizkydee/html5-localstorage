// Wait till the DOM is ready, then fire stuff
document.addEventListener('DOMContentLoaded', () => {
  // Begin regular document stuff (UI and functions)

  // Define variables for [data-localstorage] buttons and modal
  const btns = document.querySelectorAll('.edit > button');
  const modal = document.querySelector('.edit__modal');

  // Begin loop for [data-localstorage] buttons
  for (let i = 0; i < btns.length; i++) {
    // Add a `click` event listener to all [data-localstorage] buttons and do some stuff
    btns[i].addEventListener('click', () => {
      /*
        Set a `disabled` attribute on all the [data-localstorage] buttons
        when each button is clicked to launch the edit modal, to avoid
        multiple clicks resulting to modal errors.
      */
      for (let i = 0; i < btns.length; i++) {
        btns[i].setAttribute('disabled', '');
      }

      // Define variables to set modal title based on the innertext of the button clicked
      let modalTitleElem = document.querySelector('.edit__modal > h3');
      let modalTitle = modalTitleElem.innerText;
      let btnText = btns[i].innerText;

      // Check if modal does not have a `visible` class, then add `visible` class
      if (false === modal.classList.contains('visible'))
        modal.classList.add('visible');

      // Set modal title based on the innertext of the button clicked
      modalTitleElem.innerText = `${modalTitle} ${btnText}`;

    });
  }
}, false);
