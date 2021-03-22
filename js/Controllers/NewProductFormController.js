import BaseController from './BaseController.js';
import DataService from '../services/DataService.js';
export default class NewProductFormController extends BaseController {
	constructor(element) {
		super(element);
		this.checkIfUserIsLogged();
		this.attachEventListener();
		this.focusInInput();
	}

	async checkIfUserIsLogged() {
		const userLogin = await DataService.isUserLogged();
		if (!userLogin) {
			window.location.href = '/login.html?next=/new-product.html';
		} else {
			this.publish(this.events.FINISH_LOADING);
		}
	}

	attachEventListener() {
		const buttonForm = this.element.querySelector('button');

		this.element.querySelectorAll('input').forEach((input) => {
			input.addEventListener('keyup', (event) => {
				// if(this.element.checkValidity()){
				//     buttonForm.removeAttribute('disabled');
				// }else {
				//     buttonForm.setAttribute('disabled', true);
				// }
			});
		});

		this.element.addEventListener('submit', async (event) => {
			event.preventDefault();

			const product = {
				image: null,
				name: this.element.elements.name.value,
				price: this.element.elements.price.value,
				transactionType: this.element.elements.productType.value,
				tags: [],
			};

			if (this.element.elements.foto.files.length > 0) {
				product.image = this.element.elements.foto.files[0];
			}

			this.publish(this.events.START_LOADING);
			try {
				await DataService.saveProduct(product);
				window.location.href = '/';
			} catch (error) {
				this.publish(this.events.ERROR, error);
			} finally {
				this.publish(this.events.FINISH_LOADING);
			}
		});
	}

	focusInInput() {
		const input = this.element.querySelector('.name-input');
		input.focus();
	}
}
