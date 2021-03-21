import BaseController from './BaseController.js';
import DataService from '../services/DataService.js';

export default class ButtonsController extends BaseController {
	loginButton() {
		this.element.addEventListener('click', (event) => {
			const menu = document.querySelector('.userNav');

			if (event.target == this.element) {
				menu.classList.toggle('hidden');
				console.log(this.element);
			}
		});
	}

	getProductId() {
		const queryParams = window.location.search.replace('?', '');
		const idProduct = queryParams.split('=');
		return idProduct;
	}

	deleteProductButton() {
		this.element.addEventListener('click', (event) => {
			console.log('event', event, 'element', this.element);
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

	productButtonDetail(product) {
		console.log('entro en productos', this.element);
		console.log(product);
		this.element.addEventListener('click', (event) => {
			window.location.href = `/details.html?id=${product.id}`;
			this.publish(this.events.DETAIL_PRODUCT, product);
			console.log('detalle de producto', event, product);
		});
	}
}
