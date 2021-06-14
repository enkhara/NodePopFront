import LoaderController from './Controllers/LoaderController.js';
import ErrorsController from './Controllers/ErrorsController.js';
import DetailController from './Controllers/DetailController.js';
import NavBarController from './Controllers/NavBarController.js';
import LogoutController from './Controllers/LogoutController.js';

window.addEventListener('DOMContentLoaded', async (event) => {
	const loader = document.querySelector('.loader-container');
	new LoaderController(loader);

	const navBar = document.querySelector('.nav-bar');
	new NavBarController(navBar);

	const logoutButtonElement = document.querySelector('.logout-button');
	const logoutButton = new LogoutController(logoutButtonElement);
	logoutButton.deleteTokeFromStorage();

	const errorElement = document.querySelector('.global-errors');
	new ErrorsController(errorElement);

	const detailProductElement = document.querySelector('.products-list');
	const detailController = new DetailController(detailProductElement);
	detailController.showDetailsProduct();
});
