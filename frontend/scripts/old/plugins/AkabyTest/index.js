/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

gsap.registerPlugin(CSSPlugin);

/**
 * Class of test system, where user can choose one of two pictures
 * @class
 */
class AkabyTest {
	/**
	 * @constructor
	 * @param {object} options
	 * @param {string} options.question - questions wrapper selector
	 * @param {string} options.answer - answers wrapper selector
	 * @param {object} options.fractions - object with fraction selectors
	 * @param {string} options.fractions.current - current question selector
	 * @param {string} options.fractions.total - total questions selector
	 */
	constructor(options) {
		this.questions = [...document.querySelectorAll(options.question)] || null;
		this.answer = options.answer;
		this.current = document.querySelector(options.fractions.current);
		this.total = document.querySelector(options.fractions.total);
		this.progress = document.querySelector('[data-progress]');
		// this.TL = new gsap();
		this.data = [];
		this.index = 0;
		window.getResults = () => this.data;
	}

	/**
	 * Method to control progressbar of testing
	 * @private
	 * @returns {void}
	 */
	progressConrol() {
		const max = this.questions.length;
		const min = this.index + 1;
		const x = Math.round((100 / max) * min);
		// const tl = new TimelineLite();

		gsap.to(this.progress, 0.25, { width: `${x}%` });
	}

	/**
	 * Method to change pictures in each step(question)
	 * @private
	 * @returns {void}
	 */
	changeView() {
		const answers = [...document.querySelectorAll(this.answer)];
		let clicked = false;

		answers.forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault();
				if (!clicked) {
					clicked = true;

					const questionId = item.parentElement.getAttribute(
						'data-question-id'
					);
					const id = item.getAttribute('data-id');
					this.writeData(questionId, id);
					answers.forEach(it => it.classList.remove('is-active'));
					item.classList.add('is-active');
					// this.questions[this.index].style.display = 'none';
					// console.log(
					// 	'🐞: AkabyTest -> changeView -> 	this.questions[this.index]',
					// 	this.questions[this.index]
					// );
					gsap.to(this.questions[this.index], 0.35, {
						opacity: 0,
						display: 'none',
						onComplete: () => {
							this.progressConrol();
						}
					});
					if (this.index < this.questions.length - 1) {
						gsap.to(this.questions[this.index + 1], 0.35, {
							opacity: 1,
							delay: 0.3,
							display: 'flex',
							onComplete: () => {
								this.index += 1;
								this.renderFractions();
								clicked = false;
							}
						});
					} else {
						this.completeCallback(this.data);
					}
				}
			});
		});
	}

	/**
	 * Method to save user's choice of each question
	 * @private
	 * @param {number} id - question id
	 * @param {number} res - answer id
	 * @returns {void}
	 */
	writeData(id, res) {
		const result = {
			questionId: id,
			result: res
		};
		this.data.push(result);
	}

	/**
	 * Method to render fractions of questions count (counter)
	 * @private
	 * @returns {void}
	 */
	renderFractions() {
		this.current.innerHTML = this.index + 1;
		this.total.innerHTML = this.questions.length;
	}

	/**
	 * Method which takes callback function as argument to call it after end of the test
	 * @public
	 * @param {Function} func - callback function
	 * @returns {void}
	 */
	onComplete(func) {
		if (func && typeof func === 'function') {
			this.completeCallback = func;
		}
	}

	/**
	 * Method to initialize testing system
	 * @public
	 */
	mount() {
		this.renderFractions();
		this.changeView();
	}
}

export default AkabyTest;
