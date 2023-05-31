/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable no-new */
import Swiper from 'swiper';

//* --> Use factory function for plugins <-- *//
/**
 * @param  {} arg
 * @returns {object} - methods of slider
 */
function Slider(wrapper) {
	// eslint-disable-next-line no-unused-vars
	// const args = arg;
	const generalOpts = {
		grabCursor: true,
		observer: true,
		observeParents: true
	};
	/**
	 * @public
	 * @param {string} wrapper - wrapper element of slider
	 */
	// function cardSlider(wrapper) {
	const options = {
		effect: 'fade',
		slidesPerView: 1,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		...generalOpts
	};
	new Swiper(wrapper, options);
	// }

	// return Object.freeze({
	// 	cardSlider: () => cardSlider()
	// });
}
export default Slider;
