import LoaderController from './Controllers/LoaderController.js';
import ErrorsController from './Controllers/ErrorsController.js';
import LoginFormController from './Controllers/LoginFormController.js';
import NavBarController from './Controllers/NavBarController.js';

window.addEventListener('DOMContentLoaded', () => {
	const loader = document.querySelector('.loader-container');
	new LoaderController(loader);

	const navBar = document.querySelector('.nav-bar');
	new NavBarController(navBar);

	const errorElement = document.querySelector('.global-errors');
	new ErrorsController(errorElement);

	const formElement = document.querySelector('form');
	new LoginFormController(formElement);
});
