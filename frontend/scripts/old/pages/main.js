/* eslint-disable eqeqeq */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-new */
import 'core-js/features/global-this';
import Swiper from 'swiper';
import anime from 'animejs';
import smoothscroll from 'smoothscroll-polyfill';
import { gsap, CSSPlugin, Power3 as Expo } from 'gsap';
import IMask from 'imask';
import Modals from '../components/Modals/index';
import Select from '../components/Select/index';

gsap.registerPlugin(CSSPlugin);

smoothscroll.polyfill();

const nav = document.querySelector('.header__nav');
const burger = document.querySelector('.header__burger');
const startTest = document.querySelector('#start');
const startTestTop = startTest.getBoundingClientRect().top;
const floatBtn = document.querySelector('#start-float');
let isOpen = false;

window.addEventListener('scroll', () => {
	if (window.scrollY > startTestTop) {
		floatBtn.style.pointerEvents = 'all';
		floatBtn.style.opacity = 1;
		floatBtn.style.transform = 'translateY(0)';
	} else {
		floatBtn.style.pointerEvents = 'none';
		floatBtn.style.opacity = 0;
		floatBtn.style.transform = 'translateY(100%)';
	}
});

burger.addEventListener('click', e => {
	e.preventDefault();
	console.log('🐞: e', e);
	if (!isOpen) {
		nav.classList.add('is-active');
		burger.classList.add('is-active');
		isOpen = true;
	} else {
		nav.classList.remove('is-active');
		burger.classList.remove('is-active');
		isOpen = false;
	}
});

const isSigned = startTest.getAttribute('data-signed');
const isSignedFloat = floatBtn.getAttribute('data-signed');

// eslint-disable-next-line eqeqeq
if (isSigned == 0) {
	startTest.addEventListener('click', e => {
		e.preventDefault();
		Modals('#cost');
	});
}
if (isSignedFloat == 0) {
	floatBtn.addEventListener('click', e => {
		e.preventDefault();
		Modals('#cost');
	});
}

window.addEventListener('load', () => {
	/**
	 * Function for smooth scroll
	 * @function SmoothScroll
	 * @param {string} - nav element selector
	 * @returns {void}
	 */
	function SmoothScroll(wrapper) {
		const AnchorLinks = document.querySelectorAll(`${wrapper} a[href^="#"]`);

		AnchorLinks.forEach(anchor => {
			anchor.addEventListener('click', function(e) {
				e.preventDefault();
				nav.classList.remove('is-active');
				burger.classList.remove('is-active');
				isOpen = false;
				document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
				});
			});
		});
	}
	SmoothScroll('.header__nav');
	SmoothScroll('.footer__nav');
	SmoothScroll('.about');

	/**
	 * Function of main block animation (SVG Morph animation)
	 * @function heroAnimation
	 * @returns {void}
	 */
	function heroAnimation() {
		const d = [
			{
				value:
					'M425.5 212C581.23 122.62 1220.5 170 1353.5 229.5C1467.9 280.679 1709.51 493.5 1653.5 628.5C1621.14 706.5 1509.29 880.025 1420.5 903C1352.93 920.482 484.974 950.563 425.5 932C347.377 907.616 211.5 635.896 211.5 544C211.5 510.5 283.5 293.5 425.5 212Z'
			},
			{
				value:
					'M153.5 60C309.23 -29.3804 1563 0.499992 1696 60C1810.4 111.179 1895.51 396.5 1839.5 531.5C1807.14 609.5 1806.79 926.525 1718 949.5C1650.43 966.982 375.474 968.063 316 949.5C237.877 925.116 88.9996 623.396 89 531.5C89.0006 373 11.5 141.5 153.5 60Z'
			},
			{
				value:
					'M5.11085 -1.61842C160.841 -90.9989 1793.61 -61.1185 1926.61 -1.61845C2041.01 49.5602 1926.61 388.223 1926.61 534.381C1926.61 611.382 2015.41 929.407 1926.61 952.381C1859.04 969.863 64.5845 970.944 5.11075 952.381C-73.012 927.997 -2.00055 604.396 -2.00016 512.5C-1.99949 354 -136.889 79.8815 5.11085 -1.61842Z'
			}
		];
		const OPTIONS = {
			targets: '.hero__animation--path',
			d,
			duration: 1500,
			autoplay: true,
			easing: 'linear',
			elasticity: 100,
			opacity: 0,
			complete: () => {
				const hero = document.querySelector('.hero');
				hero.classList.add('done');
			}
		};
		anime(OPTIONS);

		anime({
			targets: '.hero__slider',
			duration: 1500,
			easing: 'easeInOutSine',
			opacity: 1
		});

		anime({
			targets: '.hero__animation--extra',
			duration: 1200,
			easing: 'easeInOutSine',
			opacity: 0
		});
	}

	heroAnimation();

	/**
	 * Function of main block slider (wrapper for Swiper.js)
	 * @function heroSlider
	 * @returns {void}
	 */
	(function heroSlider() {
		new Swiper('.hero__slider', {
			slidesPerView: 1,
			navigation: {
				nextEl: '.hero__slider .section__slider--next',
				prevEl: '.hero__slider .section__slider--prev'
			},
			pagination: {
				el: '.hero__slider .section__slider--fractions',
				type: 'fraction'
			}
		});
	})();

	/**
	 * Function of types block slider (wrapper for Swiper.js)
	 * @function typesSlider
	 * @returns {void}
	 */
	(function typesSlider() {
		new Swiper('.types__slider', {
			effect: 'fade',
			slidesPerView: 1,
			navigation: {
				nextEl: '.types__slider .section__slider--next',
				prevEl: '.types__slider .section__slider--prev'
			},
			pagination: {
				el: '.types__slider .section__slider--fractions',
				type: 'fraction'
			},
			breakpoints: {
				640: {
					slidesPerView: 1
				}
			}
		});
	})();

	/**
	 * Function of testimonials block slider (wrapper for Swiper.js)
	 * @function testimonialsSlider
	 * @returns {void}
	 */
	(function testimonialsSlider() {
		new Swiper('.testimonials__slider', {
			slidesPerView: 1,
			navigation: {
				nextEl: '.testimonials__slider .section__slider--next',
				prevEl: '.testimonials__slider .section__slider--prev'
			},
			pagination: {
				el: '.testimonials__slider .section__slider--fractions',
				type: 'fraction'
			},
			breakpoints: {
				1000: {
					spaceBetween: 30,

					slidesPerView: 3
				}
			}
		});
	})();

	/**
	 * Function to change testimonials card style on hover
	 * @function testimonialsText
	 * @returns {void}
	 */
	(function testimonialsText() {
		const slides = document.querySelectorAll('.testimonials__slide');
		const texts = document.querySelectorAll('.testimonials__slide p');

		texts.forEach((text, idx) => {
			if (text.innerText.length >= 260) {
				slides[idx].classList.add('overflow');
			}
		});
	})();

	/**
	 * Function to create dynamic login form
	 * @function authentication
	 * @returns {void}
	 */
	(function authentication() {
		const buttons = [...document.querySelectorAll('[data-buy-btn]')];
		const back = document.querySelector('[data-buy-back]');
		const titleEL = document.querySelector('[data-next-step]');
		const title = titleEL.innerHTML;
		const nextTitle = titleEL.getAttribute('data-next-step');
		const sendcode = document.querySelector('.form-sendcode');
		const recievecode = document.querySelector('.form-recievecode');
		const input = sendcode.querySelector('input[type=tel]');
		let isChanged = false;
		const mask = document
			.querySelector('[data-mask]')
			.getAttribute('data-mask');
		const countrySelect = new Select('#country-modal');
		buttons[0].setAttribute('disabled', true);

		const phoneMask = IMask(input, {
			mask
		});
		const initialPlaceholder = mask.replace('{', '').replace('}', '');
		input.setAttribute('placeholder', initialPlaceholder);

		input.addEventListener('input', () => {
			const isDone = phoneMask.masked.isComplete;
			if (isDone) {
				buttons[0].removeAttribute('disabled');
			} else {
				buttons[0].setAttribute('disabled', true);
			}
		});

		countrySelect.listen('changed', value => {
			phoneMask.updateOptions({ mask: value });
			const ph = value.replace('{', '').replace('}', '');
			input.setAttribute('placeholder', ph);
		});
		countrySelect.mount();

		IMask(recievecode.querySelector('input[type="numeric"]'), {
			mask: '00 00'
		});

		buttons[0].addEventListener('click', e => {
			e.preventDefault();
			if (!isChanged) {
				gsap.fromTo(
					sendcode,
					0.45,
					{
						x: 0,
						display: 'flex',
						opacity: 1,
						ease: Expo.easeOut
					},
					{
						x: '-100%',
						display: 'none',
						opacity: 0,
						ease: Expo.easeOut
					}
				);
				gsap.fromTo(
					recievecode,
					0.45,
					{
						x: '100%',
						display: 'none',
						opacity: 0,
						ease: Expo.easeIn
					},
					{
						x: 0,
						display: 'flex',
						opacity: 1,
						ease: Expo.easeIn
					}
				);
				isChanged = true;
				titleEL.innerHTML = nextTitle;
			}
		});
		back.addEventListener('click', e => {
			e.preventDefault();
			if (isChanged) {
				gsap.fromTo(
					recievecode,
					0.35,
					{
						x: 0,
						display: 'flex',
						opacity: 1,
						ease: Expo.easeOut
					},
					{
						x: '100%',
						display: 'none',
						opacity: 0,
						ease: Expo.easeOut
					}
				);
				gsap.fromTo(
					sendcode,
					0.35,
					{
						x: '-100%',
						display: 'none',
						opacity: 0,
						ease: Expo.easeIn
					},
					{
						x: 0,
						display: 'flex',
						opacity: 1,
						ease: Expo.easeIn
					}
				);
				isChanged = false;
				titleEL.innerHTML = title;
			}
		});
	})();
});
