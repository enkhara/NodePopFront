import ButtonsController from './ButtonsController.js';
import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { productView, noneProductsView, oneProductView } from '../views.js';

export default class ProductsListController extends BaseController {
	//COGER EL MODELO Y PASARLO A LA VISTA, PARA MOSTRARLO

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
			// const productButton = new ButtonsController(div);

			// productButton.productButtonDetail(product);
		}
	}

	renderNoneProducts() {
		const div = document.createElement('div');
		div.classList.add('none-product');
		div.innerHTML = noneProductsView();
		this.element.appendChild(div);

		const buttonElement = document.querySelector('.button-add');
		const button = new ButtonsController(buttonElement);
		button.addProductButton();
	}

	renderOneProduct(product) {
		const div = document.createElement('div');
		div.classList.add('one-product');
		div.innerHTML = oneProductView(product);
		this.element.appendChild(div);
	}

	//METODO
	async loadProducts() {
		this.publish(this.events.START_LOADING, {});

		try {
			const products = await dataService.getProducts();
			switch (products.length) {
				case 0:
					this.renderNoneProducts();
					break;
				case 1:
					this.renderOneProduct(products[0]);
					break;
				default:
					this.renderProducts(products, 'product');
			}
		} catch (error) {
			this.publish(this.events.ERROR, error);
		} finally {
			this.publish(this.events.FINISH_LOADING, {});
		}
	}
}
