/* eslint-disable no-useless-return */

//* --> Use factory function for plugins <-- *//

/**
 * Class (Fabric funtion) to init Select dropdown
 * @class
 * @param {String} target - selector of wrapper element
 * @returns {object} - methods
 */
function Select(target) {
	const selects = target
		? document.querySelector(target)
		: [...document.querySelectorAll('.select-form')];
	const selectsArray = !target ? [...selects] : [];
	if (target) {
		selectsArray.push(selects);
	}

	const callbackWarn = () => console.warn('There is no callback function');
	let changed = () => {};

	/**
	 * Method to register events and pass callbacks
	 * @public
	 * @method
	 * @param {string} name - 'changed' event
	 * @param {Function} callback - callback function
	 * @returns {void}
	 */
	function listen(name, callback) {
		switch (name) {
			case 'changed':
				changed = typeof callback === 'function' ? callback : callbackWarn;
				break;
			default:
				console.error('There is no such event');
				break;
		}
	}

	/**
	 * Method to init select dropdown
	 * @public
	 * @method
	 * @returns {void}
	 */
	function mount() {
		const options = target
			? [...selects.querySelectorAll('.select-form__options li')]
			: [...document.querySelectorAll('.select-form__options li')];
		selectsArray.forEach(select => {
			const head = select.querySelector('.select-form__head');
			const title = select.querySelector('.select-form__title');
			const input = select.querySelector('[data-select-input]');
			const selfOptions = select.querySelector('.select-form__options');
			let isOpen = false;

			options.forEach(option => {
				if (option.classList.contains('is-active')) {
					title.innerHTML = option.innerHTML;
					title.classList.add('is-active');
				}
			});

			head.addEventListener('click', (event) => {
				event.stopPropagation();
				event.preventDefault();
				if (!isOpen && !selfOptions.classList.contains('is-active')) {
					selfOptions.classList.add('is-active');
					isOpen = true;
					options.forEach((option, index) => {
						const value = option.getAttribute('data-select-value');
						const optionTitle = option.innerHTML;

						option.addEventListener('click', () => {
							input.setAttribute('value', value);
							title.innerHTML = optionTitle;
							options.forEach(o => o.classList.remove('is-active'));
							option.classList.add('is-active');
							selfOptions.classList.remove('is-active');
							isOpen = false;
							changed(value, title, index);
						});
					});
				} else {
					selfOptions.classList.remove('is-active');
					isOpen = false;
				}
			});
		});
		document.addEventListener('click', e => {
			selectsArray.forEach(select => {
				if (!select.contains(e.target)) {
					select
						.querySelector('.select-form__options')
						.classList.remove('is-active');
				}
			});
		});
	}

	/**
	 * Method to reset selected values
	 * @public
	 * @method
	 * @returns {void}
	 */
	function reset() {
		selectsArray.forEach(select => {
			const title = select.querySelector('.select-form__title');
			const input = select.querySelector('[data-select-input]');
			const selfOptions = [
				...select.querySelectorAll('.select-form__options li')
			];

			title.innerHTML = selfOptions[0].innerHTML;
			input.setAttribute('value', selfOptions[0].getAttribute('value'));
			selfOptions.forEach(option => option.classList.remove('is-active'));
			selfOptions[0].classList.add('is-active');
		});
	}

	/**
	 * Method to render options from external API etc.
	 * @public
	 * @method
	 * @param {Array<object>} data - data with options
	 * @returns {void}
	 */
	function renderOptions(data) {
		if (typeof data !== 'object' && data.length < 1) {
			console.error('😿: you pass wrong data to render');
			return;
		}
		const template = (value, title) => {
			const li = document.createElement('li');
			li.setAttribute('data-select-value', value);
			li.innerText = title;
			return li;
		};
		selectsArray.forEach(select => {
			const options = select.querySelector('.select-form__options');
			while (options.firstChild) {
				options.removeChild(options.firstChild);
			}
			data.forEach(option =>
				options.appendChild(template(option.value, option.title))
			);
		});
	}

	return Object.freeze({
		mount,
		listen,
		reset,
		renderOptions
	});
}
export default Select;
