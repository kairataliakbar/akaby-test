/**
 * @module testview - testview page scripts
 */

import AkabyTest from '../plugins/AkabyTest/index';

const app = new AkabyTest({
	question: '.question',
	answer: '.answer',
	fractions: {
		current: '#current',
		total: '#total'
	}
});
if(document.querySelector('.old-test'))
app.mount();

window.onTestComplete = x => app.onComplete(x);
