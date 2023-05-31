/* eslint-disable no-underscore-dangle */
/**
 * Class of timer, which used in modals
 * @class
 */
class Timer {
	/**
	 * @constructor
	 * @param {object} options - options of timer
	 * @param {string} options.el - id selector of element
	 * @param {string} options.title - selector of title
	 * @param {number} options.duration - duration of timer
	 * @param {string} options.endTitle - title which appears after timeout
	 * @param {string} options.unitEl - selector of element with unit text
	 * @param {Function} callback - callback function, that calls after timeout
	 */
	constructor({ el, title, duration, endTitle, unitEl }, callback) {
		console.log('🐞: Timer -> constructor -> endTitle', endTitle);
		this.el = document.querySelector(el);
		this.title = document.querySelector(title);
		this.unit = document.querySelector(unitEl);
		this._title = this.title.innerHTML;
		this._unit = this.unit.innerHTML;
		this.duration = duration;
		this.endTitle = document
			.querySelector(`[${endTitle}]`)
			.getAttribute(endTitle);

		if (typeof callback === 'function') {
			this.callback = callback;
		}
		this.count = 0;
	}

	/**
	 * Method to start timer
	 * @public
	 * @returns {void}
	 */
	mount() {
		this.count += 1;

		if (this.count > 0) {
			this.title.innerHTML = this._title;
			this.unit.innerHTML = this._unit;
		}
		let d = this.duration;
		this.i = setInterval(() => {
			if (d > 0) {
				d -= 1;
				this.el.innerHTML = d;
			} else {
				clearInterval(this.i);
				this.title.innerHTML = this.endTitle;
				this.unit.innerHTML = '';
				this.el.innerHTML = '';
				if (this.callback) {
					this.callback();
				}
			}
		}, 1000);
	}

	/**
	 * Method to stops timer
	 * @public
	 * @returns {void}
	 */
	stop() {
		clearInterval(this.i);
		this.title.innerHTML = this._title;
		this.unit.innerHTML = this._unit;
	}
}

export default Timer;
