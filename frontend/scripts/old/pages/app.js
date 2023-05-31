/* eslint-disable eqeqeq */
/* eslint-disable no-lonely-if */
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/**
 * @module app - global scripts
 */
import { HelloRocket } from '../plugins/HelloRocket';
import Timer from '../plugins/Timer/index';

/**
 * PAGES
 */
import './main'
import './registration'
import './report'
import './testview'

HelloRocket();

const isIE = window.navigator.userAgent.includes('Edge');
if (isIE) {
	const btns = [...document.querySelectorAll('.btn--primary')];
	if (btns) {
		btns.forEach(btn => {
			btn.classList.add('is-ie');
		});
	}
}

const header = document.querySelector('.header') || null;
const langBtn = document.querySelectorAll('.header__lang button');
const langItems = document.querySelectorAll('.header__lang--items');
let headerPadding = 40;

if (header) {
	const isSignedBtn = header.querySelector('[data-signed]');
	const isSigned = isSignedBtn && isSignedBtn.getAttribute('data-signed');
	if (isSigned == 0) {
		isSignedBtn.addEventListener('click', e => {
			e.preventDefault();
			window.openModal('#cost');
		});
	}
}

const headerPaddingNormalize = () => {
	if (window.innerWidth < 560) {
		headerPadding = 20;
	}
};
headerPaddingNormalize();
window.addEventListener('resize', headerPaddingNormalize);

if (langBtn) {
	langBtn.forEach((item, idx) => {
		item.addEventListener('click', e => {
			e.preventDefault();
			langItems[idx].classList.toggle('is-active');
		});

		document.addEventListener('click', e => {
			if (e.target !== item) {
				langItems[idx].classList.remove('is-active');
			}
		});
	});
}
if (header) {
	let isScrolled = false;
	let st = 0;
	let lastPos = 0;
	const delta = 5;
	const headerHeight = header.clientHeight;
	window.addEventListener('scroll', e => {
		isScrolled = true;
		st = window.scrollY;
	});
	setInterval(() => {
		if (isScrolled) {
			if (Math.abs(lastPos - st) <= delta) return;
			if (st > lastPos && st > headerHeight) {
				header.style.background = '#fff';
				header.style.padding = '10px 0';
				header.style.transform = 'translateY(-100%)';
				langItems.forEach(item => {
					item.classList.remove('is-active');
				});
			} else {
				if (st < lastPos) {
					header.style.transform = 'translateY(0%)';
				}
				if (st < delta) {
					header.style.background = 'transparent';
					header.style.transform = 'translateY(0%)';
					header.style.padding = `${headerPadding}px 0`;
				}
			}
			lastPos = st;
		}

		isScrolled = false;
	}, 250);
}

const emailFeilds = [...document.querySelectorAll('input[type="email"]')];

emailFeilds.forEach(input => {
	const button = input.parentNode.parentNode.querySelector('button');
	let value = null;
	const validate = () => {
		if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
			input.parentElement.classList.remove('is-error');
			input.parentNode.classList.remove('is-active');
			input.parentElement.classList.add('is-success');
		} else {
			input.parentElement.classList.add('is-error');
			input.parentElement.classList.remove('is-success');
		}
	};

	input.addEventListener('focus', () => {
		input.parentNode.classList.add('is-active');
		input.parentElement.classList.remove('is-error');
		input.parentElement.classList.remove('is-success');
	});
	input.addEventListener('blur', () => {
		input.parentNode.classList.remove('is-active');
		validate();
	});
	input.addEventListener('change', e => {
		value = e.target.value;
		validate();
	});
});

/**
 * Function to handle checkbox actions
 * @function checkboxManager
 * @returns {void}
 */
(function checkboxManager() {
	const checkbox = document.querySelector('#terms');
	const btn = document.querySelectorAll('[data-buy-btn]')[1];
	let isChecked = false;

	if (!checkbox || !btn) return;

	checkbox.addEventListener('change', () => {
		if (!isChecked) {
			checkbox.setAttribute('value', 1);
			checkbox.setAttribute('checked', true);
			// btn.setAttribute('disabled', false);
			btn.disabled = false;
			isChecked = true;
		} else {
			checkbox.setAttribute('value', 0);
			checkbox.setAttribute('checked', false);
			btn.disabled = true;
			isChecked = false;
		}
	});
})();

window.startTimer = ({ el, title, duration, endTitle, unitEl }, callback) => {
	const t = new Timer({ el, title, duration, endTitle, unitEl }, callback);
	return {
		start: () => t.mount(),
		stop: () => t.stop()
	};
};
