import BaseController from './BaseController.js';
import DataService from '../services/DataService.js';

export default class ButtonsController extends BaseController {
	getProductId() {
		const queryParams = window.location.search.replace('?', '');
		const idProduct = queryParams.split('=');
		return idProduct;
	}

	deleteProductButton() {
		console.log('en bootones', this.element);
		this.element.addEventListener('click', (event) => {
			const idProduct = this.getProductId();
			event.stopPropagation();
			const deleteConfirm = confirm(
				'¿Estás seguro que quieres borrar este producto?'
			);
			if (deleteConfirm) {
				DataService.deleteProduct(idProduct[1]);
				window.location.href = '/';
			}
		});
	}

	addProductButton() {
		this.element.addEventListener('click', (event) => {
			const isLogged = DataService.isUserLogged();
			if (isLogged) {
				window.location.href = '/new-product.html';
			} else {
				window.location.href = '/login.html';
			}
		});
	}
}
