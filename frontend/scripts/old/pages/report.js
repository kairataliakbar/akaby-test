/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
// const html2pdf = require('html2pdf.js');
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

const btn = document.querySelector('#start-download');
const title = document.querySelector('#title');
const titleWidth = title.clientWidth;
console.log('🐞: titleWidth', titleWidth);
const titleHeight = title.clientHeight;
console.log('🐞: titleHeight', titleHeight);
// const content = document.querySelector('#content');
// const contentWidth = content.clientWidth;
// const contentHeight = content.clientHeight;

// window.openModal('#download');

// let isIOS = undefined;

function toMMs(x) {
	return Math.floor(x * 0.264583);
}

/**
 * @param {object} element - html element to render
 * @param {number} width - width of html element
 * @param {number} height - height of html element
 */
function printPDF(element, width, height) {
	const filename = 'report.pdf';
	let scale = 2;

	if (window.innerWidth < 570) {
		scale = 1;
	}

	html2canvas(element, { scale })
		.then(canvas => {
			const pdf = new jsPDF('p', 'mm', [toMMs(width), toMMs(height)]);

			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();
			const imageWidth = canvas.width;
			const imageHeight = canvas.height;

			const ratio =
				imageWidth / imageHeight >= pageWidth / pageHeight
					? pageWidth / imageWidth
					: pageHeight / imageHeight;

			pdf.addImage(
				canvas.toDataURL('image/png'),
				'PNG',
				0,
				0,
				canvas.width * ratio,
				canvas.height * ratio
			);
			if (
				/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
					navigator.userAgent.toLowerCase()
				)
			) {
				return pdf.output('bloburl', { filename });
				// window.open();
			} else {
				btn.classList.remove('is-loading');
				pdf.save(filename);
			}
		})
		.then(res => {
			btn.classList.remove('is-loading');
			window.open(res);
		});
}

function eventFire(el, etype) {
	if (el.fireEvent) {
		el.fireEvent(`on${etype}`);
	} else {
		const evObj = document.createEvent('Events');
		evObj.initEvent(etype, true, false);
		el.dispatchEvent(evObj);
	}
}

btn.addEventListener('click', () => {
	btn.classList.add('is-loading');
	printPDF(title, titleWidth, titleHeight);
	// printPDF(content, contentWidth, contentHeight);
});

// eventFire(document.body, 'click');
