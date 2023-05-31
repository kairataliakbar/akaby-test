/* eslint-disable import/no-unresolved */
/**
 * @module registration - registration page scripts
 */

import 'core-js/features/global-this';
import Datepicker from 'vanillajs-datepicker/js/Datepicker';
import ru from 'vanillajs-datepicker/js/i18n/locales/ru';
import kk from 'vanillajs-datepicker/js/i18n/locales/kk';
import IMask from 'imask';
import Select from '../components/Select/index';

Object.assign(Datepicker.locales, ru, kk);

let radioIsChanged = false;
let selectIsChanged = false;

const select = new Select('#country');
select.listen('changed', () => {
	selectIsChanged = true;
});
select.mount();

const main = document.querySelector('.registration');

/**
 * Function to handle radios actions
 * @function radioManager
 * @returns {void}
 */
(function radioManager() {
	const radios = [...main.querySelectorAll('input[type="radio"]')];

	radios.forEach(radio => {
		radio.addEventListener('change', () => {
			// radios.forEach(r => r.setAttribute('value', 0));
			// radio.setAttribute('value', 1);
			radioIsChanged = true;
		});
	});
})();

const datepickerEl = document.querySelector('.date-picker');
let dateIsChanged = false;

const dp = new Datepicker(datepickerEl, {
	language: 'ru',
	orientation: 'left bottom',
	autohide: true,
	maxDate: Date.now(),
	minDate: new Date('01.01.2000')
});
dp.element.removeAttribute('autocomplete');
dp.element.addEventListener('change', () => {
	dateIsChanged = true;
});

/**
 * Function to validate input data in registration form
 * @function formValidation
 * @returns {void}
 */
(function formValidation() {
	const form = document.querySelector('#registration-form');
	const btn = form.querySelector('#submit');
	const fields = [...form.querySelectorAll('[data-reg-form]')];
	const x = fields.length;
	let checked = 0;

	console.log('🐞: formValidation -> checked', checked);

	const validate = () => {
		if (checked === x && radioIsChanged && dateIsChanged && selectIsChanged) {
			btn.disabled = false;
		}
		clearInterval();
	};

	fields.forEach(field => {
		let c = false;
		const listen = e => {
			if (!c && e.target.value.length > 0) {
				checked += 1;
				console.log('🐞: formValidation -> checked', checked);
				c = true;
			}
		};
		field.addEventListener('input', listen, false);
	});

	setInterval(validate, 150);
})();

IMask(datepickerEl, {
	mask: Date
});
