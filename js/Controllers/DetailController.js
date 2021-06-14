import BaseController from './BaseController.js';
import { oneProductView, productMissingView } from '../views.js';
import DataService from '../services/DataService.js';
import ButtonsController from './ButtonsController.js';

export default class DetailController extends BaseController {
	constructor(element) {
		super(element);
	}

	renderOneProduct(product) {
		const div = document.createElement('div');
		div.classList.add('one-product');
		div.innerHTML = oneProductView(product);
		this.element.appendChild(div);
	}

	renderNoneProduct() {
		const div = document.createElement('div');
		div.classList.add('none-product');
		div.innerHTML = productMissingView();
		this.element.appendChild(div);
	}

	getProductId() {
		const queryParams = window.location.search.replace('?', '');
		const idProduct = queryParams.split('=');
		return idProduct[1];
	}

	async showDetailsProduct() {
		this.publish(this.events.START_LOADING, {});

		try {
			const productId = this.getProductId();
			const product = await DataService.getProducts(productId);
			if (product) {
				this.renderOneProduct(product);
				const user = await DataService.getUser();
				let userId = null;
				if (user && user.userId) {
					userId = user.userId;
				}

				const buttonDelete = this.element.querySelector('button');

				if (product.userId === userId) {
					const deleteButtonElement = document.querySelector(
						'.button-deleteProduct'
					);
					const deleteButton = new ButtonsController(deleteButtonElement);
					deleteButton.deleteProductButton();
					buttonDelete.classList.remove('hidden');
				}
			} else {
				this.renderNoneProduct();
			}
		} catch (error) {
			this.publish(this.events.ERROR, error);
		} finally {
			this.publish(this.events.FINISH_LOADING, {});
		}
	}
}
