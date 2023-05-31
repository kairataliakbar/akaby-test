/* eslint-disable no-return-assign */
import anime from 'animejs';
/**
 * Class (Fabric function) to init modals
 * @class
 * @param {string} modalName - selector of modal
 * @param {Function} func - callback function, that call on close event
 */
function Modals(modalName, func) {
	const modal = document.querySelector(modalName);
	const close = modal.querySelector('.modal__close');
	const closeAttr = modal.querySelector('[data-modal-close]');

	anime({
		targets: modalName,
		duration: 850,
		opacity: 1,
		begin: () => (modal.style.display = 'flex')
	});

	const closeEvent = () => {
		anime({
			targets: modalName,
			duration: 850,
			opacity: 0,
			complete: () => (modal.style.display = 'none')
		});
		if (func) {
			func();
		}
	};

	close.addEventListener('click', closeEvent);

	if (closeAttr) {
		closeAttr.addEventListener('click', closeEvent);
	}

	if (modalName !== '#download') {
		document.addEventListener('click', e => {
			if (e.target === modal) {
				closeEvent();
			}
		});
	}
}

window.openModal = Modals;

export default Modals;
