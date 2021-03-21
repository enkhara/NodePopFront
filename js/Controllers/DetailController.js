import BaseController from './BaseController.js';
import { oneProductView, productMissingView } from '../views.js';
import DataService from '../services/DataService.js';

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
				const { userId, userName } = await DataService.getUser();
				const buttonDelete = document.querySelector('button');
				if (product.userId === userId) {
					buttonDelete.classList.remove('hidden');
				} else {
					buttonDelete.classList.add('hidden');
				}
				this.renderOneProduct(product);
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
