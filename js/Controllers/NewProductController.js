import BaseController from './BaseController.js';
import DataService from '../services/DataService.js';

export default class NewProductController extends BaseController {
	constructor(element) {
		super(element);
		this.checkIfUserIsLogged();
	}

	async checkIfUserIsLogged() {
		const userIsLogged = await DataService.isUserLogged();

		if (userIsLogged) {
			const newProductButton = this.element.querySelector(
				'.addNewProduct-button'
			);
			newProductButton.classList.remove('hidden');
		}
	}
}
