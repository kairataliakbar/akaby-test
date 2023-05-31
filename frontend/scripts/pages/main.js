// @ts-check
/**
 * Main page methods, scripts and functions
 * @module main
 */
import Swiper, { Navigation, Pagination } from 'swiper';
// @ts-ignore

Swiper.use([Navigation, Pagination]);

// eslint-disable-next-line no-unused-vars
const reviewsSlider = new Swiper('.swiper-container', {
  spaceBetween: 30,
  pagination: {
    el: '.reviews__pagination .swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
