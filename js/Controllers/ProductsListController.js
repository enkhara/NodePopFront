import ButtonsController from './ButtonsController.js';
import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { productView, noneProductsView } from '../views.js';
import DataService from '../services/DataService.js';

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
			// const productButton = new ButtonsController(div);

			// productButton.productButtonDetail(product);
		}
	}

	renderNoneProducts() {
		const div = document.createElement('div');
		div.classList.add('none-product');
		div.innerHTML = noneProductsView();
		this.element.appendChild(div);

		const isLogged = DataService.getToken();
		//       TODO: cambiar los ids de los botones por el class
		const isLoggedd = false;
		if (isLoggedd) {
			console.log('el usuario esta logeado en no productos', isLogged);
			const linkButtonAddProduct = document.querySelector('#button-AddProduct');
			linkButtonAddProduct.classList.remove('hidden');

			//  TODO::mostrar botton para añadir anuncio
		} else {
			const linkButtonLogin = document.querySelector('#login-button');
			linkButtonLogin.classList.remove('hidden');
			// TODO: mostrar boton a registrarse o logearse
		}
		// const buttonElement = document.querySelector('.button-add');
		// const button = new ButtonsController(buttonElement);
		// button.addProductButton();
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
