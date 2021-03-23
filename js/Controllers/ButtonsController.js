import BaseController from './BaseController.js';
import DataService from '../services/DataService.js';

export default class ButtonsController extends BaseController {
	loginButton() {
		this.element.addEventListener('click', (event) => {
			const menu = document.querySelector('.userNav');

			if (event.target == this.element) {
				menu.classList.toggle('hidden');
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

	// productButtonDetail(product) {
	// 	this.element.addEventListener('click', (event) => {
	// 		console.log('click en producto', product.id);
	// 		//solucionar carga de detalle, llamar a dataservice para la peticion
	// 		window.location.href = `/details.html?id=${product.id}`;
	// 		//este publish que fa aquí? verificar que aixo esta fent alguna cosa, a on enllaça
	// 		//o si era una prova que es va quedar per aquí
	// 		//this.publish(this.events.DETAIL_PRODUCT, product);
	// 	});
	// }
}
