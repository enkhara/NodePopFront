import BaseController from './BaseController.js';
import DataService from '../services/DataService.js';

export default class NavBarController extends BaseController {
	constructor(element) {
		super(element);
		const currentPage = this.getWindowLocationHref();
		this.navBarStateAccordingToUserState(currentPage);
	}

	async navBarStateAccordingToUserState(currentPage) {
		const checkUserState = await DataService.isUserLogged();

		if (checkUserState) {
			this.selectButtonAndRemoveHiddenClass('.logout-button');
			this.selectButtonAndRemoveHiddenClass('.addNewProduct-button');
		} else {
			this.selectButtonAndRemoveHiddenClass('.login-button');
			this.selectButtonAndRemoveHiddenClass('.register-button');
		}
	}

	selectButtonAndRemoveHiddenClass(element) {
		const button = document.querySelector(element);
		button.classList.remove('hidden');
	}

	getWindowLocationHref() {
		const locationHref = window.location.href;
		const locationHrefSplit = locationHref.split('/');
		const locationHrefPage = locationHrefSplit[locationHrefSplit.length - 1]
			.split('.')
			.shift();
		return locationHrefPage;
	}
}
