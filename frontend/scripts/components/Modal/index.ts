/* eslint-disable no-return-assign */
import { CSSPlugin } from 'gsap';

import { gsap } from 'gsap';

gsap.registerPlugin(CSSPlugin);

interface IModals {
	open(): void;
	close(): void;
}

/**
 * Class to init modals
 * @class
 */
class Modals implements IModals {
	modal: Element;
	closeBtns: NodeListOf<Element>;
	closeAttr: Element;
	/**
	 * @constructor
	 * @param {string} modalName - selector of modal
	 */
	constructor(modalName: string) {
		this.modal = document.querySelector(modalName);
		this.closeBtns = this.modal.querySelectorAll('.modal__close');
		this.closeAttr = this.modal.querySelector('[data-modal-close]');
	}
	
	/**
	 * Method to open modal
	 * @public
	 * @returns {void}
	 */
	open() {
		gsap.to(this.modal, 0.4, {
			opacity: 1,
			display: 'flex'
		});

		this.closeBtns.forEach(closeBtn => closeBtn.addEventListener('click', this.close.bind(this)));

		if (this.closeAttr) {
			this.closeAttr.addEventListener('click', this.close.bind(this));
		}
	}

	/**
	 * Method to close modal
	 * @public
	 * @returns {void}
	 */
	close() {
		gsap.to(this.modal, 0.4, {
			opacity: 0,
			display: 'none'
		});
	}
}

declare global {
	interface Window {
		modalManager: Function;
	}
}
/**
 * API for backend, to control modals
 * @global
 * @param {string} modal - selector of modal
 * @returns {object} - public methods ` open ` and ` close `
 * @example
 * const payment = window.modalManager('#payment');
 * payment.open()
 * // ... //
 * payment.close()
 */
window.modalManager = (modal: string): object => {
	const m = new Modals(modal);
	return Object.freeze({
		open: () => m.open(),
		close: () => m.close()
	});
};

export default Modals;
