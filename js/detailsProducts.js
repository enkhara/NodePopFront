import LoaderController from './Controllers/LoaderController.js';
import ErrorsController from './Controllers/ErrorsController.js';
import DetailController from './Controllers/DetailController.js';
import ButtonsController from './Controllers/ButtonsController.js';
import NavBarController from './Controllers/NavBarController.js';
import LogoutController from './Controllers/LogoutController.js';

window.addEventListener('DOMContentLoaded', async (event) => {
	const loader = document.querySelector('.loader-container');
	const loaderController = new LoaderController(loader);

	const navBar = document.querySelector('.nav-bar');
	new NavBarController(navBar);

	const logoutButtonElement = document.querySelector('.logout-button');
	const logoutButton = new LogoutController(logoutButtonElement);
	logoutButton.deleteTokeFromStorage();

	const errorElement = document.querySelector('.global-errors');
	const ErrorController = new ErrorsController(errorElement);

	const deleteButtonElement = document.querySelector('.button-deleteProduct');
	const deleteButton = new ButtonsController(deleteButtonElement);
	deleteButton.deleteProductButton();

	const detailProductElement = document.querySelector('.products-list');
	const detailController = new DetailController(detailProductElement);
	detailController.showDetailsProduct();
});
