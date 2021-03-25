import DataService from '../services/DataService.js';
import BaseController from './BaseController.js';

export default class LogoutController extends BaseController {
	constructor(element) {
		super(element);
	}

	deleteTokeFromStorage() {
		this.element.addEventListener('click', () => {
			DataService.deleteToken();
		});
	}
}
