/**
 * Class for smooth scroll realization
 * @class
 */
interface ISmoothScroll {
	wrapper?: string;
	onComplete(func: Function): void;
}
class SmoothScroll implements ISmoothScroll {
	wrapper: string;
	links: NodeListOf<Element>;
	callback: boolean;
	completeCallback: Function;
	/**
	 * @constructor
	 * @param {string} wrapper - selector of wrapper element of anchor links
	 */
	constructor(wrapper: string) {
		this.wrapper = wrapper;
		this.links = document.querySelectorAll(`${this.wrapper} a[href^="#"]`);
		this.callback = false;

		this.init();
	}

	/**
	 * Method to init this plugin
	 * @private
	 * @returns {void}
	 */
	private init() {
		const self: any = this;
		this.links.forEach(anchor => {
			anchor.addEventListener('click', function(e) {
				e.preventDefault();
				document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
				});
				if (self.callback) {
					self.completeCallback();
				}
			});
		});
	}

	/**
	 * Method that takes callback function as argument, and calls it after scroll
	 * @public
	 * @param {Function} func - callback function to run after scrolling
	 * @returns {void}
	 */
	public onComplete(func) {
		if (func && typeof func === 'function') {
			this.callback = true;
			this.completeCallback = func;
		}
	}
}

export default SmoothScroll;
