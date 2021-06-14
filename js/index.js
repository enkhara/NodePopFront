import ProductsListController from './Controllers/ProductsListController.js';
import LoaderController from './Controllers/LoaderController.js';
import ErrorsController from './Controllers/ErrorsController.js';
import NewProductController from './Controllers/NewProductController.js';
import NavBarController from './Controllers/NavBarController.js';
import LogoutController from './Controllers/LogoutController.js';

window.addEventListener('DOMContentLoaded', async (event) => {
	const loader = document.querySelector('.loader-container');
	const loaderController = new LoaderController(loader);

	const navBar = document.querySelector('.nav-bar');
	new NavBarController(navBar);

	const element = document.querySelector('.products-list');
	const controller = new ProductsListController(element);
	controller.loadProducts();

	const errorElement = document.querySelector('.global-errors');
	const ErrorController = new ErrorsController(errorElement);

	const logoutButtonElement = document.querySelector('.logout-button');
	const logoutButton = new LogoutController(logoutButtonElement);
	logoutButton.deleteTokeFromStorage();

	const newProduct = document.querySelector('header');
	new NewProductController(newProduct);
});
