import ButtonsController from './ButtonsController.js';
import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { productView, noneProductsView } from '../views.js';

export default class ProductsListController extends BaseController {
	renderProducts(products, cssClass) {
		for (const product of products) {
			const div = document.createElement('div');
			div.classList.add(cssClass);
			div.innerHTML = productView(product);
			this.element.appendChild(div);

			if (product.transactionType == 'venta') {
				div.classList.add('sell');
			} else {
				div.classList.add('buy');
			}
		}
	}

	renderNoneProducts() {
		const div = document.createElement('div');
		div.classList.add('none-product');
		div.innerHTML = noneProductsView();
		this.element.appendChild(div);

		const buttonElement = document.querySelector('.button-addNewProduct');
		const button = new ButtonsController(buttonElement);
		button.addProductButton();
	}

	async loadProducts() {
		this.publish(this.events.START_LOADING, {});

		try {
			const products = await dataService.getProducts();
			if (products.length === 0) {
				this.renderNoneProducts();
			} else {
				this.renderProducts(products, 'product');
			}
		} catch (error) {
			this.publish(this.events.ERROR, error);
		} finally {
			this.publish(this.events.FINISH_LOADING, {});
		}
	}
}
