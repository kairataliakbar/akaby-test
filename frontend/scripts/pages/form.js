/**
 * Global methods and functions
 * @module form
 */

import IMask from 'imask';
import moment from 'moment';

import Select from '../components/Select';

const selectCountry = new Select('#country');

const selectCountryElement = document.getElementById('country');
if (selectCountryElement && selectCountry) {
  selectCountryElement.addEventListener('click', () => selectCountry.mount());
}

const selectCity = new Select('#city');

const selectCityElement = document.getElementById('city');
if (selectCityElement && selectCity) {
  selectCityElement.addEventListener('click', () => selectCity.mount());
}

const dateBirth = document.getElementById('date_birth');
if (dateBirth) {
  const momentFormat = 'DD. MM. YYYY';
  IMask(dateBirth, {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    autofix: true,
    min: new Date(1900, 0, 1),
    max: new Date(),
    format (date) {
      return moment(date).format(momentFormat);
    },
    parse (str) {
      return moment(str, momentFormat);
    },
    blocks: {
      YYYY: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 2030
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12
      },
      DD: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31
      }
    }
  });
}

const form = document.getElementById('test-form');

/**
 * @function visibleError
 * @param  {element} element - element with error
 * @param  {string} message - error message
 * @param  {element} elementErrorBorder - element into which we will change border
 * @return {void}
 */
function visibleError(element, message, elementErrorBorder) {
  const {parentElement} = element;
  const errorElement = parentElement.querySelector('.error-message');
  errorElement.style.visibility = 'visible';
  errorElement.innerText = message;
  (elementErrorBorder || element).classList.add('error-input');
}

/**
 * @function hiddenError
 * @param  {element} element - element with error
 * @param  {element} elementErrorBorder - element into which we will change border
 * @return {void}
 */
function hiddenError(element, elementErrorBorder) {
  const {parentElement} = element;
  parentElement.querySelector('.error-message').style.visibility = 'hidden';
  (elementErrorBorder || element).classList.remove('error-input');
}

/**
 * @function validateForm
 * @param {object} event - events
 * @param {function} onRedirect - function redirect
 * @return {boolean} - form validation
 */
function validateForm(event, onRedirect) {
  const name = form.querySelector('#name');
  const genderGirl = form.querySelector('#girl');
  const genderBoy = form.querySelector('#boy');
  const dateBirthInput = form.querySelector('#date_birth');
  const country = form.querySelector('#country');
  const city = form.querySelector('#city');

  let isFormValid = true;

  if (name.value.trim() === '') {
    visibleError(name, 'Это поле обязательное');
    isFormValid = false;
  } else {
    hiddenError(name);
  }

  if (genderGirl.checked || genderBoy.checked) {
    hiddenError(genderGirl);
  } else {
    visibleError(genderGirl, 'Это поле обязательное');
    isFormValid = false;
  }

  const dateBirthValue = dateBirthInput.value.trim();
  if (dateBirthValue === '') {
    visibleError(dateBirthInput, 'Это поле обязательное');
    isFormValid = false;
  } else if (dateBirthValue.length !== 12) {
    visibleError(dateBirthInput, 'Это поле заполнено некорректно');
    isFormValid = false;
  } else {
    hiddenError(dateBirthInput);
  }

  const countryValue = country.querySelector('input').value.trim();
  if (countryValue === '') {
    visibleError(country, 'Это поле обязательное', country.querySelector('.select-form__head'));
    isFormValid = false;
  } else {
    hiddenError(country, country.querySelector('.select-form__head'));
  }

  const cityValue = city.querySelector('input').value.trim();
  if (cityValue === '') {
    visibleError(city, 'Это поле обязательное', city.querySelector('.select-form__head'));
    isFormValid = false;
  } else {
    hiddenError(city, city.querySelector('.select-form__head'));
  }

  if (!isFormValid) {
    event.preventDefault();
    event.stopPropagation();
    onRedirect();
    return isFormValid;
  }

  return isFormValid;
}

if (form) {
  const formStartBtn = form.querySelector('#form-start');
  const formLaterBtn = form.querySelector('#form-later');

  const onRedirect = () => window.location.assign('/profile');

  formStartBtn.addEventListener('click', (event) => validateForm(event));
  formLaterBtn.addEventListener('click', (event) => validateForm(event, onRedirect))
}

