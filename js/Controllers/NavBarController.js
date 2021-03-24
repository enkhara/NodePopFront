import BaseController from './BaseController.js';
import DataService from '../services/DataService.js';

export default class NavBarController extends BaseController {
	constructor(element) {
		super(element);
		this.userState();
	}

	async userState() {
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
}
